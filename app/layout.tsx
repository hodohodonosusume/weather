import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'KEIBA Weather',
  description: '競馬場リアルタイム気象 & 風向き有利不利',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6D28D9',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-lg shadow">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <h1 className="font-display text-2xl font-extrabold bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent select-none drop-shadow">🏇 KEIBA Weather</h1>
            <a href="https://github.com/hodohodonosusume/weather" className="text-sm font-bold text-brand hover:underline">GitHub</a>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8 animate-fadeIn">{children}</main>
        <footer className="py-6 text-center text-xs text-brandDark/70">
          © {new Date().getFullYear()} hodohodonosusume
        </footer>
      </body>
    </html>
  );
}
