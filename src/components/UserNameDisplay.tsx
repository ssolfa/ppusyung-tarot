'use client';

import oval_pc_yellow from '@/assets/pc_yellow.svg';
import oval_phone_yellow from '@/assets/phone_yellow.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function UserNameDisplay() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
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
  );
}
