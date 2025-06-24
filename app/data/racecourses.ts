export interface Racecourse {
  id: string;
  name: string;
  city: string;
  prefecture: string;
  type: '中央競馬' | '地方競馬';
  coordinates: { lat: number; lon: number };
  /** 馬が走る向き（度）ホーム＝最終直線 */
  homeStretchDir: number;
  /** バックストレッチの向き（度）*/
  backStretchDir: number;
}

/* 中央競馬10場（地方は従来の構造のままでも可） */
export const racecourses: Racecourse[] = [
  {
    id: 'tokyo',
    name: '東京競馬場',
    city: 'Fuchu',
    prefecture: '東京都',
    type: '中央競馬',
    coordinates: { lat: 35.6650, lon: 139.4814 },
    homeStretchDir: 270,   // 東→西
    backStretchDir: 90     // 西→東
  },
  {
    id: 'nakayama',
    name: '中山競馬場',
    city: 'Funabashi',
    prefecture: '千葉県',
    type: '中央競馬',
    coordinates: { lat: 35.6952, lon: 139.9728 },
    homeStretchDir: 22.5,   // 南南西→北北東
    backStretchDir: 202.5   // 北北東→南南西
  },
  {
    id: 'hanshin',
    name: '阪神競馬場',
    city: 'Takarazuka',
    prefecture: '兵庫県',
    type: '中央競馬',
    coordinates: { lat: 34.7975, lon: 135.3581 },
    homeStretchDir: 292.5,  // 東南東→西北西
    backStretchDir: 90      // 西→東
  },
  {
    id: 'kyoto',
    name: '京都競馬場',
    city: 'Kyoto',
    prefecture: '京都府',
    type: '中央競馬',
    coordinates: { lat: 34.9456, lon: 135.7608 },
    homeStretchDir: 45,     // 南西→北東
    backStretchDir: 225     // 北東→南西
  },
  {
    id: 'chukyo',
    name: '中京競馬場',
    city: 'Toyoake',
    prefecture: '愛知県',
    type: '中央競馬',
    coordinates: { lat: 35.0533, lon: 137.0108 },
    homeStretchDir: 225,    // 北東→南西
    backStretchDir: 67.5    // 西南西→東北東
  },
  {
    id: 'niigata',
    name: '新潟競馬場',
    city: 'Niigata',
    prefecture: '新潟県',
    type: '中央競馬',
    coordinates: { lat: 37.9161, lon: 139.0364 },
    homeStretchDir: 292.5,  // 東北東→西南西
    backStretchDir: 112.5   // 西南西→東北東
  },
  {
    id: 'sapporo',
    name: '札幌競馬場',
    city: 'Sapporo',
    prefecture: '北海道',
    type: '中央競馬',
    coordinates: { lat: 43.0642, lon: 141.3469 },
    homeStretchDir: 0,      // 南→北
    backStretchDir: 180     // 北→南
  },
  {
    id: 'hakodate',
    name: '函館競馬場',
    city: 'Hakodate',
    prefecture: '北海道',
    type: '中央競馬',
    coordinates: { lat: 41.7687, lon: 140.7290 },
    homeStretchDir: 135,    // 北西→南東
    backStretchDir: 315     // 南東→北西
  },
  {
    id: 'fukushima',
    name: '福島競馬場',
    city: 'Fukushima',
    prefecture: '福島県',
    type: '中央競馬',
    coordinates: { lat: 37.7608, lon: 140.4747 },
    homeStretchDir: 22.5,   // 南南西→北北東
    backStretchDir: 202.5   // 北北東→南南西
  },
  {
    id: 'kokura',
    name: '小倉競馬場',
    city: 'Kitakyushu',
    prefecture: '福岡県',
    type: '中央競馬',
    coordinates: { lat: 33.8833, lon: 130.8750 },
    homeStretchDir: 157.5,  // 北北西→南南東
    backStretchDir: 337.5   // 南南東→北北西
  }
  /* 地方競馬場は既存データそのままでも動作します */
];
