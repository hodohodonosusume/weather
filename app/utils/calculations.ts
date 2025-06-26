//* app/utils/calculations.ts  ─────────────────────────────── */

export function calculateDiscomfortIndex(t: number, h: number): number {
  return Math.round((0.81 * t + 0.01 * h * (0.99 * t - 14.3) + 46.3) * 10) / 10;
}

export function getDiscomfortLevel(i: number): string {
  if (i < 65) return '快適';
  if (i < 70) return 'やや暑い';
  if (i < 75) return '暑い';
  return '非常に暑い';
}

export function getWindDirection(deg: number): string {
  const dir = [
    '北','北北東','北東','東北東','東','東南東','南東','南南東',
    '南','南南西','南西','西南西','西','西北西','北西','北北西',
  ];
  return dir[Math.round(deg / 22.5) % 16];
}

/* 追い風・向かい風判定用 -------------------------------- */
export function judgeWindEffect(
  windDeg: number,
  stretchDeg: number,
): '追い風' | '向かい風' | '横風' {
  const diff = Math.abs((windDeg - stretchDeg + 360) % 360);
  if (diff < 45 || diff > 315) return '追い風';
  if (diff > 135 && diff < 225) return '向かい風';
  return '横風';
}

/* 風速の目安 -------------------------------------------- */
export function getWindSpeedLevel(v: number): string {
  if (v < 2) return 'ほぼ無風';
  if (v < 4) return '軽い風';
  if (v < 8) return 'やや強い';
  if (v < 14) return '強風';
  return '危険な強風';
}

/* ミスナール体感温度 ------------------------------------ */
export function apparentTemperature(
  t: number,      // 気温 °C
  rh: number,     // 相対湿度 %
  v: number,      // 風速 m/s
): number {
  const es = 6.105 * 10 ** (7.5 * t / (237.7 + t));   // 飽和水蒸気圧
  const e  = (rh / 100) * es;                          // 水蒸気圧
  return Math.round((t + 0.33 * e - 0.7 * v - 4) * 10) / 10;
}

/* 酸素指数 1013hPa=100 ----------------------------------- */
export function oxygenIndex(p: number): number {
  return Math.round((100 * p / 1013) * 10) / 10;
}

/* 晴れ度 -------------------------------------------------- */
export function sunshineScore(cloud: number, uv: number): number {
  const score = 100 - cloud * 0.7 + uv * 3;
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

/* 脚質×風向き有利不利 ----------------------------------- */
export type RunningStyle = '逃げ' | '先行' | '差し' | '追込';

const impactMap = {
  追い風  : { 逃げ:'普通', 先行:'普通', 差し:'有利',    追込:'最も有利' },
  向かい風: { 逃げ:'不利', 先行:'有利', 差し:'やや不利', 追込:'最も不利' },
  横風    : { 逃げ:'±0',   先行:'±0',   差し:'±0',      追込:'±0' },
} as const;

export function getRunningStyleImpact(
  wind: '追い風' | '向かい風' | '横風',
  style: RunningStyle,
): string {
  return impactMap[wind][style];
}

