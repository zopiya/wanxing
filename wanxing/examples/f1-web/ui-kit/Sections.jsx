/* Section helpers — eyebrow + title + lede, used by every page section. */

function SectionHeader({ eyebrow, title, desc, children }) {
  return (
    <div>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {desc && <p className="section-desc">{desc}</p>}
      {children}
    </div>
  );
}

/* A single "principle" card — top hairline, number, title, body. */
function PrincipleCard({ num, title, body }) {
  return (
    <article className="phil">
      <span className="phil-num">{num}</span>
      <h3 className="phil-title">{title}</h3>
      <p className="phil-desc">{body}</p>
    </article>
  );
}

/* A single "form" tile — left hairline that lights up on hover/select. */
function FormItem({ code, name, desc, current, onClick }) {
  return (
    <div
      className={'form-item' + (current ? ' is-current' : '')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }) : undefined}
    >
      <span className="form-item-code">{code}</span>
      <h3 className="form-item-name">{name}</h3>
      <p className="form-item-desc">{desc}</p>
    </div>
  );
}

window.SectionHeader = SectionHeader;
window.PrincipleCard = PrincipleCard;
window.FormItem = FormItem;
