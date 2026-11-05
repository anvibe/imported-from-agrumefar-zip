import { Leaf } from "lucide-react";

export default function Groves({ t }) {
  return (
    <section id="groves" className="section groves">
      <div className="groves-copy">
        <p className="eyebrow">{t.grovesEyebrow}</p>
        <h2 className="section-title">{t.grovesTitle}</h2>
        {t.grovesBody.map((para, i) => (
          <p key={i} className="groves-text">{para}</p>
        ))}
        <dl className="stats">
          {t.stats.map((s) => (
            <div key={s.value} className="stat">
              <dt className="stat-value">{s.value}</dt>
              <dd className="stat-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="groves-media">
        <figure className="photo photo-main">
          <img src="https://picsum.photos/seed/terraced-orchard-morning/900/1100" alt="Morning light across the farm terraces" />
        </figure>
        <figure className="photo photo-small">
          <img src="https://picsum.photos/seed/hands-sorting-fruit/600/600" alt="Sorting freshly picked fruit" />
          <figcaption className="photo-chip">
            <Leaf size={15} />
            <span>{t.chip}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
