'use client';

import { useState } from 'react';
import RacecourseSelector from './components/RacecourseSelector';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types/weather';
import { Racecourse } from './data/racecourses';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [racecourse, setRacecourse] = useState<Racecourse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (rc: Racecourse) => {
    setLoading(true);
    setError(null);
    setRacecourse(rc);

    try {
      const res = await fetch(`/api/weather?lat=${rc.coordinates.lat}&lon=${rc.coordinates.lon}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '取得失敗');
      setWeather(data);
    } catch (e: any) {
      setError(e.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RacecourseSelector onRacecourseSelect={fetchWeather} selectedRacecourse={racecourse} />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="relative flex h-10 w-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-10 w-10 bg-accent"></span>
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl shadow-card mb-8">
          <b>エラー:</b> {error}
        </div>
      )}

      {weather && racecourse && <WeatherCard weather={weather} racecourse={racecourse} />}

      {!weather && !loading && !error && (
        <p className="text-center text-brandDark/60 mt-12">競馬場を選択すると気象データが表示されます</p>
      )}
    </>
  );
}
