import { motion } from 'framer-motion';

const AnimatedFlower = ({
  size = 100,
  color = '#4ADE80',
  opacity = 1,
  className = '',
  duration = 10
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`pointer-events-none ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: duration,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <motion.g
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {/* Generate 8 petals */}
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d="M50 50 C35 35 35 15 50 5 C65 15 65 35 50 50"
            fill={color}
            fillOpacity={opacity}
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
        {/* Center */}
        <circle cx="50" cy="50" r="10" fill="#FFF" fillOpacity={0.8} />
      </motion.g>
    </motion.svg>
  );
};

export default AnimatedFlower;
