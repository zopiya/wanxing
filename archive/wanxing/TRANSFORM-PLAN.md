# 万形 Workbench 架构转型计划

> Version: 1.0.0 | 2026-05-27 | Wanxing Transform

---

## 1. 愿景与目标

### 终态用户体验

设计师在浏览器中打开 Workbench，左侧是项目列表和 Agent 会话面板，右侧是 HTML 预览区。他点击页面上的元素添加视觉批注（"这里的间距太大"、"标题应该用砖红色"），然后点击「发送给 Agent」——批注被自动转换为结构化 prompt，通过 OpenCode REST API 发送给 Wenxin Agent。Agent 的思考过程和代码变更实时流式显示在底部聊天区。当 Agent 修改了 HTML 文件，预览区自动刷新，设计师立即看到效果。如果效果不满意，他继续标注、继续迭代。整个过程不需要离开浏览器，不需要打开终端，不需要理解任何技术概念。

### 5 个成功标准

| # | 标准 | 验证方式 |
|---|------|----------|
| 1 | **零终端操作** | 设计师从打开 Workbench 到完成设计迭代，全程不需要打开终端或输入命令 |
| 2 | **标注→修复 < 30 秒** | 从添加视觉批注到 Agent 开始处理，端到端延迟 < 30 秒 |
| 3 | **实时反馈** | Agent 的思考过程、代码变更、预览刷新全部实时可见，无手动刷新 |
| 4 | **单命令启动** | `just workbench` 一条命令启动所有服务（HTTP Server + OpenCode Serve + Vite） |
| 5 | **Bun 原生运行** | 全部使用 Bun 运行时，无 Node.js 依赖 |

---

## 2. 现状评估

### 已构建（可复用）

| 模块 | 文件 | 状态 | 说明 |
|------|------|------|------|
| **Shell 布局** | `src/shell/layout.ts`, `layout.css` | ✅ 完整 | 左侧导航 + 右侧内容区 + 状态栏，文心风格 |
| **Hash 路由** | `src/shell/router.ts` | ✅ 完整 | `#/project/<slug>` 路由，模块生命周期管理 |
| **Preview 模块** | `src/modules/preview/*` | ✅ 完整 | iframe 预览器 + viewport 切换 + 暗色模式 + 缩放适配 |
| **Annotate 模块** | `src/modules/annotate/*` | ✅ 完整 | 注入器 + 检查器 + 框选 + 批注面板 + 持久化 + JSON 导出 |
| **Status 模块** | `src/modules/status/*` | ✅ 完整 | 时间线 + Gate 卡片 + Contract 面板 + 持久化 |
| **Vite Plugins** | `server/*` | ✅ 完整 | scan / state / annotations / audit / ws-bridge 五个插件 |
| **Bridge 工具** | `bridge/*` | ✅ 完整 | audit-runner / file-watcher / server-check / post-message |
| **WebSocket 实时** | `ws-client.ts`, `server/ws-bridge.ts` | ✅ 完整 | 文件变更 → WebSocket 推送 → 前端自动刷新 |
| **文心样式** | `src/styles/*` | ✅ 完整 | Token 集成 + 组件样式 |

### 未构建（核心差距）

| 模块 | 状态 | 说明 |
|------|------|------|
| **Chat 模块** | ❌ | Agent 对话界面、消息流、prompt 发送 |
| **OpenCode 集成** | ❌ | SDK 客户端、会话管理、SSE 事件订阅 |
| **标注→Prompt 转换** | ❌ | 批注数据 → 结构化 prompt 的转换管线 |

### 关键差距图

```
当前：Browser ←→ Vite Server ←→ (spawn render-audit.mjs)
                                    ↑ 只能审计，不能对话

目标：Browser ←→ Vite Server ←→ OpenCode Serve (port 4096)
                                    ↑ 完整 Agent 能力：对话、文件操作、MCP、SSE
```

---

## 3. 重新设计的架构

### 3.1 旧方案 vs 新方案

