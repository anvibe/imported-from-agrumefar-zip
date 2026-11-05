export default function Calendar({ t, lang, products }) {
  const now = new Date().getMonth();
  return (
    <section id="calendar" className="section calendar">
      <div className="section-head">
        <p className="eyebrow">{t.calEyebrow}</p>
        <h2 className="section-title">{t.calTitle}</h2>
        <p className="section-intro">{t.calIntro}</p>
      </div>
      <div className="cal-scroll">
        <div className="cal" role="table" aria-label={t.calTitle}>
          <div className="cal-row cal-head" role="row">
            <span className="cal-name" role="columnheader">{t.calProduct}</span>
            {t.months.map((m, i) => (
              <span key={m} role="columnheader" className={`cal-month ${i === now ? "cal-now" : ""}`}>
                {m}
                {i === now && <em>{t.calNow}</em>}
              </span>
            ))}
          </div>
          {products.map((p) => (
            <div key={p.id} className="cal-row" role="row" style={{ "--c": p.label }}>
              <span className="cal-name" role="rowheader">
                <i className="cal-swatch" aria-hidden="true" />
                {p.title[lang]}
              </span>
              {t.months.map((m, i) => {
                const on = p.season.includes(i);
                return (
                  <span
                    key={m}
                    role="cell"
                    className={`cal-cell ${on ? "is-on" : ""} ${i === now ? "is-now" : ""}`}
                    aria-label={on ? `${p.title[lang]}: ${m}` : undefined}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
