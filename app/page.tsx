'use client';

import { useState } from 'react';
import RacecourseSelector from './components/RacecourseSelector';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types/weather';
import { Racecourse } from './data/racecourses';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedRacecourse, setSelectedRacecourse] = useState<Racecourse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (racecourse: Racecourse) => {
    setLoading(true);
    setError(null);
    setSelectedRacecourse(racecourse);

    try {
      const url = `/api/weather?lat=${racecourse.coordinates.lat}&lon=${racecourse.coordinates.lon}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '天気情報の取得に失敗しました');
      }

      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">🏇 競馬場天気</h1>

        <RacecourseSelector 
          onRacecourseSelect={fetchWeather}
          selectedRacecourse={selectedRacecourse}
        />

        {loading && <div className="text-center py-8">読み込み中...</div>}

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {weather && selectedRacecourse && (<WeatherCard weather={weather} racecourse={selectedRacecourse} />
         )}

        {!weather && !loading && (
          <div className="text-center py-8 text-gray-600">
            競馬場を選択して天気情報を表示してください
          </div>
        )}
      </div>
    </div>
  );
}

