# Wenxin · Xiaohongshu Stark Asymmetric Layout Protocol

> Version: 2.0.0 | Date: 2026-06-01
>
> Base Core: Wenxin Design Spec (Soul Layer) + Stark Editorial Rhythm (Form Layer)

## 目录

- [1. 哲学原则与色彩底座](https://gemini.google.com/u/1/gem/95eefb1e71e6/bf38d1f380756fde?pageId=none#1-哲学原则与色彩底座)
- [2. 排版弹药库：15 种非对称版式模板](https://gemini.google.com/u/1/gem/95eefb1e71e6/bf38d1f380756fde?pageId=none#2-排版弹药库15-种非对称版式模板)
- [3. 随机化版式生成原则 (Rhythm Combinatorics)](https://gemini.google.com/u/1/gem/95eefb1e71e6/bf38d1f380756fde?pageId=none#3-随机化版式生成原则-rhythm-combinatorics)
- [4. GPTs / Custom Skill 预设提示词模板](https://gemini.google.com/u/1/gem/95eefb1e71e6/bf38d1f380756fde?pageId=none#4-gpts--custom-skill-预设提示词模板)

## 1. 哲学原则与色彩底座

文心设计语言的核心是「减法」与「呼吸感」。小红书卡片（3:4 黄金比例）必须严格继承以下设计 Token，禁止使用阴影、渐变、拟物化贴纸及粗边框。

- **工作台背景**: `#F2F0EB` — 赋予纸质温度。
- **卡片底色**: `#FAFAF8` 或纯白 `#FFFFFF`。
- **主体文字**: `#3A3837` (深炭色) — 绝不用纯黑 `#000000`。
- **点睛之色**: 朱砂红 `#8B3525` | 黛石蓝 `#1E3A4C` | 松石绿 `#2A4D3E`。每张卡片内 Accent 元素出现次数 **≤ 2 处**。
- **字体栈**: 大标题/核心字优先 `Lora`, `Noto Serif SC`, `serif`；元数据/数字优先 `Inter`, `Fira Code`, `sans-serif`。

## 2. 排版弹药库：15 种非对称版式模板

为彻底解决视觉疲劳，我们将排版划分为 5 大版式板块（封面、对比、列表、金句、行动），每个板块提供 3 种截然不同的非对称形态变体。

```
Category P1: COVER (封面)
  [A1: Gravity]         [A2: Giant Glyph]     [A3: Vertical Panel]
  +------------------+  +------------------+  +------------------+
  | Title            |  |      [GLYPH]     |  | Panel | Title    |
  |                  |  |      Title       |  |       |          |
  |     [Badge Box]  |  |                  |  |       |          |
  +------------------+  +------------------+  +------------------+

Category P2: CONTRAST (状态对比)
  [B1: Cascade]         [B2: Focal Zoom]      [B3: Diagonal Cross]
  +------------------+  +------------------+  +------------------+
  | Block A          |  |  HUGE WORD       |  | [Block A]        |
  |   | line         |  |                  |  |      \ slash     |
  |   v     Block B  |  |  [Detail block]  |  |        [Block B] |
  +------------------+  +------------------+  +------------------+

Category P3: LIST (要点列举)
  [C1: Alternating]     [C2: Timeline Ticks]  [C3: Asymmetric Anchor]
  +------------------+  +------------------+  +------------------+
  |     - Item 01    |  | | - Item 01      |  | [Big Anchor]     |
  | Item 02 -        |  | | - Item 02      |  | Item 02 Item 03  |
  |     - Item 03    |  | | - Item 03      |  | Item 04 Item 05  |
  +------------------+  +------------------+  +------------------+

Category P4: QUOTE (深度金句)
  [D1: Split-Tone]      [D2: Negative Space]  [D3: Seal Overlay]
  +------------------+  +------------------+  +------------------+
  | [Accent Area 35%]|  |                  |  |  [LIGHT MARK]    |
  |------------------|  |    " Quote "     |  |  Quote  [STAMP]  |
  | [Quote Area 65%] |  |                  |  |                  |
  +------------------+  +------------------+  +------------------+

Category P5: ACTION (行动指南)
  [E1: Stark Lines]     [E2: Vertical Split]  [E3: S-Curve Flow]
  +------------------+  +------------------+  +------------------+
  | Title            |  | Step  | Step |Step|  | Step 01          |
  | 01 Step One      |  |  01   |  02  | 03 |  |     Step 02      |
  | 02 Step Two      |  |       |      |    |  |          Step 03 |
  +------------------+  +------------------+  +------------------+
```

### ━━━━━━━━━━━━━━━━━━━━━━━━━

### P1 组 · 封面版式 (COVER)

### ━━━━━━━━━━━━━━━━━━━━━━━━━

#### A1: 重力偏移 (Off-Grid Gravity)

- **视觉意象**：文字堆积于左上角，右下角采用“悬浮卡片”向外拉扯，制造物理重力下沉感。

- **适用场景**：极具悬念的主标题。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FFFFFF]">
    <div class="flex justify-between text-[10px] font-mono tracking-widest text-[#B0ABA4]"><span>METADATA</span><span>TOPIC</span></div>
    <div class="my-auto space-y-4">
      <h2 class="font-serif text-[#2C2B29] text-4xl leading-tight max-w-[85%] font-bold">主标题文案</h2>
      <div class="w-12 h-[2px] bg-[var(--color-accent)]"></div>
      <p class="font-serif text-[#888580] text-base border-l border-[#C8C3BA] pl-4">副标题对照前言</p>
    </div>
    <div class="flex justify-end">
      <div class="bg-[var(--color-accent-subtle)] border border-[var(--color-accent-border)] p-4 px-6 max-w-[85%] transform translate-x-2">
        <p class="font-serif text-[var(--color-accent)] text-xl font-bold">右下角落点强调</p>
      </div>
    </div>
  </div>
  ```

#### A2: 巨字破格 (The Giant Glyphs)

- **视觉意象**：卡片正中后方衬托一个 `text-[180px]` 极淡的「巨型汉字印记」作为底纹，主标题以高对比度叠写在上方，极富雕版印刷气场。

- **适用场景**：带有强烈主题情绪和核心单字的封面。

- **核心 Tailwind 代码**：

  ```
  <div class="relative p-8 flex flex-col justify-between h-full bg-[#FAFAF8] overflow-hidden">
    <!-- 巨字水印 -->
    <div class="absolute right-[-20px] bottom-[-20px] text-[180px] font-serif font-bold text-[#E5E1DA] opacity-35 select-none pointer-events-none">印</div>
    <div class="font-mono text-[9px] tracking-widest text-[#B0ABA4] uppercase">WEEK 01 // VOL 02</div>
    <div class="my-auto space-y-3 z-10">
      <h2 class="font-serif text-[#2C2B29] text-4xl leading-tight font-bold">主标题文案</h2>
      <p class="font-serif text-[var(--color-accent)] text-sm font-semibold tracking-wide">副标文案说明</p>
    </div>
    <div class="z-10 text-xs font-serif text-[#888580] border-t border-[#E5E1DA] pt-3 max-w-[50%]">落款叙述内容</div>
  </div>
  ```

#### A3: 1/3 竖分面板 (Vertical Panel Splice)

- **视觉意象**：卡片横向进行 `1:2` 竖切，左侧 1/3 为淡雅色块，右侧为白底；文字打破边界向右延伸横跨界线，极具艺术书籍腰封质感。

- **适用场景**：高冷、客观的思辨型文章封面。

- **核心 Tailwind 代码**：

  ```
  <div class="flex h-full bg-[#FFFFFF]">
    <!-- 左侧 1/3 装饰色块 -->
    <div class="w-1/3 bg-[#F4F2EC] flex flex-col justify-between p-6 pr-0 border-r border-[#E5E1DA]">
      <span class="font-mono text-[8px] text-[#B0ABA4] tracking-widest uppercase">STARK</span>
      <div class="w-4 h-4 bg-[var(--color-accent)]"></div>
    </div>
    <!-- 右侧 2/3 文字区域 -->
    <div class="w-2/3 flex flex-col justify-between p-8 pl-6 relative">
      <div class="my-auto space-y-4 transform -translate-x-12 z-10">
        <h2 class="font-serif text-[#2C2B29] text-4xl font-bold leading-snug drop-shadow-sm">横跨标题文案</h2>
        <p class="font-serif text-[#888580] text-xs leading-relaxed max-w-[90%]">偏置的细节叙述副标题...</p>
      </div>
      <div class="text-[9px] font-mono text-[#B0ABA4] tracking-widest uppercase text-right">MINDSET</div>
    </div>
  </div>
  ```

### ━━━━━━━━━━━━━━━━━━━━━━━━━

### P2 组 · 状态对比 (CONTRAST)

### ━━━━━━━━━━━━━━━━━━━━━━━━━

#### B1: 高低错落阶梯 (Cascade Split)

- **视觉意象**：左右（或上下）双栏在 X 轴与 Y 轴上产生 40px 以上的错位沉降。
- **适用场景**：经典的行为、心理前后落差。
- **模板特点**：上阶梯顶格偏左，下阶梯沉降偏右，中轴配虚化折角指示线。

#### B2: 显微焦距对比 (Focal Micro-Zoom)

- **视觉意象**：将一个核心词汇拉大至 `text-6xl`（占卡片 50% 面积）做绝对焦距，另一半则是排版紧密的极小文字。

- **适用场景**：揭示某个核心概念、病症或底层痛点。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FFFFFF]">
    <h3 class="font-serif font-bold text-[#2C2B29] text-sm tracking-wide">焦距痛点对比</h3>
    <div class="my-auto space-y-4">
      <div class="text-[64px] font-serif font-bold text-[var(--color-accent)] leading-none tracking-tighter">超重度词</div>
      <p class="font-serif text-[#3A3837] text-xs leading-relaxed max-w-[85%] border-l-2 border-[#E5E1DA] pl-4">对应的高细节显微解释，通过大字号带来的情绪直接撞击用户眼球...</p>
    </div>
    <div class="flex justify-between items-center border-t border-[#E5E1DA] pt-3 text-[9px] font-mono text-[#B0ABA4]">
      <span>FOCUS AREA</span><span>ANALYZE</span>
    </div>
  </div>
  ```

#### B3: 剪影对角对视 (Diagonal Crosswise)

- **视觉意象**：左上格（主状态）与右下格（对立态）通过一条倾斜的隐形对角线互相拉扯，斜角切线分流。

- **适用场景**：概念上的二元对立、矛盾现象。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FAFAF8]">
    <!-- 左上区域：状态 A -->
    <div class="max-w-[75%] border-l-2 border-[var(--color-accent)] pl-3">
      <span class="font-mono text-[8px] text-[var(--color-accent)] tracking-widest block mb-1">STATE A</span>
      <p class="font-serif text-[#3A3837] text-xs leading-relaxed">左上方状态文案，占据高位...</p>
    </div>
    <!-- 中部斜线裁切 -->
    <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8C3BA]/40 to-transparent my-4"></div>
    <!-- 右下区域：状态 B -->
    <div class="max-w-[75%] align-self-end ml-auto text-right border-r-2 border-[#C8C3BA] pr-3">
      <span class="font-mono text-[8px] text-[#888580] tracking-widest block mb-1">STATE B</span>
      <p class="font-serif text-[#888580] text-xs leading-relaxed">右下方对立文案，带有情绪沉降...</p>
    </div>
  </div>
  ```

### ━━━━━━━━━━━━━━━━━━━━━━━━━

### P3 组 · 要点列举 (LIST)

### ━━━━━━━━━━━━━━━━━━━━━━━━━

#### C1: 左右交错律动 (Alternating Step-Ladder Grid)

- **视觉意象**：奇数项偏左，偶数项偏右缩进，末尾高光色块收束。
- **适用场景**：5个最直接的崩溃信号或干货要点。

#### C2: 进度刻度虚线 (Progress Ticks Timeline)

- **视觉意象**：卡片左侧有一根连续的 `border-dashed` 垂直细线，要点文字像音符一样沿着虚线错落悬挂，干净利落。

- **适用场景**：有序步骤、演进阶段、恶化历程。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FFFFFF]">
    <h3 class="font-serif font-bold text-[#2C2B29] text-base border-b border-[#E5E1DA] pb-2.5">要点步骤演进</h3>
    <div class="flex-1 flex flex-col justify-around py-4 pl-4 relative border-l border-dashed border-[#C8C3BA]">
      <!-- 步骤1 -->
      <div class="relative pl-6 space-y-1">
        <div class="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
        <span class="font-mono text-[8px] text-[#B0ABA4]">STEP 01</span>
        <p class="font-serif text-xs text-[#3A3837]">步骤列表要点一内容</p>
      </div>
      <!-- 步骤2 -->
      <div class="relative pl-6 space-y-1">
        <div class="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#C8C3BA]"></div>
        <span class="font-mono text-[8px] text-[#B0ABA4]">STEP 02</span>
        <p class="font-serif text-xs text-[#3A3837]">步骤列表要点二内容</p>
      </div>
    </div>
  </div>
  ```

#### C3: 1大4小重心失调 (Asymmetric Anchor List)

- **视觉意象**：顶部为占据半个画面的「高对比度锚点块」，下方则将4个要点紧凑地排成 2x2 网格，打破等权比例。

- **适用场景**：1个绝对核心前提 + 4个次要衍生点。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FAFAF8]">
    <!-- 顶部超级锚点区 -->
    <div class="bg-[var(--color-accent-subtle)] p-4 border border-[var(--color-accent-border)] rounded-sm">
      <span class="text-[8px] font-mono text-[var(--color-accent)] font-bold block mb-1">★ THE ANCHOR</span>
      <p class="font-serif font-bold text-sm text-[#2C2B29]">这里是占据绝对首位的大核心论点金句...</p>
    </div>
    <!-- 下方 2x2 网格 -->
    <div class="grid grid-cols-2 gap-4 pt-4 text-[10.5px] border-t border-[#E5E1DA]">
      <div class="space-y-1"><span class="font-mono text-[8px] text-[#888580]">01 //</span><p class="font-serif text-xs text-[#3A3837]">次级点 A</p></div>
      <div class="space-y-1"><span class="font-mono text-[8px] text-[#888580]">02 //</span><p class="font-serif text-xs text-[#3A3837]">次级点 B</p></div>
    </div>
  </div>
  ```

### ━━━━━━━━━━━━━━━━━━━━━━━━━

### P4 组 · 深度金句 (QUOTE)

### ━━━━━━━━━━━━━━━━━━━━━━━━━

#### D1: 双色切割锚点 (Split-Tone Block)

- **视觉意象**：纵向 35% 强调实色色块与 65% 白底留白的大对比切割。
- **适用场景**：画卷印章质感，适合烘托深度书籍摘录。

#### D2: 极端空无负空间 (Extreme Negative Space)

- **视觉意象**：卡片 90% 面积全空。只有两行极小的 `text-[13px]` 衬线斜体位于绝对视觉正中心，署名标签逆时针旋转 90 度贴在卡片最边缘，极其震撼。

- **适用场景**：振聋发聩、引起极度静默反思的灵魂金句。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FFFFFF] relative">
    <span class="font-mono text-[8px] text-[#B0ABA4] tracking-widest block uppercase">SILENT NOTE</span>
    <!-- 极小金句悬浮于空无之中 -->
    <div class="my-auto text-center px-4">
      <p class="font-serif italic text-textHeading text-base leading-loose">“ 这里是非常简短、但重若千钧的灵魂拷问金句文字。 ”</p>
    </div>
    <!-- 90度垂直反转的边缘署名 -->
    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 origin-right text-[8px] font-mono text-[#B0ABA4] tracking-widest whitespace-nowrap">
      SOURCE DESIGNATORS // AUTHOR ■
    </div>
  </div>
  ```

