# 文心海报 (Wenxin Poster) · 设计规范

> Version: 1.0.0 | 2026-05-20 | Wenxin-Specific

---

## 设计哲学 (Design Philosophy)

海报是文心"克制之美"在单页尺度上的最强表达。

与 F4 书卷（多页内页排版）互补——书卷管"怎么读"，海报管"怎么看"。海报的核心命题是：在一张画布上，用一个视觉锚点抓住注意力。这正是文心"点睛之色"的终极形态——整张海报只有一个 accent 焦点，其他地方都是留白。

**克制不是"什么都不放"，而是"只放必须放的"。** 海报上每一个元素——标题、时间、地点、署名——都不可删除。没有装饰，没有背景纹理，没有花哨字体。文字即界面。

---

## 布局系统 (Layout System)

### 画布比例 (Canvas Ratios)

| 比例 | 尺寸（基准） | 用途 |
|------|------------|------|
| 2:3 | 1200×1800 | 书籍封面、竖版海报（标准） |
| 3:4 | 1200×1600 | 竖版海报、宣传单页 |
| 1:1 | 1200×1200 | 专辑封面、社交媒体头像 |
| 16:9 | 1920×1080 | 横幅、社交媒体头图、横版海报 |
| 4:3 | 1600×1200 | 横版海报 |
| A 系列 | A4 / A3 / A2 / A1 | 印刷海报（ISO 216 标准） |

### 构图模式 (Composition Modes)

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **居中对称** | 所有元素垂直+水平居中 | 活动海报、书籍封面 |
| **左对齐** | 文字组左对齐，上方 1/3 或下方 2/3 | 宣传单页、学术海报 |
| **对角分布** | 主标题占上方，署名/日期占右下 | 展览海报、专辑封面 |
| **全出血文字** | 极大字号标题占满画布 | 极简海报、品牌海报 |

### 安全区域与出血 (Safe Area & Bleed)

- **裁切出血**：3mm（印刷海报），数字海报不需要
- **安全区域**：重要文字距边缘 ≥ 8% 画布边长
- **Logo/署名位置**：右下角或底部居中（可被裁切不影响识别）
- **空白区域**：≥ 50% 画布面积（留白即设计）

---

## 字体系统 (Typography System)

### 海报字号阶梯 (Poster Type Scale)

海报字号比演示（F5）更大，因为观看距离更远：

| Token | 值 | 用途 |
|-------|-----|------|
| `--poster-text-xs` | `0.75rem` (12px) | 极小标注、ISBN、条形码 |
| `--poster-text-sm` | `0.875rem` (14px) | 日期、地点、署名、网址 |
| `--poster-text-base` | `1.125rem` (18px) | 辅助说明 |
| `--poster-text-md` | `1.5rem` (24px) | 副标题、次要信息 |
| `--poster-text-lg` | `2rem` (32px) | 小标题、标签 |
| `--poster-text-xl` | `3rem` (48px) | 中等标题 |
| `--poster-text-2xl` | `4.5rem` (72px) | 大标题 |
| `--poster-text-3xl` | `6rem` (96px) | 主标题（标准海报） |
| `--poster-text-4xl` | `8rem` (128px) | 极大标题（展览海报） |
| `--poster-text-5xl` | `12rem` (192px) | 全出血标题 |

阶梯比例：Major Third (1.250)，与所有形态一致。

### 文字约束 (Text Constraints)

- **主标题** ≤ 15 字（中文）/ ≤ 8 词（英文）
- **总文字元素** ≤ 5 个（标题、副标题、日期、地点、署名）
- **每种字重** ≤ 2 种（Bold 标题 + Regular 信息）
- **每种字号** ≤ 3 种

### 字体使用 (Font Usage)

- **标题**：`--font-display`（Lora / Noto Serif SC），Bold (700)
- **正文/信息**：`--font-body`（EB Garamond / Noto Serif SC），Regular (400)
- **UI 标签**：`--font-ui`（system-ui / Noto Sans SC），Regular (400)
- **中文标题字距**：`--tracking-chinese: 0.1em`（舒展字距）

---

## 色彩系统 (Color System)

### 色彩应用 (Color Application)

与 F1 Web 完全一致。单页海报 accent 使用策略：

```css
/* 海报 accent 使用规则 */
.poster-title       { color: var(--wenxin-color-accent); }       /* 允许：标题用 accent */
.poster-subtitle    { color: var(--wenxin-color-text-heading); }
.poster-meta        { color: var(--wenxin-color-text-secondary); }
.poster-attribution { color: var(--wenxin-color-accent); }       /* 允许：署名用 accent */
```

### 海报 Accent 约束 (Poster Accent Constraints)

**整张海报 accent 出现在标题（1 处）+ 署名（1 处）= 总共 ≤ 2 处。** 其余所有信息使用中性色。

### 暗色模式 (Dark Mode)

- **印刷海报**：不需要暗色模式
- **数字海报**：与 F1 Web 暗色模式一致，暖暗色 `#1A1816` 背景 + 暖象牙白 `#E8E3DC` 文字

---

## 动效系统 (Motion System)

### 印刷海报 (Print Posters)

- **E8 印刷静止**：无动效、无交互状态、无暗色模式
- 所有视觉层级通过字号、字重、间距、色彩静态实现

### 数字海报 (Digital Posters)

- **单次进场动画**：fade-up `opacity 0→1` + `translateY(12px→0)`
- **过渡时长**：`--duration-slow` (420ms), `--ease-out`
- **品牌标识符 ■**：使用呼吸动效（与 F3 一致），`opacity 1→0.6→1`，周期 4s，`ease-in-out`
- **无循环动效**：除 ■ 呼吸外，禁止任何循环动画
- **尊重动效偏好**：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 与 F3 Brand 的边界 (Boundary with F3 Brand)

| 领域 | F3 Brand 负责 | F7 Poster 负责 |
|------|-------------|-------------|
| Logo 系统 | Logo 设计、变体、禁止清单 | Logo 在海报中的放置位置和大小 |
| 色彩系统 | HEX/RGB/CMYK/PANTONE 定义 | 色彩在海报中的具体应用 |
| 字体系统 | Lora/EB Garamond/Noto Serif SC + 回退栈 | 字体在海报中的层级和组合 |
| 品牌标识符 ■ | 定义（8×8px, accent, 呼吸动效） | ■ 在海报构图中的位置 |

**原则：** F3 定义"品牌是什么"，F7 定义"品牌在海报上怎么排"。

---

## 交付物 (Deliverables)

### 必须交付 (Required)

- HTML/CSS 海报模板（支持 6 种画布比例）
- 4 种构图模式布局规范
- 海报字号阶梯（10 级，12px ~ 192px）
- 安全区域与出血规范
- 单页 accent 使用规则

### 可选交付 (Optional)

- 各比例海报模板
- 印刷海报 CMYK 导出配置
- 社交媒体横幅特定尺寸模板

---

## 参考 (References)

- `output-formats.md` §Poster & Cover 文心规范
- `wenxin-spec.md` §3.3 文心海报
- `design.md` 核心设计规范
- `brand.md` 品牌标识规范

---

> Version: 1.0.0 | 2026-05-20 | Wenxin-Specific
