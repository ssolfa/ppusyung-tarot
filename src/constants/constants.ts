export const SUPABASE = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_NAME: '이름을 입력해주세요',
  INVALID_PHONE: '올바른 전화번호를 입력해주세요',
  DUPLICATE_PHONE: '이미 등록된 전화번호입니다',
  SAVE_ERROR: '데이터 저장 중 오류가 발생했습니다',
} as const;

export const MESSAGE_TEMPLATES = {
  FORTUNE: {
    text: (name: string) =>
      `${name}님, 뿌슝타로에서 오늘의 운세를 보내드립니다.
행복한 하루 보내시길 바라며, 유어슈는 언제나 여러분의 행복한 캠퍼스 라이프를 응원합니다. ♥
--- 
유어슈는 지금 2025 리크루팅 중 ☎
https://yourssu.com/recruiting/
많은 관심 부탁드립니다.`,
  },
};