#### D3: 印章图腾重叠 (Embossed Seal Overlay)

- **视觉意象**：左侧一根粗壮的竖向 Accent 装饰色条，文字叠放在上方，右下角盖上文心朱砂红印章方形实块（■），营造出经典的非对称信笺印章感。

- **适用场景**：带有个人强烈宣言、背书、极具仪式感的警句。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FAFAF8] relative">
    <div class="flex items-center space-x-2">
      <div class="w-1.5 h-1.5 accent-bg rounded-sm"></div>
      <span class="font-mono text-[9px] text-[#888580] tracking-widest">STARK PHRASE</span>
    </div>
    <div class="my-auto pl-6 border-l-2 border-[var(--color-accent)] py-2 space-y-4">
      <blockquote class="font-serif text-[#2C2B29] text-base leading-relaxed font-semibold">“ 信息进来，如果没有被判定去向，它就永远停在那里，变成认知负担。”</blockquote>
      <div class="w-8 h-[1px] bg-[#C8C3BA]"></div>
      <p class="font-serif text-xs text-[#888580] italic">《换工具不解决问题》</p>
    </div>
    <!-- 经典朱砂红正方形印章 -->
    <div class="flex justify-end items-end"><div class="w-6 h-6 accent-bg flex items-center justify-center text-white text-[10px] font-bold">■</div></div>
  </div>
  ```

### ━━━━━━━━━━━━━━━━━━━━━━━━━

### P5 组 · 行动指南 (ACTION)

### ━━━━━━━━━━━━━━━━━━━━━━━━━

#### E1: 极简等线宣言 (Stark Manifesto)

- **视觉意象**：纯等线水平分割，搭配大号衬线数字（`01 / 02`）上下交叠。
- **适用场景**：硬朗、不容置疑的三步走方案。

#### E2: 三栏竖切并列 (Vertical Triptych)

- **视觉意象**：卡片横向均匀地分成三等分竖栏，中间使用 1px 的极细灰线隔开，每一栏在底部或顶部非对称地放置一个行动，极具视觉秩序感。

- **适用场景**：平行的三个行动，或者是无先后顺序的并列策略。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FFFFFF]">
    <div class="border-b border-[#E5E1DA] pb-3 mb-4"><span class="font-mono text-[8px] text-[var(--color-accent)] font-bold">TRIPTYCH ACTION</span><h3 class="font-serif font-bold text-xs text-[#2C2B29]">并列三部曲</h3></div>
    <div class="flex-1 grid grid-cols-3 gap-3 text-[10px] py-4">
      <!-- 栏1 -->
      <div class="flex flex-col justify-between pr-2 border-r border-[#E5E1DA]">
        <span class="font-serif text-xl font-bold text-[#C8C3BA]">01</span>
        <p class="font-serif leading-relaxed text-[#3A3837]">步骤一正文文字</p>
      </div>
      <!-- 栏2 -->
      <div class="flex flex-col justify-between px-1 pr-2 border-r border-[#E5E1DA] pt-6">
        <span class="font-serif text-xl font-bold text-[var(--color-accent)]">02</span>
        <p class="font-serif leading-relaxed text-[#3A3837]">步骤二正文文字</p>
      </div>
      <!-- 栏3 -->
      <div class="flex flex-col justify-between pl-2 pt-12">
        <span class="font-serif text-xl font-bold text-[#2C2B29]">03</span>
        <p class="font-serif leading-relaxed text-[#888580] font-semibold">步骤三正文文字</p>
      </div>
    </div>
  </div>
  ```

