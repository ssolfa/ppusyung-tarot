'use client';

import { useRouter } from 'next/navigation';

export function HomeButton() {
  const router = useRouter();

  const goToHome = () => {
    sessionStorage.clear();
    router.push('/');
  };

  return (
    <button
      className="h-[48px] w-[343px] rounded-full bg-[#C2C8FF] px-4 py-3 font-pretendard text-base leading-none text-[#5736F5] hover:bg-[#A9B1FF] md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg"
      onClick={goToHome}
    >
      확인
    </button>
  );
}