| 维度 | 旧方案（已废弃） | 新方案 |
|------|-----------------|--------|
| **Agent 通信** | `child_process.spawn` + ANSI 解析 | OpenCode Serve REST API + SSE |
| **实时性** | 轮询 stdout | SSE `EventMessagePartUpdated` 流式推送 |
| **会话管理** | 无 | REST `/session` CRUD |
| **文件操作** | 直接文件系统 | REST `/file/read` + `/file/list` |
| **MCP 集成** | 无 | REST `/mcp/status` + Agent 内置 MCP |
| **可靠性** | 进程崩溃、ANSI 解析失败 | HTTP 标准协议，错误码清晰 |
| **开发复杂度** | 高（进程管理、输出解析、错误恢复） | 低（标准 REST + SSE） |

### 3.2 新架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │  Shell    │ │ Preview  │ │ Annotate │ │  Chat (NEW)      ││
│  │  Layout   │ │ iframe   │ │ overlay  │ │  messages/typing ││
│  │  Router   │ │ viewport │ │ panel    │ │  prompt sender   ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘│
│       │             │            │              │             │
│       └─────────────┴────────────┴──────────────┘             │
│                          │                                    │
│                   ┌──────┴───────┐                            │
│                   │  SDK Client  │  (createOpencodeClient)    │
│                   │  via proxy   │                            │
│                   └──────┬───────┘                            │
└──────────────────────────┼───────────────────────────────────┘
                           │ HTTP / SSE
