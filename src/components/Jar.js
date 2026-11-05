function Pattern({ p }) {
  if (p.pattern === "cherry") {
    const dots = [
      [58, 122, 22], [150, 112, 17], [172, 190, 26], [46, 216, 19],
      [112, 248, 15], [118, 152, 9], [86, 184, 7]
    ];
    return (
      <g>
        {dots.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={p.patternFill} />
            <circle cx={x - r * 0.38} cy={y - r * 0.38} r={r * 0.22} fill={p.accent} opacity="0.45" />
          </g>
        ))}
        <path d="M150 95 q6 -10 16 -12 M58 100 q-4 -8 4 -14 M172 164 q4 -10 14 -12" stroke={p.accent} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  }
  if (p.pattern === "leaf") {
    const leaves = [
      [50, 114, -20], [92, 132, 18], [140, 108, -12], [180, 136, 26],
      [60, 166, 32], [118, 170, -26], [168, 178, 12], [30, 140, 8]
    ];
    return (
      <g>
        {leaves.map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0 -26 C13 -11 13 11 0 26 C-13 11 -13 -11 0 -26 Z" fill={i % 3 === 1 ? p.accent : p.patternFill} />
            <path d="M0 -20 L0 20" stroke={i % 3 === 1 ? p.patternFill : p.label} strokeWidth="2" opacity="0.6" />
          </g>
        ))}
      </g>
    );
  }
  if (p.pattern === "berry") {
    const clusters = [[60, 128], [152, 118], [102, 202], [172, 214], [40, 232], [110, 150]];
    const offs = [[0, 0], [11, 0], [-11, 0], [5.5, 9.5], [-5.5, 9.5], [5.5, -9.5], [-5.5, -9.5]];
    return (
      <g>
        <circle cx="150" cy="170" r="44" fill={p.patternFill} opacity="0.45" />
        <circle cx="50" cy="180" r="30" fill={p.patternFill} opacity="0.35" />
        {clusters.map(([cx, cy], i) => (
          <g key={i}>
            {offs.map(([dx, dy], j) => (
              <circle key={j} cx={cx + dx} cy={cy + dy} r="6.2" fill={p.patternFill} />
            ))}
            <path d={`M${cx - 6} ${cy - 18} q6 -6 12 0`} stroke={p.accent} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>
    );
  }
  const slices = [[56, 124, 24], [158, 116, 20], [122, 200, 28], [36, 220, 18], [188, 220, 22]];
  return (
    <g>
      {slices.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={p.accent} />
          <circle cx={x} cy={y} r={r * 0.84} fill={p.patternFill} />
          {[0, 60, 120].map((a) => (
            <line
              key={a}
              x1={x - Math.cos((a * Math.PI) / 180) * r * 0.84}
              y1={y - Math.sin((a * Math.PI) / 180) * r * 0.84}
              x2={x + Math.cos((a * Math.PI) / 180) * r * 0.84}
              y2={y + Math.sin((a * Math.PI) / 180) * r * 0.84}
              stroke={p.accent}
              strokeWidth="2"
            />
          ))}
          <circle cx={x} cy={y} r={r * 0.14} fill={p.accent} />
        </g>
      ))}
    </g>
  );
}

export default function Jar({ p, uid, className = "" }) {
  const g = (n) => `${uid}-${n}`;
  const nameInk = p.band ? p.bandInk : p.ink;
  return (
    <svg viewBox="0 0 220 300" className={`jar ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={g("lid")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7b8085" />
          <stop offset="0.18" stopColor="#d8dbde" />
          <stop offset="0.32" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#b4b8bd" />
          <stop offset="0.82" stopColor="#8a8f94" />
          <stop offset="1" stopColor="#c8cbcf" />
        </linearGradient>
        <linearGradient id={g("lidTop")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f8f9fa" />
          <stop offset="1" stopColor="#c2c5c9" />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={p.jamDeep} />
          <stop offset="0.3" stopColor={p.jamLight} />
          <stop offset="0.7" stopColor={p.jam} />
          <stop offset="1" stopColor={p.jamDeep} />
        </linearGradient>
        <linearGradient id={g("shade")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.42" />
          <stop offset="0.22" stopColor="#000" stopOpacity="0" />
          <stop offset="0.64" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id={g("body")}>
          <rect x="30" y="66" width="160" height="214" rx="24" />
        </clipPath>
        <clipPath id={g("label")}>
          <rect x="30" y="96" width="160" height="158" />
        </clipPath>
      </defs>

      <ellipse cx="110" cy="288" rx="74" ry="7" fill="rgba(70,20,25,0.2)" />
      <rect x="44" y="52" width="132" height="20" rx="5" fill={p.jamDeep} />

      <g clipPath={`url(#${g("body")})`}>
        <rect x="30" y="66" width="160" height="214" fill={`url(#${g("glass")})`} />
        <g clipPath={`url(#${g("label")})`}>
          <rect x="30" y="96" width="160" height="158" fill={p.label} />
          <Pattern p={p} />
          {p.band && <rect x="30" y="182" width="160" height="72" fill={p.band} />}
        </g>
        <text x="110" y="124" textAnchor="middle" className="jar-brand" fill={p.ink}>TERRASOLE</text>
        <text x="110" y="140" textAnchor="middle" className="jar-farm" fill={p.ink}>Farm</text>
        <text x="110" y="172" textAnchor="middle" className="jar-kind" fill={p.ink}>{p.kind}</text>
        <text
          x="110"
          y="208"
          textAnchor="middle"
          className="jar-name"
          fill={nameInk}
          textLength={p.nameLen}
          lengthAdjust="spacingAndGlyphs"
        >
          {p.name}
        </text>
        <text x="110" y="228" textAnchor="middle" className="jar-sub" fill={nameInk}>{p.labelSub}</text>
        <rect x="30" y="66" width="160" height="214" fill={`url(#${g("shade")})`} />
        <rect x="44" y="74" width="12" height="196" rx="6" fill="#fff" opacity="0.32" />
        <rect x="62" y="80" width="4" height="180" rx="2" fill="#fff" opacity="0.18" />
        <rect x="170" y="84" width="5" height="170" rx="2.5" fill="#fff" opacity="0.14" />
      </g>

      <rect x="36" y="12" width="148" height="46" rx="9" fill={`url(#${g("lid")})`} />
      <ellipse cx="110" cy="13" rx="73" ry="6" fill={`url(#${g("lidTop")})`} />
      <rect x="36" y="47" width="148" height="3" fill="#000" opacity="0.12" />
      <rect x="56" y="16" width="10" height="38" rx="5" fill="#fff" opacity="0.5" />
    </svg>
  );
}
