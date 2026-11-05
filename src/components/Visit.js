import { useState } from "react";
import { MapPin, Clock, Phone, ArrowRight, Instagram } from "lucide-react";
import Logo from "./Logo";

export default function Visit({ t }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  };

  return (
    <footer id="visit" className="visit">
      <div className="visit-grid">
        <div className="visit-copy">
          <p className="eyebrow eyebrow-light">{t.visitEyebrow}</p>
          <h2 className="visit-title">{t.visitTitle}</h2>
          <p className="visit-body">{t.visitBody}</p>
          <ul className="visit-info">
            <li><MapPin size={18} /> {t.address}</li>
            <li><Clock size={18} /> {t.hours}</li>
            <li><Phone size={18} /> <a href="tel:+390942551207">{t.phone}</a></li>
          </ul>
        </div>
        <form className="news-card" onSubmit={submit} noValidate>
          <h3 className="news-title">{t.newsTitle}</h3>
          <p className="news-body">{t.newsBody}</p>
          <div className="news-field">
            <label htmlFor="news-email" className="sr-only">{t.newsPlaceholder}</label>
            <input
              id="news-email"
              type="email"
              value={email}
              placeholder={t.newsPlaceholder}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state !== "idle") setState("idle");
              }}
            />
            <button type="submit" className="news-btn">
              {t.newsCta}
              <ArrowRight size={16} />
            </button>
          </div>
          <p className={`news-msg news-${state}`} role="status">
            {state === "done" ? t.newsThanks : state === "error" ? t.newsError : ""}
          </p>
        </form>
      </div>
      <div className="footer-bar">
        <Logo tone="light" />
        <nav className="footer-links" aria-label="Footer">
          {t.footerLinks.map((l) => (
            <a key={l} href="#visit">{l}</a>
          ))}
          <a id="privacy" href="#privacy">{t.privacy}</a>
          <a href="#visit" aria-label="Instagram" className="footer-social"><Instagram size={18} /></a>
        </nav>
        <p className="footer-rights">{t.rights}</p>
      </div>
    </footer>
  );
}
