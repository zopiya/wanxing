# 万形 Workbench 改进计划 v2

> 基于 Claude Design 参考、mhtml 实际界面分析、当前代码审计

---

## 1. 问题诊断

### 1.1 致命问题

| # | 问题 | 根因 | 现象 |
|---|------|------|------|
| **C-1** | 标注系统完全不工作 | `injector.ts:37` 发送 `wanxing-inject` postMessage，但 `dist/` 下的 HTML 从未包含响应脚本。`getInjectionScript()` 已定义但从未被注入。 | 鼠标悬停无高亮，点击无反应 |
| **C-2** | 聊天消息发不出去 | OpenCode Serve 未运行时 `client.session.promptAsync()` 静默失败；SSE 断连无用户可见提示 | 发送后无响应，无错误提示 |
| **C-3** | 消息不持久化 | `ChatState.messages` 仅存内存，`selectSession()` 不加载历史消息 | 刷新页面消息全丢 |
| **C-4** | 布局混乱 | 功能堆砌：Session 列表、消息区、输入框、对比按钮、截图按钮全挤在底部可折叠面板 | 不知道该用哪个功能 |

### 1.2 架构问题

| # | 问题 | 影响 |
|---|------|------|
| **A-1** | 注入机制依赖 iframe 内有监听脚本，但 HTML 从未包含 | 标注系统根本不可能工作 |
| **A-2** | 模块间通过动态 import 和回调隐式耦合 | 修改一个模块可能破坏另一个 |
| **A-3** | WebSocket + SSE 双重实时通道并存 | 冗余逻辑，调试困难 |
| **A-4** | 无状态管理，模块级变量散落各处 | 状态不一致、难以调试 |

---

## 2. 参考：Claude Design 的设计

### 2.1 布局结构

```
┌──────────────────────────────────────────────┐
│  Top Bar (40px): Logo · 项目名 · Share · 头像 │
├────────────┬─────────────────────────────────┤
│            │                                 │
│  Chat      │  Preview                        │
│  400px     │  flex: 1                        │
│  fixed     │                                 │
│            │  ┌─ Toolbar ──────────────────┐ │
│  - Messages│  │ Mark up · Edit · Comments  │ │
│  - Input   │  │ Zoom · Reload              │ │
│            │  └────────────────────────────┘ │
│            │  ┌─ iframe ──────────────────┐ │
│            │  │                            │ │
│            │  └────────────────────────────┘ │
└────────────┴─────────────────────────────────┘
```

### 2.2 核心交互

1. **项目选择** — 首页是项目列表卡片，点击进入工作台
2. **对话式生成** — 左侧聊天输入，右侧实时预览
3. **标注模式** — 工具栏切换 Mark up，在预览上标注元素
4. **编辑模式** — 工具栏切换 Edit，直接编辑元素内容

### 2.3 工具栏模式

| 模式 | 快捷键 | 行为 |
|------|--------|------|
| Browse | B | iframe 正常交互（默认） |
| Mark up | M | hover 高亮 + 点击添加批注 |
| Edit | E | 双击编辑元素文本 |
| Comments | C | 点击添加评论（info 级别） |

---

## 3. 改进方案

### 3.1 分阶段概览

| Phase | 名称 | 目标 | 工作量 |
|-------|------|------|--------|
| **P0** | 修复基础 | 标注系统可工作、聊天连接可见 | 1-2 天 |
| **P1** | 布局重构 | 左右栏布局、拖拽分割线 | 1-2 天 |
| **P2** | 核心闭环 | 标注→prompt→Agent→预览刷新 | 2-3 天 |
| **P3** | 工具栏模式 | Browse/Mark up/Edit/Comments | 1-2 天 |
| **P4** | 打磨 | 暗色模式、快捷键、错误恢复 | 1-2 天 |

---

### 3.2 Phase 0: 修复基础

#### 0.1 修复标注注入机制

**方案**：Vite middleware 拦截 `dist/*/index.html` 响应，在 `</body>` 前自动注入事件转发脚本。

```
新建：workbench/server/inject-middleware.ts

逻辑：
  1. 拦截 /dist/*/index.html 请求
  2. 读取原始 HTML
  3. 在 </body> 前插入 getInjectionScript() 的内容
  4. 返回修改后的 HTML

修改：workbench/vite.config.ts
  - 注册 inject-middleware plugin
```

**验收**：打开预览 → DevTools Console 看到 `wanxing-inject-ready` → 鼠标悬停元素时 overlay 高亮出现

#### 0.2 聊天连接状态指示器

