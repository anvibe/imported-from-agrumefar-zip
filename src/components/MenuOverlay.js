import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function MenuOverlay({ open, t, onNavigate, onClose }) {
  const firstRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => firstRef.current && firstRef.current.focus(), 250);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-inner">
        <nav className="menu-nav" aria-label="Main">
          <ol>
            {t.nav.map((n, i) => (
              <li key={n.id} style={{ "--i": i }}>
                <button
                  ref={i === 0 ? firstRef : null}
                  tabIndex={open ? 0 : -1}
                  className="menu-link"
                  onClick={() => onNavigate(n.id)}
                >
                  <span className="menu-num">0{i + 1}</span>
                  <span className="menu-text">
                    <span className="menu-label">{n.label}</span>
                    <span className="menu-note">{n.note}</span>
                  </span>
                  <ArrowUpRight className="menu-arrow" size={30} />
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <aside className="menu-aside">
          <img src="https://picsum.photos/seed/farm-shop-doorway/640/760" alt="The farm shop entrance" />
          <p>{t.menuAside}</p>
        </aside>
      </div>
    </div>
  );
}
