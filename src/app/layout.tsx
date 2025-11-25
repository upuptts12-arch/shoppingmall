import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// [수정됨] 경로를 './' (현재 폴더의 하위 폴더)로 변경했습니다.
// app/components/WishlistSidebar.tsx 파일이 있어야 합니다.
import { WishlistProvider } from './context/WishlistContext';

// [핵심 수정] 절대 경로(@) 대신 상대 경로(./)를 사용해봅니다.
// 만약 여기서도 빨간 줄이 뜨면, components 폴더가 app 폴더 밖에 있을 수 있습니다.
// 그럴 땐 '../components/WishlistSidebar' 로 바꿔보세요.
import WishlistSidebar from './components/WishlistSidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Team Mall',
  description: 'Best Shopping Mall',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WishlistProvider>
          {/* 하트 아이콘 클릭 시 나오는 사이드바 */}
          <WishlistSidebar />

          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
