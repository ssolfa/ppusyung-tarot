'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Modal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVisible = searchParams.get('duplicate') === 'true';

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
      onClick={() => router.back()}
    >
      <div
        className="w-[90%] max-w-md rounded-xl bg-white p-6 text-center font-pretendard font-medium text-black shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-4xl">😅</p>
        <p className="mt-4 text-lg md:text-2xl">이미 등록된 전화번호입니다</p>
        <p className="text-lg md:text-2xl">다른 번호로 시도해주세요!</p>
        <button
          onClick={() => router.back()}
          className="mt-6 w-[210px] rounded-full bg-[#6B5CFF] py-3 text-lg font-semibold text-white hover:bg-[#5A52EE] md:w-full"
        >
          확인했어요
        </button>
      </div>
    </div>
  );
}
