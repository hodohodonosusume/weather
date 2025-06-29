export interface RaceSchedule {
  raceId: string;
  date: string;
  racecourse: string;
  raceNumber: number;
  raceName: string;
  startTime: string;
  distance: number;
  courseType: '芝' | 'ダート';
  direction: '右' | '左' | '右左';
  grade: 'G1' | 'G2' | 'G3' | 'OP' | '3勝' | '2勝' | '1勝' | '新馬' | '未勝利' | '';
  racecourseName: string;
}

// より多くのサンプルデータを追加
export const sampleSchedule: RaceSchedule[] = [
  // 2025年6月22日（昨日・過去のレース）
  {
    raceId: '202506220101',
    date: '2025-06-22',
    racecourse: 'tokyo',
    raceNumber: 1,
    raceName: '3歳未勝利',
    startTime: '10:10',
    distance: 1400,
    courseType: '芝',
    direction: '左',
    grade: '未勝利',
    racecourseName: '東京競馬場'
  },
  {
    raceId: '202506220102',
    date: '2025-06-22',
    racecourse: 'tokyo',
    raceNumber: 2,
    raceName: '3歳未勝利',
    startTime: '10:40',
    distance: 1600,
    courseType: 'ダート',
    direction: '左',
    grade: '未勝利',
    racecourseName: '東京競馬場'
  },
  {
    raceId: '202506220112',
    date: '2025-06-22',
    racecourse: 'tokyo',
    raceNumber: 12,
    raceName: '安田記念',
    startTime: '15:40',
    distance: 1600,
    courseType: '芝',
    direction: '左',
    grade: 'G1',
    racecourseName: '東京競馬場'
  },
  
  // 2025年6月23日（今日のレース）
  {
    raceId: '202506230101',
    date: '2025-06-23',
    racecourse: 'tokyo',
    raceNumber: 1,
    raceName: '3歳未勝利',
    startTime: '10:10',
    distance: 1200,
    courseType: '芝',
    direction: '左',
    grade: '未勝利',
    racecourseName: '東京競馬場'
  },
  {
    raceId: '202506230102',
    date: '2025-06-23',
    racecourse: 'tokyo',
    raceNumber: 2,
    raceName: '3歳未勝利',
    startTime: '10:40',
    distance: 1400,
    courseType: 'ダート',
    direction: '左',
    grade: '未勝利',
    racecourseName: '東京競馬場'
  },
  {
    raceId: '202506230103',
    date: '2025-06-23',
    racecourse: 'tokyo',
    raceNumber: 3,
    raceName: '3歳1勝クラス',
    startTime: '11:10',
    distance: 1800,
    courseType: '芝',
    direction: '左',
    grade: '1勝',
    racecourseName: '東京競馬場'
  },
  {
    raceId: '202506230111',
    date: '2025-06-23',
    racecourse: 'tokyo',
    raceNumber: 11,
    raceName: '宝塚記念',
    startTime: '15:40',
    distance: 2200,
    courseType: '芝',
    direction: '右',
    grade: 'G1',
    racecourseName: '東京競馬場'
  }
];

