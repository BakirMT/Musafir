import React from 'react';

interface KaabaLogoProps {
  className?: string;
  size?: number;
}

export const KaabaLogo: React.FC<KaabaLogoProps> = ({ className = 'w-12 h-12', size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Holy Kaaba Logo"
    >
      <defs>
        {/* Gold gradients for Kiswah and Bab al-Kaaba */}
        <linearGradient id="kaabaGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DFB76C" />
          <stop offset="35%" stopColor="#FCE59F" />
          <stop offset="70%" stopColor="#D4A74F" />
          <stop offset="100%" stopColor="#9C752B" />
        </linearGradient>

        <linearGradient id="kaabaDoorGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="40%" stopColor="#DFB76C" />
          <stop offset="100%" stopColor="#A88132" />
        </linearGradient>

        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E343B" />
          <stop offset="100%" stopColor="#1E2328" />
        </linearGradient>

        <filter id="kaabaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#kaabaGlow)">
        {/* Soft shadow below Kaaba */}
        <ellipse cx="32" cy="54" rx="20" ry="5.5" fill="#000000" fillOpacity="0.35" />

        {/* Marble Base (Shadhrawan) */}
        <polygon points="10,41.5 32,53.5 54,41.5 52,40 32,51 12,40" fill="#E8DEC8" fillOpacity="0.7" />

        {/* Left Wall (in shade) */}
        <polygon points="12,23 32,34 32,51 12,40" fill="#111317" />

        {/* Right Wall (illuminated) */}
        <polygon points="32,34 52,23 52,40 32,51" fill="#1C2026" />

        {/* Roof (Top Face) */}
        <polygon points="32,12 52,23 32,34 12,23" fill="url(#roofGrad)" />

        {/* Roof Gold Edge Trim */}
        <polyline points="12,23 32,34 52,23" stroke="url(#kaabaGold)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Meezab ar-Rahmah (Golden Spout at top edge) */}
        <line x1="22" y1="17.5" x2="19" y2="19.2" stroke="url(#kaabaGold)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Kiswah Gold Band (Left Side) */}
        <polygon points="12,27 32,38 32,41.5 12,30.5" fill="url(#kaabaGold)" />
        {/* Left side Kiswah golden embroidery stitches */}
        <line x1="14" y1="28.2" x2="30" y2="39.2" stroke="#FFF7D6" strokeWidth="0.6" strokeDasharray="1.2 1" />
        <line x1="14" y1="29.4" x2="30" y2="40.4" stroke="#FFF7D6" strokeWidth="0.6" strokeDasharray="1.2 1" />

        {/* Kiswah Gold Band (Right Side) */}
        <polygon points="32,38 52,27 52,30.5 32,41.5" fill="url(#kaabaGold)" />
        {/* Right side Kiswah golden embroidery stitches */}
        <line x1="34" y1="39.2" x2="50" y2="28.2" stroke="#FFF7D6" strokeWidth="0.6" strokeDasharray="1.2 1" />
        <line x1="34" y1="40.4" x2="50" y2="29.4" stroke="#FFF7D6" strokeWidth="0.6" strokeDasharray="1.2 1" />

        {/* Bab al-Ka'bah (Golden Door on Right Wall) */}
        <polygon points="37,38.5 44,34.6 44,47 37,50" fill="url(#kaabaDoorGold)" />
        <polygon points="38,39.4 43,36.5 43,46.2 38,48.8" fill="#FFF2BD" fillOpacity="0.45" />

        {/* Door details & lock */}
        <line x1="40.5" y1="38" x2="40.5" y2="47.5" stroke="#9C752B" strokeWidth="0.6" />
        <circle cx="40.5" cy="43.5" r="0.9" fill="#7A5618" />

        {/* Hajar al-Aswad (Black Stone) Silver casing hint at corner */}
        <ellipse cx="32" cy="50.8" rx="1.2" ry="1.6" fill="#D9E2EC" stroke="#627D98" strokeWidth="0.4" />
      </g>
    </svg>
  );
};
