import { Plus, Check } from "lucide-react";
import Jar from "./Jar";

export default function Products({ t, lang, products, basket, onAdd }) {
  const fmt = new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-IE", {
    style: "currency",
    currency: "EUR"
  });
  return (
    <section id="pantry" className="section pantry">
      <div className="section-head">
        <p className="eyebrow">{t.pantryEyebrow}</p>
        <h2 className="section-title">{t.pantryTitle}</h2>
        <p className="section-intro">{t.pantryIntro}</p>
      </div>
      <div className="product-grid">
        {products.map((p) => {
          const qty = basket[p.id] || 0;
          return (
            <article
              key={p.id}
              id={`product-${p.id}`}
              className="product-card"
              style={{ "--tint": p.tint, "--accent": p.label }}
            >
              <div className="product-visual">
                <Jar p={p} uid={`card-${p.id}`} className="product-jar" />
              </div>
              <div className="product-body">
                <p className="product-type">{p.type[lang]}</p>
                <h3 className="product-name">{p.title[lang]}</h3>
                <p className="product-desc">{p.desc[lang]}</p>
                <div className="product-foot">
                  <div className="product-price">
                    <strong>{fmt.format(p.price)}</strong>
                    <span>{p.weight}</span>
                  </div>
                  <button
                    className={`add-btn ${qty ? "is-added" : ""}`}
                    onClick={() => onAdd(p)}
                  >
                    {qty ? <Check size={16} /> : <Plus size={16} />}
                    <span>{qty ? `${t.inBasket} · ${qty}` : t.add}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
