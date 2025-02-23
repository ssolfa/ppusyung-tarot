'use client';

import ppushung from '@/assets/ppushung.png';
import CheckBox from '@/components/CheckBox';
import SpeechBubble from '@/components/SpeechBubble';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [displayPhone, setDisplayPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const router = useRouter();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const digitsOnly = rawInput.replace(/\D/g, '');
    setPhoneNumber(digitsOnly);
    setDisplayPhone(formatPhoneNumber(digitsOnly));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = '이름을 입력해주세요';
    if (phoneNumber.length < 10) newErrors.phone = '올바른 전화번호를 입력해주세요';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('users').insert([{ phone_number: phoneNumber }]);
      if (error) throw error;

      sessionStorage.setItem('userName', name);

      router.push('/result');
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      setErrors({ ...newErrors, phone: '데이터 저장 중 오류가 발생했습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() !== '' && phoneNumber.length >= 10;

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

      <form
        onSubmit={handleSubmit}
        className="font-pretendard -mt-9 flex w-full max-w-md flex-col items-center font-normal md:-mt-6"
      >
        <div className="mb-3 flex flex-col items-center md:mb-4">
          <span className="font-pretendard mb-1 block self-start pl-1 text-xs font-normal text-[#6E7687] md:text-sm">
            이름
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="h-[48px] w-[343px] rounded-full px-4 py-3 text-sm text-black placeholder-[#6E7687] shadow-[0px_0px_7px_0px_#BDB4F7] placeholder:text-sm focus:outline-none md:h-[52px] md:w-[525px] md:py-4 md:text-base md:placeholder:text-base"
          />
          {errors.name && (
            <p className="mt-1 self-start pl-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-3 flex flex-col items-center md:mb-4">
          <span className="font-pretendard mb-1 block self-start pl-1 text-xs font-normal text-[#6E7687] md:text-sm">
            전화번호
          </span>
          <input
            type="tel"
            value={displayPhone}
            onChange={handlePhoneChange}
            placeholder="전화번호를 입력해주세요"
            className="h-[48px] w-[343px] rounded-full px-4 py-3 text-sm text-black placeholder-[#6E7687] shadow-[0px_0px_7px_0px_#BDB4F7] placeholder:text-sm focus:outline-none md:h-[52px] md:w-[525px] md:py-4 md:text-base md:placeholder:text-base"
          />
          {errors.phone && (
            <p className="mt-1 self-start pl-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="flex justify-center">
          <CheckBox isChecked={isChecked} onChange={setIsChecked} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="font-pretendard h-[48px] w-[343px] rounded-full bg-[#6B5CFF] px-4 py-3 text-center text-base font-semibold leading-none text-white hover:bg-[#5A52EE] md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg"
        >
          {isSubmitting ? '운세 보는 중...' : '오늘의 운세 보기'}
        </button>
      </form>
    </div>
  );
}
