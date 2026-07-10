# Wanxing (万形) — Agent Instructions

> 万种形态，同出一源。以文心（Wenxin）为设计底座。

OpenCode 设计工程项目。用户描述需求 → Wenxin Agent 生成单文件 HTML → 多轮审计 → 交付。

## 快速上手

```bash
just serve            # dist/ 的本地 HTTP 服务器 (port 8000)
just workbench        # HTTP Server + Vite dev server (port 5173)
just workbench-full   # + OpenCode Serve (port 4096)
just validate         # 校验配置、目录、git whitespace
just audit dist/<slug>/index.html  # Render Contract 审计
```

**端口冲突**：HTTP 8000 / Vite 5173 / OpenCode Serve 4096。`just stop` 停 HTTP，`just opencode-stop` 停 Serve。

## 目录结构

```
wanxing/
├── opencode/              # Agent harness（文心规范、Agent 定义、工具）
│   ├── agents/            #   Meta / Wenxin / Audit 三个 Agent
│   ├── rules/             #   设计规范、审计协议、美学准则
│   ├── tokens/            #   CSS Token 体系
│   └── tools/             #   render-audit 等只读工具
├── workbench/             # Vite + TS 工作台 UI
│   ├── src/modules/       #   chat / annotate / preview / status
│   ├── src/shell/         #   layout / router
│   ├── server/            #   Vite 插件（scan / state / annotations / audit / ws-bridge）
│   └── bridge/            #   共享工具（audit-runner / file-watcher / slug）
├── dist/                  # 生成的 HTML 产出（gitignored，dist/.gitkeep 保留目录）
├── app/                   # 已确认的模板/应用（git 跟踪）
└── justfile               # 任务运行器
```

**关键区分**：`opencode/` 是文心设计语言的 Agent harness（规范 + Agent 定义），不是本项目的应用代码。`workbench/` 才是应用代码。

## Agent 架构

| Agent | 职责 | 位置 |
|-------|------|------|
| **Meta** | 需求理解、约束澄清、分发、合并审计 | `opencode/agents/meta/` |
| **Wenxin** | 文心设计执行 → HTML/CSS 输出到 dist/ | `opencode/agents/wenxin/` |
| **Audit** | Render Contract + 截图 + 动效多层审计 | `opencode/agents/audit/` |

**工作流**：用户需求 → Meta 理解 → Wenxin 生成 → Audit 审计 → Meta 合并 → 至少 3 轮修复循环后交付。

## 输出规则

- **所有设计产出** → `dist/<project-slug>/index.html`（单文件 HTML + 内联 CSS）
- **模板沉淀** → `app/<project-slug>/index.html`（仅用户明确要求时）
- **项目 slug**：小写 ASCII，只允许 `a-z`、`0-9`、`-`
- **Render Contract**：每个 HTML 必须内嵌 `wanxing-render-contract` JSON + `data-wanxing-profile`
- **动效信号**：含动效的 HTML 必须提供 `data-animations-complete` 截图等待信号
- **审计临时文件** → `dist/<project-slug>/tmp/`（禁止放根目录）

## Agent 行为约束

- **不修改 Rules/Agents**：常规设计任务中，`.opencode/rules/` 和 `.opencode/agents/` 是参考知识，不修改
- **Meta 不做设计**：Meta 只负责理解、澄清、分发、合并审计，不写 HTML/CSS
- **强制审计**：Wenxin 交付 HTML 后，Meta 必须触发审计，不可直接交付
- **至少三轮收敛**：初稿 → 修复 → 收敛，未满 3 轮不得最终交付
- **Render Contract 优先**：audit 前必须运行 Render Contract 审计；hard gate 失败时先修复

## Workbench 架构

Vanilla TypeScript + Vite，无框架。模块通过 `init*` / `destroy*` 管理生命周期，使用模块级单例状态。

| 模块 | 职责 | 关键 API |
|------|------|----------|
| `chat` | Agent 对话、SSE 流式消息 | `initChat`, `sendMessage`, `loadSessions` |
| `annotate` | 视觉批注 overlay | `initAnnotate`, `toggleAnnotateMode`, `getAnnotations` |
| `preview` | iframe 预览 + viewport | `initPreview` |
| `status` | 审计时间线 + Gate 卡片 | `addAuditRound` |

**模块连接**：
- `chat` → OpenCode SDK (`@opencode-ai/sdk`) → `client.session.promptAsync()` + SSE
- `prompt-builder` → 将 `Annotation[]` 转为结构化 prompt 发送给 Agent
- `preview` → iframe 加载 `dist/<slug>/index.html`，通过 Vite proxy 访问 HTTP 8000
- `router` → hash 路由 `#/project/<slug>` 管理 preview → annotate → status 生命周期

**Vite 代理**：
- `/dist` → `localhost:8000`（HTML 预览）
- `/api/opencode` → `localhost:4096`（OpenCode Serve API）

## 文心设计语言

9 种正式输出形态（F1-F9），不继续扩张：

| 编号 | 形态 | 说明 |
|------|------|------|
| F1 | Web | 响应式网站，暗色模式就绪 |
| F2 | Mobile | iOS / Android 适配 |
| F3 | Brand | Logo + 品牌视觉 |
| F4 | Print | 书籍、论文、杂志 |
| F5 | Presentation | 幻灯片、路演 |
| F6 | Documentation | API 文档、Wiki |
| F7 | Poster | 海报、封面 |
| F8 | Diagram | 架构图、流程图 |
| F9 | Report | Markdown → LaTeX → PDF |

**设计哲学**：文字即界面、留白即设计、克制即力量。无装饰阴影、无渐变、无填充色按钮。

**规范参考**：`opencode/rules/wenxin-spec.md`（总览）、`opencode/agents/wenxin/design.md`（核心规范）

## 当前状态与已知问题

Workbench 正在进行架构转型（见 `TRANSFORM-PLAN.md` / `TRANSFORM-PLAN-v2.md`）。

**已知致命问题**（v2 诊断）：
- C-1: 标注注入机制不工作 — `getInjectionScript()` 从未注入到 iframe HTML
- C-2: OpenCode Serve 未运行时聊天静默失败，无错误提示
- C-3: 消息不持久化 — 刷新页面消息全丢
- C-4: 布局混乱 — 功能堆砌在底部面板

**转型方向**：左右栏布局（Chat 左 + Preview 右）、统一 SSE（移除 WebSocket 冗余）、Vite middleware 注入标注脚本。

## 技术栈

- **运行时**：Bun（原生 TS，无 Node.js 依赖）
- **构建**：Vite 6 + TypeScript 5
- **前端**：Vanilla TS，零框架
- **包管理**：bun.lock（workbench/）、npm（opencode/）
- **MCP 工具**：Playwright（headless 截图/审计）
- **无测试套件**：当前无 `*.test.*` 或 `*.spec.*` 文件

## 参考文件

| 文件 | 内容 |
|------|------|
| `opencode/AGENTS.md` | Agent harness 完整文档 |
| `opencode/rules/wenxin-spec.md` | 文心设计规范总览 |
| `opencode/agents/wenxin/design.md` | 核心设计规范 |
| `opencode/rules/audit-protocol.md` | 美学审计协议 |
| `opencode/rules/modern-aesthetics.md` | 34 条美学准则 |
| `TRANSFORM-PLAN.md` | 架构转型计划 v1 |
| `TRANSFORM-PLAN-v2.md` | 改进计划 v2（问题诊断 + 分阶段方案） |
| `README.md` | 项目概述 |
