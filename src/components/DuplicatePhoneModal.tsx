'use client';

export default function DuplicateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="font-pretendard w-[90%] max-w-md rounded-xl bg-white p-6 text-center font-medium text-black shadow-lg">
        <p className="text-4xl">😅</p>
        <p className="mt-4 text-lg md:text-2xl">이미 운세를 보냈어요!</p>
        <p className="text-lg md:text-2xl">메시지를 확인해보세요!!</p>
        <button
          onClick={onClose}
          className="mt-6 w-[210px] rounded-full bg-[#6B5CFF] py-3 text-lg font-semibold text-white hover:bg-[#5A52EE] md:w-full"
        >
          확인했어요
        </button>
      </div>
    </div>
  );
}
