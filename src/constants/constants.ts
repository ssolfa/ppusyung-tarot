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
