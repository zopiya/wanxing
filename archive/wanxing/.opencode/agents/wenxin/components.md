# 文心 (Wenxin) · 组件规范

> Version: 2.0.0 | Date: 2026-05-20

---

## 目录

- [1. 通用组件 (Components)](#1-通用组件-components)
- [2. 图标系统 (Icon System)](#2-图标系统-icon-system)
- [3. 页面原型 (Page Archetypes)](#3-页面原型-page-archetypes)

---

## 1. 通用组件 (Components)

### 链接

```
正文内链接：
  默认色：--color-text-primary（同正文色，不抢焦）
  Hover：--color-accent，--duration-fast 过渡
  正文中无下划线（Hover 时可出现 1px 下划线）

纯导航区域（无正文混排）：
  可无下划线，依赖颜色区分

CTA 行动链接：
  纯文字 + 箭头，如「查看更多 →」「来途 >>」，不使用填充按钮
```

### 按钮（仅必要场景）

```
样式：线框，border: 1px solid --color-border-strong
背景：transparent
圆角：≤ 4px
内边距：--space-3 垂直，--space-6 水平
Hover：border + text → --color-accent，--duration-fast
禁止：填充色背景（除表单绝对必要的主提交按钮）
```

### 表单输入框

```
border: 1px solid --color-border-subtle
圆角：≤ 4px（或无圆角）
背景：--color-bg-pure
内边距：--space-3 垂直，--space-4 水平
Focus：outline: 2px solid --color-focus; outline-offset: 2px
Placeholder：--color-text-muted
```

### 代码组件

**代码块**
```
背景：--color-bg-subtle
边线：左侧 3px solid --color-border-strong（无四周边框）
字体：--font-mono · --text-sm
内边距：--space-4 全向
复制按钮：默认 opacity 0，hover 时 → opacity 1，右上角，--text-xs
```

**行内代码**
```
背景：--color-bg-subtle
内边距：2px 6px
字体：--font-mono · 0.9em
圆角：3px
无边框
```

### 图片

```
宽度：100%（撑满内容列宽）
无圆角、无阴影
上下外边距：--space-8
图注（caption）：--font-ui · --text-sm · --color-text-muted · 居中 · 上间距 --space-3
```

### 表格

```
无外边框
行分隔：1px solid --color-border-subtle（仅水平线）
表头：--font-body bold + 底部 1px solid --color-border-strong
表头背景：--color-bg-subtle（可选）
单元格内边距：--space-3 水平，--space-3 垂直
字体：--font-body · --text-sm 或 --text-base
```

### 标签

```
样式：线框，border: 1px solid --color-border-subtle，无背景色
圆角：2px
内边距：2px --space-3
字体：--font-ui · --text-xs · --tracking-wide
颜色：--color-text-secondary
Hover（可交互时）：border + color → --color-accent
```

### 面包屑导航

```
格式：/首页  /上级  /当前页
分隔符：/（前置）
字体：--font-ui · --text-sm · --color-text-secondary
当前页：--color-text-primary
无装饰
```

### 焦点态（全局）

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
/* 仅键盘导航时显示，鼠标点击不触发 */
/* 禁止使用 outline: none */
```

---

## 2. 图标系统 (Icon System)

*图标是文字的替代，不是文字的装饰。它的存在理由只有一个：比文字更直接地传达已形成共识的语义。*

### 使用原则

**用图标的场景：**
- 语义已是全球共识的功能符号（搜索、设置、关闭、菜单、用户等）
- 空间有限、文字会造成拥挤的导航/工具栏区域
- 与文字并排，作为视觉辅助加速识别

**不用图标的场景：**
- 语义模糊、没有广泛共识——此时必须用文字
- 纯装饰目的
- 正文段落中（图标属于 UI 层，不属于内容层）

**模糊语义必须配文字标注：**
```
✅ 正确：[图标] 工具    ← 图标 + 文字，语义清晰
❌ 错误：[图标]         ← 孤立图标，用户需要猜
```

### 视觉规格

```
描边宽度：1.5px（统一，不随尺寸变化）
填充：无（纯线条型）
圆角：与图标库默认保持一致，不额外修改
尺寸：见间距与栅格章节 --icon-sm / --icon-md / --icon-lg
```

**颜色状态：**

| 状态 | 颜色 | 过渡 |
|------|------|------|
| 默认 | `--color-text-secondary` | — |
| Hover | `--color-text-primary` | `--duration-fast` |
| 激活/选中 | `--color-accent` | `--duration-fast` |
| 禁用 | `--color-text-muted` | — |

### 图标与文字混排

```
对齐：垂直居中（align-items: center）
间距：图标与文字之间 --space-2（8px）
尺寸匹配：
  正文 17px → --icon-md（20px）
  小字 13px → --icon-sm（16px）
```

### 推荐图标库

以下两个库均为线条风格，以此为主，同一产品内保持使用一个库，不混用。

**Lucide**（lucide.dev）
- 描边约 2px（可覆盖为 1.5px）
- 线条简洁、几何感强
- 适合：功能型 UI、工具类产品、导航栏
- 优势：图标数量大、更新活跃、React/Vue 官方组件

**Phosphor Icons**（phosphoricons.com）
- 提供 Thin / Light / Regular / Bold 多字重
- Light / Thin 档与文心的轻盈气质最吻合
- 适合：展示型页面、内容型产品
- 优势：同图标多字重，灵活度高

**选用建议：**
- 工具型、功能型页面 → 优先 Lucide
- 展示型、内容型页面 → 优先 Phosphor（Light 或 Regular）

---

## 3. 页面原型 (Page Archetypes)

*形态层跟随该类型产品的行业 UX 惯例。以下每种原型说明「如何在标准结构中注入灵魂」。*

### 原型 A·阅读型
*博客文章、文档页、Wiki 词条*

用户目标：读完内容，不分心。

遵循惯例：单列居中，面包屑导航，标题 → 元数据 → 正文。

**灵魂注入：**
- 内容宽：`--width-article`
- 正文：`--font-body` · `--text-md` · `--leading-relaxed` · 段落间距 `--space-5`
- 元数据：`--font-ui` · `--text-sm` · `--color-text-secondary`
- Blockquote：左侧 2px `--color-accent` 竖线 + `--color-bg-subtle`
- 代码块：`--color-bg-subtle`，左侧边线，无四周边框

---

### 原型 B·列表型
*博客首页、文章列表、搜索结果、目录*

用户目标：浏览并选择，快速判断哪条值得点进去。

遵循惯例：条目列表，可分页，可过滤。

**灵魂注入：**
- 内容宽：`--width-content`
- 布局：`[日期，固定宽，--color-text-secondary]  [标题，--color-text-primary]`
- Hover：标题色 → `--color-accent`，`--duration-fast`
- 进场：stagger fadeUp，每项间隔 60ms
- 无卡片、无边框、无阴影

---

### 原型 C·展示型
*个人简历、作品集、About 页*

用户目标：了解「这是谁」，建立信任。

遵循惯例：简历用两列时间线（左日期右内容），作品集用网格，About 自由叙述。

**灵魂注入：**
- 内容宽：`--width-showcase`
- 品牌标识符 ■ 出现在姓名后，这是 Accent 在此页的固定出现位置
- 时间左列：`--font-ui` · `--text-sm` · `--color-text-secondary`
- 公司/机构名：`--color-text-secondary`，低于职位名一级
- 技能标签：线框，`border: 1px solid --color-border-subtle`，无填充

---

### 原型 D·着陆型
*Landing Page、产品首页*

用户目标：10 秒内判断「这是什么，我要不要继续」。

遵循惯例：英雄区大字 + 核心描述 + 行动入口，下方特性分区，尾部 CTA。

**灵魂注入：**
- 背景：`--color-bg-warm`
- 标题：`--font-display` · `--text-5xl`/`--text-4xl` · `--tracking-chinese` 或 `--tracking-tight`
- 导航：透明背景，`--font-ui` · `--text-sm` · 全大写 · `--tracking-wider`
- CTA：纯文字链接型，非填充按钮
- 区块间距：`--space-24` 以上

---

### 原型 E·工具型
*输入/查询/生成类轻量工具*

用户目标：完成一个具体任务。界面是工具，不是目的。

遵循惯例：输入区突出，操作路径清晰，结果区简洁。

**灵魂注入：**
- 输入框：见组件规范表单部分
- 按钮：线框型，hover → `--color-accent`
- 结果文字：`--font-body` · `--leading-relaxed`
- 图标：`--icon-md`，`--color-text-secondary`
