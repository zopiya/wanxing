# 万形 Workbench Spec Tasks

> 基于 TRANSFORM-PLAN.md 的可执行任务拆分
> Version: 1.0.0 | 2026-05-27

---

## 使用方式

每个 Task 是一个独立的、可测试的工作单元。按 Phase 顺序执行，每个 Task 完成后应能独立验证。

**任务格式**：
- `ID` — 唯一标识
- `标题` — 一句话描述
- `输入` — 开始前需要什么
- `输出` — 完成后交付什么
- `验收` — 如何验证完成
- `文件` — 涉及的文件路径

---

## Phase 0: Bun 迁移 + 项目清理

> 目标：运行时切换到 Bun，清理废弃文件。预计 0.5 天。

### T0.1 — Bun 安装验证

- **输入**：macOS 环境
- **输出**：`bun --version` 返回版本号
- **验收**：`bun --version` ≥ 1.1.0
- **文件**：无（环境准备）

### T0.2 — justfile 迁移到 Bun

- **输入**：现有 justfile（使用 npm/node）
- **输出**：justfile 所有命令使用 bun
- **验收**：
  - `just workbench` 启动成功
  - `just audit dist/fixture-no-animation/index.html` 返回 JSON
  - `just validate` 通过
- **文件**：`justfile`
- **变更**：
  ```
  npm run dev → bun run dev
  node .opencode/tools/... → bun run .opencode/tools/...
  ```

### T0.3 — workbench/package.json 更新

- **输入**：现有 package.json（无 @types/bun）
- **输出**：package.json 包含 @types/bun
- **验收**：`bun install` 成功，无报错
- **文件**：`workbench/package.json`
- **变更**：添加 `@types/bun` 到 devDependencies

### T0.4 — tsconfig.json 类型切换

- **输入**：现有 tsconfig.json（types: ["node"]）
- **输出**：types 改为 ["bun"]
- **验收**：`cd workbench && bunx tsc --noEmit` 零错误
- **文件**：`workbench/tsconfig.json`

### T0.5 — audit-runner Bun 兼容

- **输入**：现有 audit-runner.ts（spawn 'node'）
- **输出**：spawn 改为 'bun'
- **验收**：`just audit dist/fixture-no-animation/index.html` 返回 JSON
- **文件**：`workbench/bridge/audit-runner.ts`
- **变更**：`spawn('node', [...])` → `spawn('bun', ['run', ...])`

### T0.6 — 清理废弃文件

- **输入**：PRD.md（空）、docs/（几乎空）
- **输出**：文件删除
- **验收**：`ls PRD.md docs/` 报错 "No such file"
- **文件**：`PRD.md`（删除）、`docs/`（删除）

### T0.7 — Phase 0 集成验证

- **输入**：T0.1-T0.6 全部完成
- **输出**：workbench 正常运行
- **验收**：
  1. `just workbench` 启动无报错
  2. `localhost:5173` 显示文心风格界面
  3. 左侧导航栏显示 dist/ 下项目
  4. 点击项目可预览
  5. `bunx tsc --noEmit` 零错误

---

## Phase 1: OpenCode Serve 集成

> 目标：Workbench 能连接 OpenCode Serve、管理会话、发送 prompt、接收 SSE。预计 2-3 天。

### T1.1 — OpenCode Serve 启动任务

- **输入**：opencode CLI 已安装
- **输出**：justfile 添加 `opencode-serve` 任务
- **验收**：
  - `just opencode-serve` 启动 OpenCode Serve 在 port 4096
  - `curl http://127.0.0.1:4096/session` 返回 JSON
- **文件**：`justfile`
- **新增任务**：
  ```justfile
  opencode-serve:
      @opencode serve --port=4096 &
      @sleep 2
      @curl -s http://127.0.0.1:4096/session >/dev/null && echo "OpenCode Serve ready on :4096"
  ```

### T1.2 — just workbench 完整启动

- **输入**：T1.1 完成
- **输出**：`just workbench` 启动全部三个服务
- **验收**：
  - HTTP Server (port 8000) 运行
  - OpenCode Serve (port 4096) 运行
  - Vite Dev Server (port 5173) 运行
  - 一条命令全部启动
- **文件**：`justfile`
- **变更**：`workbench` 任务依赖 `serve` + `opencode-serve`

### T1.3 — OpenCode Proxy Vite 插件

- **输入**：OpenCode Serve 在 4096 运行
- **输出**：Vite 插件将 `/api/opencode/*` 代理到 `:4096`
- **验收**：
  - 浏览器访问 `localhost:5173/api/opencode/session` 返回会话列表 JSON
  - SSE 连接不被中断
