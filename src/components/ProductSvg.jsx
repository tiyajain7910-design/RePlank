import React from 'react';

export const ProductSvg = ({ type, className = "w-full h-48" }) => {
  switch (type) {
    case 'board-standard':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="boardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e3cfb4" />
              <stop offset="50%" stopColor="#d2b48c" />
              <stop offset="100%" stopColor="#bc9a6a" />
            </linearGradient>
            <pattern id="foilSpeckles" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.5" fill="#fef08a" opacity="0.8" />
              <circle cx="28" cy="14" r="1.2" fill="#38bdf8" opacity="0.7" />
              <circle cx="18" cy="30" r="1.8" fill="#f43f5e" opacity="0.6" />
              <circle cx="34" cy="32" r="1.5" fill="#e2e8f0" opacity="0.9" />
              <path d="M 5,20 Q 15,18 25,22" stroke="#a38053" strokeWidth="0.5" fill="none" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="400" height="260" fill="#f5f0e6" rx="12" />
          {/* Main 3D Board Projection */}
          <g transform="translate(45, 35)">
            {/* Board edge/thickness (18mm) */}
            <polygon points="20,170 300,170 320,150 40,150" fill="#8c683b" />
            <polygon points="300,170 300,30 320,15 320,150" fill="#6d4f29" />
            {/* Board Face */}
            <polygon points="20,30 300,30 300,170 20,170" fill="url(#boardGrad1)" />
            <polygon points="20,30 300,30 300,170 20,170" fill="url(#foilSpeckles)" />
            {/* Realistic layered edge lines */}
            <line x1="20" y1="166" x2="300" y2="166" stroke="#52391b" strokeWidth="1.5" />
            <line x1="20" y1="162" x2="300" y2="162" stroke="#a47e4c" strokeWidth="1" />
            {/* Eco Stamp */}
            <g transform="translate(50, 60)" opacity="0.85">
              <circle cx="35" cy="35" r="28" fill="#2d6a4f" opacity="0.1" stroke="#2d6a4f" strokeWidth="2" strokeDasharray="4 2" />
              <text x="35" y="32" textAnchor="middle" fill="#1b4332" fontSize="9" fontWeight="bold">100% RECYCLED</text>
              <text x="35" y="44" textAnchor="middle" fill="#2d6a4f" fontSize="8" fontWeight="600">CHIPS PACKET MLP</text>
            </g>
            {/* Dimensions label pill */}
            <rect x="180" y="130" width="105" height="24" rx="12" fill="#1b4332" opacity="0.9" />
            <text x="232" y="146" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">18mm Marine Grade</text>
          </g>
        </svg>
      );

    case 'board-acoustic':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="acousticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ede3d5" />
              <stop offset="100%" stopColor="#dac5ad" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#f8f5ee" rx="12" />
          <g transform="translate(60, 30)">
            <rect x="0" y="0" width="280" height="195" rx="8" fill="url(#acousticGrad)" stroke="#cbb497" strokeWidth="2" />
            {/* Acoustic Slats / Grooves */}
            {[20, 50, 80, 110, 140, 170, 200, 230, 260].map((x, i) => (
              <line key={i} x1={x} y1="10" x2={x} y2="185" stroke="#997b57" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
            ))}
            {/* Biscuit packet fleck elements */}
            <circle cx="45" cy="40" r="3" fill="#ca8a04" opacity="0.4" />
            <circle cx="160" cy="70" r="2.5" fill="#d97706" opacity="0.5" />
            <circle cx="210" cy="130" r="3.5" fill="#f59e0b" opacity="0.4" />
            {/* Sound Absorption Wave badge */}
            <rect x="70" y="140" width="140" height="30" rx="15" fill="#2d6a4f" />
            <path d="M 85,155 Q 92,148 100,155 T 115,155" stroke="#a7f3d0" strokeWidth="2.5" fill="none" />
            <text x="145" y="160" fill="#ffffff" fontSize="11" fontWeight="bold">NRC 0.65 Dampening</text>
          </g>
        </svg>
      );

    case 'board-armor':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a4238" />
              <stop offset="50%" stopColor="#363028" />
              <stop offset="100%" stopColor="#25211b" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#f4efe6" rx="12" />
          <g transform="translate(50, 40)">
            {/* Board base thickness */}
            <polygon points="15,160 280,160 305,135 40,135" fill="#1b1814" />
            <polygon points="280,160 280,25 305,5 305,135" fill="#2e2720" />
            <polygon points="15,25 280,25 280,160 15,160" fill="url(#armorGrad)" />
            {/* Heavy duty diamond tread texture */}
            {[45, 95, 145, 195, 245].map((x, idx) => (
              <g key={idx} opacity="0.4">
                <polygon points={`${x},50 ${x+15},65 ${x},80 ${x-15},65`} fill="#d4a373" />
                <polygon points={`${x},100 ${x+15},115 ${x},130 ${x-15},115`} fill="#d4a373" />
              </g>
            ))}
            {/* Badge */}
            <rect x="75" y="115" width="145" height="26" rx="6" fill="#ca8a04" />
            <text x="147" y="132" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="bold">🛡️ 25mm HEAVY DUTY 850kg/m²</text>
          </g>
        </svg>
      );

    case 'furn-table':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tableTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="30%" stopColor="#ecd9c6" />
              <stop offset="70%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#ba8b58" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#faf7f2" rx="12" />
          <g transform="translate(35, 45)">
            {/* Table Shadow */}
            <ellipse cx="165" cy="185" rx="145" ry="18" fill="#000000" opacity="0.08" />
            {/* Table Legs (Warm Reclaimed Wood) */}
            <polygon points="45,95 55,95 48,180 38,180" fill="#6d4c2b" />
            <polygon points="65,95 73,95 68,170 60,170" fill="#8c6239" />
            <polygon points="275,95 285,95 280,180 270,180" fill="#6d4c2b" />
            <polygon points="255,95 263,95 260,170 252,170" fill="#8c6239" />
            {/* Recycled Tabletop Bevel / Thickness */}
            <polygon points="20,95 310,95 310,105 20,105" fill="#a47a4c" />
            {/* Recycled Tabletop Surface */}
            <polygon points="20,95 310,95 285,55 45,55" fill="url(#tableTopGrad)" stroke="#c29663" strokeWidth="1.5" />
            {/* Iridescent swirls */}
            <path d="M 70,75 Q 120,65 170,78 T 260,70" stroke="#fef08a" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 85,82 Q 135,72 195,84 T 240,78" stroke="#38bdf8" strokeWidth="1.2" fill="none" opacity="0.5" />
            {/* Sustainable Badge */}
            <rect x="95" y="115" width="140" height="24" rx="12" fill="#1b4332" />
            <text x="165" y="131" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🌱 6,800 Packets Inside</text>
          </g>
        </svg>
      );

    case 'furn-bench':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f6f3eb" rx="12" />
          <g transform="translate(45, 40)">
            {/* Bench Shadow */}
            <ellipse cx="155" cy="180" rx="135" ry="16" fill="#000000" opacity="0.08" />
            {/* Cast Recycled Frame (Forest Green) */}
            <path d="M 40,65 L 40,175 L 52,175 L 54,120 L 80,120 L 80,175 L 92,175 L 92,108 L 48,108 L 48,65 Z" fill="#1b4332" />
            <path d="M 265,65 L 265,175 L 253,175 L 251,120 L 225,120 L 225,175 L 213,175 L 213,108 L 257,108 L 257,65 Z" fill="#2d6a4f" />
            {/* Slats made from TerraShield boards (Wood-Beige with eco foil speckles) */}
            <rect x="35" y="68" width="235" height="12" rx="3" fill="#d4a373" stroke="#bc8c5c" strokeWidth="1" />
            <rect x="35" y="84" width="235" height="12" rx="3" fill="#ecd9c6" stroke="#bc8c5c" strokeWidth="1" />
            <rect x="35" y="100" width="235" height="12" rx="3" fill="#d4a373" stroke="#bc8c5c" strokeWidth="1" />
            {/* Seat slats */}
            <polygon points="35,116 270,116 265,128 40,128" fill="#deb887" />
            <polygon points="37,130 268,130 263,142 42,142" fill="#d4a373" />
            {/* Weatherproof Badge */}
            <rect x="85" y="150" width="135" height="24" rx="12" fill="#2d6a4f" />
            <text x="152" y="166" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🌧️ 100% Weatherproof</text>
          </g>
        </svg>
      );

    case 'furn-chair':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f7f4ed" rx="12" />
          <g transform="translate(85, 30)">
            <ellipse cx="115" cy="190" rx="90" ry="14" fill="#000000" opacity="0.08" />
            {/* Legs */}
            <line x1="55" y1="135" x2="35" y2="190" stroke="#8c6239" strokeWidth="7" strokeLinecap="round" />
            <line x1="175" y1="135" x2="195" y2="190" stroke="#8c6239" strokeWidth="7" strokeLinecap="round" />
            <line x1="85" y1="140" x2="70" y2="185" stroke="#6d4c2b" strokeWidth="5" strokeLinecap="round" />
            <line x1="145" y1="140" x2="160" y2="185" stroke="#6d4c2b" strokeWidth="5" strokeLinecap="round" />
            {/* Molded Circular Shell (Curved TerraBoard) */}
            <path d="M 35,65 C 35,145 70,150 115,150 C 160,150 195,145 195,65 C 195,95 165,115 115,115 C 65,115 35,95 35,65 Z" fill="#d4a373" stroke="#bc8c5c" strokeWidth="2" />
            {/* Backrest interior */}
            <path d="M 45,65 C 45,35 75,25 115,25 C 155,25 185,35 185,65 C 185,100 155,120 115,120 C 75,120 45,100 45,65 Z" fill="#ecd9c6" />
            {/* Soft Eco-Cushion */}
            <ellipse cx="115" cy="115" rx="50" ry="20" fill="#52b788" />
            {/* Pill */}
            <rect x="45" y="145" width="140" height="24" rx="12" fill="#1b4332" />
            <text x="115" y="161" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🧘 Ergonomic Posture</text>
          </g>
        </svg>
      );

    case 'furn-desk':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f8f5ee" rx="12" />
          <g transform="translate(45, 45)">
            <ellipse cx="155" cy="180" rx="130" ry="15" fill="#000000" opacity="0.08" />
            {/* Desk Steel Frame / Legs */}
            <rect x="40" y="85" width="8" height="95" rx="2" fill="#2d6a4f" />
            <rect x="260" y="85" width="8" height="95" rx="2" fill="#2d6a4f" />
            <line x1="44" y1="150" x2="264" y2="150" stroke="#2d6a4f" strokeWidth="4" />
            {/* Desktop Surface (Warm Biscuit Board with foil specks) */}
            <polygon points="15,85 295,85 270,45 40,45" fill="#ecd9c6" stroke="#cbb497" strokeWidth="1.5" />
            <polygon points="15,85 295,85 295,95 15,95" fill="#bfa182" />
            {/* Cable grommet hole */}
            <circle cx="230" cy="60" r="6" fill="#2d6a4f" />
            {/* Eco Badge */}
            <rect x="85" y="110" width="140" height="24" rx="12" fill="#1b4332" />
            <text x="155" y="126" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">💻 Scratch & Stain Proof</text>
          </g>
        </svg>
      );

    case 'roof-sheet':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roofSilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="25%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="75%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#f4f7f4" rx="12" />
          <g transform="translate(45, 35)">
            {/* Corrugated waves */}
            <path d="M 20,70 Q 55,40 90,70 Q 125,100 160,70 Q 195,40 230,70 Q 265,100 300,70 L 300,160 Q 265,190 230,160 Q 195,130 160,160 Q 125,190 90,160 Q 55,130 20,160 Z" fill="url(#roofSilverGrad)" stroke="#475569" strokeWidth="1.5" />
            {/* Sun Rays bouncing off */}
            <g transform="translate(210, 15)">
              <circle cx="20" cy="20" r="14" fill="#f59e0b" />
              <line x1="20" y1="0" x2="20" y2="-6" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="35" y1="10" x2="42" y2="6" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Reflected Heat Arrow */}
              <path d="M 15,38 L 40,55 L 75,30" stroke="#ef4444" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
              <text x="75" y="22" fill="#dc2626" fontSize="9" fontWeight="bold">88% HEAT REFLECTED</text>
            </g>
            {/* Cool Temp Badge */}
            <rect x="70" y="110" width="170" height="28" rx="14" fill="#0284c7" />
            <text x="155" y="128" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">❄️ Drops Room Temp -5.5°C</text>
          </g>
        </svg>
      );

    case 'roof-tile':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f8f4ec" rx="12" />
          <g transform="translate(60, 40)">
            {/* Ridge tile triangle arch */}
            <path d="M 20,140 L 140,40 L 260,140 L 235,150 L 140,75 L 45,150 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <path d="M 140,40 L 140,75 L 235,150 L 260,140 Z" fill="#92400e" />
            {/* Interlocking clip tabs */}
            <rect x="25" y="135" width="20" height="15" rx="3" fill="#d97706" />
            <rect x="235" y="135" width="20" height="15" rx="3" fill="#d97706" />
            {/* Badge */}
            <rect x="75" y="110" width="130" height="24" rx="12" fill="#1b4332" />
            <text x="140" y="126" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🌪️ 140 km/h Wind Safe</text>
          </g>
        </svg>
      );

    case 'brick-block':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#8c6239" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#f6f3ea" rx="12" />
          <g transform="translate(60, 35)">
            <ellipse cx="140" cy="180" rx="120" ry="15" fill="#000000" opacity="0.08" />
            {/* Interlocking Pegs on Top */}
            <ellipse cx="75" cy="50" rx="20" ry="8" fill="#bc8c5c" />
            <path d="M 55,50 L 55,40 A 20 8 0 0 1 95 40 L 95,50 Z" fill="#deb887" />
            <ellipse cx="75" cy="40" rx="20" ry="8" fill="#ecd9c6" stroke="#a47a4c" strokeWidth="1" />

            <ellipse cx="195" cy="50" rx="20" ry="8" fill="#bc8c5c" />
            <path d="M 175,50 L 175,40 A 20 8 0 0 1 215 40 L 215,50 Z" fill="#deb887" />
            <ellipse cx="195" cy="40" rx="20" ry="8" fill="#ecd9c6" stroke="#a47a4c" strokeWidth="1" />

            {/* Brick Main Body */}
            <polygon points="20,140 260,140 260,65 20,65" fill="url(#brickGrad)" stroke="#714d2a" strokeWidth="2" />
            {/* Mortarless groove slot */}
            <rect x="115" y="85" width="40" height="55" fill="#5c3e21" rx="4" />
            {/* Recycled chip foil specks */}
            <circle cx="50" cy="85" r="2" fill="#fef08a" />
            <circle cx="85" cy="115" r="2.5" fill="#38bdf8" />
            <circle cx="220" cy="95" r="2" fill="#f43f5e" />
            {/* Badge */}
            <rect x="65" y="105" width="145" height="24" rx="12" fill="#2d6a4f" />
            <text x="137" y="121" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🧱 Zero Mortar / Lego-Fit</text>
          </g>
        </svg>
      );

    case 'brick-paver':
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f4f7f4" rx="12" />
          <g transform="translate(65, 30)">
            <rect x="10" y="10" width="250" height="175" rx="12" fill="#a89078" stroke="#786350" strokeWidth="2" />
            {/* Honeycomb permeable cells with green grass */}
            {[
              [50, 45], [110, 45], [170, 45], [220, 45],
              [80, 95], [140, 95], [200, 95],
              [50, 145], [110, 145], [170, 145], [220, 145]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <polygon points={`${cx},${cy-22} ${cx+20},${cy-10} ${cx+20},${cy+12} ${cx},${cy+22} ${cx-20},${cy+12} ${cx-20},${cy-10}`} fill="#2d6a4f" stroke="#403328" strokeWidth="2.5" />
                <circle cx={cx} cy={cy} r="8" fill="#52b788" />
                <path d={`M ${cx-4},${cy+3} L ${cx},${cy-5} L ${cx+4},${cy+3}`} stroke="#bbf7d0" strokeWidth="2" fill="none" />
              </g>
            ))}
            {/* Badge */}
            <rect x="65" y="145" width="140" height="24" rx="12" fill="#1b4332" />
            <text x="135" y="161" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">💧 100% Water Infiltration</text>
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="260" fill="#f5f0e6" rx="12" />
          <circle cx="200" cy="130" r="45" fill="#2d6a4f" opacity="0.2" />
          <text x="200" y="135" textAnchor="middle" fill="#1b4332" fontSize="14" fontWeight="bold">Eco Board Recycled Product</text>
        </svg>
      );
  }
};
