export interface SmallStar {
  top: string;
  left: string;
  size: number;
  opacity: number;
}

export interface LargeStar extends SmallStar {
  animation: string;
}

export const generateStars = (): {
  smallStars: SmallStar[];
  largeStars: LargeStar[];
} => {
  const smallStars: SmallStar[] = Array.from({ length: 30 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1 + 1,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  const largeStars: LargeStar[] = Array.from({ length: 10 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1 + 2,
    opacity: Math.random() * 0.7 + 0.7,
    animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
  }));

  return { smallStars, largeStars };
};
