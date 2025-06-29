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
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAllWeatherData();
    }
  }, [user]);

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

  const fetchAllWeatherData = async () => {
    setWeatherLoading(true);
    setError(null);
    
    try {
      const weatherPromises = racecourses.map(async (racecourse) => {
        try {
          // ★★★ coordinates プロパティを正しく参照 ★★★
          const response = await fetch(
            `/api/weather?lat=${racecourse.coordinates.lat}&lon=${racecourse.coordinates.lon}`
          );
          
          if (!response.ok) {
            console.error(`HTTP ${response.status} for ${racecourse.name}`);
            return null;
          }
          
          const weatherData = await response.json();
          
          // ★★★ APIから返ってくるデータをそのまま使用（変換不要）★★★
          console.log(`Weather data for ${racecourse.name}:`, weatherData);
          
          // APIレスポンスが期待された構造かチェック
          if (!weatherData.temperature && weatherData.temperature !== 0) {
            console.error(`Invalid weather data for ${racecourse.name}:`, weatherData);
            return null;
          }
          
          return { name: racecourse.name, data: weatherData };
        } catch (error) {
          console.error(`Weather fetch failed for ${racecourse.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(weatherPromises);
      const weatherMap: Record<string, WeatherData> = {};
      
      results.forEach((result) => {
        if (result) {
          weatherMap[result.name] = result.data;
        }
      });

      setWeatherData(weatherMap);
      
      // エラーが発生した競馬場の数をチェック
      const failedCount = results.filter(r => r === null).length;
      if (failedCount > 0) {
        setError(`${failedCount}件の競馬場で天気データの取得に失敗しました`);
      }
      
    } catch (error) {
      console.error('Weather data fetch error:', error);
      setError('天気データの取得に失敗しました');
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAllWeatherData();
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
            <button
              onClick={handleRefresh}
              disabled={weatherLoading}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                weatherLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {weatherLoading ? '更新中...' : '🔄 更新'}
            </button>
            <Link href="/memo" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              📝 メモを見る
            </Link>
            <span className="text-gray-700">{user.username} さん</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* タイトルセクション */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌤️ 競馬場天気情報</h1>
          <p className="text-lg text-gray-600">全国競馬場のリアルタイム天気と風向き分析</p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* 中央競馬セクション */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center">
            🏆 中央競馬
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {centralRacecourses.map((racecourse) => (
              <div key={racecourse.id}>
                {weatherLoading ? (
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
                ) : weatherData[racecourse.name] ? (
                  <WeatherCard 
                    weather={weatherData[racecourse.name]} 
                    racecourse={racecourse} 
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 text-center">
                    <h3 className="font-bold text-red-600 mb-2">{racecourse.name}</h3>
                    <p className="text-red-500 mb-2">❌ データ取得エラー</p>
                    <p className="text-sm text-gray-500">{racecourse.prefecture}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 地方競馬セクション */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            🌟 地方競馬
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {localRacecourses.map((racecourse) => (
              <div key={racecourse.id}>
                {weatherLoading ? (
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
                ) : weatherData[racecourse.name] ? (
                  <WeatherCard 
                    weather={weatherData[racecourse.name]} 
                    racecourse={racecourse} 
                  />
                ) : (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 text-center">
                    <h3 className="font-bold text-red-600 mb-2">{racecourse.name}</h3>
                    <p className="text-red-500 mb-2">❌ データ取得エラー</p>
                    <p className="text-sm text-gray-500">{racecourse.prefecture}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* フッター情報 */}
        <div className="text-center text-gray-500 text-sm">
          <p>天気データ提供: OpenWeatherMap API</p>
          <p>最終更新: {weatherData && Object.keys(weatherData).length > 0 ? 
            new Date().toLocaleString('ja-JP') : '未取得'}</p>
        </div>
      </main>
    </div>
  );
}
