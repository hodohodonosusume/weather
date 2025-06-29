'use client';

import { useState } from 'react';
import { racecourses, Racecourse } from '@/app/data/racecourses';

interface Props {
  onRacecourseSelect: (racecourse: Racecourse) => void;
  selectedRacecourse: Racecourse | null;
}

export default function RacecourseSelector({ onRacecourseSelect, selectedRacecourse }: Props) {
  const [activeTab, setActiveTab] = useState<'中央競馬' | '地方競馬'>('中央競馬');

  const central = racecourses.filter(r => r.type === '中央競馬');
  const local = racecourses.filter(r => r.type === '地方競馬');

  return (
    <div className="bg-white/80 rounded-2xl shadow-fancy p-6 border border-brand-light">
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('中央競馬')}
          className={`flex-1 py-2 font-bold rounded-l-xl transition-all ${
            activeTab === '中央競馬'
              ? 'bg-brand text-white shadow'
              : 'bg-gray-100 text-brand-dark hover:bg-brand-light'
          }`}
        >
          🏆 中央競馬
        </button>
        <button
          onClick={() => setActiveTab('地方競馬')}
          className={`flex-1 py-2 font-bold rounded-r-xl transition-all ${
            activeTab === '地方競馬'
              ? 'bg-accent text-white shadow'
              : 'bg-gray-100 text-brand-dark hover:bg-accent-light'
          }`}
        >
          🌟 地方競馬
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(activeTab === '中央競馬' ? central : local).map(rc => (
          <button
            key={rc.id}
            onClick={() => onRacecourseSelect(rc)}
            className={`p-4 rounded-xl font-semibold transition-all text-left shadow ${
              selectedRacecourse?.id === rc.id
                ? activeTab === '中央競馬'
                  ? 'bg-gradient-to-r from-brand to-accent text-white scale-105'
                  : 'bg-gradient-to-r from-accent to-brand text-white scale-105'
                : 'bg-white border border-gray-200 hover:shadow-lg hover:scale-105'
            }`}
          >
            <div className="text-lg">{rc.name}</div>
            <div className="text-xs text-gray-500">{rc.prefecture}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
