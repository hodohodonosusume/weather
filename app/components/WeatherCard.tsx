'use client';

import { WeatherData } from '@/app/types/weather';
import {
  getDiscomfortLevel,
  getWindDirection,
  judgeWindEffect,
  getRunningStyleImpact,
  RunningStyle,
  calculateOxygenIndex
} from '@/app/utils/calculations';
import { Racecourse } from '@/app/data/racecourses';

interface Props {
  weather: WeatherData;
  racecourse: Racecourse;
}

export default function WeatherCard({ weather, racecourse }: Props) {
  const homeWind = judgeWindEffect(weather.windDirection, racecourse.homeStretchDir);
  const backWind = judgeWindEffect(weather.windDirection, racecourse.backStretchDir);
  const oxygenIndex = calculateOxygenIndex(weather.pressure);

  const styleRow = (style: RunningStyle) => (
    <tr key={style} className="text-sm">
      <td className="border px-2 py-1">{style}</td>
      <td className="border px-2 py-1">{getRunningStyleImpact(homeWind, style)}</td>
      <td className="border px-2 py-1">{getRunningStyleImpact(backWind, style)}</td>
    </tr>
  );

  return (
    <div className="relative bg-gradient-to-br from-blue-100 via-white to-green-100 rounded-2xl shadow-2xl p-6 border border-blue-200 hover:shadow-blue-300 transition-shadow duration-300">
      {/* 飾りのリボン */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-1 rounded-full shadow-lg font-bold text-lg z-10">
        {racecourse.name}
      </div>

      {/* メイン天気 */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-20 h-20 drop-shadow-lg"
          />
          <div>
            <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow">
              {weather.temperature}°C
            </div>
            <div className="text-lg text-gray-700 font-semibold">{weather.description}</div>
          </div>
        </div>
      </div>

      {/* 詳細気象データ */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/70 rounded-lg p-4 border border-blue-100 shadow">
          <div className="font-bold text-blue-700 flex items-center mb-2">💧 湿度</div>
          <div className="text-2xl font-bold text-blue-600">{weather.humidity}%</div>
        </div>
        <div className="bg-white/70 rounded-lg p-4 border border-orange-100 shadow">
          <div className="font-bold text-orange-700 flex items-center mb-2">🌡️ 不快指数</div>
          <div className="text-2xl font-bold text-orange-600">{weather.discomfortIndex}</div>
          <div className="text-xs text-orange-500">{getDiscomfortLevel(weather.discomfortIndex)}</div>
        </div>
        <div className="bg-white/70 rounded-lg p-4 border border-green-100 shadow">
          <div className="font-bold text-green-700 flex items-center mb-2">🌪️ 風向・風速</div>
          <div className="text-lg font-bold text-green-600">
            {getWindDirection(weather.windDirection)} {weather.windSpeed}m/s
          </div>
        </div>
        <div className="bg-white/70 rounded-lg p-4 border border-purple-100 shadow">
          <div className="font-bold text-purple-700 flex items-center mb-2">📊 気圧</div>
          <div className="text-2xl font-bold text-purple-600">{weather.pressure} hPa</div>
          <div className="text-xs mt-1 text-purple-500">酸素指数: <span className="font-bold">{oxygenIndex}</span></div>
          <div className="text-xs text-gray-500">（1013hPa=100）</div>
        </div>
        <div className="bg-white/70 rounded-lg p-4 border border-cyan-100 shadow">
          <div className="font-bold text-cyan-700 flex items-center mb-2">☔ 降水確率</div>
          <div className="text-2xl font-bold text-cyan-600">{weather.precipitationProbability}%</div>
        </div>
        <div className="bg-white/70 rounded-lg p-4 border border-indigo-100 shadow">
          <div className="font-bold text-indigo-700 flex items-center mb-2">🌧️ 降水量</div>
          <div className="text-2xl font-bold text-indigo-600">{weather.precipitation} mm</div>
        </div>
      </div>

      {/* 直線風判定 */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg px-4 py-2 shadow border border-cyan-200 text-center w-full">
          <div className="font-bold text-cyan-800">🏁 ホームストレッチ</div>
          <div className="text-lg font-semibold">{homeWind}</div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg px-4 py-2 shadow border border-green-200 text-center w-full">
          <div className="font-bold text-green-800">🏇 バックストレッチ</div>
          <div className="text-lg font-semibold">{backWind}</div>
        </div>
      </div>

      {/* 脚質別 有利不利テーブル */}
      <div className="mb-2">
        <h3 className="font-semibold text-gray-800 text-sm mb-1">
          脚質別 有利不利（ホーム / バック）
        </h3>
        <table className="w-full text-center border border-gray-300 rounded-xl overflow-hidden shadow">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800">
              <th className="border px-2 py-1">脚質</th>
              <th className="border px-2 py-1">ホーム</th>
              <th className="border px-2 py-1">バック</th>
            </tr>
          </thead>
          <tbody>
            {(['逃げ', '先行', '差し', '追込'] as RunningStyle[]).map(styleRow)}
          </tbody>
        </table>
      </div>

      {/* 更新日時 */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        最終更新: {new Date(weather.timestamp).toLocaleString('ja-JP')}
      </div>
    </div>
  );
}
