import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import Jar from "./Jar";

const depths = [1.6, 1, 0.8, 1.9];

export default function Hero({ t, products, scrollY, onJar, onScrollDown }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const move = (e) => {
      if (mq.matches) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) - 0.5) * 2);
      el.style.setProperty("--my", (((e.clientY - r.top) / r.height) - 0.5) * 2);
    };
    const leave = () => {
      el.style.setProperty("--mx", 0);
      el.style.setProperty("--my", 0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const rot = Math.max(-45, -scrollY * 0.05);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />
      <h1 className="sr-only">{t.heroTitle}</h1>

      <div className="hero-stage" aria-hidden="true">
        <svg viewBox="0 0 1000 900" className="hero-shape">
          <defs>
            <linearGradient id="heroShapeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b6650" />
              <stop offset="1" stopColor="#143a2b" />
            </linearGradient>
            <path id="heroArc" d="M 125 900 A 400 400 0 1 1 875 900" />
          </defs>
          <path
            d="M 400 210 Q 500 170 600 210 L 850 420 Q 900 465 912 530 L 990 900 L 10 900 L 88 530 Q 100 465 150 420 Z"
            fill="url(#heroShapeFill)"
            stroke="url(#heroShapeFill)"
            strokeWidth="80"
            strokeLinejoin="round"
          />
          <g transform={`rotate(${rot} 500 760)`}>
            <text className="hero-arc-text">
              <textPath href="#heroArc" startOffset="50%" textAnchor="middle">
                {t.arc}
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      {products.map((p, i) => (
        <button
          key={p.id}
          className={`hero-jar hero-jar-${i + 1}`}
          style={{ "--depth": depths[i] }}
          onClick={() => onJar(p.id)}
          aria-label={p.title.en}
        >
          <span className="hero-jar-float">
            <Jar p={p} uid={`hero-${p.id}`} />
          </span>
        </button>
      ))}

      <button className="hero-scroll" onClick={onScrollDown}>
        <span>{t.scroll}</span>
        <ArrowDown size={14} />
      </button>
      <a href="#privacy" className="hero-privacy">{t.privacy}</a>
    </section>
  );
}
