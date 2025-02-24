'use client';

import { LargeStar, SmallStar, generateStars } from '@/utils/generateStars';
import { useEffect, useState } from 'react';

export function StarBackground() {
  const [stars, setStars] = useState<SmallStar[]>([]);
  const [bigStars, setBigStars] = useState<LargeStar[]>([]);

  useEffect(() => {
    const { smallStars, largeStars } = generateStars();
    setStars(smallStars);
    setBigStars(largeStars);
  }, []);

  return (
    <>
      {stars.map((star, index) => (
        <div
          key={`small-star-${index}`}
          className="absolute bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size * 5}px`,
            height: `${star.size * 5}px`,
            opacity: star.opacity,
            clipPath: 'polygon(50% 0%,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0% 50%,40% 40%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      {bigStars.map((star, index) => (
        <div
          key={`big-star-${index}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
          }}
        >
          <div
            className="absolute bg-white"
            style={{
              width: `${star.size * 7}px`,
              height: `${star.size * 7}px`,
              opacity: star.opacity,
              clipPath: 'polygon(50% 0%,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0% 50%,40% 40%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 0 6px 3px rgba(255, 255, 255, 0.9)',
              animation: star.animation,
            }}
          />
        </div>
      ))}
    </>
  );
}
