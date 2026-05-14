import { Bug, Microscope, Sprout, TrendingUp, Atom, Leaf, ShieldCheck } from 'lucide-react';

// Each category has TWO label colors: outer top band and inner label background.
const categoryStyle = {
  insecticides: {
    icon: Bug,
    bandTop: '#0F3D1F',   // deep forest green (matches Block Rock family)
    bandBottom: '#1A5C2A',
    accent: '#EF9F27',    // gold accent inside
    textColor: '#FFFFFF',
    badgeBg: '#DC2626',
    descColor: 'rgba(255,255,255,0.85)',
    tag: 'rgba(239,159,39,0.95)',
  },
  fungicides: {
    icon: Microscope,
    bandTop: '#4C1D95',   // deep purple
    bandBottom: '#7C3AED',
    accent: '#FCD34D',
    textColor: '#FFFFFF',
    badgeBg: '#DC2626',
    descColor: 'rgba(255,255,255,0.85)',
    tag: 'rgba(252,211,77,0.95)',
  },
  herbicides: {
    icon: Sprout,
    bandTop: '#92400E',   // deep amber/brown
    bandBottom: '#D97706',
    accent: '#FEF3C7',
    textColor: '#FFFFFF',
    badgeBg: '#1F2937',
    descColor: 'rgba(255,255,255,0.88)',
    tag: 'rgba(254,243,199,0.95)',
  },
  'plant-growth': {
    icon: TrendingUp,
    bandTop: '#065F46',   // teal-green
    bandBottom: '#059669',
    accent: '#FDE047',
    textColor: '#FFFFFF',
    badgeBg: '#DC2626',
    descColor: 'rgba(255,255,255,0.85)',
    tag: 'rgba(253,224,71,0.95)',
  },
  micronutrients: {
    icon: Atom,
    bandTop: '#1E3A8A',   // deep royal blue
    bandBottom: '#2563EB',
    accent: '#FBBF24',
    textColor: '#FFFFFF',
    badgeBg: '#DC2626',
    descColor: 'rgba(255,255,255,0.85)',
    tag: 'rgba(251,191,36,0.95)',
  },
  biostimulants: {
    icon: Leaf,
    bandTop: '#14532D',   // deep emerald
    bandBottom: '#639922',
    accent: '#FBBF24',
    textColor: '#FFFFFF',
    badgeBg: '#DC2626',
    descColor: 'rgba(255,255,255,0.85)',
    tag: 'rgba(251,191,36,0.95)',
  },
};

// Display label rules per product
function getDisplay(product) {
  if (product.id === 'block-rock') return { kind: 'block-rock' };

  if (product.name === 'Imidacloprid 17.8 SL') return { kind: 'standard', big: 'IMIDACLOPRID', small: '17.8 SL', tag: 'SYSTEMIC INSECTICIDE' };
  if (product.name === 'Profenofos 50% EC') return { kind: 'standard', big: 'PROFENOFOS', small: '50% EC', tag: 'BROAD SPECTRUM' };
  if (product.name === 'Hexaconazole 5% SC') return { kind: 'standard', big: 'HEXACONAZOLE', small: '5% SC', tag: 'SYSTEMIC FUNGICIDE' };
  if (product.name === 'Mancozeb 75% WP') return { kind: 'pouch', big: 'MANCOZEB', small: '75% WP', tag: 'CONTACT FUNGICIDE' };
  if (product.name === 'Glyphosate 41% SL') return { kind: 'standard', big: 'GLYPHOSATE', small: '41% SL', tag: 'SYSTEMIC HERBICIDE' };
  if (product.name === 'Pendimethalin 30% EC') return { kind: 'standard', big: 'PENDIMETHALIN', small: '30% EC', tag: 'PRE-EMERGENCE' };
  if (product.name === 'Seaweed Extract') return { kind: 'standard', big: 'SEAWEED', smallTop: 'EXTRACT', tag: 'BIO STIMULANT' };
  if (product.name === 'NPK 19:19:19') return { kind: 'standard', big: 'NPK', smallTop: '19:19:19', tag: '100% WATER SOLUBLE' };
  if (product.name === 'Zinc EDTA 12%') return { kind: 'element', big: 'ZINC', small: 'EDTA 12%', tag: 'MICRONUTRIENT', symbol: 'Zn' };
  if (product.name === 'Boron 20%') return { kind: 'element', big: 'BORON', small: '20%', tag: 'MICRONUTRIENT', symbol: 'B' };
  if (product.name === 'Ferro EDDHA 6%') return { kind: 'element', big: 'FERRO', small: 'EDDHA 6%', tag: 'MICRONUTRIENT', symbol: 'Fe' };
  if (product.name === 'Magnesium Sulphate 9.6%') return { kind: 'element', big: 'MAGNESIUM', small: 'SULPHATE 9.6%', tag: 'MICRONUTRIENT', symbol: 'Mg' };
  if (product.name === 'Amino Power') return { kind: 'standard', big: 'AMINO', smallTop: 'POWER', tag: 'AMINO ACID BIOSTIMULANT' };
  if (product.name === 'Humic Power') return { kind: 'standard', big: 'HUMIC', smallTop: 'POWER', tag: 'HUMIC ACID BIOSTIMULANT' };
  if (product.name === 'Fulvic Power') return { kind: 'standard', big: 'FULVIC', smallTop: 'POWER', tag: 'FULVIC ACID BIOSTIMULANT' };

  return { kind: 'standard', big: product.name.toUpperCase(), small: product.formulation, tag: '' };
}

