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