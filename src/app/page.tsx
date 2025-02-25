'use client';

import ppushung from '@/assets/ppushung.png';
import CheckBox from '@/components/CheckBox';
import SpeechBubble from '@/components/SpeechBubble';
import { ERROR_MESSAGES, SUPABASE } from '@/constants/constants';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { validateForm } from '@/utils/validation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const supabase = createClient(SUPABASE.URL, SUPABASE.ANON_KEY);

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
    const digitsOnly = rawInput.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(digitsOnly);
    setDisplayPhone(formatPhoneNumber(digitsOnly));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm({ name, phoneNumber });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isChecked) {
        const { error } = await supabase.from('users').insert([{ phone_number: phoneNumber }]);

        if (error) {
          if (error.code === '23505') {
            router.push('/?duplicate=true');
            setIsSubmitting(false);
            return;
          }
          throw error;
        }
      }

      const smsResponse = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          name,
        }),
      });

      const smsResult = await smsResponse.json();
      if (!smsResult.success) {
        throw new Error('SMS 발송 실패');
      }

      sessionStorage.setItem('userName', name);
      router.push('/loading');
    } catch {
      setErrors({ phone: ERROR_MESSAGES.SAVE_ERROR });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = name.trim() !== '' && phoneNumber.length >= 11;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#DCDAFF] px-4 py-8">
      <header className="mb-4 mt-4 text-center md:mb-10">
        <p className="font-pretendard text-3xl font-extrabold text-[#755FFF] md:mb-4 md:text-[45px]">
          뿌슝타로
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
        className="-mt-9 flex w-full max-w-md flex-col items-center font-pretendard font-normal md:-mt-6"
      >
        <div className="mb-3 flex flex-col items-center md:mb-4">
          <span className="mb-1 block self-start pl-1 font-pretendard text-xs font-normal text-[#6E7687] md:text-sm">
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
          <span className="mb-1 block self-start pl-1 font-pretendard text-xs font-normal text-[#6E7687] md:text-sm">
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
          className="h-[48px] w-[343px] rounded-full bg-[#6B5CFF] px-4 py-3 text-center font-pretendard text-base font-semibold leading-none text-white hover:bg-[#5A52EE] disabled:bg-gray-400 md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg"
        >
          {isSubmitting ? '운세 보는 중...' : '오늘의 운세 보기'}
        </button>
      </form>
    </div>
  );
}
