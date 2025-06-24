/**
 * 不快指数
 */
export function calculateDiscomfortIndex(temp: number, hum: number): number {
  return 0.81 * temp + 0.01 * hum * (0.99 * temp - 14.3) + 46.3;
}

export function getDiscomfortLevel(idx: number): string {
  if (idx < 55) return '寒い';
  if (idx < 60) return '肌寒い';
  if (idx < 65) return '何も感じない';
  if (idx < 70) return '快い';
  if (idx < 75) return 'やや暑い';
  if (idx < 80) return '暑くて汗';
  return '暑くてたまらない';
}

/**
 * 16方位テキスト
 */
export function getWindDirection(deg: number): string {
  const dirs = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東',
    '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];
  return dirs[Math.round(deg / 22.5) % 16];
}

/**
 * 風向きと直線方角の関係判定
 *   windDeg : 気象APIの風向き（0°=北、90°=東）
 *   stretch : 直線の進行方向（度）
 */
export function judgeWindEffect(
  windDeg: number,
  stretch: number
): '追い風' | '向かい風' | '横風' {
  const diff = Math.abs(((windDeg - stretch + 360) % 360));
  if (diff < 45 || diff > 315) return '追い風';
  if (diff > 135 && diff < 225) return '向かい風';
  return '横風';
}

/**
 * 脚質×風向き有利不利
 */
const impactMap = {
  追い風: {
    逃げ: '普通',
    先行: '普通',
    差し: '有利',
    追込: '最も有利'
  },
  向かい風: {
    逃げ: '不利',
    先行: '有利',
    差し: 'やや不利',
    追込: '最も不利'
  },
  横風: {
    逃げ: '±0',
    先行: '±0',
    差し: '±0',
    追込: '±0'
  }
} as const;

export type RunningStyle = keyof typeof impactMap['追い風']; // 逃げ | 先行 | 差し | 追込

export function getRunningStyleImpact(
  windType: '追い風' | '向かい風' | '横風',
  style: RunningStyle
): string {
  return impactMap[windType][style];
}
/**
 * 酸素指数の計算
 * 1013hPaを100としたときの相対値
 */
export function calculateOxygenIndex(pressure: number): number {
  return Math.round((100 * pressure / 1013) * 10) / 10; // 小数1桁
}
