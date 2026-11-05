export default function Logo({ tone = "default" }) {
  return (
    <a href="#top" className={`logo logo-${tone}`} aria-label="Terrasole Farm, back to top">
      <svg viewBox="0 0 64 46" className="logo-mark" aria-hidden="true">
        <path d="M30 3 C38 3 42 10 35 17 C30 12 28 8 30 3 Z" className="logo-leaf" />
        <path d="M6 42 A26 26 0 0 1 58 42 Z" className="logo-sun" />
        <path d="M12 34 Q32 24 52 34" className="logo-terrace" />
        <path d="M8 41 Q32 30 56 41" className="logo-terrace" />
        <path d="M19 27 Q32 20 45 27" className="logo-terrace" />
      </svg>
      <span className="logo-word">Terrasole</span>
      <span className="logo-sub">Farm</span>
    </a>
  );
}
