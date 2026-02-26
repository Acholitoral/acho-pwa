/**
 * Maritime Background Components
 * Lúdico, turístico e vibrante
 * Gradiente: Céu (#E6F4FA) → Turquesa (#D4F1F4) → Areia (#FFF4E6)
 */

// SVG: Tentáculos com ventosas
export const TentaclesSVG = ({ opacity = 0.25 }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity }}
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="tentacleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Tentáculo esquerdo */}
    <path
      d="M 100 200 Q 120 350 150 500 Q 160 600 140 700"
      stroke="url(#tentacleGrad)"
      strokeWidth="35"
      fill="none"
      strokeLinecap="round"
    />
    {/* Ventosas esquerda */}
    <circle cx="110" cy="280" r="8" fill="#FF8C42" opacity="0.5" />
    <circle cx="125" cy="350" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="140" cy="420" r="8" fill="#FF8C42" opacity="0.5" />
    <circle cx="150" cy="500" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="145" cy="580" r="8" fill="#FF8C42" opacity="0.5" />

    {/* Tentáculo direito */}
    <path
      d="M 1100 250 Q 1080 380 1050 520 Q 1040 610 1060 700"
      stroke="url(#tentacleGrad)"
      strokeWidth="35"
      fill="none"
      strokeLinecap="round"
    />
    {/* Ventosas direita */}
    <circle cx="1090" cy="310" r="8" fill="#FF8C42" opacity="0.5" />
    <circle cx="1075" cy="380" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="1060" cy="450" r="8" fill="#FF8C42" opacity="0.5" />
    <circle cx="1050" cy="530" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="1055" cy="610" r="8" fill="#FF8C42" opacity="0.5" />

    {/* Tentáculo centro-esquerdo */}
    <path
      d="M 300 150 Q 310 300 320 450 Q 325 580 310 700"
      stroke="url(#tentacleGrad)"
      strokeWidth="28"
      fill="none"
      strokeLinecap="round"
    />
    {/* Ventosas centro-esquerda */}
    <circle cx="305" cy="240" r="6" fill="#FF8C42" opacity="0.5" />
    <circle cx="315" cy="320" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="320" cy="400" r="6" fill="#FF8C42" opacity="0.5" />
    <circle cx="323" cy="500" r="7" fill="#FF8C42" opacity="0.5" />

    {/* Tentáculo centro-direito */}
    <path
      d="M 900 180 Q 890 320 880 480 Q 875 600 890 700"
      stroke="url(#tentacleGrad)"
      strokeWidth="28"
      fill="none"
      strokeLinecap="round"
    />
    {/* Ventosas centro-direita */}
    <circle cx="895" cy="270" r="6" fill="#FF8C42" opacity="0.5" />
    <circle cx="885" cy="350" r="7" fill="#FF8C42" opacity="0.5" />
    <circle cx="880" cy="430" r="6" fill="#FF8C42" opacity="0.5" />
    <circle cx="877" cy="530" r="7" fill="#FF8C42" opacity="0.5" />
  </svg>
);

// SVG: Ondas reconhecíveis
export const WavesSVG = ({ opacity = 0.2 }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity }}
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00CED1" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#00CED1" stopOpacity="0.2" />
      </linearGradient>
    </defs>

    {/* Onda 1 - Topo */}
    <path
      d="M 0 150 Q 150 120 300 150 T 600 150 T 900 150 T 1200 150 L 1200 200 Q 1050 230 900 200 T 600 200 T 300 200 T 0 200 Z"
      fill="url(#waveGrad)"
    />

    {/* Onda 2 - Meio */}
    <path
      d="M 0 350 Q 200 310 400 350 T 800 350 T 1200 350 L 1200 420 Q 1000 460 800 420 T 400 420 T 0 420 Z"
      fill="url(#waveGrad)"
      opacity="0.7"
    />

    {/* Onda 3 - Base */}
    <path
      d="M 0 550 Q 150 510 300 550 T 600 550 T 900 550 T 1200 550 L 1200 650 Q 1050 690 900 650 T 600 650 T 300 650 T 0 650 Z"
      fill="url(#waveGrad)"
      opacity="0.5"
    />

    {/* Linha de espuma */}
    <path
      d="M 0 200 Q 100 195 200 200 T 600 200 T 1000 200 T 1200 200"
      stroke="#FFFFFF"
      strokeWidth="2"
      fill="none"
      opacity="0.4"
      strokeDasharray="10,5"
    />
  </svg>
);

