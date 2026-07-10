# Wanxing Workbench V1 — 开发计划

> 基于 PRD.md · Loop 模式 · Spec-Driven Development

---

## 开发循环总览

| Loop | 名称 | 范围 | 预估周期 | 状态 |
|------|------|------|----------|------|
| 1 | Foundation | 脚手架 + Shell + 文心 UI 基础 | 1 天 | ⬜ 待开始 |
| 2 | Preview | iframe 预览器 + viewport 切换 | 1 天 | ⬜ 待开始 |
| 3 | Annotate | 完整标注系统 | 2 天 | ⬜ 待开始 |
| 4 | Status | 流程状态模块 | 1 天 | ⬜ 待开始 |
| 5 | Bridge | render-audit 集成 + 文件监控 | 1 天 | ⬜ 待开始 |

**执行顺序**：L1 → L2 + L4 并行 → L3 → L5

```
Loop 1 (Foundation) ──→ Loop 2 (Preview) ──→ Loop 3 (Annotate) ──→ Loop 5 (Bridge)
                          ↕ 并行                                   
                   Loop 4 (Status) ──────────────────────────────┘
```

---

## Loop 1: Foundation — 脚手架 + Shell + 文心 UI 基础

**目标**：`just workbench` 启动后看到文心风格空壳，左侧导航 + 右侧内容区。

### 任务清单

| # | Task | 描述 | 输出 | 验证 |
|---|------|------|------|------|
| 1.1 | Vite 项目初始化 | `workbench/` 目录，`npm init`，安装 Vite + TypeScript | `package.json`, `tsconfig.json`, `vite.config.ts` | `npm run dev` 无报错 |
| 1.2 | Vite proxy 配置 | `server.proxy: { '/dist': 'http://localhost:8000' }` | `vite.config.ts` proxy 段 | 访问 `localhost:5173/dist/` 代理成功 |
| 1.3 | 文心 Token 集成 | `@import` 根目录 `wenxin-tokens.css`，全局 reset | `src/styles/main.css` | DevTools 确认 `--wenxin-*` 变量生效 |
| 1.4 | Shell 布局 | 左侧导航栏（240px）+ 右侧内容区，CSS Grid | `src/shell/layout.ts`, `layout.css` | 两栏布局，暖白底色 |
| 1.5 | Hash 路由 | `#/` 基础路由，监听 `hashchange` | `src/shell/router.ts` | 手动改 hash 内容切换 |
| 1.6 | 项目扫描 | Vite middleware 扫描 `dist/` 目录返回项目列表 | `server/scan.ts` | 导航栏显示 dist/ 下项目 |
| 1.7 | 文心风格 UI 组件 | 线框按钮、导航项、分隔线，使用 Token | `src/styles/components.css` | 视觉符合文心 |
| 1.8 | justfile 追加 | `workbench` 和 `workbench-dev` 任务 | justfile 更新 | `just workbench` 启动 |

### 验收检查表

- [ ] `just workbench` 启动无报错
- [ ] `localhost:5173` 显示文心风格空壳
- [ ] 左侧导航栏显示 `dist/` 下项目列表
- [ ] 点击导航项右侧内容区切换
- [ ] 浏览器前进/后退正常
- [ ] 暖白底色、深炭文字、砖红强调色正确
- [ ] 无 TypeScript 编译错误

---

## Loop 2: Preview — iframe 预览器 + viewport 切换

**目标**：能在 Workbench 内预览 `dist/` 下的 HTML，切换 3 种 viewport。

### 任务清单

| # | Task | 描述 | 输出 | 验证 |
|---|------|------|------|------|
| 2.1 | iframe 预览器 | 动态创建 iframe，通过 proxy 加载 `dist/<slug>/index.html` | `modules/preview/iframe-viewer.ts` | iframe 正确加载 HTML |
| 2.2 | Viewport 切换 | Desktop (1440×900) / Tablet (768×1024) / Mobile (375×812) | `modules/preview/viewport-controls.ts` | 切换后 iframe 尺寸变化 |
| 2.3 | 缩放适配 | 窗口宽度 < iframe 宽度时自动缩放（CSS transform scale） | iframe-viewer.ts 更新 | 1280px 宽桌面可浏览 1440px 预览 |
| 2.4 | 暗色模式切换 | 通过 media query 或 data-theme 切换 | `modules/preview/theme-toggle.ts` | 暗色模式样式生效 |
| 2.5 | 预览信息栏 | 项目名、viewport 尺寸、暗色模式状态 | `modules/preview/info-bar.ts` | 信息栏实时更新 |

