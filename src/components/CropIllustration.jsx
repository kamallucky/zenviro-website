/**
 * Custom SVG illustrations for each crop type — replaces emojis with on-brand artwork.
 */

export function ChilliIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chilli-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444"/>
          <stop offset="100%" stopColor="#B91C1C"/>
        </linearGradient>
        <linearGradient id="chilli-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65A30D"/>
          <stop offset="100%" stopColor="#3F6212"/>
        </linearGradient>
      </defs>
      {/* Stem */}
      <path d="M44 14 Q42 18 40 22" stroke="#3F6212" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Leaf */}
      <path d="M38 14 Q32 11 30 17 Q34 19 38 18 Q40 16 38 14Z" fill="url(#chilli-leaf)"/>
      {/* Chilli body — curved */}
      <path d="M40 20 Q56 26 60 50 Q60 66 48 70 Q36 70 32 58 Q34 36 40 20Z" fill="url(#chilli-body)"/>
      {/* Highlight */}
      <path d="M44 28 Q48 38 50 56" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function RiceIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rice-grain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#D97706"/>
        </linearGradient>
        <linearGradient id="rice-stem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84CC16"/>
          <stop offset="100%" stopColor="#3F6212"/>
        </linearGradient>
      </defs>
      {/* Main stem */}
      <path d="M40 70 L40 18" stroke="url(#rice-stem)" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Grain heads — left side */}
      {[24, 32, 40, 48, 56].map((y, i) => (
        <g key={`l-${i}`}>
          <ellipse cx={36 - i * 1.5} cy={y} rx="3" ry="4" fill="url(#rice-grain)" transform={`rotate(-25 ${36 - i * 1.5} ${y})`}/>
        </g>
      ))}
      {/* Grain heads — right side */}
      {[26, 34, 42, 50, 58].map((y, i) => (
        <g key={`r-${i}`}>
          <ellipse cx={44 + i * 1.5} cy={y} rx="3" ry="4" fill="url(#rice-grain)" transform={`rotate(25 ${44 + i * 1.5} ${y})`}/>
        </g>
      ))}
      {/* Top grain */}
      <ellipse cx="40" cy="16" rx="3" ry="5" fill="url(#rice-grain)"/>
      {/* Bottom leaves */}
      <path d="M40 60 Q30 62 22 70" stroke="url(#rice-stem)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M40 62 Q50 64 58 72" stroke="url(#rice-stem)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function CottonIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cotton-puff" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="80%" stopColor="#F1F5F9"/>
          <stop offset="100%" stopColor="#CBD5E1"/>
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M40 70 L40 50" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Bracts (sepals) — brown leaves cradle */}
      <path d="M22 52 Q26 60 36 56 Q34 64 26 66 Z" fill="#92400E"/>
      <path d="M58 52 Q54 60 44 56 Q46 64 54 66 Z" fill="#92400E"/>
      <path d="M40 64 L34 72 L46 72 Z" fill="#92400E"/>
      {/* Cotton puffs */}
      <circle cx="30" cy="32" r="13" fill="url(#cotton-puff)"/>
      <circle cx="50" cy="30" r="14" fill="url(#cotton-puff)"/>
      <circle cx="40" cy="42" r="14" fill="url(#cotton-puff)"/>
      <circle cx="36" cy="20" r="10" fill="url(#cotton-puff)"/>
      <circle cx="52" cy="44" r="10" fill="url(#cotton-puff)"/>
      {/* Highlights */}
      <circle cx="36" cy="28" r="3" fill="white" opacity="0.7"/>
      <circle cx="46" cy="26" r="2.5" fill="white" opacity="0.6"/>
    </svg>
  );
}