function ZenviroLogo({ size = 14, color = '#FFFFFF', accentColor = '#EF9F27' }) {
  return (
    <svg width={size * 2.4} height={size} viewBox="0 0 96 20" fill="none">
      <path d="M3 4H22L6 16H24" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 2 C25 2, 27 5, 25 8 C23 6, 21 4 21 2Z" fill="#639922"/>
      <text x="30" y="13" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="9" letterSpacing="1" fill={color}>ZENVIRO</text>
      <text x="30" y="19" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="4" letterSpacing="1.5" fill={color} opacity="0.7">AGRO CHEMICALS</text>
    </svg>
  );
}

/**
 * Premium product bottle with CATEGORY-COLORED LABELS.
 * Each category gets its own distinctive label color scheme.
 */
export default function ProductBottle({ product, size = 'md', floating = false }) {
  const style = categoryStyle[product.category] || categoryStyle.biostimulants;
  const display = getDisplay(product);

  const dimensions = {
    sm:  { w: 110, h: 160, capW: 56, capH: 18, scale: 0.62 },
    md:  { w: 160, h: 230, capW: 80, capH: 26, scale: 0.9 },
    lg:  { w: 210, h: 300, capW: 106, capH: 34, scale: 1.18 },
    xl:  { w: 270, h: 390, capW: 136, capH: 44, scale: 1.55 },
  }[size];

  // ── MANCOZEB POUCH variant ────────────────────────────────────────
  if (display.kind === 'pouch') {
    return (
      <div className={`relative ${floating ? 'float-bottle' : ''}`} style={{ width: dimensions.w, height: dimensions.h * 0.92 }}>
        <div
          className="absolute inset-x-0 top-3 bottom-0 rounded-2xl flex flex-col items-center justify-center text-center px-3 py-4 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FEF3C7 0%, #FCD34D 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), inset 2px 0 6px rgba(255,255,255,0.7)',
            border: '1px solid #F59E0B',
          }}
        >
          <div className="absolute top-0 left-2 right-2 h-2 rounded-t-md flex justify-around items-center" style={{ background: '#D97706' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-yellow-100" />
            ))}
          </div>
          <div className="mt-3">
            <ZenviroLogo size={dimensions.scale * 11} color="#0F3D1F" accentColor="#0F3D1F" />
          </div>
          <div className="font-black text-black mt-2 leading-none tracking-tight" style={{ fontSize: dimensions.scale * 22 }}>
            {display.big}
          </div>
          <div className="font-bold mt-1.5 px-2 py-0.5 rounded text-white" style={{ background: '#DC2626', fontSize: dimensions.scale * 11 }}>
            {display.small}
          </div>
          <div className="text-[10px] mt-2 font-semibold" style={{ color: '#92400E', fontSize: dimensions.scale * 9 }}>
            {display.tag}
          </div>
        </div>
      </div>
    );
  }

  // ── BLOCK ROCK — flagship design (unchanged) ──────────────────────
  if (display.kind === 'block-rock') {
    return (
      <div className={`relative ${floating ? 'float-bottle' : ''}`} style={{ width: dimensions.w, height: dimensions.h }}>
        <div className="absolute left-1/2 -translate-x-1/2 z-10 rounded-t-2xl"
          style={{
            top: 0, width: dimensions.capW, height: dimensions.capH,
            background: 'linear-gradient(180deg, #1A5C2A 0%, #0F3D1F 100%)',
            boxShadow: '0 -2px 6px rgba(0,0,0,0.2), inset 2px 0 4px rgba(255,255,255,0.15)',
          }}>
          <div className="absolute inset-x-2 top-1 h-px rounded bg-white/20" />
        </div>
        <div className="absolute inset-x-0 rounded-3xl overflow-hidden"
          style={{
            top: dimensions.capH - 4, bottom: 0,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 60%, #e8e8e8 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), inset 3px 0 8px rgba(255,255,255,0.9), inset -4px 0 10px rgba(0,0,0,0.06)',
          }}>
          <div className="absolute opacity-50" style={{ top: 8, left: '12%', width: '8%', height: '70%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, transparent 100%)', borderRadius: '50%' }} />
          <div className="absolute rounded-2xl flex flex-col items-center text-center overflow-hidden"
            style={{ inset: '6% 8% 8% 8%', background: 'linear-gradient(165deg, #1A5C2A 0%, #0F3D1F 100%)', padding: dimensions.scale * 8 }}>
            <div className="flex flex-col items-center" style={{ marginTop: dimensions.scale * 3 }}>
              <ZenviroLogo size={dimensions.scale * 9} color="#FFFFFF" accentColor="#EF9F27" />
            </div>
            <div className="font-black text-white leading-none tracking-tighter" style={{ fontSize: dimensions.scale * 26, marginTop: dimensions.scale * 8 }}>BLOCK</div>
            <div className="font-black leading-none tracking-tighter" style={{ fontSize: dimensions.scale * 26, color: '#fff' }}>ROCK</div>
            <div className="font-black rounded text-white"
              style={{ background: '#DC2626', padding: `${dimensions.scale * 2}px ${dimensions.scale * 10}px`,
                fontSize: dimensions.scale * 10, marginTop: dimensions.scale * 6, letterSpacing: '0.5px' }}>
              BLOCK THRIPS
            </div>
            <div className="text-white/85 font-semibold leading-tight" style={{ fontSize: dimensions.scale * 7, marginTop: dimensions.scale * 4 }}>
              SPECIAL FOR<br />CHILLI & FLOWERS CROPS
            </div>
            <div className="rounded-lg flex items-center justify-center"
              style={{ width: dimensions.scale * 28, height: dimensions.scale * 28,
                background: 'rgba(255,255,255,0.1)', border: '1.5px solid #EF9F27', marginTop: dimensions.scale * 6 }}>
              <ShieldCheck size={dimensions.scale * 16} style={{ color: '#EF9F27' }} />
            </div>
          </div>
          <div className="absolute bottom-0 w-full text-center" style={{ fontSize: dimensions.scale * 7, color: '#6B7280', paddingBottom: dimensions.scale * 4 }}>
            Net Content: <span className="font-semibold">250 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // ── COMMON BOTTLE OUTER (cap + body shell) ────────────────────────
  const Cap = (
    <div className="absolute left-1/2 -translate-x-1/2 z-10 rounded-t-2xl"
      style={{
        top: 0, width: dimensions.capW, height: dimensions.capH,
        background: 'linear-gradient(180deg, #1A5C2A 0%, #0F3D1F 100%)',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.2), inset 2px 0 4px rgba(255,255,255,0.15)',
      }}>
      <div className="absolute inset-x-2 top-1 h-px rounded bg-white/20" />
    </div>
  );

  // ── ELEMENT (micronutrient) variant — colored label with big symbol ──
  if (display.kind === 'element') {
    return (
      <div className={`relative ${floating ? 'float-bottle' : ''}`} style={{ width: dimensions.w, height: dimensions.h }}>
        {Cap}
        {/* Bottle body */}
        <div className="absolute inset-x-0 rounded-3xl overflow-hidden"
          style={{
            top: dimensions.capH - 4, bottom: 0,
            background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 60%, #f0f0f0 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), inset 3px 0 8px rgba(255,255,255,0.9), inset -4px 0 10px rgba(0,0,0,0.06)',
          }}>
          <div className="absolute opacity-50" style={{ top: 8, left: '12%', width: '8%', height: '70%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, transparent 100%)', borderRadius: '50%' }} />

          {/* COLORED INNER LABEL */}
          <div
            className="absolute rounded-2xl flex flex-col items-center text-center overflow-hidden"
            style={{
              inset: '6% 8% 14% 8%',
              background: `linear-gradient(165deg, ${style.bandTop} 0%, ${style.bandBottom} 100%)`,
              padding: dimensions.scale * 8,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <ZenviroLogo size={dimensions.scale * 8} color={style.textColor} accentColor={style.accent} />

            <div className="font-black leading-none tracking-tight"
              style={{ fontSize: dimensions.scale * 20, marginTop: dimensions.scale * 6, color: style.textColor }}>
              {display.big}
            </div>
            <div className="font-bold mt-1 px-2 py-0.5 rounded text-white"
              style={{ background: style.badgeBg, fontSize: dimensions.scale * 9, marginTop: dimensions.scale * 3 }}>
              {display.small}
            </div>

            <div className="font-semibold uppercase"
              style={{ fontSize: dimensions.scale * 6.5, marginTop: dimensions.scale * 3,
                letterSpacing: '0.6px', color: style.tag }}>
              {display.tag}
            </div>

            {/* Big element symbol */}
            <div className="rounded-full flex items-center justify-center font-black"
              style={{
                background: `linear-gradient(135deg, ${style.accent} 0%, ${style.accent}DD 100%)`,
                color: style.bandTop,
                width: dimensions.scale * 42,
                height: dimensions.scale * 42,
                marginTop: dimensions.scale * 6,
                boxShadow: `0 6px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.4)`,
                fontSize: dimensions.scale * 18,
                border: `2px solid rgba(255,255,255,0.3)`,
              }}>
              {display.symbol}
            </div>
          </div>

          <div className="absolute bottom-0 w-full text-center"
            style={{ fontSize: dimensions.scale * 6, color: '#9CA3AF', paddingBottom: dimensions.scale * 3 }}>
            Net Content: <span className="font-semibold">250 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // ── STANDARD variant — COLORED LABEL inside white bottle ───────────
  const Icon = style.icon;
  return (
    <div className={`relative ${floating ? 'float-bottle' : ''}`} style={{ width: dimensions.w, height: dimensions.h }}>
      {Cap}
      {/* Bottle body */}
      <div className="absolute inset-x-0 rounded-3xl overflow-hidden"
        style={{
          top: dimensions.capH - 4, bottom: 0,
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 60%, #f0f0f0 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.18), inset 3px 0 8px rgba(255,255,255,0.9), inset -4px 0 10px rgba(0,0,0,0.06)',
        }}>
        <div className="absolute opacity-50"
          style={{ top: 8, left: '12%', width: '8%', height: '70%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, transparent 100%)', borderRadius: '50%' }} />

        {/* COLORED INNER LABEL */}
        <div
          className="absolute rounded-2xl flex flex-col items-center text-center overflow-hidden"
          style={{
            inset: '6% 8% 14% 8%',
            background: `linear-gradient(165deg, ${style.bandTop} 0%, ${style.bandBottom} 100%)`,
            padding: dimensions.scale * 8,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <ZenviroLogo size={dimensions.scale * 8} color={style.textColor} accentColor={style.accent} />

          {display.smallTop && (
            <div className="font-bold leading-none uppercase"
              style={{
                fontSize: dimensions.scale * 10,
                marginTop: dimensions.scale * 5,
                letterSpacing: '0.5px',
                color: style.accent,
              }}>
              {display.smallTop}
            </div>
          )}

          <div className="font-black leading-tight tracking-tight"
            style={{
              fontSize: display.big.length > 11 ? dimensions.scale * 14 : dimensions.scale * 18,
              marginTop: dimensions.scale * (display.smallTop ? 2 : 6),
              lineHeight: 1,
              wordBreak: 'break-word',
              color: style.textColor,
            }}>
            {display.big}
          </div>

          {display.small && (
            <div className="font-bold mt-1 px-2 py-0.5 rounded text-white"
              style={{ background: style.badgeBg, fontSize: dimensions.scale * 9, marginTop: dimensions.scale * 3 }}>
              {display.small}
            </div>
          )}

          <div className="font-semibold uppercase leading-tight"
            style={{
              color: style.tag,
              fontSize: dimensions.scale * 6.5,
              marginTop: dimensions.scale * 3,
              letterSpacing: '0.6px',
            }}>
            {display.tag}
          </div>

          {/* Category icon in accent circle */}
          <div className="rounded-full flex items-center justify-center"
            style={{
              background: `rgba(255,255,255,0.12)`,
              border: `1.5px solid ${style.accent}`,
              width: dimensions.scale * 30,
              height: dimensions.scale * 30,
              marginTop: dimensions.scale * 6,
              boxShadow: `0 4px 10px rgba(0,0,0,0.2)`,
            }}>
            <Icon size={dimensions.scale * 16} style={{ color: style.accent }} />
          </div>
        </div>

        <div className="absolute bottom-0 w-full text-center"
          style={{ fontSize: dimensions.scale * 6, color: '#9CA3AF', paddingBottom: dimensions.scale * 3 }}>
          Net Content: <span className="font-semibold">250 ml</span>
        </div>
      </div>
    </div>
  );
}