### 验收检查表

- [ ] iframe 正确加载 `dist/<slug>/index.html`
- [ ] Desktop/Tablet/Mobile 三种 viewport 切换正常
- [ ] iframe 尺寸精确匹配（1440×900 / 768×1024 / 375×812）
- [ ] HTML 响应式布局在不同 viewport 下正确变化
- [ ] 暗色模式切换生效
- [ ] 1280px 宽桌面可正常浏览 Desktop 预览
- [ ] iframe 内容不影响 Workbench 外壳（CSS 隔离）

---

## Loop 3: Annotate — 完整标注系统

**目标**：点击选中元素 + 框选批注 + JSON 导出 + 持久化。

### 任务清单

| # | Task | 描述 | 输出 | 验证 |
|---|------|------|------|------|
| 3.1 | postMessage Bridge | Workbench ↔ iframe 消息协议 | `bridge/post-message.ts` | 鼠标事件转发成功 |
| 3.2 | iframe 注入脚本 | iframe 加载后注入事件转发脚本 | `modules/annotate/injector.ts` | 鼠标事件被捕获 |
| 3.3 | DOM Inspector overlay | Workbench 侧绘制高亮 overlay + tooltip | `modules/annotate/inspector.ts` | 悬停高亮 + 信息显示 |
| 3.4 | 点击选中批注 | 点击元素 → 弹出批注输入框 | inspector.ts 更新 | 点击 → 输入 → 生成标注 |
| 3.5 | 框选批注 | 拖拽绘制矩形区域 → 批注输入框 | `modules/annotate/region-selector.ts` | 拖拽 → 输入 → 生成标注 |
| 3.6 | 批注管理面板 | 列表展示、删除、修改 severity | `modules/annotate/annotation-panel.ts` | 列表正确，可操作 |
| 3.7 | Severity 标记 | info(灰) / warning(黄) / critical(红) | CSS + 逻辑 | 颜色正确 |
| 3.8 | JSON 导出 | `dist/<slug>/tmp/annotations.json` | `modules/annotate/export.ts` | 格式符合 Schema |
| 3.9 | 持久化加载 | 页面加载时读取已有批注 | `modules/annotate/persistence.ts` | 刷新后批注恢复 |
| 3.10 | Vite middleware | 读写 annotations.json API | `server/annotations.ts` | API 端点正常 |

### 标注数据 JSON Schema

```json
{
  "version": 1,
  "project": "slug",
  "sourceHash": "sha256前8位",
  "createdAt": "ISO8601",
  "annotations": [
    {
      "id": "uuid",
      "type": "element | region",
      "target": { "selector": "CSS选择器", "path": "DOM path" },
      "rect": { "x": 0, "y": 0, "width": 0, "height": 0 },
      "note": "用户批注文字",
      "severity": "info | warning | critical",
      "createdAt": "ISO8601"
    }
  ]
}
```

### 验收检查表

- [ ] 鼠标悬停 iframe 内元素，overlay 高亮正确
- [ ] tooltip 显示标签名、class、尺寸
- [ ] 点击元素 → 输入批注 → 生成标注（type: element）
- [ ] 框选区域 → 输入批注 → 生成标注（type: region）
- [ ] 批注面板列表正确显示
- [ ] 可删除批注、修改 severity
- [ ] severity 颜色区分正确（灰/黄/红）
- [ ] 导出 annotations.json 格式正确
- [ ] 刷新页面后批注恢复
- [ ] sourceHash 匹配时才加载旧批注

---

## Loop 4: Status — 流程状态模块

**目标**：审计轮次时间线 + Gate 状态 + Render Contract 面板 + 持久化。

### 任务清单

| # | Task | 描述 | 输出 | 验证 |
|---|------|------|------|------|
| 4.1 | 审计轮次时间线 | 纵向时间线展示第 1/2/3 轮审计 | `modules/status/timeline.ts` | 时间线正确显示 |
| 4.2 | Gate 状态卡片 | 通过(绿)/阻断(红)/警告(黄) | `modules/status/gate-card.ts` | 颜色正确，可展开 |
| 4.3 | Render Contract 面板 | metrics 分组展示 | `modules/status/contract-panel.ts` | 数据正确解析显示 |
| 4.4 | 修复指令历史 | 每轮修复指令列表 | `modules/status/fix-history.ts` | 可展开查看 |
| 4.5 | 状态持久化 | 读写 workbench-state.json | `modules/status/persistence.ts` | 关闭重开后恢复 |
| 4.6 | 跨会话合并 | 已有状态自动加载 | persistence.ts 更新 | 状态正确合并 |
| 4.7 | Vite middleware | 读写 state API | `server/state.ts` | API 端点正常 |