```
修改：workbench/src/modules/chat/index.ts
  - header 中添加状态指示器（绿/黄/红点）
  - 监听 onConnectionChange() 更新状态
  - 断连时显示"重新连接"按钮

修改：workbench/src/modules/chat/chat.css
  - 添加 .chat-connection-dot 样式
```

**验收**：停止 OpenCode Serve → 红点 + "已断开" → 重启 Serve → 自动恢复绿点

#### 0.3 消息持久化到 localStorage

```
新建：workbench/src/modules/chat/persistence.ts
  - 封装 localStorage 读写逻辑
  - 按 sessionId 隔离存储

修改：workbench/src/modules/chat/index.ts
  - sendMessage/receiveMessage 后自动保存
  - initChat 时从 localStorage 恢复
```

**验收**：发送消息 → 刷新页面 → 消息仍在

---

### 3.3 Phase 1: 布局重构

#### 1.1 新布局 Shell

```
重写：workbench/src/shell/layout.ts

新布局：
  ┌──────────────────────────────────────────────┐
  │  Top Bar (40px): Logo · 项目名 · 主题切换     │
  ├────────────┬─────────────────────────────────┤
  │  Chat      │  Preview                        │
  │  400px     │  flex: 1                        │
  │  fixed     │  + iframe                       │
  ├────────────┴─────────────────────────────────┤
  │  Status Bar (optional)                        │
  └──────────────────────────────────────────────┘

重写：workbench/src/shell/layout.css
  - Grid: grid-template-rows: 40px 1fr auto
  - Grid: grid-template-columns: 400px 1fr
```

**验收**：页面显示左聊天右预览的双栏布局

#### 1.2 可拖拽分割线

```
新建：workbench/src/shell/resizer.ts
  - 在 chat-panel 和 preview-container 之间插入拖拽条
  - mousedown → mousemove → mouseup 事件处理
  - 最小宽度约束：chat 300px，preview 400px
```

**验收**：拖拽分割线可调整左右面板宽度

#### 1.3 项目选择入口

```
新建：workbench/src/shell/project-picker.ts
  - 项目选择视图：居中卡片列表
  - 文心风格卡片，hover 时 accent 边框

重写：workbench/src/shell/router.ts
  - 默认路由（#/）显示项目选择视图
  - #/project/<slug> 进入工作台
```

**验收**：打开 workbench → 显示项目列表卡片 → 点击进入工作台

---

### 3.4 Phase 2: 核心闭环

#### 2.1 标注→Prompt 转换

```
重写：workbench/src/lib/prompt-builder.ts
  - Annotation[] → 结构化 Markdown prompt
  - 包含：元素选择器、区域坐标、批注内容、严重程度

修改：workbench/src/modules/annotate/annotation-panel.ts
  - 底部添加"发送给 Agent"按钮
  - 点击时调用 prompt-builder → chat.sendMessage()
```

**验收**：添加 2 条批注 → 点击"发送给 Agent" → 聊天区出现结构化 prompt

#### 2.2 预览自动刷新

```
修改：workbench/src/modules/preview/index.ts
  - 移除 WebSocket 文件监控（保留 SSE）
  - SSE EventFileEdited 触发刷新
  - 500ms 防抖
```

**验收**：Agent 修改 HTML → 预览 500ms 内自动刷新

#### 2.3 聊天面板集成标注上下文

```
修改：workbench/src/modules/chat/index.ts
  - 监听 annotate 模块的批注变化
  - 输入框上方显示"N 条批注待处理"
  - 发送时自动附带批注上下文
```

**验收**：添加批注 → 输入框上方出现提示 → 发送时自动包含

---

### 3.5 Phase 3: 工具栏模式

#### 3.1 模式切换器

```
新建：workbench/src/modules/toolbar/mode-switcher.ts
  - Mode 类型：'browse' | 'markup' | 'edit' | 'comments'
  - 工具栏按钮组 UI
  - 模式变化时通知 annotate 模块

修改：workbench/src/modules/preview/index.ts
  - 工具栏区域添加模式切换按钮
  - Browse 模式时 iframe 可交互
  - Mark up 模式时启用标注叠加层
  - Edit 模式时启用元素编辑
```

**验收**：按 M 进入标注模式 → hover 高亮 → 点击添加批注 → 按 B 回到浏览模式

---

### 3.6 Phase 4: 打磨

```
快捷键：
  Cmd+K → 聚焦聊天输入框
  Cmd+Enter → 发送消息
  Esc → 关闭批注面板 / 退出标注模式
  M → 切换标注模式
  B → 切换浏览模式

暗色模式：确保 workbench 自身的暗色模式与文心暗色 token 一致

错误恢复：
  OpenCode Serve 不可用时显示全屏提示
  SSE 断连超过 5 次后显示"手动重连"按钮
  发送失败时保留输入框内容
```

