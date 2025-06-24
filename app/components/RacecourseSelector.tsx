'use client';

import { useState } from 'react';
import { racecourses, Racecourse } from '@/app/data/racecourses';

interface RacecourseSelectorProps {
  onRacecourseSelect: (racecourse: Racecourse) => void;
  selectedRacecourse: Racecourse | null;
}

export default function RacecourseSelector({ onRacecourseSelect, selectedRacecourse }: RacecourseSelectorProps) {
  const [activeTab, setActiveTab] = useState<'中央競馬' | '地方競馬'>('中央競馬');

  const centralRacecourses = racecourses.filter(r => r.type === '中央競馬');
  const localRacecourses = racecourses.filter(r => r.type === '地方競馬');

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        🏇 競馬場を選択
      </h2>
      
      {/* タブ切り替え */}
      <div className="flex mb-4 bg-white rounded-lg p-1 shadow-inner">
        <button
          onClick={() => setActiveTab('中央競馬')}
          className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
            activeTab === '中央競馬'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🏆 中央競馬
        </button>
        <button
          onClick={() => setActiveTab('地方競馬')}
          className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
            activeTab === '地方競馬'
              ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          🌟 地方競馬
        </button>
      </div>

      {/* 競馬場ボタン */}
      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {(activeTab === '中央競馬' ? centralRacecourses : localRacecourses).map((racecourse) => (
          <button
            key={racecourse.id}
            onClick={() => onRacecourseSelect(racecourse)}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedRacecourse?.id === racecourse.id
                ? activeTab === '中央競馬'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105'
                : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="font-semibold text-sm">{racecourse.name}</div>
            <div className="text-xs opacity-75">{racecourse.prefecture}</div>
          </button>
        ))}
      </div>
    </div>
  );
}