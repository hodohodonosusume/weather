'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// WeatherCardなど既存のコンポーネントをインポート
import WeatherCard from '@/components/WeatherCard';
import { Racecourse, racecourses } from '@/app/data/racecourses';

export default function WeatherPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            🏇 KEIBA Weather
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/memo" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              メモを見る
            </Link>
            <span className="text-gray-700">{user.username} さん</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">競馬場天気情報</h1>
        
        {/* 既存の天気表示コンポーネントをここに追加 */}
        <div className="text-center">
          <p className="text-lg text-gray-600">競馬場の天気情報を表示します</p>
        </div>
      </main>
    </div>
  );
}