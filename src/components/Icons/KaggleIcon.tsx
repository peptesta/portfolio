interface KaggleIconProps {
  className?: string;
}

export function KaggleIcon({ className = "w-5 h-5" }: KaggleIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="currentColor"
    >
      <path 
        d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <text 
        x="50%" 
        y="55%" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize="10" 
        fontWeight="bold" 
        fill="currentColor"
      >
        K
      </text>
    </svg>
  );
}