- **文件**：`workbench/server/opencode-proxy.ts`（新建）、`workbench/server/index.ts`（更新导出）、`workbench/vite.config.ts`（注册插件）
- **技术要点**：
  - 使用 `http-proxy` 或 Vite 内置 proxy
  - SSE 需要 `onProxyRes` 设置 `Cache-Control: no-cache`
  - pathRewrite: `/api/opencode` → ``

### T1.4 — 浏览器端 SDK 客户端

- **输入**：T1.3 完成，proxy 可用
- **输出**：浏览器端封装 OpenCode SDK 客户端
- **验收**：
  - `import { opencodeClient } from './lib/opencode-client'`
  - `opencodeClient.session.list()` 返回会话列表
  - 所有请求通过 `/api/opencode/*` proxy
- **文件**：`workbench/src/lib/opencode-client.ts`（新建）
- **技术要点**：
  - 使用 `@opencode-ai/sdk` 的 `createOpencodeClient`
  - baseUrl 设为 `/api/opencode`
  - 错误处理：Serve 不可用时返回友好错误

### T1.5 — Chat 模块骨架

- **输入**：T1.4 完成
- **输出**：Chat 模块基础结构，显示在 Shell 布局中
- **验收**：
  - 底部出现 Chat 面板（可折叠）
  - 面板内有消息区域 + 输入框
  - 输入框可输入文字
- **文件**：
  - `workbench/src/modules/chat/index.ts`（新建）
  - `workbench/src/modules/chat/types.ts`（新建）
  - `workbench/src/modules/chat/chat.css`（新建）
  - `workbench/src/shell/layout.ts`（更新，添加 Chat 面板容器）
  - `workbench/src/main.ts`（更新，初始化 Chat）

### T1.6 — 会话列表

- **输入**：T1.5 完成
- **输出**：Chat 面板侧边栏显示 OpenCode 会话列表
- **验收**：
  - 调用 `GET /api/opencode/session` 获取会话列表
  - 列表显示会话 ID、创建时间、状态
  - 点击会话可切换
  - 「新建会话」按钮可创建
- **文件**：`workbench/src/modules/chat/session-list.ts`（新建）

### T1.7 — Prompt 发送

- **输入**：T1.6 完成
- **输出**：输入框可发送 prompt 到当前会话
- **验收**：
  - 输入文字，按 Enter 或点击发送
  - 调用 `POST /api/opencode/session/{id}/prompt/async`
  - 发送后输入框清空
  - 用户消息显示在消息区域
- **文件**：`workbench/src/modules/chat/prompt-input.ts`（新建）

### T1.8 — SSE 事件订阅

- **输入**：T1.3 完成
- **输出**：浏览器订阅 OpenCode SSE 事件流
- **验收**：
  - 连接到 `/api/opencode/event/subscribe`
  - 收到 `EventMessagePartUpdated` 时打印到 console
  - 收到 `EventFileEdited` 时打印到 console
  - 断连后自动重连（指数退避）
- **文件**：`workbench/src/modules/chat/sse-stream.ts`（新建）

### T1.9 — Phase 1 集成验证

- **输入**：T1.1-T1.8 全部完成
- **输出**：端到端会话流程可用
- **验收**：
  1. `just workbench` 一条命令启动全部
  2. 浏览器打开 `localhost:5173`
  3. 底部 Chat 面板显示会话列表
  4. 创建新会话，输入 "hello"
  5. 收到 Agent 响应（SSE 事件到达）
  6. 预览器正常工作（与 Chat 无关的功能不受影响）

---

## Phase 2: Chat + Preview 联动

> 目标：Agent 输出流式显示、预览自动刷新、标注→prompt 转换。预计 3-4 天。

### T2.1 — 消息流式渲染

- **输入**：T1.8 SSE 可用
- **输出**：Agent 输出实时显示在消息区域
- **验收**：
  - `EventMessagePartUpdated` 触发消息增量更新
  - 消息支持 markdown 渲染（标题、列表、代码块）
  - 代码块有语法高亮（暖色调）
  - 思考过程可折叠显示
- **文件**：`workbench/src/modules/chat/message-area.ts`（新建）

### T2.2 — 预览自动刷新

- **输入**：T1.8 SSE 可用，Preview 模块已有 reload()
- **输出**：Agent 修改文件后预览自动刷新
- **验收**：
  - 监听 `EventFileEdited` 事件
  - 检查编辑文件路径是否匹配当前预览 slug
  - 匹配时调用 `previewViewer.reload()`
  - 刷新有 500ms 防抖（避免连续多次刷新）
