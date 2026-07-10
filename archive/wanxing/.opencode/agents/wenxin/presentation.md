# 文心演示 (Wenxin Presentation) · F5 规范

> Version: 1.0.0 | 2026-05-20 | Wenxin-Specific

---

## 设计哲学

**文字即界面** —— 幻灯片的本质是纯文字 + 呼吸空间。

文心的克制美学（A9）直接对抗演示文稿最常见的病：文字过多、装饰过重、模板感强。文心演示坚持：

- **每张幻灯片 ≤ 30 字标题** — 克制的文字密度
- **暖白底色 + 深炭文字** — 温暖而非冷硬的视觉气质
- **衬线字体优先** — 区别于千篇一律的无衬线演示模板
- **砖红强调色 ≤ 2 处/幻灯片** — 稀少才有力量

演示是文心"克制的惊喜"（E9）最直观的体现——幻灯片切换时的温和流动，构建动画时的渐次显现，都是"你感到用心，但不会停下来欣赏它"。

---

## 布局系统

### 画布 (Canvas)

```
标准画布：16:9 比例
像素尺寸：1920 × 1080（高清）
逻辑尺寸：使用 vw/vh 或百分比布局
安全区域：距边缘 ≥ 5% 画布宽度（96px）
```

### 网格 (Grid)

```
12 列网格，gutter 24px（逻辑像素）
内容区域：距左右边缘各 5%，距上下边缘各 8%
标题区域：上方 1/3
内容区域：下方 2/3
页码位置：右下角，距边缘 3%
```

### 7 种幻灯片类型

#### 1. 标题幻灯片 (Title Slide)

```
布局：垂直居中
品牌标识符 ■：紧随标题后
标题：--font-display · --text-5xl · --tracking-chinese（中文）/ --tracking-tight（英文）
副标题：--font-body · --text-lg · --color-text-secondary
日期/地点：--font-ui · --text-sm · --color-text-muted · --tracking-wider
背景：--color-bg-warm
```

#### 2. 章节分隔幻灯片 (Section Divider)

```
布局：垂直居中
章节编号：--font-ui · --text-sm · --tracking-wider · 全大写 · --color-text-muted
章节标题：--font-display · --text-4xl
背景：--color-bg-warm
装饰：章节编号旁可使用 ■ 标识符（accent 的第二次出现）
```

#### 3. 内容幻灯片 — 纯文字 (Content Slide: Text)

```
标题：--font-display · --text-2xl · ≤ 30 字
正文：--font-body · --text-lg · --leading-relaxed
要点列表：每项 ≤ 2 行，最多 5 项
列表标记：短横线（—）或无标记，不使用圆点
背景：--color-bg-pure 或 --color-bg-base
```

#### 4. 内容幻灯片 — 文字+图片 (Content Slide: Text + Image)

```
布局：左文右图（60/40）或上图下文
图片：无圆角、无阴影、无边框
图片说明：--font-ui · --text-sm · --color-text-muted
背景：--color-bg-pure
```

#### 5. 引用幻灯片 (Quote Slide)

```
布局：垂直居中
引语：--font-display · --text-3xl · italic · --color-text-heading
归因：归因区排版模式（短横线 + 名称 + 说明）
背景：--color-bg-warm
```

#### 6. 结尾幻灯片 (Closing Slide)

```
布局：垂直居中
内容：感谢语 + 联系方式
品牌标识符 ■：感谢语后
背景：--color-bg-warm
```

#### 7. 演讲者备注 (Speaker Notes)

```
位置：幻灯片下方独立区域（不显示在投影中）
字体：--font-ui · --text-sm
颜色：--color-text-secondary
背景：--color-bg-subtle
```

---

## 字体系统

### 演示字号阶梯 (Presentation Type Scale)

演示字号比 Web 更大，确保远距离可读性。阶梯比例：Major Third (1.250)。

| Token | 值 | 用途 |
|-------|-----|------|
| `--slide-text-sm` | `0.875rem` (~14px) | 演讲者备注、页脚 |
| `--slide-text-base` | `1.125rem` (~18px) | 辅助说明、图注 |
| `--slide-text-md` | `1.375rem` (~22px) | 要点列表正文 |
| `--slide-text-lg` | `1.75rem` (~28px) | 副标题 |
| `--slide-text-xl` | `2.25rem` (~36px) | 小节标题 |
| `--slide-text-2xl` | `3rem` (~48px) | 幻灯片标题 |
| `--slide-text-3xl` | `4rem` (~64px) | 章节标题 |
| `--slide-text-4xl` | `5.5rem` (~88px) | 标题幻灯片大标题 |

### 文字约束 (Text Constraints)

- **标题每张幻灯片 ≤ 30 字**（中文）/ ≤ 8 词（英文）
- **要点列表每项 ≤ 2 行**，每张幻灯片最多 5 项
- **正文幻灯片总字数 ≤ 80 字**（中文）/ ≤ 50 词（英文）
- **引用幻灯片引语 ≤ 50 字**（中文）/ ≤ 30 词（英文）

---

## 色彩系统

### 亮色模式（默认）

与 F1 Web 亮色模式完全一致。所有 Token 值不变。