---

## 4. 验收标准

### Phase 0 验收

- [ ] 打开预览 → 鼠标悬停元素时 overlay 高亮出现
- [ ] tooltip 显示 tagName、class、尺寸
- [ ] 停止 OpenCode Serve → 聊天面板显示红点 + "已断开"
- [ ] 重启 Serve → 自动恢复绿点
- [ ] 发送消息 → 刷新页面 → 消息仍在

### Phase 1 验收

- [ ] 页面显示左聊天（400px）右预览（弹性）的双栏布局
- [ ] 拖拽分割线可调整左右面板宽度（最小 300px / 400px）
- [ ] 顶部 40px 导航栏显示 Logo、项目名、主题切换
- [ ] 默认路由显示项目选择卡片列表
- [ ] 点击项目卡片进入工作台

### Phase 2 验收

- [ ] 添加 2 条批注 → 点击"发送给 Agent" → 聊天区出现结构化 prompt
- [ ] Agent 修改 HTML → 预览 500ms 内自动刷新
- [ ] 刷新后批注标记仍在（持久化）
- [ ] 输入框上方显示"2 条批注待处理"提示

### Phase 3 验收

- [ ] 按 M 进入标注模式 → hover 高亮 → 点击添加批注
- [ ] 按 E 进入编辑模式 → 双击编辑元素文本
- [ ] 按 B 回到浏览模式 → iframe 正常交互
- [ ] 模式切换时工具栏按钮状态正确更新

### Phase 4 验收

- [ ] `Cmd+K` 聚焦聊天输入框
- [ ] `Cmd+Enter` 发送消息
- [ ] `Esc` 关闭批注面板
- [ ] 暗色模式下所有 UI 元素正确显示
- [ ] OpenCode Serve 不可用时显示全屏提示

---

## 5. 关键技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 标注注入方式 | Vite middleware 拦截 HTML 响应注入脚本 | 不修改 dist/ HTML 源文件，Wenxin Agent 无需感知注入机制 |
| 实时通道 | 统一使用 SSE（OpenCode EventFileEdited） | 移除 WebSocket 文件监控冗余 |
| 布局方案 | CSS Grid + 固定 400px 左栏 | 参考 Claude Design，简洁可控 |
| 状态管理 | 保持模块级变量 + 事件总线 | Vanilla TS 克制哲学，不过度工程化 |
| 消息持久化 | localStorage | 简单、零依赖、按 session 隔离 |

---

## 6. 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| **新建** | `server/inject-middleware.ts` | Vite plugin：注入标注脚本 |
| **新建** | `src/shell/resizer.ts` | 可拖拽分割线 |
| **新建** | `src/shell/project-picker.ts` | 项目选择视图 |
| **新建** | `src/modules/toolbar/mode-switcher.ts` | 模式切换器 |
| **新建** | `src/modules/chat/persistence.ts` | 消息 localStorage 持久化 |
| **重写** | `src/shell/layout.ts` | 左右栏布局 |
| **重写** | `src/shell/layout.css` | 新 Grid 布局样式 |
| **重写** | `src/shell/router.ts` | 项目选择 + 工作台路由 |
| **重写** | `src/lib/prompt-builder.ts` | 标注→prompt 转换 |
| **修改** | `src/modules/annotate/injector.ts` | 简化注入逻辑 |
| **修改** | `src/modules/annotate/annotation-panel.ts` | 添加"发送给 Agent"按钮 |
| **修改** | `src/modules/chat/index.ts` | 连接状态、批注集成 |
| **修改** | `src/modules/chat/chat.css` | 连接状态样式 |
| **修改** | `src/modules/preview/index.ts` | 移除 WebSocket、添加模式切换 |
| **修改** | `vite.config.ts` | 注册 inject-middleware |
| **修改** | `src/main.ts` | 适配新布局初始化 |

---

## 7. 风险与缓解

| 风险 | 概率 | 缓解 |
|------|------|------|
| Vite middleware 注入后 iframe 内 CSP 冲突 | 低 | dist/ HTML 无 CSP 限制 |
| SSE 代理中断 | 中 | Vite proxy 默认支持 SSE |
| 左右栏布局在小屏幕上不可用 | 中 | <768px 时 chat 折叠为底部抽屉 |
| 标注→prompt 质量不足 | 中 | 迭代优化 prompt 模板 |

---

*文档版本：v2.0 | 2026-05-27*
