import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '競馬場天気アプリ',
  description: '全国の競馬場のリアルタイム気象情報',
  manifest: '/manifest.json',
  // themeColor は削除！
};

// 新しい viewport 設定を追加
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6', // ここに移動！
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}