### 流程状态 JSON Schema

```json
{
  "project": "slug",
  "currentRound": 2,
  "auditRounds": [
    {
      "round": 1,
      "timestamp": "ISO8601",
      "renderContract": { "result": "pass|warn|fail", "hardGates": [], "warnings": [] },
      "auditAgent": { "result": "pass|warn|fail", "screenshotCount": 6 },
      "fixInstructions": []
    }
  ],
  "lastUpdated": "ISO8601"
}
```

### 验收检查表

- [ ] 时间线正确显示审计轮次
- [ ] 每轮显示时间戳、Render Contract 结果、Audit Agent 结果
- [ ] Gate 状态颜色正确（绿/红/黄）
- [ ] 点击 Gate 卡片展开详情
- [ ] Render Contract metrics 分组显示
- [ ] 修复指令列表可展开
- [ ] workbench-state.json 读写正常
- [ ] 关闭浏览器重新打开后状态恢复

---

## Loop 5: Bridge — render-audit 集成 + 文件监控

**目标**：一键审计 + 自动发现新项目 + HTTP Server 状态检测。

### 任务清单

| # | Task | 描述 | 输出 | 验证 |
|---|------|------|------|------|
| 5.1 | render-audit 集成 | Vite middleware 调用 render-audit.mjs | `bridge/audit-runner.ts` | 点击审计 → JSON 返回 |
| 5.2 | 一键审计按钮 | 预览页面添加"运行审计"按钮 | UI 更新 | 按钮 → 执行 → 状态更新 |
| 5.3 | 文件系统监控 | chokidar watch dist/ 目录 | `bridge/file-watcher.ts` | 新项目自动出现 |
| 5.4 | WebSocket 推送 | 文件变更事件推送到前端 | `server/ws-bridge.ts` | 变更后自动刷新 |
| 5.5 | HTTP Server 状态检测 | 检测 localhost:8000 可用性 | `bridge/server-check.ts` | 不可用时提示 |
| 5.6 | Vite middleware 整合 | 统一注册所有 middleware | `server/index.ts` | 所有 API 正常 |

### 验收检查表

- [ ] 点击"运行审计" → render-audit.mjs 执行 → JSON 返回
- [ ] 审计结果自动更新 Status 时间线和 Gate 卡片
- [ ] 新增 `dist/foo/index.html` 后导航栏自动出现
- [ ] 修改 index.html 后预览自动刷新
- [ ] 修改 annotations.json 后批注面板自动更新
- [ ] localhost:8000 不可用时显示提示
- [ ] 所有 middleware 统一注册，无冲突

---

## 技术决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 标注层注入 | iframe postMessage | 完全隔离，不污染被审计 HTML |
| 状态存储 | 文件系统 JSON | 简单、可调试、与现有工具链一致 |
| 目录位置 | workbench/ 子目录 | 独立于 .opencode/，职责清晰 |
| 前端框架 | Vanilla TS | 与文心"克制"哲学一致，零框架开销 |
| CSS 方案 | wenxin-tokens.css 直接引用 | 复用现有 Token，不复制 |

## 风险与缓解

| 风险 | 概率 | 缓解 |
|------|------|------|
| Vanilla TS 开发效率低 | 高 | 模块隔离清晰，每 loop 独立可测 |
| iframe 跨域 postMessage 失败 | 中 | Vite proxy 确保同源 |
| 缩放后坐标偏移 | 中 | iframe 内部坐标系处理 |
| render-audit.mjs ESM 调用 | 中 | spawn node + ESM flag |
| 文心 UI 开发超时 | 中 | 先最简 UI，后续打磨 |
| chokidar macOS 事件重复 | 中 | ignoreInitial + debounce |

## 开放问题

1. iframe 注入脚本方式：postMessage 配合 vs contentDocument 直接注入？
2. render-audit.mjs 调用方式：child_process.spawn vs 直接 import？
3. workbench/ 目录 git 策略：整体 track + node_modules 忽略？
4. 标注数据版本管理：sourceHash 不匹配时旧标注如何处理？
5. 截图是否在 Workbench 中内联展示？
