'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import WeatherCard from '@/components/WeatherCard';
import { racecourses, Racecourse } from '@/app/data/racecourses';
import { WeatherData } from '@/app/types/weather';

export default function WeatherPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRacecourse, setSelectedRacecourse] = useState<Racecourse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'中央競馬' | '地方競馬'>('中央競馬');
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

  const fetchWeatherData = async (racecourse: Racecourse) => {
    setWeatherLoading(true);
    
    try {
      const response = await fetch(
        `/api/weather?lat=${racecourse.coordinates.lat}&lon=${racecourse.coordinates.lon}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setWeatherData(data);
      
    } catch (error) {
      console.error(`Weather fetch failed for ${racecourse.name}:`, error);
      setWeatherData(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleRacecourseSelect = (racecourse: Racecourse) => {
    setSelectedRacecourse(racecourse);
    fetchWeatherData(racecourse);
  };

  const handleReset = () => {
    setSelectedRacecourse(null);
    setWeatherData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">認証中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // 中央競馬と地方競馬に分類
  const centralRacecourses = racecourses.filter(r => r.type === '中央競馬');
  const localRacecourses = racecourses.filter(r => r.type === '地方競馬');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            🏇 KEIBA Weather
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/memo" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              📝 メモを見る
            </Link>
            <Link href="https://github.com/hodohodonosusume/weather" className="text-gray-600 hover:text-gray-800">
              GitHub
            </Link>
            <span className="text-gray-700">{user.username} さん</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* 選択された競馬場の天気表示 */}
        {selectedRacecourse && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                ← 戻る
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedRacecourse.name} の天気
              </h1>
            </div>
            
            {weatherLoading ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-gray-300 rounded"></div>
                      <div className="h-16 bg-gray-300 rounded"></div>
                      <div className="h-16 bg-gray-300 rounded"></div>
                      <div className="h-16 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : weatherData ? (
              <div className="max-w-2xl mx-auto">
                <WeatherCard 
                  weather={weatherData} 
                  racecourse={selectedRacecourse} 
                />
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 text-center">
                  <h3 className="font-bold text-red-600 mb-2">{selectedRacecourse.name}</h3>
                  <p className="text-red-500">❌ 天気データの取得に失敗しました</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 競馬場選択画面 */}
        {!selectedRacecourse && (
          <>
            {/* タブ */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <button
                  onClick={() => setActiveTab('中央競馬')}
                  className={`px-8 py-3 rounded-full font-bold transition ${
                    activeTab === '中央競馬'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  🏆 中央競馬
                </button>
                <button
                  onClick={() => setActiveTab('地方競馬')}
                  className={`px-8 py-3 rounded-full font-bold transition ${
                    activeTab === '地方競馬'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  🌟 地方競馬
                </button>
              </div>
            </div>

            {/* 競馬場ボタン一覧 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {(activeTab === '中央競馬' ? centralRacecourses : localRacecourses).map((racecourse) => (
                <button
                  key={racecourse.id}
                  onClick={() => handleRacecourseSelect(racecourse)}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 text-center"
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {racecourse.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {racecourse.prefecture}
                  </p>
                </button>
              ))}
            </div>

            {/* 説明メッセージ */}
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-700 rounded-full">
                <span className="text-lg">📍 競馬場を選択すると気象データが表示されます</span>
              </div>
            </div>

            {/* フッター */}
            <div className="text-center mt-12 text-gray-500 text-sm">
              <p>© 2025 hodohodonosusume</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
