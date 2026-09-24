# 文心 · 万形 · Wenxin · Wanxing

一个中英双语、内容优先的设计系统：规范定义不变的灵魂，CSS 产物交付可复用的万种形。

```html
<link rel="stylesheet" href="kit/index.css">
<main class="wx-container wx-container--article">
  <h1>文字即界面</h1>
</main>
```

零运行时依赖、无构建步骤；只需要 CSS。在线预览：[GitHub Pages](https://zopiya.github.io/wanxing/)；完整文档也可从 [site/index.html](./site/index.html) 本地查看（请通过 HTTP 服务打开，避免 `file://` 阻断字体和 `@import`）：

```sh
python3 -m http.server 8899
# 打开 http://localhost:8899/site/index.html
```

## 安装

当前 `0.1.0` **尚未发布到 npm registry**。可从本地检出目录或直接通过 GitHub 仓库安装：

```sh
npm install github:zopiya/wanxing
# 或从本地检出目录安装：
# npm install /absolute/path/to/wanxing
```

```js
import "wenxin-wanxing";                    // kit/index.css
import "wenxin-wanxing/css";                // 单文件包，无 @import
import contracts from "wenxin-wanxing/contracts";      // kit/wenxin.json
import tokens from "wenxin-wanxing/tokens/dtcg";       // W3C DTCG 交换格式
```

## 命令行

```sh
npm exec --no -- wenxin audit dist/<slug>/index.html
                                  # 审计合同化输出；hardGates 非空即该可执行子集失败
npm exec --no -- wenxin contracts toast
                                  # 查一条组件契约
npm exec --no -- wenxin tokens --format dtcg
npm exec --no -- wenxin skeleton e
                                  # 输出页面原型 E 的骨架
```

审计输入必须符合 render contract 的输出路径约定；它检查合同、DOM 与内联样式，
并会明示外链 CSS 未检查范围。**不要把 `hardGates` 为空说成完整合规**：视觉、辅助技术与需判断的规则仍要走人工复核。

## 给 AI agent

| 你要做的事 | 读这个 |
| --- | --- |
| 在别的项目里用这套系统 | [`site/llms.txt`](./site/llms.txt) 索引，[`kit/wenxin.json`](./kit/wenxin.json) 全部契约 |
| 通读全部规范 | [`site/llms-full.txt`](./site/llms-full.txt)，20 份规范合并 |
| 在这个仓库里干活 | [`AGENTS.md`](./AGENTS.md) 与 [`CLAUDE.md`](./CLAUDE.md) |
| 装成技能 | [`.claude/skills/wenxin-design/`](./.claude/skills/wenxin-design/) |

`kit/wenxin.json` 完全由来源派生，`npm run check:contracts` 守着它不漂。

## 目录

| 目录 | 内容 |
| --- | --- |
| `spec/` | 双语规范、设计哲学与裁决记录 |
| `kit/` | tokens、基础 CSS、组件、模式与图表主题 |
| `site/` | 生成的文档站（六个分区）；源页在 `site/_pages/` |
| `scripts/` | 构建与可执行检查 |
| `tests/` | 检查器的正反向夹具与自测 |

`kit/tokens/core.css` 是所有数值 token 的唯一真源。不要直接编辑 `site/*.html` 或
`kit/tokens/generated/*`；前者由 `site/_pages/` 和 `_nav.json` 生成，后者由 token 构建生成。

`site/_nav.json` 一份文件就是全部信息架构：顶部六个分区、每个分区自己的侧边栏、
以及检查脚本读的路由表。侧边栏只渲染你所在的那一个分区。

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 生成 tokens、图表主题、契约包、CSS 包、文档站与 llms.txt |
| `npm run check` | 仓库/产物检查、故障夹具反证与真实契约查询自测；完整清单见校验页 |
| `npm run audit -- dist/<slug>/index.html` | 用 render contract 审计一个消费者输出（合同 / DOM / 内联样式） |
| `npm run build:tokens` | 从 `core.css` / `dark.css` 生成 json、scss、ts、DTCG token 交换文件 |
| `npm run build:site` | 从 `site/_pages/` 生成站点 |
| `npm run check:a11y` | 检查文档站的表单标签、可访问名和主地标 |

## 版本策略

采用语义化版本和 [Keep a Changelog](https://keepachangelog.com/) 格式。

- **major**：删除或重命名已发布 token；改变组件的 HTML 或 ARIA 契约；删除已发布组件或行为脚本。
- **minor**：新增向后兼容的 token、组件、修饰符、文档能力或预设。
- **patch**：不改变公开契约的缺陷修复、文档修正、检查强化与生成物同步。

变更会记录在 [CHANGELOG.md](./CHANGELOG.md)。尚未对外发布的工作仍须按此规则记录，避免把不可兼容变更伪装成小修。

## 许可

[MIT](./LICENSE)。设计系统要被接入，许可证越简单越好。

朱砂印章 Logo 与 ■ 署名标记是**品牌标识**，不随代码许可授出：可以使用这套设计语言，
不要把它们当作你自己的标识。边界写在 [品牌应用](./site/brand-usage.html)。
