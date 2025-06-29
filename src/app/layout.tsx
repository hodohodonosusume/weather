// ファイルの場所: src/app/layout.tsx

import './globals.css';
import type { Metadata, Viewport } from 'next';

import ConfigureAmplifyClientSide from '@/components/ConfigureAmplifyClientSide';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}

// 2つのCSSファイルは、ここで読み込むのが一番いいわね
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css';


export const metadata: Metadata = {
  title: 'KEIBA Weather',
  description: '競馬場リアルタイム気象',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6D28D9',
};