┌──────────────────────────┼───────────────────────────────────┐
│                   Vite Dev Server (:5173)                     │
│                   ┌──────┴───────┐                            │
│                   │ Proxy Plugin │  /api/opencode/*            │
│                   │              │  → http://127.0.0.1:4096/* │
│                   └──────┬───────┘                            │
│  ┌──────────┐ ┌──────────┴──┐ ┌──────────┐                   │
│  │ scan     │ │ opencode    │ │ ws-bridge│  (保留)            │
│  │ state    │ │ proxy(NEW)  │ │          │                    │
│  │ annot.   │ │             │ │          │                    │
│  │ audit    │ └─────────────┘ └──────────┘                    │
│  └──────────┘                                                 │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP / SSE
┌──────────────────────────┼───────────────────────────────────┐
│                OpenCode Serve (:4096)                         │
│  ┌──────────┐ ┌──────────┴────────┐ ┌──────────┐             │
│  │ Session  │ │ Agent Runtime     │ │ MCP      │             │
│  │ Manager  │ │ (meta/wenxin/     │ │ Playwright│             │
│  │          │ │  audit/debug)     │ │ Synapse  │             │
│  └──────────┘ └───────────────────┘ └──────────┘             │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 核心 API 端点

| 类别 | 端点 | 方法 | 用途 |
|------|------|------|------|
| 会话 | `/session` | GET/POST | 列出/创建会话 |
| 会话 | `/session/{id}` | GET/DELETE | 获取/删除会话 |
| 会话 | `/session/{id}/messages` | GET | 消息列表 |
| 会话 | `/session/{id}/prompt` | POST | 发送 prompt（同步） |
| 会话 | `/session/{id}/prompt/async` | POST | 发送 prompt（异步） |
| 事件 | `/event/subscribe` | SSE | 实时事件流 |
| 文件 | `/file/read` | POST | 读取文件 |
| 项目 | `/project/current` | GET | 当前项目 |
| MCP | `/mcp/status` | GET | MCP 状态 |

### 3.4 SSE 事件类型

| 事件 | 触发时机 | Workbench 响应 |
|------|----------|----------------|
| `EventMessagePartUpdated` | Agent 输出流式更新 | 追加到聊天消息区 |
| `EventFileEdited` | Agent 修改了文件 | 刷新预览 iframe |
| `EventSessionIdle` | 会话处理完成 | 显示完成状态 |
| `EventSessionError` | 会话出错 | 显示错误信息 |
| `EventTodoUpdated` | 任务列表变化 | 更新任务面板 |

### 3.5 标注→Prompt 转换管线

```
用户在预览区添加批注
       ↓
Annotations 数据 (JSON)
       ↓
转换为结构化 Prompt：
  ┌─────────────────────────────────────┐
  │ ## 视觉批注                          │
  │                                     │
  │ ### 批注 #1 [critical]              │
  │ - 位置: header > h1.title           │
  │ - 区域: (120, 80, 400, 60)          │
  │ - 批注: "标题字号太大，应该用 3xl"    │
  │                                     │
  │ ### 批注 #2 [warning]               │
  │ - 位置: .content > p                │
  │ - 区域: (50, 200, 600, 100)         │
  │ - 批注: "行高太紧，需要 1.85"        │
  │                                     │
  │ 请根据以上批注修改 dist/{slug}/       │
  │ index.html，保持文心设计语言规范。     │
  └─────────────────────────────────────┘
       ↓
POST /session/{id}/prompt
       ↓
Agent 处理 → SSE 流式返回 → 预览自动刷新
```

---

## 4. Bun + TypeScript 迁移

### 4.1 为什么选 Bun

| 维度 | Node.js | Bun |
|------|---------|-----|
| 安装速度 | npm ~15s | bun ~2s |
| 启动速度 | ~200ms | ~50ms |
| TypeScript | 需要 tsx/ts-node | 原生支持 |
| 工具链 | node + npm + tsc | bun（all-in-one） |
| 兼容性 | — | 所有当前依赖兼容 |

### 4.2 迁移步骤（3-4 个文件，约 15 分钟）

**文件 1：`justfile`**
```diff
- cd workbench && npm run dev
+ cd workbench && bun run dev

- node .opencode/tools/render-audit/render-audit.mjs {{file}}
+ bun run .opencode/tools/render-audit/render-audit.mjs {{file}}
```

**文件 2：`workbench/package.json`**
```diff
  "devDependencies": {
    "@types/node": "^25.9.1",
+   "@types/bun": "^1.0.0",
    ...
  }
```

**文件 3：`workbench/tsconfig.json`**
```diff
  "compilerOptions": {
-   "types": ["node"],
+   "types": ["bun"],
    ...
  }
```

**文件 4：`workbench/bridge/audit-runner.ts`**（可选）
```diff
- spawn('node', [AUDIT_SCRIPT, inputFile], { ... })
+ spawn('bun', ['run', AUDIT_SCRIPT, inputFile], { ... })
```

---

## 5. 项目结构调整

### 5.1 清理

- 删除 `PRD.md`（空文件）
- 删除 `docs/`（几乎为空）
- `DEV-PLAN.md` 标记为 superseded（内容已合并到本文件）

### 5.2 新增目录

```
workbench/
├── server/
│   └── opencode-proxy.ts      ← 新建：Vite proxy 到 OpenCode Serve
├── src/
│   ├── lib/
│   │   ├── opencode-client.ts ← 新建：SDK 客户端
│   │   └── prompt-builder.ts  ← 新建：标注→prompt 转换
│   └── modules/
│       └── chat/              ← 新建：Chat 模块
│           ├── index.ts
│           ├── session-list.ts
│           ├── message-area.ts
│           ├── prompt-input.ts
│           ├── sse-stream.ts
│           ├── types.ts
│           └── chat.css
```

---

## 6. 分阶段实施计划

### Phase 0: Bun 迁移 + 项目整理（0.5 天）

**目标**：运行时切换到 Bun，清理废弃文件。

**交付物**：
- [ ] `justfile` 使用 `bun run`
- [ ] `workbench/package.json` 添加 `@types/bun`
- [ ] `workbench/tsconfig.json` types 改为 `bun`
- [ ] 删除 `PRD.md`、`docs/`
- [ ] 验证 `bun run dev` 正常

**依赖**：无
**工作量**：0.5 天

---

### Phase 1: OpenCode Serve 集成（2-3 天）

**目标**：Workbench 能连接 OpenCode Serve、管理会话、发送 prompt、接收 SSE。

**交付物**：
- [ ] `justfile` 添加 `opencode-serve` 任务（自动启动 `opencode serve --port=4096`）
- [ ] `server/opencode-proxy.ts` — Vite proxy 插件（`/api/opencode/*` → `:4096`）
- [ ] `src/lib/opencode-client.ts` — 浏览器端 SDK 客户端
- [ ] `modules/chat/` — Chat 模块骨架（会话列表 + 消息区域 + 输入框）
- [ ] SSE 事件订阅基础架构

**关键实现**：
- `just workbench` 自动启动 HTTP Server + OpenCode Serve + Vite
- Vite proxy 特殊处理 SSE 长连接（keep-alive）
- 浏览器通过 `/api/opencode/*` 间接访问 OpenCode Serve

**依赖**：Phase 0
**工作量**：2-3 天

---

### Phase 2: Chat + Preview 联动（3-4 天）

**目标**：Agent 输出流式显示、预览自动刷新、标注→prompt 转换。

**交付物**：
- [ ] 结构化聊天 UI（markdown 渲染、代码高亮、思考过程折叠）
- [ ] SSE `EventMessagePartUpdated` → 流式追加消息
- [ ] SSE `EventFileEdited` → 预览 iframe 自动刷新
- [ ] `src/lib/prompt-builder.ts` — 标注数据 → 结构化 prompt
- [ ] 标注面板「发送给 Agent」按钮

**核心流程**：
```
标注 → prompt-builder → POST /session/{id}/prompt → Agent 处理
  → SSE EventMessagePartUpdated → 聊天区流式更新
  → SSE EventFileEdited → 预览自动刷新
```

**依赖**：Phase 1
**工作量**：3-4 天

---

### Phase 3: 视觉反馈循环（3-4 天）

**目标**：完整的「标注→修复→预览→re-annotate」闭环。

**交付物**：
- [ ] 通过 OpenCode 触发 Playwright MCP 截图
- [ ] 截图 before/after 对比
- [ ] 审计报告可视化（Gate 卡片链接到标注）
- [ ] 完整循环验证

**依赖**：Phase 2
**工作量**：3-4 天

---

### Phase 4: 打磨（2-3 天）

**目标**：快捷键、暗色模式、性能、错误恢复。

**交付物**：
- [ ] 键盘快捷键（Cmd+K 搜索、Cmd+Enter 发送、Esc 关闭）
- [ ] Workbench 暗色模式
- [ ] 性能优化（消息懒加载、SSE 防抖）
- [ ] 错误恢复（SSE 断连重连、Serve 不可用提示）

**依赖**：Phase 3
**工作量**：2-3 天

---

### 总览

| Phase | 内容 | 工作量 | 累计 |
|-------|------|--------|------|
| 0 | Bun 迁移 + 清理 | 0.5 天 | 0.5 天 |
| 1 | OpenCode Serve 集成 | 2-3 天 | 2.5-3.5 天 |
| 2 | Chat + Preview 联动 | 3-4 天 | 5.5-7.5 天 |
| 3 | 视觉反馈循环 | 3-4 天 | 8.5-11.5 天 |
| 4 | 打磨 | 2-3 天 | 10.5-14.5 天 |

**总计：约 2-3 周**

---

## 7. 关键技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| OpenCode 集成 | SDK (`@opencode-ai/sdk`) + Vite proxy | 类型安全，SSE 原生支持，已有 SDK |
| 代理策略 | `/api/opencode/*` → `:4096` | 避免 CORS，统一入口 |
| 标注方案 | 保留现有 DOM overlay | 已完整实现，不污染 iframe |
| 前端框架 | Vanilla TS | 克制哲学，零框架开销 |
| 运行时 | Bun | 更快、更简单、原生 TS |

---

## 8. 风险与缓解

| 风险 | 概率 | 影响 | 缓解 |
|------|------|------|------|
| OpenCode Serve API 不稳定 | 低 | 高 | SDK 有 fetch fallback |
| SSE 被代理中断 | 中 | 中 | Vite proxy 配置 keep-alive + 客户端自动重连 |
| SDK 功能不完整 | 中 | 中 | 降级到原始 fetch 调用 |
| Bun 兼容性 | 低 | 低 | 所有依赖已验证兼容 |
| 标注→prompt 质量 | 中 | 中 | 迭代优化 prompt 模板 |

---

## 9. 开放问题

1. **Chat 面板位置**：底部（终端风格）还是右侧（IDE 风格）？→ 建议底部，可拖拽调整高度
2. **多会话支持**：Phase 1 先单会话，Phase 4 再考虑多会话
3. **render-audit.mjs 保留**：保留作为快速机器审计，与 Agent 审计互补
4. **标注持久化**：保持文件系统方案（annotations.json），不增加 Synapse 依赖

---

> Version: 1.0.0 | 2026-05-27