- **文件**：`workbench/src/modules/chat/sse-stream.ts`（更新）、`workbench/src/modules/preview/index.ts`（更新）

### T2.3 — Prompt Builder

- **输入**：Annotate 模块已有 annotations JSON
- **输出**：标注数据转换为结构化 prompt
- **验收**：
  - 输入 `Annotation[]`，输出 string
  - 包含：位置（selector）、区域（rect）、批注文字、severity
  - 附加：目标文件路径、文心规范提示
  - 格式清晰可读
- **文件**：`workbench/src/lib/prompt-builder.ts`（新建）
- **示例输出**：
  ```
  ## 视觉批注
  
  ### 批注 #1 [critical]
  - 位置: header > h1.title
  - 区域: (120, 80, 400, 60)
  - 批注: "标题字号太大，应该用 3xl"
  
  请根据以上批注修改 dist/my-project/index.html。
  ```

### T2.4 — 标注面板「发送给 Agent」按钮

- **输入**：T2.3 完成，T1.7 prompt 发送可用
- **输出**：标注面板新增「发送给 Agent」按钮
- **验收**：
  - 按钮出现在标注面板底部
  - 点击后调用 `prompt-builder` 转换标注
  - 转换后的 prompt 发送到当前会话
  - 发送后显示成功提示
  - 无标注时按钮禁用
- **文件**：`workbench/src/modules/annotate/annotation-panel.ts`（更新）、`workbench/src/modules/annotate/index.ts`（更新）

### T2.5 — 完整对话循环验证

- **输入**：T2.1-T2.4 全部完成
- **输出**：标注→prompt→Agent→预览 刷新的完整循环
- **验收**：
  1. 打开一个项目预览
  2. 在预览上添加 2 个标注
  3. 点击「发送给 Agent」
  4. Agent 响应流式显示在 Chat
  5. Agent 修改文件后预览自动刷新
  6. 新预览反映修改结果

---

## Phase 3: 视觉反馈循环

> 目标：截图对比、审计可视化、完整闭环。预计 3-4 天。

### T3.1 — 截图触发

- **输入**：OpenCode Serve 可用，Playwright MCP 已配置
- **输出**：通过 OpenCode 触发 Playwright 截图
- **验收**：
  - Chat 中输入 "截图" 或点击截图按钮
  - 发送 prompt: "使用 Playwright 截取 dist/{slug}/index.html"
  - 截图保存到 `dist/{slug}/tmp/screenshots/`
  - 截图完成后在 Chat 中显示
- **文件**：`workbench/src/modules/chat/prompt-input.ts`（更新）

### T3.2 — 截图展示

- **输入**：T3.1 完成
- **输出**：截图在 Chat 和标注面板中内联显示
- **验收**：
  - 截图作为图片显示在消息区域
  - 点击截图可放大
  - 标注面板可关联截图
- **文件**：`workbench/src/modules/chat/message-area.ts`（更新）

### T3.3 — Before/After 对比

- **输入**：T3.2 完成
- **输出**：迭代前后截图并排对比
- **验收**：
  - 每次 Agent 修改后自动保存修改前截图
  - 修改后自动截取新截图
  - 两截图并排显示在 Chat 中
  - 用户可直观看到变化
- **文件**：`workbench/src/modules/chat/message-area.ts`（更新）

### T3.4 — 审计可视化增强

- **输入**：现有 Status 模块
- **输出**：审计结果与标注关联
- **验收**：
  - 审计 Gate 卡片可点击
  - 点击后高亮对应的标注区域
  - 审计截图在浏览器内显示
- **文件**：`workbench/src/modules/status/gate-card.ts`（更新）、`workbench/src/modules/status/contract-panel.ts`（更新）

### T3.5 — 完整闭环验证

- **输入**：T3.1-T3.4 全部完成
- **输出**：完整的设计迭代闭环
- **验收**：
  1. 新建会话，描述需求
  2. Agent 生成 HTML → 预览显示
  3. 用户标注问题 → 发送给 Agent
  4. Agent 修改 → 预览刷新 → 截图对比
  5. 用户继续标注 → 循环
  6. 审计通过 → Gate 全绿

---

## Phase 4: 打磨

> 目标：快捷键、暗色模式、性能、错误恢复。预计 2-3 天。

### T4.1 — 键盘快捷键