// SVG: Bolhas leves
export const BubblesSVG = ({ opacity = 0.15 }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity }}
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="bubbleGrad1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00CED1" stopOpacity="0.2" />
      </radialGradient>
      <radialGradient id="bubbleGrad2">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#00CED1" stopOpacity="0.1" />
      </radialGradient>
    </defs>

    {/* Bolhas grandes */}
    <circle cx="150" cy="200" r="35" fill="url(#bubbleGrad1)" />
    <circle cx="1050" cy="300" r="40" fill="url(#bubbleGrad1)" />
    <circle cx="600" cy="150" r="30" fill="url(#bubbleGrad2)" />

    {/* Bolhas médias */}
    <circle cx="300" cy="400" r="20" fill="url(#bubbleGrad2)" />
    <circle cx="900" cy="500" r="22" fill="url(#bubbleGrad2)" />
    <circle cx="450" cy="600" r="18" fill="url(#bubbleGrad1)" />
    <circle cx="750" cy="650" r="20" fill="url(#bubbleGrad2)" />

    {/* Bolhas pequenas */}
    <circle cx="200" cy="550" r="10" fill="url(#bubbleGrad2)" />
    <circle cx="1100" cy="450" r="12" fill="url(#bubbleGrad2)" />
    <circle cx="500" cy="300" r="8" fill="url(#bubbleGrad1)" />
    <circle cx="800" cy="250" r="9" fill="url(#bubbleGrad2)" />
    <circle cx="350" cy="150" r="11" fill="url(#bubbleGrad2)" />
    <circle cx="1000" cy="150" r="10" fill="url(#bubbleGrad1)" />

    {/* Bolhas micro */}
    <circle cx="100" cy="700" r="5" fill="url(#bubbleGrad2)" />
    <circle cx="1150" cy="680" r="6" fill="url(#bubbleGrad2)" />
    <circle cx="600" cy="700" r="5" fill="url(#bubbleGrad1)" />
  </svg>
);

// SVG: Elementos suaves de mar (algas, corais)
export const MarineElementsSVG = ({ opacity = 0.12 }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity }}
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="marineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00CED1" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#00CED1" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Algas esquerda */}
    <path
      d="M 80 400 Q 90 450 85 500 Q 80 550 90 600 Q 95 650 85 700"
      stroke="url(#marineGrad)"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Algas direita */}
    <path
      d="M 1120 450 Q 1110 500 1115 550 Q 1120 600 1110 650 Q 1105 700 1115 750"
      stroke="url(#marineGrad)"
      strokeWidth="12"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Algas centro */}
    <path
      d="M 600 500 Q 610 550 605 600 Q 600 650 610 700"
      stroke="url(#marineGrad)"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Pequenos corais/plantas */}
    <path
      d="M 250 650 L 250 700 M 240 680 L 260 680"
      stroke="url(#marineGrad)"
      strokeWidth="6"
      fill="none"
      opacity="0.4"
    />
    <path
      d="M 950 680 L 950 730 M 940 710 L 960 710"
      stroke="url(#marineGrad)"
      strokeWidth="6"
      fill="none"
      opacity="0.4"
    />
  </svg>
);

/**
 * Componente Principal: MaritimeBackground
 * Variants: 'onboarding' (25%), 'home' (18%), 'list' (10%)
 */
export default function MaritimeBackground({ variant = 'home', className = '' }) {
  const opacityMap = {
    onboarding: 0.25,
    home: 0.18,
    list: 0.1
  };

  const opacity = opacityMap[variant] || opacityMap.home;
  const baseOpacity = opacity;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradiente base global */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #E6F4FA 0%, #D4F1F4 40%, #FFF4E6 100%)'
        }}
      />

      {/* Camadas de SVG com opacidades variadas */}
      <div className="absolute inset-0">
        <WavesSVG opacity={baseOpacity * 0.8} />
      </div>

      <div className="absolute inset-0">
        <TentaclesSVG opacity={baseOpacity * 0.7} />
      </div>

      <div className="absolute inset-0">
        <BubblesSVG opacity={baseOpacity * 0.6} />
      </div>

      <div className="absolute inset-0">
        <MarineElementsSVG opacity={baseOpacity * 0.5} />
      </div>

      {/* Overlay suave para melhorar legibilidade */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.1) 100%)'
        }}
      />
    </div>
  );
}
