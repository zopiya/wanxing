# 万形 · Wanxing

> 万种形态，同出一源。以文心（Wenxin）为设计底座。

## 是什么

万形是一个 OpenCode 设计工程项目。它以**文心（Wenxin）**设计语言为唯一底座，支持演化出 Web 页面、移动应用、品牌标识、印刷排版、演示文稿、文档站、海报封面等多种输出形态。

## 核心理念

- **文字即界面** — 内容本身就是最好的设计
- **留白即设计** — 空白不是空缺，是呼吸
- **克制即力量** — 少即是多，点睛之色 ≤2 处

## 设计语言

| 维度 | 值 | 体现 |
|------|-----|------|
| 哲学 | 克制之美 | 无装饰阴影、无渐变、无填充色按钮 |
| 视觉 | 温暖极简 | 暖白底色、极简 UI、衬线温度 |
| 排版 | 衬线优先 | EB Garamond + Noto Serif SC |
| 色彩 | 暖土调 | #F2F0EB 暖白 + #8B3525 砖红点睛 |
| 动效 | 温和流动 | 呼吸感过渡、水一般流动 |

## 输出形态

- **文心 Web** — 响应式网站，暗色模式，WCAG 2.2 AA+
- **文心 Mobile** — iOS / Android 原生风格适配
- **文心 Brand** — Logo（朱砂印章）、品牌识别系统
- **文心 Print** — 书籍、论文、杂志、Zine 等印刷排版
- **文心 Presentation** — 幻灯片、演讲、路演、内部汇报
- **文心 Documentation** — API 文档、知识库、Wiki、技术手册
- **文心 Poster** — 海报、封面、宣传单页视觉
- **文心 Diagram** — 架构图、流程图、知识地图
- **文心 Report** — Markdown → LaTeX → PDF 的研究/策略报告

万形正式输出形态固定为 F1-F9，不继续扩张；Newsletter、表单向导、社交长图等场景由既有形态吸收或不纳入文心正式形态。

## 快速开始

1. 进入项目目录，描述你的需求（中文或英文均可）
2. Meta Agent 理解意图，澄清约束
3. Wenxin Agent 生成 HTML 设计 → `dist/<project-slug>/index.html`
4. Render Contract Audit 提取 HTML/DOM/CSS/动效 JSON 指标
5. Audit Agent 执行多层审计：Render Contract、Wenxin Rule Fit、截图视觉层、Motion Runtime Review
6. Meta Agent 合并审计结果，生成修复 brief 并重分发 Wenxin；至少完成 3 轮审计-修复循环后再交付最终产物

## 本地工具

```bash
just serve      # 在 dist/ 启动可复用的本地 HTTP Server
WANXING_ROOT=app just serve  # 预览 app/ 中已沉淀的可提交模板；切换 root 前先 just stop
just status     # 检查审计服务器是否运行
just audit dist/example/index.html  # 运行非视觉 Render Contract 审计
just validate   # 校验 opencode.json、dist/ 和 git whitespace
```

## 目录

```
.opencode/agents/meta/     — Meta 编排器
.opencode/agents/wenxin/   — 文心设计规范与 F1-F9 执行资产
.opencode/agents/audit/    — 多层审计 Agent
.opencode/rules/           — 项目规则与审计协议
.opencode/tokens/          — CSS 设计 Token
.opencode/tools/           — 只读审计与指标提取工具
dist/                      — 项目级 HTML 设计产出（dist/<project-slug>/index.html）
app/                       — 可提交的成品模板/应用目录（app/<project-slug>/index.html）
```

## 参考

- 文心规范：`.opencode/rules/wenxin-spec.md`
