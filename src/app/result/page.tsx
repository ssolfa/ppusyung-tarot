import video from '@/assets/뿌슝타로.json';
import { HomeButton } from '@/components/HomeButton';
import { LottieAnimation } from '@/components/LottieAnimation';
import { StarBackground } from '@/components/StarBackgroud';
import { UserNameDisplay } from '@/components/UserNameDisplay';

export default function FortuneCompletePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#5736F5] font-gyeonggi">
      <StarBackground />
      <div className="flex w-full flex-col items-center pt-24 md:pt-32">
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
      <div className="flex w-full justify-center py-8 md:mt-4">
        <HomeButton />
      </div>
    </div>
  );
}
