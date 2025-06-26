export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  discomfortIndex: number;
  windDirection: number;
  windSpeed: number;
  pressure: number;
  precipitationProbability: number;
  precipitation: number;
  description: string;
  icon: string;
  timestamp: string;
  apparentTemperature: number;   // 体感温度（°C）
  oxygenIndex: number;           // 酸素指数
  sunshineScore: number;         // 晴れ度（0-100）
  precipitation12h: number;      // 直近12h降水量（mm）
}

export interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  rain?: {
    '1h': number;
  };
  dt: number;
}