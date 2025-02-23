'use client';

import ppushung from '@/assets/ppushung.png';
import CheckBox from '@/components/CheckBox';
import SpeechBubble from '@/components/SpeechBubble';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#DCDAFF] px-4 py-8">
      <header className="mb-4 mt-4 text-center md:mb-10">
        <p className="font-pretendard text-3xl font-extrabold text-[#755FFF] md:mb-4 md:text-[45px]">
          뿌춘쿠키
        </p>
        <p className="font-gyeonggi text-base font-light leading-[30px] text-[#000000] md:text-3xl">
          뿌슝이가 알려주는 오늘의 운세
        </p>
      </header>

      <section className="relative flex h-48 w-48 justify-center md:h-64 md:w-64">
        <Image
          alt="뿌슝이"
          src={ppushung}
          width={220}
          height={220}
          className="md:h-[306px] md:w-[306px]"
          priority
        />
        <SpeechBubble
          messages={{
            left: '유어슈 리크루팅이라던데',
            right: '오늘의 운세를 알려줄게',
          }}
        />
      </section>

      <section className="font-pretendard -mt-9 flex w-full max-w-md flex-col items-center font-normal md:-mt-6">
        <div className="mb-3 flex flex-col items-center md:mb-4">
          <span className="font-pretendard mb-1 block self-start pl-1 text-xs font-normal text-[#6E7687] md:text-sm">
            이름
          </span>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            className="h-[48px] w-[343px] rounded-full px-4 py-3 text-sm placeholder-[#6E7687] shadow-[0px_0px_7px_0px_#BDB4F7] placeholder:text-sm focus:outline-none md:h-[52px] md:w-[525px] md:py-4 md:text-base md:placeholder:text-base"
          />
        </div>

        <div className="mb-3 flex flex-col items-center md:mb-4">
          <span className="font-pretendard mb-1 block self-start pl-1 text-xs font-normal text-[#6E7687] md:text-sm">
            전화번호
          </span>
          <input
            type="tel"
            placeholder="전화번호를 - 없이 입력해주세요"
            className="h-[48px] w-[343px] rounded-full px-4 py-3 text-sm placeholder-[#6E7687] shadow-[0px_0px_7px_0px_#BDB4F7] placeholder:text-sm focus:outline-none md:h-[52px] md:w-[525px] md:py-4 md:text-base md:placeholder:text-base"
          />
        </div>

        <div className="flex justify-center">
          <CheckBox isChecked={isChecked} onChange={setIsChecked} />
        </div>

        <button className="font-pretendard h-[48px] w-[343px] rounded-full bg-[#6B5CFF] px-4 py-3 text-center text-base font-semibold leading-none text-white hover:bg-[#5A52EE] md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg">
          오늘의 운세 보기
        </button>
      </section>
    </div>
  );
}
