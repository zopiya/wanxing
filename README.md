# 文心 · 万形 · Wenxin · Wanxing

一个中英双语、内容优先的设计系统：规范定义不变的灵魂，CSS 产物交付可复用的万种形。

```html
<link rel="stylesheet" href="kit/index.css">
<main class="wx-container wx-container--article">
  <h1>文字即界面</h1>
</main>
```

零运行时依赖、无构建步骤；只需要 CSS。完整文档从 [site/index.html](./site/index.html) 开始（请通过 HTTP 服务打开，避免 `file://` 阻断字体和 `@import`）：

```sh
python3 -m http.server 8899
# 打开 http://localhost:8899/site/index.html
```

## 目录

| 目录 | 内容 |
| --- | --- |
| `spec/` | 双语规范、设计哲学与裁决记录 |
| `kit/` | tokens、基础 CSS、组件、模式与图表主题 |
| `site/` | 生成的文档站（34 页，五个分区）；源页在 `site/_pages/` |
| `scripts/` | 构建与可执行检查 |
| `tests/` | 检查器的正反向夹具与自测 |

`kit/tokens/core.css` 是所有数值 token 的唯一真源。不要直接编辑 `site/*.html` 或
`kit/tokens/generated/*`；前者由 `site/_pages/` 和 `_nav.json` 生成，后者由 token 构建生成。

`site/_nav.json` 一份文件就是全部信息架构：顶部五个分区、每个分区自己的侧边栏、
以及检查脚本读的路由表。侧边栏只渲染你所在的那一个分区。

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 生成 tokens、图表主题、CSS 包和文档站 |
| `npm run check` | 运行 token、颜色、禁令、站点、渲染审计与无障碍检查 |
| `npm run audit <file>` | 用 render contract 审计一个消费者 HTML 页面 |
| `npm run build:tokens` | 从 `core.css` / `dark.css` 生成 json、scss、ts、DTCG token 交换文件 |
| `npm run build:site` | 从 `site/_pages/` 生成站点 |
| `npm run check:a11y` | 检查文档站的表单标签、可访问名和主地标 |

## 版本策略

采用语义化版本和 [Keep a Changelog](https://keepachangelog.com/) 格式。

- **major**：删除或重命名已发布 token；改变组件的 HTML 或 ARIA 契约；删除已发布组件或行为脚本。
- **minor**：新增向后兼容的 token、组件、修饰符、文档能力或预设。
- **patch**：不改变公开契约的缺陷修复、文档修正、检查强化与生成物同步。

变更会记录在 [CHANGELOG.md](./CHANGELOG.md)。尚未对外发布的工作仍须按此规则记录，避免把不可兼容变更伪装成小修。

## 许可与发布状态

本仓库目前是**私有且未授权使用**的项目（`package.json` 中的 `private: true` 与 `license: UNLICENSED` 为准），不是开源包。不得把仓库内容重新分发、发布到包注册表或假定存在开源许可证。若未来决定开源，必须在同一变更中加入明确的 `LICENSE`、调整 package 元数据并说明迁移影响。
