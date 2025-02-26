import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '뿌슝타로',
  description: '뿌슝이가 알려주는 오늘의 운세',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  console.log('modal slot exists:', !!modal);
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        {modal}
      </body>
    </html>
  );
}
