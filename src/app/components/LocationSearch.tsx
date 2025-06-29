'use client';

import { useState } from 'react';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect(
            position.coords.latitude,
            position.coords.longitude,
            '現在地'
          );
        },
        (error) => {
          console.error('位置情報の取得に失敗しました:', error);
          alert('位置情報の取得に失敗しました');
        }
      );
    } else {
      alert('お使いのブラウザは位置情報をサポートしていません');
    }
  };

  const handleCitySearch = () => {
    if (searchTerm.trim()) {
      // 都市名から座標を取得する処理は簡略化
      onLocationSelect(0, 0, searchTerm);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleCurrentLocation}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          📍 現在地の天気を取得
        </button>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="都市名を入力（例: Tokyo）"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
          />
          <button
            onClick={handleCitySearch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            🔍 検索
          </button>
        </div>
      </div>
    </div>
  );
}