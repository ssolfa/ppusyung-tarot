import video from '@/assets/뿌슝타로.json';
import { LottieAnimation } from '@/components/LottieAnimation';
import { StarBackground } from '@/components/StarBackgroud';
import { UserNameDisplay } from '@/components/UserNameDisplay';

export default function FortuneCompletePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#5736F5] font-gyeonggi">
      <StarBackground />
      <div className="mt-[-50px] flex w-full flex-col items-center md:mt-[80px]">
        <UserNameDisplay />

        <div className="flex flex-col items-center space-y-4 text-center md:space-y-5">
          <p className="text-lg font-light text-white md:text-[25px]">
            오늘의 운세를 성공적으로 전송했어요!
          </p>

          <div className="mx-auto flex w-[400px] items-center justify-center md:w-[500px]">
            <LottieAnimation animationData={video} />
          </div>

          <div className="text-lg font-light text-white md:mt-10 md:text-[25px]">
            <p className="mb-1 md:mb-3">당신의 하루에</p>
            <p>작은 힘이 되었길 바래요!</p>
          </div>
        </div>
      </div>

      <button className="fixed bottom-10 left-1/2 h-[48px] w-[343px] -translate-x-1/2 transform rounded-full bg-[#C2C8FF] px-4 py-3 font-pretendard text-base leading-none text-[#5736F5] hover:bg-[#5A52EE] md:h-[52px] md:w-[525px] md:py-3.5 md:text-lg">
        확인
      </button>
    </div>
  );
}