export function FlowersIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flower-petal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCA5A5"/>
          <stop offset="100%" stopColor="#DC2626"/>
        </radialGradient>
        <radialGradient id="flower-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#D97706"/>
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M40 70 L40 38" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Leaf */}
      <path d="M40 56 Q28 52 22 60 Q30 62 40 60Z" fill="#65A30D"/>
      {/* Petals around center */}
      {[0, 60, 120, 180, 240, 300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const cx = 40 + 12 * Math.cos(rad);
        const cy = 30 + 12 * Math.sin(rad);
        return <ellipse key={angle} cx={cx} cy={cy} rx="9" ry="6" fill="url(#flower-petal)" transform={`rotate(${angle} ${cx} ${cy})`}/>;
      })}
      {/* Center */}
      <circle cx="40" cy="30" r="6" fill="url(#flower-center)"/>
      <circle cx="38" cy="28" r="1.5" fill="rgba(255,255,255,0.6)"/>
    </svg>
  );
}

export function VegetablesIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tomato" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F87171"/>
          <stop offset="100%" stopColor="#B91C1C"/>
        </radialGradient>
        <linearGradient id="leaf-veg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84CC16"/>
          <stop offset="100%" stopColor="#3F6212"/>
        </linearGradient>
      </defs>
      {/* Leafy greens at back */}
      <path d="M16 36 Q14 24 24 22 Q30 30 26 42 Z" fill="url(#leaf-veg)"/>
      <path d="M58 30 Q70 28 68 40 Q60 44 52 38 Z" fill="url(#leaf-veg)"/>
      <path d="M22 42 Q12 40 14 50 Q22 54 28 48 Z" fill="url(#leaf-veg)" opacity="0.85"/>
      {/* Tomato */}
      <circle cx="44" cy="48" r="20" fill="url(#tomato)"/>
      {/* Tomato stem */}
      <path d="M44 28 L44 32 M40 30 L46 32 M48 30 L42 32" stroke="#3F6212" strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 30 Q44 26 48 30 Q44 28 44 32" fill="#65A30D"/>
      {/* Tomato highlight */}
      <ellipse cx="38" cy="40" rx="4" ry="6" fill="rgba(255,255,255,0.3)"/>
    </svg>
  );
}

export function FruitsIllustration({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mango" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FBBF24"/>
          <stop offset="100%" stopColor="#D97706"/>
        </radialGradient>
        <radialGradient id="orange-fruit" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FB923C"/>
          <stop offset="100%" stopColor="#C2410C"/>
        </radialGradient>
        <linearGradient id="leaf-fruit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65A30D"/>
          <stop offset="100%" stopColor="#3F6212"/>
        </linearGradient>
      </defs>
      {/* Leaves */}
      <path d="M28 14 Q22 18 24 26 Q32 24 32 18 Q30 14 28 14Z" fill="url(#leaf-fruit)"/>
      <path d="M52 12 Q58 16 56 24 Q48 22 48 16 Q50 12 52 12Z" fill="url(#leaf-fruit)"/>
      {/* Mango */}
      <ellipse cx="32" cy="38" rx="16" ry="18" fill="url(#mango)" transform="rotate(-12 32 38)"/>
      {/* Orange */}
      <circle cx="52" cy="50" r="16" fill="url(#orange-fruit)"/>
      {/* Highlights */}
      <ellipse cx="26" cy="32" rx="3" ry="5" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="47" cy="44" rx="3" ry="4" fill="rgba(255,255,255,0.3)"/>
      {/* Orange texture dots */}
      <circle cx="56" cy="46" r="0.8" fill="rgba(0,0,0,0.15)"/>
      <circle cx="50" cy="54" r="0.8" fill="rgba(0,0,0,0.15)"/>
      <circle cx="60" cy="52" r="0.8" fill="rgba(0,0,0,0.15)"/>
    </svg>
  );
}

export const cropIllustrations = {
  chilli: ChilliIllustration,
  rice: RiceIllustration,
  cotton: CottonIllustration,
  flowers: FlowersIllustration,
  vegetables: VegetablesIllustration,
  fruits: FruitsIllustration,
};
