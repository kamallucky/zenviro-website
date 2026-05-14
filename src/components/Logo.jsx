export default function Logo({ dark = false }) {
  const textColor = dark ? '#0F3D1F' : '#FFFFFF';
  const subColor = dark ? '#4A5A4A' : 'rgba(255,255,255,0.75)';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* SVG Logo Mark */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" rx="10" fill={dark ? '#0F3D1F' : 'rgba(255,255,255,0.15)'} />
        {/* Z letterform */}
        <path
          d="M10 12H30L12 28H32"
          stroke={dark ? '#EF9F27' : '#EF9F27'}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Leaf curl on top-right of Z */}
        <path
          d="M28 8 C32 8, 36 12, 34 16 C32 14, 30 11, 28 8Z"
          fill="#639922"
        />
        <path
          d="M30 9 C33 11, 34 15, 32 17"
          stroke="#639922"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Small leaf dot */}
        <circle cx="35" cy="10" r="2" fill="#EF9F27" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className="font-display font-bold tracking-tight"
          style={{ color: textColor, fontSize: '20px', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          ZENVIRO
        </span>
        <span
          className="font-sans uppercase tracking-widest"
          style={{ color: subColor, fontSize: '8px', letterSpacing: '0.18em', fontWeight: 500 }}
        >
          AGRO CHEMICALS
        </span>
      </div>
    </div>
  );
}
