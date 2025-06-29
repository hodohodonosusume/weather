'use client';

import { useState, useEffect } from 'react';
import { HorseInfo, RaceDetailInfo } from '@/app/utils/netkeiba-scraper';

interface HorseListProps {
  raceId: string;
  raceName: string;
}

export default function HorseList({ raceId, raceName }: HorseListProps) {
  const [raceDetail, setRaceDetail] = useState<RaceDetailInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRaceDetail();
  }, [raceId]);

  const fetchRaceDetail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/race-detail?raceId=${raceId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'レース詳細の取得に失敗しました');
      }
      
      setRaceDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const getCourseConditionColor = (condition: string) => {
    switch (condition) {
      case '良': return 'bg-green-100 text-green-800 border-green-200';
      case '稍重': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '重': return 'bg-orange-100 text-orange-800 border-orange-200';
      case '不良': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSexIcon = (sex: string) => {
    switch (sex) {
      case '牡': return '♂';
      case '牝': return '♀';
      case '騸': return '⚲';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600 mr-3"></div>
          <span className="text-lg text-gray-600 font-medium">出走馬情報を取得中...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center">
          <span className="text-red-500 mr-2">⚠️</span>
          <span className="font-medium">エラー: {error}</span>
        </div>
        <button
          onClick={fetchRaceDetail}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          再試行
        </button>
      </div>
    );
  }

  if (!raceDetail) {
    return (
      <div className="text-center py-8 text-gray-600">
        <div className="text-4xl mb-2">🏇</div>
        <div>出走馬情報が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏇 出走馬一覧</h2>
        <div className="text-lg font-semibold text-purple-600 mb-2">{raceDetail.raceName}</div>
        
        <div className="flex justify-center space-x-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCourseConditionColor(raceDetail.courseCondition)}`}>
            馬場: {raceDetail.courseCondition}
          </span>
          {raceDetail.weather && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
              天候: {raceDetail.weather}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {raceDetail.horses.map((horse) => (
          <div
            key={horse.horseNumber}
            className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {horse.horseNumber}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">{horse.horseName}</div>
                  <div className="text-sm text-gray-600">
                    {horse.age}歳{getSexIcon(horse.sex)} | {horse.weight}kg
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {horse.popularity > 0 && (
                  <div className="text-sm font-medium text-orange-600 mb-1">
                    {horse.popularity}番人気
                  </div>
                )}
                {horse.odds > 0 && (
                  <div className="text-lg font-bold text-green-600">
                    {horse.odds.toFixed(1)}倍
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">騎手:</span>
                <span className="ml-1 font-medium text-blue-600">{horse.jockey || '未定'}</span>
              </div>
              <div>
                <span className="text-gray-500">調教師:</span>
                <span className="ml-1 font-medium text-green-600">{horse.trainer || '未定'}</span>
              </div>
              {horse.horseWeight > 0 && (
                <>
                  <div>
                    <span className="text-gray-500">馬体重:</span>
                    <span className="ml-1 font-medium">{horse.horseWeight}kg</span>
                  </div>
                  <div>
                    <span className="text-gray-500">増減:</span>
                    <span className={`ml-1 font-medium ${
                      horse.horseWeightChange.startsWith('+') ? 'text-red-600' :
                      horse.horseWeightChange.startsWith('-') ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {horse.horseWeightChange || '±0'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {raceDetail.horses.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          <div className="text-4xl mb-2">🏇</div>
          <div>出走馬情報がありません</div>
        </div>
      )}
    </div>
  );
}