#### E3: 阶梯蛇形流动 (Asymmetric S-Curve Flow)

- **视觉意象**：步骤1极度居左，步骤2极度居右，步骤3再次拉回偏左。不使用任何边框，全靠段落缩进产生的曲线气流在卡片上流动。

- **适用场景**：逻辑层层递进、具有引导性和因果性的转换思路。

- **核心 Tailwind 代码**：

  ```
  <div class="p-8 flex flex-col justify-between h-full bg-[#FAFAF8]">
    <div class="text-right font-mono text-[8px] text-[#B0ABA4] tracking-widest">S-CURVE DECISION</div>
    <div class="flex-1 flex flex-col justify-around py-4">
      <!-- 第 1 步 (靠左) -->
      <div class="max-w-[70%] space-y-1"><span class="font-serif text-lg font-bold text-[var(--color-accent)]">01.</span><p class="font-serif text-xs text-[#3A3837]">阶梯一靠左行动步骤...</p></div>
      <!-- 第 2 步 (靠右) -->
      <div class="max-w-[70%] ml-auto text-right space-y-1"><span class="font-serif text-lg font-bold text-[#888580]">02.</span><p class="font-serif text-xs text-[#3A3837]">阶梯二偏右错位行动步骤...</p></div>
      <!-- 第 3 步 (偏下靠左) -->
      <div class="max-w-[80%] space-y-1 border-t border-[#E5E1DA] pt-2"><span class="font-serif text-lg font-bold text-[#2C2B29]">03.</span><p class="font-serif text-xs text-[#888580] font-semibold">阶梯三落回靠左的终极答案</p></div>
    </div>
  </div>
  ```