### 暗色演示模式

演示场景常需要暗色背景（投影环境、强调氛围）：

```css
[data-slide-theme="dark"] {
  --wenxin-color-bg-warm:   #1A1816;
  --wenxin-color-bg-base:   #201E1B;
  --wenxin-color-bg-pure:   #242220;
  --wenxin-color-bg-subtle:  #2A2724;
  /* ... 完整暗色映射同 Web ... */
}
```

### 强调幻灯片模式

```css
[data-slide-theme="accent"] {
  --slide-bg:    #8B3525;  /* 砖红全屏背景 */
  --slide-color: #FFFFFF;  /* 纯白文字 */
}
```

**强调幻灯片约束：**
- 全演示 ≤ 1 张强调幻灯片
- 仅用于关键结论、核心数据、最终 CTA
- 不用于章节分隔（章节分隔使用 `--color-bg-warm`）

---

## 动效系统

### 幻灯片切换 (Slide Transitions)

| 切换类型 | 参数 | 说明 |
|---------|------|------|
| 淡入淡出 (Fade) | `--duration-slow` (420ms), `--ease-out` | 默认切换方式 |
| 推入 (Push) | `--duration-slow` (420ms), `--ease-out` | 章节间切换 |
| 无切换 (Cut) | 0ms | 连续内容幻灯片间快速切换 |

**禁止：** 旋转、翻转、缩放、弹跳、3D 变换、任何超过 420ms 的切换。

### 构建动画 (Build Animations)

| 动画类型 | 参数 | 说明 |
|---------|------|------|
| 渐显 (Fade In) | `opacity 0→1`, `--duration-slow`, `--ease-out` | 默认构建动画 |
| 上移渐显 (Fade Up) | `opacity 0→1` + `translateY(8px→0)`, `--duration-slow`, `--ease-out` | 要点列表项 |
| 列表渐显 (Stagger) | 每项间隔 60ms | 要点列表逐项显现 |

**禁止：** 旋转、弹跳、位移超过 16px、循环动画。

### 演讲者备注

- 不使用动画
- 幻灯片切换时备注即时更新

---

## 组件

### 演示特有组件

| 组件 | 规范 |
|------|------|
| **幻灯片页码** | `--font-ui` · `--slide-text-sm` · `--color-text-muted` · 右下角 |
| **进度指示器** | 底部细线，`--color-border-subtle`，当前位置 `--color-accent` |
| **要点列表** | 短横线（—）标记，每项 `--slide-text-md`，间距 `--space-4` |
| **代码展示** | `--font-mono` · `--slide-text-base` · `--color-bg-subtle` 背景 · 左侧 3px `--color-border-strong` |
| **数据表格** | 与 Web 形态一致，但字号增大至 `--slide-text-base` |
| **图片** | 无圆角、无阴影、无边框，宽度 ≤ 40% 画布宽度 |

### 禁止清单

| 禁止 | 原因 |
|------|------|
| 每张幻灯片 > 80 字 | 违反 A9 克制之美 |
| 填充色按钮 | 违反文心按钮规范 |
| 渐变背景 | 违反 D9 暖土调 |
| 装饰性图片 | 仅内容型图片 |
| 项目符号圆点 | 使用短横线（—）替代 |
| 动画切换效果 | 仅允许淡入淡出和推入 |

---

## 输出

### 输出格式

| 格式 | 说明 |
|------|------|
| HTML/CSS | 主要交付格式，使用 CSS Scroll Snap 或 JS 框架 |
| PPTX 模板规范 | 字体、色彩、布局参数定义，供手动创建 |
| Keynote 模板规范 | 同上 |
| PDF 导出 | 从 HTML 导出，16:9 比例 |

### HTML 幻灯片框架要求

- 16:9 固定比例，居中显示
- 支持键盘导航（← → 翻页，Esc 概览）
- 支持演讲者备注窗口
- 支持 `prefers-reduced-motion`
- 支持亮色/暗色模式切换

---

## 交付物

### 必须交付 (Required — 9 Items)

- [ ] 幻灯片画布尺寸与网格系统定义
- [ ] 演示字号阶梯：8 级（14px ~ 88px）
- [ ] 7 种幻灯片类型布局规范
- [ ] 亮色/暗色/强调三种幻灯片模式
- [ ] 幻灯片切换动效规范
- [ ] 构建动画规范
- [ ] 演讲者备注规范
- [ ] HTML/CSS 幻灯片框架
- [ ] 文字密度约束规则（≤30 字标题 / ≤80 字正文）

### 可选交付 (Optional — 4 Items)

- [ ] PPTX 模板文件
- [ ] Keynote 模板文件
- [ ] PDF 导出配置
- [ ] 演示文稿示例（5-10 张）

---

## 参考

- `output-formats.md` §Presentation — 完整输出形态规范
- `wenxin-spec.md` §3.3 文心演示 — 演化配置
- `design.md` — 核心设计规范（色彩/字体/间距/动效）
- `components.md` — 共享组件规范
- `brand.md` — 品牌标识符 ■ 规范

---

> Version: 1.0.0 | 2026-05-20 | Wenxin-Specific
