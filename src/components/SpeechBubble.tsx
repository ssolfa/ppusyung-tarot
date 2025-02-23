'use client';

import { useEffect, useState } from 'react';

interface SpeechBubbleProps {
  messages: {
    left?: string;
    right?: string;
  };
  interval?: number;
  variant?: 'default' | 'loading';
}

const POSITION_CLASSES = {
  loading: {
    left: 'left-3 md:left-[-70px] top-5 md:top-10',
    right: 'right-7 md:right-[-70px] bottom-5 md:bottom-10',
  },
  default: {
    left: 'left-[-90px] md:left-[-140px] top-10 md:top-20',
    right: 'right-[-85px] md:right-[-160px] bottom-10 md:bottom-20',
  },
} as const;

const BUBBLE_BASE_CLASSES =
  'absolute bg-[#ECEFFF] text-[#6B5CFF] rounded-full px-4 py-1 md:py-2 text-xs md:text-[15px] shadow-[0px_0px_7px_0px_#BDB4F7] transition-opacity duration-500 ease-in-out';

export default function SpeechBubble({
  messages,
  interval = 3000,
  variant = 'default',
}: SpeechBubbleProps) {
  const [showLeftBubble, setShowLeftBubble] = useState(true);
  const [showRightBubble, setShowRightBubble] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowLeftBubble((prev) => !prev);
      setShowRightBubble((prev) => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const getPositionClasses = (side: 'left' | 'right') => POSITION_CLASSES[variant][side];

  const renderBubble = (
    content: string | undefined,
    side: 'left' | 'right',
    isVisible: boolean,
  ) => {
    if (!content) return null;

    return (
      <div
        className={` ${BUBBLE_BASE_CLASSES} ${getPositionClasses(side)} ${isVisible ? 'opacity-100' : 'opacity-0'} `}
      >
        {content}
      </div>
    );
  };

  return (
    <>
      {renderBubble(messages.left, 'left', showLeftBubble)}
      {renderBubble(messages.right, 'right', showRightBubble)}
    </>
  );
}
