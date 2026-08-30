# 打包产物 · Bundles

`wenxin.css` —— 完整 kit，已展平全部 `@import`，**不压缩**（工程化在系统完成之后再谈）。

```html
<link rel="stylesheet" href="kit/dist/wenxin.css">
```

需要某个媒介的专属 token 时，**额外**引一个小文件：

```html
<link rel="stylesheet" href="kit/dist/wenxin.css">
<link rel="stylesheet" href="kit/tokens/forms/f4-print.css">
```

## 为什么不再有分媒介整包

曾经有 `wenxin-f1.css` … `wenxin-f9.css`。九个文件合计 30,358 行，
而它们相对 `wenxin.css` 的**真实差异只有 145 行** —— 每个包都是完整 kit 加十几个 token，
99.5% 是重复。一个媒介 token 文件最长 24 行，单独引入即可。

The per-medium bundles carried 145 lines of actual difference across 30,358 lines. Load
`wenxin.css` and add the one form-token file you need.

由 `npm run build:css` 生成，不要手改。
