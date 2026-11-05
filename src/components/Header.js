import { ShoppingBasket } from "lucide-react";
import Logo from "./Logo";

export default function Header({ t, lang, setLang, menuOpen, onMenu, scrolled, count, onBasket }) {
  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu" : ""}`}
    >
      <div className="lang" role="group" aria-label={t.language}>
        {["it", "en"].map((l) => (
          <button
            key={l}
            className={`lang-btn ${lang === l ? "is-active" : ""}`}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <Logo tone={menuOpen ? "light" : "default"} />

      <div className="header-actions">
        <button className="menu-btn" aria-expanded={menuOpen} onClick={onMenu}>
          {menuOpen ? t.close : t.menu}
        </button>
        <button
          className="basket-btn"
          aria-label={`${t.basket}: ${count}`}
          onClick={onBasket}
        >
          <ShoppingBasket size={18} strokeWidth={2.2} />
          {count > 0 && <span className="basket-count">{count}</span>}
        </button>
      </div>
    </header>
  );
}
