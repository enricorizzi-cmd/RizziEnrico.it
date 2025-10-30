import Image from 'next/image';

interface OSMBadgeProps {
  variant?: 'small' | 'medium' | 'footer';
  className?: string;
  useImage?: boolean; // Usa logo PNG invece di SVG
}

export default function OSMBadge({ 
  variant = 'small', 
  className = '', 
  useImage = false 
}: OSMBadgeProps) {
  // Se richiesto, usa logo PNG OSM
  if (useImage) {
    const sizeMap = {
      small: { width: 35, height: 12 },
      medium: { width: 50, height: 18 },
      footer: { width: 40, height: 12 },
    };
    const size = sizeMap[variant];
    
    return (
      <Image
        src="/logo-osm-partner.png"
        alt="Open Source Management Partner"
        width={size.width}
        height={size.height}
        className={`object-contain ${className}`}
        style={{ opacity: 0.6 }}
      />
    );
  }

  // SVG fallback
  const variants = {
    small: {
      width: 35,
      height: 12,
      smFont: 11,
      textFont: 5,
    },
    medium: {
      width: 50,
      height: 15,
      smFont: 14,
      textFont: 6,
    },
    footer: {
      width: 40,
      height: 12,
      smFont: 11,
      textFont: 5,
    },
  };

  const config = variants[variant];

  return (
    <svg
      width={config.width}
      height={config.height}
      viewBox="0 0 200 60"
      className={`opacity-60 ${className}`}
      aria-label="Open Source Management Partner"
    >
      <text
        x="0"
        y="18"
        fontFamily="Montserrat, sans-serif"
        fontSize={config.smFont}
        fontWeight="700"
        fill="#A72868"
      >
        SM
      </text>
      <text
        x="0"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize={config.textFont}
        fontWeight="400"
        fill="#6B7280"
      >
        OSM
      </text>
    </svg>
  );
}

