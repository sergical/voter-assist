import { motion } from 'framer-motion';

export const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        className="stroke-foreground dark:stroke-foreground" 
        strokeWidth="5" 
        fill="none"
      />
      <motion.path 
        d="M30 50 L45 65 L70 35" 
        className="stroke-foreground dark:stroke-foreground" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          delay: 0.2,
          ease: "easeInOut"
        }}
      />
    </svg>
  );
}; 