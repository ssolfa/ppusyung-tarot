'use client';

import oval_pc_yellow from '@/assets/pc_yellow.svg';
import oval_phone_yellow from '@/assets/phone_yellow.svg';
import resultCard from '@/assets/ppushung.gif';
import { generateStars, LargeStar, SmallStar } from '@/utils/generateStars';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FortuneCompletePage() {
  const [stars, setStars] = useState<SmallStar[]>([]);
  const [bigStars, setBigStars] = useState<LargeStar[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    const { smallStars, largeStars } = generateStars();
    setStars(smallStars);
    setBigStars(largeStars);
  }, []);

  return (
    <div className="font-gyeonggi relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#5736F5]">
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
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`,
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
            transform: `rotate(${Math.random() * 360}deg)`,
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

      <div className="mt-[-50px] flex w-full flex-col items-center md:mt-[80px]">
        <div className="absolute top-10">
          <div className="relative">
            <div className="hidden md:block">
              <Image src={oval_pc_yellow} alt="타원" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-medium text-[#FCC773]">
                {userName}님
              </div>
            </div>

            <div className="block md:hidden">
              <Image src={oval_phone_yellow} alt="타원" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-medium text-[#FCC773]">
                {userName}님
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 text-center md:space-y-5">
          <p className="text-lg font-light text-white md:text-[25px]">
            오늘의 운세를 성공적으로 전송했어요!
          </p>

          <div className="mx-auto flex w-[400px] items-center justify-center md:w-[500px]">
            <Image
              alt="결과 gif"
              src={resultCard}
              unoptimized
              priority
              className="h-auto max-w-full object-contain"
            />
          </div>

          <div className="text-lg font-light text-white md:mt-10 md:text-[25px]">
            <p className="mb-1 md:mb-3">당신의 하루에</p>
            <p>작은 힘이 되었길 바래요!</p>
          </div>
        </div>
      </div>

      <button className="font-pretendard fixed bottom-10 left-1/2 h-[48px] w-[343px] -translate-x-1/2 transform rounded-full bg-[#C2C8FF] px-4 py-3 text-base leading-none text-[#5736F5] hover:bg-[#5A52EE] md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg">
        확인
      </button>
    </div>
  );
}