## 3. 随机化版式生成原则 (Rhythm Combinatorics)

要想生成绝不疲劳的视觉故事线，在给 5 张卡片（P1 ~ P5）配置版式时，严禁使用“同一版式属性（如全白、全黑、全等距）”。必须遵循以下**冲突波动模型（The Contrast Wave）**：

- **P1（封面）**：选择 **A2 (巨字水印)** 或 **A3 (竖分色块)**。先用高密度的几何关系进行“重音撞击”。
- **P2（对比）**：选择 **B1 (错落阶梯)** 或 **B3 (斜角剪影)**。降低明度，以左右/上下的骨架进行横向和纵向的延展。
- **P3（要点）**：选择 **C2 (虚线刻度)**。提供规律、硬朗、纵向沉降的节拍，使读者的情绪在浏览到第三张时进入稳定区。
- **P4（金句）**：选择 **D1 (双色切割)** 或 **D2 (极端留白)**。这是整套幻灯片视觉重量的最高点（或者最空旷点）。利用大色块切分或者极度的空无，制造“视觉断崖”，强制用户在此处停留阅读。
- **P5（终章）**：选择 **E2 (三栏并列)** 或 **E3 (蛇形梯阶)**。横向拓宽空间，用理性有力的正交秩序引导用户，并提供清晰的逻辑指引，方便长按截图。

