'use client';

import { useState, useEffect } from 'react';
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
    <div className="w-full max-w-2xl mx-auto px-2 py-8">
      <div className="mb-8">
        <RacecourseSelector
          onRacecourseSelect={fetchWeather}
          selectedRacecourse={selectedRacecourse}
        />
      </div>
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand mr-3"></div>
          <span className="text-xl text-brand-dark font-bold">読み込み中...</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 shadow">
          <span className="font-bold">エラー:</span> {error}
        </div>
      )}
      {weather && selectedRacecourse && (
        <WeatherCard weather={weather} racecourse={selectedRacecourse} />
      )}
      {!weather && !loading && (
        <div className="text-center py-12 text-brand-dark/60">
          <span className="text-6xl block mb-3">🏇</span>
          <span className="text-lg font-semibold">競馬場を選択して天気・風の影響をチェック！</span>
        </div>
      )}
    </div>
  );
}

