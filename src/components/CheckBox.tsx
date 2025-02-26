'use client';

import arrow from '@/assets/icArrowsChevronRight.svg';
import Image from 'next/image';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({ isChecked, onChange }: CheckBoxProps) {
  return (
    <div className="mb-4 flex h-[48px] w-[343px] items-center md:mb-5 md:h-[52px] md:w-[525px]">
      <input
        type="checkbox"
        id="agreement"
        className="hidden"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <label htmlFor="agreement" className="flex cursor-pointer items-center">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            isChecked ? 'border-[#6B5CFF] bg-[#6B5CFF]' : 'border-[#6B5CFF]'
          }`}
        >
          <svg
            className={`h-3 w-3 ${isChecked ? 'text-white' : 'text-[#6B5CFF]'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="ml-2 text-xs text-[#4B505D] md:text-sm">
          개인정보 수집 이용 동의 (선택)
        </span>
      </label>

      <div className="ml-auto">
        <a href="https://www.notion.so" target="_blank" rel="noopener noreferrer">
          <Image alt="화살표" src={arrow} className="cursor-pointer" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
