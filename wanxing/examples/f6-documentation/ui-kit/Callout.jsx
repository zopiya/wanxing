/* Five callout types — all wireframe, accent only on warn/danger. */

function Callout({ kind = 'note', label, children }) {
  const defaults = {
    note:   'Note',
    tip:    'Tip',
    warn:   'Caution',
    danger: 'Important',
    quote:  'Aside',
  };
  return (
    <div className={'callout ' + kind}>
      <span className="tag">{label || defaults[kind]}</span>
      {children}
    </div>
  );
}

window.Callout = Callout;