- **输入**：所有模块可用
- **输出**：全局键盘快捷键
- **验收**：
  - `Cmd+Enter` — 发送 prompt
  - `Cmd+J` — 切换 Chat 面板
  - `Cmd+Shift+A` — 切换标注模式
  - `Escape` — 关闭当前面板/弹窗
  - 快捷键不与浏览器/系统冲突
- **文件**：`workbench/src/main.ts`（更新）

### T4.2 — Workbench 暗色模式

- **输入**：现有文心 Token 暗色映射
- **输出**：Workbench 自身支持暗色模式
- **验收**：
  - 跟随系统 `prefers-color-scheme`
  - 所有面板暗色适配
  - 与预览区暗色模式独立控制
- **文件**：`workbench/src/styles/main.css`（更新）、各模块 CSS（更新）

### T4.3 — 性能优化

- **输入**：所有模块可用
- **输出**：关键性能优化
- **验收**：
  - Chat 消息 > 100 条时懒加载
  - SSE 高频消息合并（16ms debounce）
  - iframe 懒加载（仅选中项目时加载）
  - 首屏加载 < 1s
- **文件**：多个文件

### T4.4 — 错误恢复

- **输入**：所有模块可用
- **输出**：关键错误路径有恢复机制
- **验收**：
  - OpenCode Serve 断连 → 自动重连 + 状态提示
  - SSE 断连 → 指数退避重连
  - Agent 超时 → 提示用户重试
  - 预览加载失败 → 显示错误信息 + 重试按钮
- **文件**：`workbench/src/modules/chat/sse-stream.ts`（更新）、`workbench/src/lib/opencode-client.ts`（更新）

---

## 任务依赖图

```
Phase 0 (Bun 迁移)
  T0.1 → T0.2 → T0.3 → T0.4 → T0.5 → T0.6 → T0.7
                                                    │
Phase 1 (OpenCode 集成)                              │
  T1.1 → T1.2 → T1.3 → T1.4 → T1.5 → T1.6 ────────┤
                    │              └→ T1.7 → T1.8 → T1.9
                    │                               │
Phase 2 (Chat + Preview)                             │
  T2.1 ← T1.8  T2.2 ← T1.8                        │
  T2.3 (独立)   T2.4 ← T2.3 + T1.7                 │
  T2.5 ← T2.1 + T2.2 + T2.4                        │
                                                    │
Phase 3 (视觉反馈)                                   │
  T3.1 → T3.2 → T3.3                               │
  T3.4 (独立)   T3.5 ← T3.1-T3.4                   │
                                                    │
Phase 4 (打磨)                                       │
  T4.1, T4.2, T4.3, T4.4 (可并行)                   │
```

---

## 附录：新建文件清单

| 文件 | Phase | 说明 |
|------|-------|------|
| `server/opencode-proxy.ts` | 1 | Vite proxy 插件 |
| `src/lib/opencode-client.ts` | 1 | SDK 客户端 |
| `src/lib/prompt-builder.ts` | 2 | 标注→prompt |
| `src/modules/chat/index.ts` | 1 | Chat 模块入口 |
| `src/modules/chat/types.ts` | 1 | Chat 类型 |
| `src/modules/chat/session-list.ts` | 1 | 会话列表 |
| `src/modules/chat/message-area.ts` | 2 | 消息区域 |
| `src/modules/chat/prompt-input.ts` | 1 | 输入框 |
| `src/modules/chat/sse-stream.ts` | 1 | SSE 事件处理 |
| `src/modules/chat/chat.css` | 1 | Chat 样式 |

## 附录：修改文件清单

| 文件 | Phase | 变更 |
|------|-------|------|
| `justfile` | 0,1 | Bun 迁移 + opencode-serve 任务 |
| `package.json` | 0 | 添加 @types/bun |
| `tsconfig.json` | 0 | types: ["bun"] |
| `bridge/audit-runner.ts` | 0 | spawn 改用 bun |
| `vite.config.ts` | 1 | 注册 opencode-proxy 插件 |
| `server/index.ts` | 1 | 导出 opencode-proxy |
| `src/shell/layout.ts` | 1 | 添加 Chat 面板容器 |
| `src/main.ts` | 1,4 | 初始化 Chat + 快捷键 |
| `src/modules/preview/index.ts` | 2 | 暴露 reload 给 SSE |
| `src/modules/annotate/annotation-panel.ts` | 2 | 添加「发送给 Agent」按钮 |
| `src/modules/annotate/index.ts` | 2 | 集成 prompt-builder |
| `src/modules/status/gate-card.ts` | 3 | 标注关联 |
| `src/styles/main.css` | 4 | 暗色模式 |

---

> Version: 1.0.0 | 2026-05-27