## 4. GPTs / Custom Skill 预设提示词模板

将以下提示词配置进自定义 Skill 即可完美执行本协议：

```
# Role: Stark Editorial Slide Engineer

## Profile
You are a highly skilled Editorial Designer specialized in "Wenxin Design Spec" & "Stark Asymmetric Editorial Layouts". Your job is to convert raw Markdown scripts into a premium responsive single-file workspace. This workspace must feature 5 distinct, high-end 3:4 Xiaohongshu slides utilizing stark, non-uniform, off-grid asymmetric layouts.

## Rhythm Strategy (Anti-Fatigue Mandate)
Analyze the copy's emotional peaks and values. You MUST NOT repeat layout patterns. Map the 5 slides strictly to the following 5 distinct categories, randomly picking ONE variant per slide to create a highly varied visual sequence:

- Slide 1 (Cover) -> Choose randomly from [A1: Off-Grid Gravity, A2: Giant Glyph Watermark, A3: Vertical Panel Splice]
- Slide 2 (Contrast) -> Choose randomly from [B1: Cascade Split Offset, B2: Focal Micro-Zoom, B3: Diagonal Crosswise]
- Slide 3 (Indicators) -> Choose randomly from [C1: Alternating Step Grid, C2: Timeline dashed line, C3: Asymmetric Anchor Grid]
- Slide 4 (Pull Quote) -> Choose randomly from [D1: Split-Tone Block, D2: Extreme Negative Space, D3: Seal Badge Overlay]
- Slide 5 (Call to Action) -> Choose randomly from [E1: Stark Lines, E2: Vertical Triptych Split, E3: S-Curve Flow]

## Styling Tokens
- Canvas size: 3:4 ratio, width max 380px.
- Background: Work area #F2F0EB (羊皮暖白), Card body #FAFAF8 or #FFFFFF. Primary text #3A3837 (Warm charcoal). Accent color #8B3525 (Cinnabar) or #1E3A4C (Indigo) or #2A4D3E (Evergreen).
- Font Stack: "Lora" & "Noto Serif SC" for Serif (Expressive); "Inter" & "Noto Sans SC" for Sans-Serif (Metadata).
- Strict restraint: NO shadow, NO borders except 1px separators, NO color block background panels unless specified (like D1). Accent appears <= 2 times per slide.

## Output Blueprint
Generate a SINGLE fully self-contained HTML file featuring:
1. Left Pane: Configuration editor with a Select dropdown for each card allowing live layout switching between A1-A3, B1-B3, C1-C3, D1-D3, E1-E3. Updating any input or select dynamically synchronizes the corresponding preview slide.
2. Right Pane: Pure high-res 3:4 preview canvases. Each canvas must have an individual high-definition PNG export button executing html2canvas (scale: 3, shadows & interface borders are hidden dynamically during capturing).
```