'use client';

import { useState } from 'react';
import { racecourses, Racecourse } from '@/app/data/racecourses';

interface Props {
  onRacecourseSelect: (racecourse: Racecourse) => void;
  selectedRacecourse: Racecourse | null;
}

export default function RacecourseSelector({ onRacecourseSelect, selectedRacecourse }: Props) {
  const [tab, setTab] = useState<'中央競馬' | '地方競馬'>('中央競馬');

  const list = racecourses.filter(r => r.type === tab);

  return (
    <section className="mb-8">
      <div className="flex w-full rounded-xl overflow-hidden shadow-card mb-4">
        {(['中央競馬', '地方競馬'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 font-bold text-sm transition
            ${tab === t ? 'bg-brand text-white' : 'bg-white hover:bg-brand/10'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {list.map(rc => (
          <button
            key={rc.id}
            onClick={() => onRacecourseSelect(rc)}
            className={`p-4 rounded-xl border text-left shadow-card hover:shadow-lg transition
            ${selectedRacecourse?.id === rc.id ? 'bg-gradient-to-br from-brand to-accent text-white scale-105' : 'bg-white'}`}
          >
            <p className="font-bold">{rc.name}</p>
            <p className="text-xs text-gray-500">{rc.prefecture}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
