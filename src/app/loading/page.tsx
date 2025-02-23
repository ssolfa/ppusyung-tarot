'use client';

import loading from '@/assets/loading.gif';
import oval_pc_purple from '@/assets/pc_purple.svg';
import oval_phone_purple from '@/assets/phone_purple.svg';
import SpeechBubble from '@/components/SpeechBubble';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const timer = setTimeout(() => {
      setProgress(100);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-gyeonggi flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#DCDAFF]">
      <div className="absolute top-10">
        <div className="relative">
          <div className="hidden md:block">
            <Image src={oval_pc_purple} alt="타원" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-medium text-[#755FFF]">
              {userName}님
            </div>
          </div>

          <div className="block md:hidden">
            <Image src={oval_phone_purple} alt="타원" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-medium text-[#755FFF]">
              {userName}님
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20">
        <div className="relative mx-auto flex w-[400px] justify-center md:w-[500px]">
          <div className="absolute left-1/2 top-[40%] w-[600px] -translate-x-1/2 -translate-y-1/2 md:w-[700px]">
            <Image
              alt="뿌슝이"
              src={loading}
              className="h-auto max-w-full object-contain"
              priority
            />
          </div>
          <SpeechBubble
            messages={{
              left: '유어슈 리크루팅이라던데',
              right: '기간은 3/1 ~ 3/8이라지??',
            }}
            variant="loading"
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center pb-[70px] md:pb-20 xl:pb-32">
          <div className="relative mx-auto mb-14 w-[90%] max-w-md md:mb-16">
            <div className="h-6 overflow-hidden rounded-full bg-white p-[3px] shadow-sm md:h-7">
              <div
                className="h-full rounded-full bg-[#6B5CFF] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#5736F5] md:text-lg">
              {progress} %
            </div>
          </div>

          <div className="text-center text-[#5736F5]">
            <p className="mb-2 text-lg font-medium md:mb-3 md:text-[25px]">오늘의 운세를</p>
            <p className="text-lg font-medium md:text-[25px]">확인하고 있어요!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
