import "./styles.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuOverlay from "./components/MenuOverlay";
import Products from "./components/Products";
import Groves from "./components/Groves";
import Calendar from "./components/Calendar";
import Visit from "./components/Visit";
import Toast from "./components/Toast";
import { copy } from "./data/content";
import { products } from "./data/products";

export default function App() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [basket, setBasket] = useState({});
  const [toast, setToast] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const t = copy[lang];

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const goTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const addToBasket = (p) => {
    setBasket((b) => ({ ...b, [p.id]: (b[p.id] || 0) + 1 }));
    setToast({ key: Date.now(), text: t.added(p.title[lang]) });
  };

  const count = useMemo(
    () => Object.values(basket).reduce((a, b) => a + b, 0),
    [basket]
  );

  return (
    <div className="site">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((o) => !o)}
        scrolled={scrollY > 40}
        count={count}
        onBasket={() => goTo("pantry")}
      />
      <MenuOverlay open={menuOpen} t={t} onNavigate={goTo} onClose={closeMenu} />
      <main>
        <Hero
          t={t}
          products={products}
          scrollY={scrollY}
          onJar={(id) => goTo(`product-${id}`)}
          onScrollDown={() => goTo("pantry")}
        />
        <Products t={t} lang={lang} products={products} basket={basket} onAdd={addToBasket} />
        <Groves t={t} />
        <Calendar t={t} lang={lang} products={products} />
      </main>
      <Visit t={t} />
      <Toast toast={toast} />
    </div>
  );
}
