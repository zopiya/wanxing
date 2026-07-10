# 万形 · Wanxing (文心)

> 文字即界面，留白即设计，克制即力量。

万形是一个专注于文心（Wenxin）设计语言的 OpenCode 设计工程项目。进入 wanxing 目录后，opencode 自动加载文心设计规范，用户描述需求即可产出 UI。

## 架构

| 层级 | 位置 | 内容 |
|------|------|------|
| **Meta Agent** | `.opencode/agents/meta/` | 需求理解、约束澄清、分发到 Wenxin、合并多层审计 |
| **Wenxin Agent** | `.opencode/agents/wenxin/` | 文心设计语言执行 — HTML/CSS 输出到 dist/ |
| **Audit Agent** | `.opencode/agents/audit/` | Render Contract、Wenxin Rule Fit、截图视觉层、Motion Runtime Review 多层审计 |
| **Rules** | `.opencode/rules/` | 设计规范（文心规范、需求协议、输出形态、动效、审计、美学准则） |
| **Tokens** | `.opencode/tokens/` | 文心 CSS Token 三层体系与 F1-F9 形态派生 |
| **Tools** | `.opencode/tools/` | Render Contract 审计、契约指标提取等只读辅助工具 |

## 工作流

```
用户描述需求
    ↓
Meta Agent 理解意图 + 澄清约束
    ↓
分发到 Wenxin Agent（指定演化配置）
    ↓
Wenxin Agent 执行设计 → HTML 输出到 dist/
    ↓
Render Contract Audit 提取 DOM/CSS/动效 JSON 指标
    ↓
Audit Agent 多层审计 → 规则、截图、动画运行时报告
    ↓
Meta Agent 合并多层审计 → 生成修复指令并重分发 Wenxin
    ↓
至少 3 轮审计-修复循环后，达到高质量标准再交付
```

## 演化配置

文心设计语言支持九种演化配置：

| 配置 | 形态 | 说明 |
|------|------|------|
| 文心正典 | F1 HTML Web | 响应式网站，暗色模式就绪 |
| 文心移动 | F2 Mobile App | 移动应用适配，平台原生交互 |
| 文心品牌 | F3 Brand Identity | Logo + 品牌视觉识别系统 |
| 文心书卷 | F4 Print & Editorial | 书籍、论文、杂志、Zine 等印刷排版 |
| 文心演示 | F5 Presentation | 幻灯片、演讲、路演、内部汇报 |
| 文心文档 | F6 Documentation | API 文档、知识库、Wiki、技术手册 |
| 文心海报 | F7 Poster & Cover | 海报、封面、单页强视觉 |
| 文心图解 | F8 Diagram & Knowledge Map | 架构图、流程图、知识地图 |
| 文心报告 | F9 Report & LaTeX Typesetting | Markdown → LaTeX → PDF 的研究/策略报告 |

详见 `.opencode/rules/wenxin-spec.md` §3 演化框架。

文心正式输出形态上限为 F9，不继续扩张。Newsletter、表单向导、社交长图、Dashboard、电商、游戏、复杂 CRM 不进入正式形态。

## 项目结构

```
wanxing/
├── .opencode/
│   ├── agents/
│   │   ├── meta/AGENT.md              # Meta 编排器
│   │   ├── audit/                     # 多层审计 Agent
│   │   │   ├── AGENT.md               # Render Contract + Playwright + 截图视觉层 + 动画审计流程
│   │   │   └── prompts.md             # 视觉/动效审计 Prompt 模板
│   │   └── wenxin/                    # Wenxin 设计 Agent（拆分）
│   │       ├── AGENT.md               # Agent 提示词
│   │       ├── design.md              # 核心设计规范
│   │       ├── brand.md               # Logo + 品牌标识
│   │       ├── components.md          # 组件规范
│   │       ├── diagrams.md            # F8 图解/知识地图
│   │       ├── conventions.md         # SVG 绘图规范
│   │       ├── print.md               # F4 印刷排版
│   │       ├── presentation.md        # F5 演示文稿
│   │       ├── documentation.md       # F6 文档站
│   │       ├── poster.md              # F7 海报/封面
│   │       └── report.md              # F9 报告/LaTeX
│   ├── rules/
│   │   ├── wenxin-spec.md             # 文心规范总览
│   │   ├── output-formats.md          # 输出形态规范
│   │   ├── intake-protocol.md         # 需求分析协议
│   │   ├── audit-protocol.md          # 美学审计协议
│   │   ├── motion-spec.md             # 文心动效规范
│   │   └── modern-aesthetics.md       # 34 条美学准则
│   └── tokens/
│       └── wenxin-tokens.css          # CSS Token 三层体系与 F1-F9 派生
├── dist/                              # 生成产物与审计临时文件（不跟踪）
├── app/                               # 可提交的成品模板/应用目录（git 跟踪）
├── opencode.json                      # OpenCode 配置
├── justfile                           # 本地 HTTP Server 与校验任务
├── AGENTS.md                          # 本文件
└── README.md                          # 项目说明
```

## 输出规则

- 所有 HTML 设计产出 → `dist/<project-slug>/index.html`
- 已确认要沉淀为模板或应用的成品 → `app/<project-slug>/index.html`，可被 git 跟踪
- 项目命名：`<project-slug>` 使用小写 ASCII slug，只允许 `a-z`、`0-9`、`-`
- 单文件交付：HTML + 内联 CSS
- 每个 HTML 必须内嵌 `wanxing-render-contract` JSON，并声明 `data-wanxing-profile`
- Render Contract 必须包含 `project.name`、`project.slug`、`output.entry`、`output.tmpDir`
- 含动效的 HTML 必须提供 `data-animations-complete` 截图等待信号
- 生成的项目目录不被 git 跟踪（`.gitignore` 已配置）
- MCP 截图、运行时采样与审计中间文件保存到 `dist/<project-slug>/tmp/`
- 禁止在项目根目录保存截图、审计报告或 MCP 临时文件

## Agent 行为约束

- **不修改 Rules**：常规设计任务中，`.opencode/rules/` 下的规范是参考知识，Agent 引用但不修改；只有用户明确要求维护/升级 harness 时才可修改
- **不修改 Agents**：常规设计任务中，`.opencode/agents/` 下的定义是固定资产；只有用户明确要求维护/升级 harness 时才可修改
- **输出到 dist/**：所有设计产出必须输出到 `dist/<project-slug>/index.html`
- **沉淀到 app/**：只有用户明确要求保存模板/应用时，才复制或重建到 `app/<project-slug>/index.html`
- **遵循文心规范**：设计决策基于 `.opencode/agents/wenxin/design.md`
- **遵循美学审计**：输出必须通过 34 条准则审计
- **多层审计强制执行**：Wenxin 交付 HTML 后必须触发 audit，报告过期或源文件哈希不一致时必须重跑
- **至少三轮收敛**：初稿审计算第 1 轮；修复后复审算第 2 轮；质量收敛审计算第 3 轮。未满 3 轮不得最终交付
- **Render Contract 审计强制执行**：audit 前必须运行 Render Contract 审计；hard gate 失败时先修复，不进入截图与运行时审计
- **Meta Agent 不做设计**：Meta 只负责理解、澄清、分发、合并审计与生成修复指令，不写 HTML/CSS
- **Meta Agent 必须触发审计**：Wenxin 交付 HTML 后，Meta 必须主动触发 Render Contract 与 Audit Agent 多层审计，不可直接交付
- **Wenxin Agent 专注执行**：接收 Meta 的分发指令后专注执行设计

## 参考

- 文心规范：`.opencode/rules/wenxin-spec.md`
