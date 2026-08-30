import React from 'react';
import { StickerTemplate } from '../../types/sticker';

interface StickerDieCutGraphicProps {
  template: StickerTemplate;
  className?: string;
  size?: number; // size in px
}

export const StickerDieCutGraphic: React.FC<StickerDieCutGraphicProps> = ({
  template,
  className = '',
  size = 200,
}) => {
  // Identify shape from template elements or ID
  const id = template.id;
  const badgeElement = template.elements.find((el) => el.type === 'badge' || el.type === 'shape');
  const shapeType = badgeElement?.shapeType || (
    id.includes('bubble') ? 'bubble' :
    id.includes('starburst') || id.includes('newpost') || id.includes('doge') ? 'starburst' :
    id.includes('cyber-star') ? 'star-4' :
    id.includes('arch') || id.includes('botanical') || id.includes('eid') ? 'arch' :
    id.includes('scallop') || id.includes('crafts') || id.includes('bday') ? 'scallop' :
    id.includes('pill') || id.includes('linkinbio') || id.includes('matcha') || id.includes('fine') || id.includes('dekhmagar') || id.includes('coffee-break') || id.includes('oneday') ? 'pill' :
    'circle'
  );

  const borderWidth = template.borderWidth || 8;
  const borderColor = template.borderColor || '#FFFFFF';

  // Render authentic vector die-cut based on template ID
  const renderShapeContent = () => {
    switch (id) {
      // 1. DRAMATIC CRYING CAT MEME
      case 'tmpl-funny-cat':
        return (
          <g>
            <defs>
              <linearGradient id="grad-cat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>
              <linearGradient id="grad-cat-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            {/* Outer Die-Cut White Halo */}
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            {/* Inner Badge with Soft Gradient */}
            <circle cx="100" cy="100" r="74" fill="url(#grad-cat-bg)" stroke="#18181B" strokeWidth="3" />
            {/* Inner Accent Ring */}
            <circle cx="100" cy="100" r="66" fill="none" stroke="url(#grad-cat-ring)" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Top Gloss Arc */}
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.25" />
            {/* Cat Face / Meme Art */}
            <text x="100" y="78" textAnchor="middle" fontSize="34" className="select-none">😿</text>
            {/* Meme Text with Modern Clean Typography */}
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="14.5"
              fill="#E11D48"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              letterSpacing="0.8"
            >
              I HAVE NO IDEA
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="14"
              fill="#BE123C"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              letterSpacing="0.8"
            >
              WHAT I AM DOING
            </text>
            {/* Decorative Stars */}
            <text x="44" y="98" fontSize="13" fill="#F59E0B">★</text>
            <text x="144" y="98" fontSize="13" fill="#F59E0B">★</text>
          </g>
        );

      // 2. EVERYTHING IS FINE FIRE BADGE
      case 'tmpl-everything-fine':
        return (
          <g>
            <defs>
              <linearGradient id="grad-fire-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <linearGradient id="grad-fire-sub" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="100%" stopColor="#FFEDD5" />
              </linearGradient>
            </defs>
            {/* Outer Die-Cut White Halo */}
            <rect x="12" y="44" width="176" height="112" rx="46" fill="#FFFFFF" />
            {/* Inner Pill with Warm Ember Gradient */}
            <rect x="18" y="50" width="164" height="100" rx="40" fill="url(#grad-fire-bg)" stroke="#7C2D12" strokeWidth="3" />
            {/* Glossy Pill Top Half */}
            <path d="M22 90 Q100 65 178 90 A40 40 0 0 0 22 90 Z" fill="#FFFFFF" fillOpacity="0.22" />
            {/* Flame Art */}
            <text x="100" y="86" textAnchor="middle" fontSize="28" className="select-none">🔥</text>
            {/* Bold Text */}
            <text
              x="100"
              y="116"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="13.5"
              fill="#FFFFFF"
              stroke="#7C2D12"
              strokeWidth="0.8"
              letterSpacing="0.6"
            >
              EVERYTHING IS FINE
            </text>
            {/* Sub-badge Pill */}
            <rect x="52" y="125" width="96" height="18" rx="9" fill="url(#grad-fire-sub)" stroke="#7C2D12" strokeWidth="1" />
            <text
              x="100"
              y="138"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="10"
              fill="#9A3412"
              letterSpacing="0.5"
            >
              KEEP CALM
            </text>
          </g>
        );

      // 3. MUCH WOW CUTE SHIBA
      case 'tmpl-funny-doge':
        return (
          <g>
            <defs>
              <linearGradient id="grad-doge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEDD5" />
                <stop offset="60%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
            </defs>
            {/* 12-point Starburst White Halo */}
            <path
              d="M100 12 L122 28 L148 22 L158 46 L184 56 L180 84 L196 106 L180 128 L184 156 L158 166 L148 190 L122 184 L100 200 L78 184 L52 190 L42 166 L16 156 L20 128 L4 106 L20 84 L16 56 L42 46 L52 22 L78 28 Z"
              fill="#FFFFFF"
              transform="scale(0.92) translate(8, 8)"
            />
            {/* Inner Starburst with Gradient */}
            <path
              d="M100 12 L122 28 L148 22 L158 46 L184 56 L180 84 L196 106 L180 128 L184 156 L158 166 L148 190 L122 184 L100 200 L78 184 L52 190 L42 166 L16 156 L20 128 L4 106 L20 84 L16 56 L42 46 L52 22 L78 28 Z"
              fill="url(#grad-doge-bg)"
              stroke="#C2410C"
              strokeWidth="3"
              transform="scale(0.85) translate(18, 18)"
            />
            {/* Gloss Highlight */}
            <circle cx="100" cy="100" r="55" fill="#FFFFFF" fillOpacity="0.18" mask="none" />
            <text x="100" y="80" textAnchor="middle" fontSize="30" className="select-none">🐕</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="15"
              fill="#7C2D12"
              letterSpacing="0.5"
            >
              MUCH WOW
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="12"
              fill="#C2410C"
            >
              SUCH STICKER ★
            </text>
          </g>
        );

      // 4. SOFT BOTANICAL WILDFLOWER (ARCH)
      case 'tmpl-aesthetic-botanical':
        return (
          <g>
            <defs>
              <linearGradient id="grad-botanical-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ECFDF5" />
                <stop offset="50%" stopColor="#D1FAE5" />
                <stop offset="100%" stopColor="#A7F3D0" />
              </linearGradient>
            </defs>
            {/* White Die-Cut Arch Outline */}
            <path
              d="M32 176 L32 80 Q32 20 100 20 Q168 20 168 80 L168 176 Z"
              fill="#FFFFFF"
            />
            {/* Inner Sage Arch with Soft Gradient */}
            <path
              d="M40 168 L40 82 Q40 30 100 30 Q160 30 160 82 L160 168 Z"
              fill="url(#grad-botanical-bg)"
              stroke="#059669"
              strokeWidth="2.5"
            />
            {/* Subtle Arch Gloss */}
            <path
              d="M44 82 Q44 34 100 34 Q156 34 156 82 Q100 65 44 82 Z"
              fill="#FFFFFF"
              fillOpacity="0.3"
            />
            {/* Plant Icon */}
            <text x="100" y="82" textAnchor="middle" fontSize="36" className="select-none">🌿</text>
            {/* Elegant Script */}
            <text
              x="100"
              y="118"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="15"
              fill="#065F46"
            >
              Bloom in
            </text>
            <text
              x="100"
              y="142"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="14"
              fill="#047857"
            >
              your own time
            </text>
          </g>
        );

      // 5. Y2K CYBER CHROME STAR (4-POINT STAR)
      case 'tmpl-y2k-cyber-star':
        return (
          <g>
            <defs>
              <linearGradient id="grad-cyber-star" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EEF2FF" />
                <stop offset="50%" stopColor="#C7D2FE" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
            {/* Outer 4-point Star Die-Cut White Halo */}
            <path
              d="M100 10 Q105 75 170 100 Q105 125 100 190 Q95 125 30 100 Q95 75 100 10 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            {/* Inner Chrome Gradient Star */}
            <path
              d="M100 18 Q105 80 162 100 Q105 120 100 182 Q95 120 38 100 Q95 80 100 18 Z"
              fill="url(#grad-cyber-star)"
              stroke="#3730A3"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Glossy Core Reflection */}
            <path d="M100 24 Q104 80 156 100 Q104 90 100 24 Z" fill="#FFFFFF" fillOpacity="0.45" />
            {/* Center Cyber Sparkle */}
            <circle cx="100" cy="100" r="16" fill="#FFFFFF" stroke="#3730A3" strokeWidth="1.5" />
            <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#4338CA" className="select-none font-bold">★</text>
            <text
              x="100"
              y="136"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="11.5"
              fill="#312E81"
              letterSpacing="0.8"
            >
              STAY ICONIC
            </text>
          </g>
        );

      // 6. MATCHA CLUB GREEN LATTE
      case 'tmpl-aesthetic-matcha':
        return (
          <g>
            <defs>
              <linearGradient id="grad-matcha-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0FDF4" />
                <stop offset="60%" stopColor="#DCFCE7" />
                <stop offset="100%" stopColor="#BBF7D0" />
              </linearGradient>
            </defs>
            {/* Outer Die-Cut White Halo */}
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            {/* Inner Pill with Matcha Creme Gradient */}
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-matcha-bg)" stroke="#16A34A" strokeWidth="2.5" />
            {/* Top Gloss Arc */}
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.3" />
            <text x="100" y="86" textAnchor="middle" fontSize="30" className="select-none">🍵</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="16"
              fill="#14532D"
            >
              Matcha Club
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#15803D"
              letterSpacing="0.4"
            >
              Pure Morning Joy
            </text>
          </g>
        );

      // 7. ARTISAN COFFEE ROASTERS EMBLEM
      case 'tmpl-artisan-coffee':
        return (
          <g>
            <defs>
              <linearGradient id="grad-coffee-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="50%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
            </defs>
            {/* Outer Die-Cut White Halo */}
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            {/* Inner Seal with Warm Roast Gradient */}
            <circle cx="100" cy="100" r="74" fill="url(#grad-coffee-bg)" stroke="#78350F" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="4 2" />
            {/* Top Gloss Arc */}
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="80" textAnchor="middle" fontSize="32" className="select-none">☕</text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="12.5"
              fill="#451A03"
              letterSpacing="0.8"
            >
              ROASTED FRESH
            </text>
            <text
              x="100"
              y="126"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="10.5"
              fill="#92400E"
            >
              ★ SINCE 2024 ★
            </text>
          </g>
        );

      // 8. HANDMADE WITH LOVE SEAL (SCALLOP)
      case 'tmpl-handmade-crafts':
        return (
          <g>
            <defs>
              <linearGradient id="grad-craft-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF2F8" />
                <stop offset="50%" stopColor="#FCE7F3" />
                <stop offset="100%" stopColor="#FBCFE8" />
              </linearGradient>
            </defs>
            {/* 12-Lobed Scallop Die-Cut White Halo */}
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-craft-bg)" stroke="#DB2777" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#EC4899" strokeWidth="1.2" strokeDasharray="3 3" />
            {/* Subtle gloss curve */}
            <path d="M42 75 Q100 48 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.32" />
            <text x="100" y="78" textAnchor="middle" fontSize="28" className="select-none">🌸</text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="15"
              fill="#9D174D"
            >
              Handmade
            </text>
            <text
              x="100"
              y="130"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="11.5"
              fill="#BE185D"
              letterSpacing="0.6"
            >
              WITH LOVE ✨
            </text>
          </g>
        );

      // 9. THUMBS UP WHATSAPP REACT (SPEECH BUBBLE WITH TAIL)
      case 'tmpl-whatsapp-ok':
        return (
          <g>
            <defs>
              <linearGradient id="grad-wa-bubble" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>
            {/* Speech Bubble Die-Cut White Halo with Tail */}
            <path
              d="M30 40 L170 40 Q185 40 185 55 L185 130 Q185 145 170 145 L65 145 L35 175 L42 145 L30 145 Q15 145 15 130 L15 55 Q15 40 30 40 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Inner WhatsApp Green Bubble with Gradient */}
            <path
              d="M32 46 L168 46 Q178 46 178 56 L178 126 Q178 136 168 136 L65 136 L40 162 L46 136 L32 136 Q22 136 22 126 L22 56 Q22 46 32 46 Z"
              fill="url(#grad-wa-bubble)"
              stroke="#14532D"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Soft Bubble Gloss Arc */}
            <path d="M36 60 Q100 48 164 60 A8 8 0 0 1 174 68 L174 85 Q100 68 26 85 L26 68 A8 8 0 0 1 36 60 Z" fill="#FFFFFF" fillOpacity="0.22" />
            <text x="100" y="84" textAnchor="middle" fontSize="30" className="select-none">👍</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="15"
              fill="#FFFFFF"
              stroke="#14532D"
              strokeWidth="0.8"
              letterSpacing="0.5"
            >
              OK BOSS!
            </text>
            <text
              x="100"
              y="128"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#DCFCE7"
            >
              ON MY WAY 🚀
            </text>
          </g>
        );

      // 10. CHAI / COFFEE BREAK CHAT PING
      case 'tmpl-whatsapp-coffee-break':
        return (
          <g>
            <defs>
              <linearGradient id="grad-chai-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-chai-bg)" stroke="#D97706" strokeWidth="2.5" />
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="86" textAnchor="middle" fontSize="30" className="select-none">☕</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="15"
              fill="#78350F"
              letterSpacing="0.4"
            >
              Chai Time!
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#B45309"
            >
              Who is ready? 🫖
            </text>
          </g>
        );

      // 11. BIRTHDAY PARTY POPPER BADGE (SCALLOP)
      case 'tmpl-whatsapp-bday':
        return (
          <g>
            <defs>
              <linearGradient id="grad-bday-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="40%" stopColor="#FFE4E6" />
                <stop offset="100%" stopColor="#FECDD3" />
              </linearGradient>
              <linearGradient id="grad-bday-text" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-bday-bg)" stroke="#E11D48" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#FB7185" strokeWidth="1.2" strokeDasharray="3 3" />
            {/* Top Gloss Arc */}
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.3" />
            <text x="100" y="78" textAnchor="middle" fontSize="30" className="select-none">🎂</text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="16"
              fill="url(#grad-bday-text)"
              letterSpacing="0.8"
            >
              HAPPY BIRTHDAY
            </text>
            <text
              x="100"
              y="128"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11.5"
              fill="#BE123C"
            >
              🎉 Let's Celebrate 🥳
            </text>
          </g>
        );

      // 12. NEW POST NEON ALERT - MODERNIZED
      case 'tmpl-insta-newpost':
        return (
          <g>
            <defs>
              <linearGradient id="grad-neon-alert" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="50%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="grad-neon-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-neon-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>
              <filter id="glow-neon-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Die-Cut White Halo (Smooth Rounded 12-point Cyber Star) */}
            <path
              d="M100 12 C112 12 120 28 132 32 C144 36 158 26 168 34 C178 42 174 58 182 68 C190 78 206 86 206 98 C206 110 190 118 182 128 C174 138 178 154 168 162 C158 170 144 160 132 164 C120 168 112 184 100 184 C88 184 80 168 68 164 C56 160 42 170 32 162 C22 154 26 138 18 128 C10 118 -6 110 -6 98 C-6 86 10 78 18 68 C26 58 22 42 32 34 C42 26 56 36 68 32 C80 28 88 12 100 12 Z"
              fill="#FFFFFF"
              transform="scale(0.88) translate(14, 14)"
            />

            {/* Inner Vibrant Neon Gradient Badge */}
            <path
              d="M100 12 C112 12 120 28 132 32 C144 36 158 26 168 34 C178 42 174 58 182 68 C190 78 206 86 206 98 C206 110 190 118 182 128 C174 138 178 154 168 162 C158 170 144 160 132 164 C120 168 112 184 100 184 C88 184 80 168 68 164 C56 160 42 170 32 162 C22 154 26 138 18 128 C10 118 -6 110 -6 98 C-6 86 10 78 18 68 C26 58 22 42 32 34 C42 26 56 36 68 32 C80 28 88 12 100 12 Z"
              fill="url(#grad-neon-alert)"
              stroke="#FDE047"
              strokeWidth="2.5"
              transform="scale(0.81) translate(23, 23)"
            />

            {/* Top Glossy Highlight Curve */}
            <ellipse
              cx="100"
              cy="62"
              rx="54"
              ry="28"
              fill="url(#grad-neon-gloss)"
            />

            {/* Electric Bell / Lightning Spark Badge Header */}
            <g transform="translate(100, 72)">
              <circle cx="0" cy="0" r="14" fill="#881337" opacity="0.6" />
              <text x="0" y="5" textAnchor="middle" fontSize="16" className="select-none">⚡</text>
            </g>

            {/* Bold Neon Headline */}
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="21"
              fill="url(#grad-neon-gold)"
              stroke="#831843"
              strokeWidth="0.8"
              letterSpacing="1"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(131, 24, 67, 0.4))' }}
            >
              NEW POST
            </text>

            {/* Modern Action Pill Badge */}
            <g transform="translate(100, 128)">
              <rect x="-42" y="-9" width="84" height="18" rx="9" fill="#831843" opacity="0.9" />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                className="font-fredoka select-none font-extrabold"
                fontSize="9"
                fill="#FFFFFF"
                letterSpacing="0.6"
              >
                TAP TO VIEW ✦
              </text>
            </g>
          </g>
        );

      // 13. LINK IN BIO GRADIENT POINTER (ARROW POINTER PILL)
      case 'tmpl-insta-linkinbio':
        return (
          <g>
            <defs>
              <linearGradient id="grad-bio-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
            </defs>
            {/* Arrow Pointer White Die-Cut Halo */}
            <path
              d="M20 54 L146 54 L184 100 L146 146 L20 146 Q10 146 10 136 L10 64 Q10 54 20 54 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Inner Purple Arrow Banner with Soft Gradient */}
            <path
              d="M24 60 L142 60 L176 100 L142 140 L24 140 Q16 140 16 132 L16 68 Q16 60 24 60 Z"
              fill="url(#grad-bio-bg)"
              stroke="#4C1D95"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Arrow Gloss Curve */}
            <path d="M24 66 L138 66 L158 88 L24 88 Z" fill="#FFFFFF" fillOpacity="0.22" />
            <text x="76" y="94" textAnchor="middle" fontSize="22" className="select-none">🔗</text>
            <text
              x="96"
              y="96"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="14"
              fill="#FFFFFF"
              stroke="#4C1D95"
              strokeWidth="0.6"
              letterSpacing="0.4"
            >
              LINK IN BIO
            </text>
            <text
              x="96"
              y="118"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#DDD6FE"
            >
              TAP HERE ↗
            </text>
          </g>
        );

      // 14. GOOD VIBES ONLY RETRO BADGE (CIRCULAR GROOVE)
      case 'tmpl-quote-goodvibes':
        return (
          <g>
            <defs>
              <linearGradient id="grad-vibes-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEDD5" />
                <stop offset="50%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-vibes-bg)" stroke="#EA580C" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#F97316" strokeWidth="1.2" strokeDasharray="3 3" />
            {/* Top Gloss Arc */}
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="80" textAnchor="middle" fontSize="30" className="select-none">✨</text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="20"
              fill="#C2410C"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              letterSpacing="0.8"
            >
              GOOD VIBES
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="16"
              fill="#7C2D12"
              letterSpacing="0.5"
            >
              ONLY ✌️
            </text>
          </g>
        );

      // 15. ONE DAY AT A TIME SCRIPT
      case 'tmpl-quote-oneday':
        return (
          <g>
            <defs>
              <linearGradient id="grad-oneday-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0FDFA" />
                <stop offset="50%" stopColor="#CCFBF1" />
                <stop offset="100%" stopColor="#99F6E4" />
              </linearGradient>
            </defs>
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-oneday-bg)" stroke="#0D9488" strokeWidth="2.5" />
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="82" textAnchor="middle" fontSize="28" className="select-none">🌸</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="14.5"
              fill="#115E59"
            >
              One day at a time
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#0F766E"
            >
              You are doing great
            </text>
          </g>
        );

      // 16. URDU CHAI ZINDAGI HAI
      case 'tmpl-urdu-chai':
        return (
          <g>
            <defs>
              <linearGradient id="grad-urdu-chai" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-urdu-chai)" stroke="#78350F" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="78" textAnchor="middle" fontSize="26" className="select-none">☕</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-urdu select-none font-bold"
              fontSize="19"
              fill="#78350F"
            >
              چائے زندگی ہے
            </text>
            <text
              x="100"
              y="142"
              textAnchor="middle"
              className="font-urdu select-none"
              fontSize="13"
              fill="#92400E"
            >
              ایک کپ اور سہی
            </text>
          </g>
        );

      // 17. EID MUBARAK ISLAMIC ARCH
      case 'tmpl-urdu-eid':
        return (
          <g>
            <defs>
              <linearGradient id="grad-eid-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#065F46" />
                <stop offset="60%" stopColor="#047857" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="grad-eid-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>
            {/* Mosque Dome Arch Die-Cut White Halo */}
            <path
              d="M32 176 L32 80 Q32 20 100 14 Q168 20 168 80 L168 176 Z"
              fill="#FFFFFF"
            />
            {/* Inner Emerald Arch with Gradient */}
            <path
              d="M40 168 L40 82 Q40 28 100 24 Q160 28 160 82 L160 168 Z"
              fill="url(#grad-eid-bg)"
              stroke="#FDE047"
              strokeWidth="2.5"
            />
            {/* Arch Top Gloss Reflection */}
            <path d="M44 82 Q44 32 100 28 Q156 32 156 82 Q100 60 44 82 Z" fill="#FFFFFF" fillOpacity="0.2" />
            <text x="100" y="72" textAnchor="middle" fontSize="30" className="select-none">🌙</text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="font-urdu select-none font-bold"
              fontSize="21"
              fill="url(#grad-eid-gold)"
            >
              عید مبارک
            </text>
            <text
              x="100"
              y="142"
              textAnchor="middle"
              className="font-urdu select-none"
              fontSize="13"
              fill="#FEF08A"
            >
              خوشیاں سلامت رہیں
            </text>
          </g>
        );

      // 18. TRUCK ART CLASSIC (DEKH MAGAR PYAR SE) - MODERNIZED
      case 'tmpl-urdu-dekhmagar':
        return (
          <g>
            <defs>
              <linearGradient id="grad-truck-modern" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="45%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="grad-truck-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-truck-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>
            {/* Outer Die-Cut White Halo */}
            <rect x="10" y="42" width="180" height="116" rx="48" fill="#FFFFFF" />
            
            {/* Inner Vibrant Chunky Pill Badge */}
            <rect
              x="18"
              y="50"
              width="164"
              height="100"
              rx="42"
              fill="url(#grad-truck-modern)"
              stroke="#FEF08A"
              strokeWidth="3.5"
            />

            {/* Inner Gold Inset Dash Ring */}
            <rect
              x="24"
              y="56"
              width="152"
              height="88"
              rx="36"
              fill="none"
              stroke="#FDE047"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.85"
            />

            {/* Subtle Glossy Curvature Highlight */}
            <path
              d="M26 62 Q100 48 174 62 C168 76 142 86 100 86 C58 86 32 76 26 62 Z"
              fill="url(#grad-truck-gloss)"
            />

            {/* Decorative Icon Header */}
            <g transform="translate(100, 78)">
              <circle cx="-38" cy="0" r="3.5" fill="#FDE047" />
              <circle cx="38" cy="0" r="3.5" fill="#FDE047" />
              <text x="0" y="5" textAnchor="middle" fontSize="22" className="select-none">🌺</text>
            </g>

            {/* Clean Bold Urdu Typography */}
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-urdu select-none font-bold"
              fontSize="21"
              fill="url(#grad-truck-gold)"
              stroke="#9F1239"
              strokeWidth="0.75"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(136, 19, 55, 0.4))' }}
            >
              دیکھ مگر پیار سے
            </text>

            {/* Bottom Subtitle Pill Badge */}
            <rect x="52" y="126" width="96" height="15" rx="7.5" fill="#881337" opacity="0.9" />
            <text
              x="100"
              y="137"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="8.5"
              fill="#FEF08A"
              letterSpacing="0.8"
            >
              ✦ TRUCK ART POP ✦
            </text>
          </g>
        );

      // 19. MASHALLAH CALLIGRAPHY SEAL
      case 'tmpl-urdu-mashallah':
        return (
          <g>
            <defs>
              <linearGradient id="grad-mashallah-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-mashallah-bg)" stroke="#B45309" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#D97706" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="78" textAnchor="middle" fontSize="28" className="select-none">🌟</text>
            <text
              x="100"
              y="116"
              textAnchor="middle"
              className="font-urdu select-none font-bold"
              fontSize="22"
              fill="#78350F"
            >
              ماشاءاللہ
            </text>
            <text
              x="100"
              y="142"
              textAnchor="middle"
              className="font-urdu select-none"
              fontSize="13"
              fill="#92400E"
            >
              تبارک اللہ
            </text>
          </g>
        );

      // 20. NOPE NOT TODAY
      case 'tmpl-funny-nope':
        return (
          <g>
            <defs>
              <linearGradient id="grad-nope-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE4E6" />
                <stop offset="50%" stopColor="#FECDD3" />
                <stop offset="100%" stopColor="#FDA4AF" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-nope-bg)" stroke="#E11D48" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#F43F5E" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.3" />
            <text x="100" y="80" textAnchor="middle" fontSize="32" className="select-none">🚫</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="20"
              fill="#9F1239"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              letterSpacing="0.8"
            >
              NOPE NOT TODAY
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#BE123C"
            >
              • DO NOT DISTURB •
            </text>
          </g>
        );

      // 21. FIRST I DRINK THE COFFEE
      case 'tmpl-funny-coffee-first':
        return (
          <g>
            <defs>
              <linearGradient id="grad-first-coffee" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-first-coffee)" stroke="#78350F" strokeWidth="2.5" />
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="86" textAnchor="middle" fontSize="30" className="select-none">☕</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="13.5"
              fill="#78350F"
              letterSpacing="0.3"
            >
              FIRST I DRINK COFFEE
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#92400E"
            >
              Then I do things ⚡
            </text>
          </g>
        );

      // 22. DREAMY PASTEL CLOUD
      case 'tmpl-aesthetic-dreamy-cloud':
        return (
          <g>
            <defs>
              <linearGradient id="grad-cloud-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0F9FF" />
                <stop offset="50%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
            <path
              d="M40 120 C20 120 16 95 35 85 C30 65 55 50 75 60 C88 40 122 40 135 60 C155 50 178 65 172 88 C188 98 182 120 165 120 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path
              d="M42 118 C24 118 20 96 38 86 C34 68 57 54 75 63 C88 44 120 44 133 63 C151 54 174 68 168 90 C184 98 178 118 162 118 Z"
              fill="url(#grad-cloud-bg)"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <text x="100" y="84" textAnchor="middle" fontSize="26" className="select-none">☁️</text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="13.5"
              fill="#0369A1"
            >
              Dreamy vibes
            </text>
          </g>
        );

      // 23. GOLDEN HOUR RETRO SUN
      case 'tmpl-aesthetic-retro-sun':
        return (
          <g>
            <defs>
              <linearGradient id="grad-sun-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-sun-bg)" stroke="#EA580C" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#F97316" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="80" textAnchor="middle" fontSize="32" className="select-none">☀️</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="18"
              fill="#9A3412"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              letterSpacing="0.8"
            >
              GOLDEN HOUR
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#C2410C"
            >
              CHASING SUNSHINE ★
            </text>
          </g>
        );

      // 24. EVOLVING BUTTERFLY ARCH
      case 'tmpl-aesthetic-butterfly':
        return (
          <g>
            <defs>
              <linearGradient id="grad-butterfly-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF5FF" />
                <stop offset="50%" stopColor="#F3E8FF" />
                <stop offset="100%" stopColor="#E9D5FF" />
              </linearGradient>
            </defs>
            <path
              d="M32 176 L32 80 Q32 20 100 20 Q168 20 168 80 L168 176 Z"
              fill="#FFFFFF"
            />
            <path
              d="M40 168 L40 82 Q40 30 100 30 Q160 30 160 82 L160 168 Z"
              fill="url(#grad-butterfly-bg)"
              stroke="#7E22CE"
              strokeWidth="2.5"
            />
            <path d="M44 82 Q44 32 100 28 Q156 32 156 82 Q100 60 44 82 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="82" textAnchor="middle" fontSize="34" className="select-none">🦋</text>
            <text
              x="100"
              y="120"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="14.5"
              fill="#581C87"
            >
              Trust the timing
            </text>
            <text
              x="100"
              y="144"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#7E22CE"
            >
              of your life ✨
            </text>
          </g>
        );

      // 25. ARTISAN BAKERY
      case 'tmpl-logo-bakery':
        return (
          <g>
            <defs>
              <linearGradient id="grad-bakery-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-bakery-bg)" stroke="#B45309" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#D97706" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="78" textAnchor="middle" fontSize="30" className="select-none">🥐</text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="13"
              fill="#78350F"
              letterSpacing="0.4"
            >
              SWEET TREATS
            </text>
            <text
              x="100"
              y="130"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="12.5"
              fill="#B45309"
            >
              Baked With Love
            </text>
          </g>
        );

      // 26. ORGANIC ECO CERTIFIED
      case 'tmpl-logo-organic':
        return (
          <g>
            <defs>
              <linearGradient id="grad-organic-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0FDF4" />
                <stop offset="50%" stopColor="#DCFCE7" />
                <stop offset="100%" stopColor="#BBF7D0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-organic-bg)" stroke="#166534" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#15803D" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="80" textAnchor="middle" fontSize="30" className="select-none">🍃</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="13.5"
              fill="#14532D"
              letterSpacing="0.4"
            >
              100% ORGANIC
            </text>
            <text
              x="100"
              y="130"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="10"
              fill="#15803D"
            >
              ★ ECO CERTIFIED ★
            </text>
          </g>
        );

      // 27. GOOD MORNING SUNRISE
      case 'tmpl-whatsapp-goodmorning':
        return (
          <g>
            <defs>
              <linearGradient id="grad-morning-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="50%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>
            </defs>
            <path
              d="M30 40 L170 40 Q185 40 185 55 L185 130 Q185 145 170 145 L65 145 L35 175 L42 145 L30 145 Q15 145 15 130 L15 55 Q15 40 30 40 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M32 46 L168 46 Q178 46 178 56 L178 126 Q178 136 168 136 L65 136 L40 162 L46 136 L32 136 Q22 136 22 126 L22 56 Q22 46 32 46 Z"
              fill="url(#grad-morning-bg)"
              stroke="#CA8A04"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M36 60 Q100 48 164 60 A8 8 0 0 1 174 68 L174 85 Q100 68 26 85 L26 68 A8 8 0 0 1 36 60 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="84" textAnchor="middle" fontSize="30" className="select-none">🌅</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="14"
              fill="#713F12"
              letterSpacing="0.4"
            >
              GOOD MORNING!
            </text>
            <text
              x="100"
              y="128"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="10.5"
              fill="#A16207"
            >
              Have a Blessed Day ☀️
            </text>
          </g>
        );

      // 28. CONGRATS STARBURST
      case 'tmpl-whatsapp-congrats':
        return (
          <g>
            <defs>
              <linearGradient id="grad-congrats-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F3FF" />
                <stop offset="50%" stopColor="#EDE9FE" />
                <stop offset="100%" stopColor="#DDD6FE" />
              </linearGradient>
            </defs>
            <path
              d="M100 12 L122 28 L148 22 L158 46 L184 56 L180 84 L196 106 L180 128 L184 156 L158 166 L148 190 L122 184 L100 200 L78 184 L52 190 L42 166 L16 156 L20 128 L4 106 L20 84 L16 56 L42 46 L52 22 L78 28 Z"
              fill="#FFFFFF"
              transform="scale(0.92) translate(8, 8)"
            />
            <path
              d="M100 12 L122 28 L148 22 L158 46 L184 56 L180 84 L196 106 L180 128 L184 156 L158 166 L148 190 L122 184 L100 200 L78 184 L52 190 L42 166 L16 156 L20 128 L4 106 L20 84 L16 56 L42 46 L52 22 L78 28 Z"
              fill="url(#grad-congrats-bg)"
              stroke="#6D28D9"
              strokeWidth="3"
              transform="scale(0.85) translate(18, 18)"
            />
            <text x="100" y="80" textAnchor="middle" fontSize="30" className="select-none">🎊</text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="font-fredoka select-none font-extrabold"
              fontSize="16"
              fill="#4C1D95"
              letterSpacing="0.4"
            >
              CONGRATS!
            </text>
            <text
              x="100"
              y="134"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#6D28D9"
            >
              🥳 So Proud Of You! 🌟
            </text>
          </g>
        );

      // 29. GIVEAWAY TIME ALERT
      case 'tmpl-insta-giveaway':
        return (
          <g>
            <defs>
              <linearGradient id="grad-giveaway-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>
            <path
              d="M100 8 L124 28 L154 20 L164 50 L194 62 L188 92 L206 116 L188 140 L194 170 L164 182 L154 212 L124 204 L100 224 L76 204 L46 212 L36 182 L6 170 L12 140 L-6 116 L12 92 L6 62 L36 50 L46 20 L76 28 Z"
              fill="#FFFFFF"
              transform="scale(0.82) translate(22, 12)"
            />
            <path
              d="M100 8 L124 28 L154 20 L164 50 L194 62 L188 92 L206 116 L188 140 L194 170 L164 182 L154 212 L124 204 L100 224 L76 204 L46 212 L36 182 L6 170 L12 140 L-6 116 L12 92 L6 62 L36 50 L46 20 L76 28 Z"
              fill="url(#grad-giveaway-bg)"
              stroke="#B45309"
              strokeWidth="3.5"
              transform="scale(0.75) translate(33, 23)"
            />
            <text
              x="100"
              y="94"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="20"
              fill="#9A3412"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              letterSpacing="1"
            >
              🎁 GIVEAWAY 🎁
            </text>
            <text
              x="100"
              y="120"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="14.5"
              fill="#78350F"
            >
              TAP TO ENTER ⚡
            </text>
          </g>
        );

      // 30. ASK ME ANYTHING
      case 'tmpl-insta-qna':
        return (
          <g>
            <defs>
              <linearGradient id="grad-qna-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF2F8" />
                <stop offset="50%" stopColor="#FCE7F3" />
                <stop offset="100%" stopColor="#FBCFE8" />
              </linearGradient>
            </defs>
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-qna-bg)" stroke="#DB2777" strokeWidth="2.5" />
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="84" textAnchor="middle" fontSize="28" className="select-none">💬</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-fredoka select-none font-black"
              fontSize="13"
              fill="#831843"
              letterSpacing="0.4"
            >
              ASK ME ANYTHING
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="10.5"
              fill="#BE185D"
            >
              Drop questions 👇
            </text>
          </g>
        );

      // 31. CHOOSE YOURSELF EVERYDAY
      case 'tmpl-quote-selflove':
        return (
          <g>
            <defs>
              <linearGradient id="grad-selflove-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="50%" stopColor="#FFE4E6" />
                <stop offset="100%" stopColor="#FECDD3" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="url(#grad-selflove-bg)" stroke="#E11D48" strokeWidth="3" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#FB7185" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M42 75 Q100 45 158 75 A70 70 0 0 0 42 75 Z" fill="#FFFFFF" fillOpacity="0.28" />
            <text x="100" y="78" textAnchor="middle" fontSize="30" className="select-none">💖</text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="font-pacifico select-none"
              fontSize="14"
              fill="#9F1239"
            >
              Choose yourself
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#BE123C"
            >
              Every single day ✨
            </text>
          </g>
        );

      // 32. KEEP MOVING FORWARD
      case 'tmpl-quote-keepgoing':
        return (
          <g>
            <defs>
              <linearGradient id="grad-keepgoing-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EEF2FF" />
                <stop offset="50%" stopColor="#E0E7FF" />
                <stop offset="100%" stopColor="#C7D2FE" />
              </linearGradient>
            </defs>
            <rect x="14" y="44" width="172" height="112" rx="46" fill="#FFFFFF" />
            <rect x="20" y="50" width="160" height="100" rx="40" fill="url(#grad-keepgoing-bg)" stroke="#4338CA" strokeWidth="2.5" />
            <path d="M24 90 Q100 65 176 90 A40 40 0 0 0 24 90 Z" fill="#FFFFFF" fillOpacity="0.25" />
            <text x="100" y="82" textAnchor="middle" fontSize="28" className="select-none">🚀</text>
            <text
              x="100"
              y="112"
              textAnchor="middle"
              className="font-bangers select-none"
              fontSize="16.5"
              fill="#312E81"
              letterSpacing="0.8"
            >
              KEEP MOVING
            </text>
            <text
              x="100"
              y="132"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="11"
              fill="#4338CA"
            >
              FORWARD ALWAYS ★
            </text>
          </g>
        );

      default:
        return (
          <g>
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="74" fill="#FEF08A" stroke="#000000" strokeWidth="3.5" />
            <text x="100" y="90" textAnchor="middle" fontSize="32" className="select-none">✨</text>
            <text
              x="100"
              y="124"
              textAnchor="middle"
              className="font-fredoka select-none font-bold"
              fontSize="13"
              fill="#000000"
            >
              {template.title.slice(0, 16)}
            </text>
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: '100%', height: '100%', maxWidth: `${size}px`, maxHeight: `${size}px` }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105"
        style={{
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05))',
        }}
      >
        <defs>
          {/* Subtle Vinyl Gloss Gradient */}
          <linearGradient id={`gloss-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Die-Cut Vector Silhouette Layer */}
        {renderShapeContent()}

        {/* Tactile Vinyl Gloss Highlight Overlay */}
        <circle cx="100" cy="100" r="82" fill={`url(#gloss-${id})`} pointerEvents="none" opacity="0.65" />
      </svg>
    </div>
  );
};
