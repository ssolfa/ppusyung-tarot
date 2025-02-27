'use client';

import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('react-lottie-player').then((mod) => mod.default), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LottieAnimation({ animationData }: any) {
  return <LottiePlayer loop play animationData={animationData} />;
}
