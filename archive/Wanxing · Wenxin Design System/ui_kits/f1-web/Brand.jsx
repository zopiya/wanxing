/* Brand · cinnabar seal + breathing ■
   No external icon library — these two SVGs ship inline. */

function BrandSeal({ size = 32, mono = false }) {
  if (mono) {
    return (
      <svg className="brand-seal-svg" style={{ width: size, height: size, color: 'var(--fg-1)' }}
           viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="4" fill="currentColor" />
        <rect x="16" y="16" width="32" height="32" rx="2" fill="none" stroke="var(--bg-1)" strokeWidth="2.5" />
        <path d="M32 24v16M24 32h16" stroke="var(--bg-1)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="32" r="3" fill="var(--bg-1)" />
      </svg>
    );
  }
  return (
    <svg className="brand-seal-svg" style={{ width: size, height: size }}
         viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="4" fill="#8B3525" />
      <rect x="16" y="16" width="32" height="32" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M32 24v16M24 32h16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function BrandMark() {
  /* The 4-second breathing cinnabar square. CSS animation
     lives in colors_and_type.css under .brand-mark. */
  return <span className="brand-mark" aria-hidden="true" />;
}

window.BrandSeal = BrandSeal;
window.BrandMark = BrandMark;
