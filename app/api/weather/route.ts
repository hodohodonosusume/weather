import { NextRequest, NextResponse } from 'next/server';
import { calculateDiscomfortIndex } from '@/app/utils/calculations';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const city = searchParams.get('city');

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    
    if (lat && lon) {
      url += `lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `q=${city}`;
    } else {
      return NextResponse.json({ error: 'Location parameter required' }, { status: 400 });
    }

    url += `&appid=${API_KEY}&units=metric&lang=ja`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    // 降水確率のダミーデータ（OpenWeatherMapの無料版では提供されない）
    const precipitationProbability = Math.floor(Math.random() * 100);

    const weatherData = {
      location: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      discomfortIndex: Math.round(calculateDiscomfortIndex(data.main.temp, data.main.humidity)),
      windDirection: data.wind?.deg || 0,
      windSpeed: data.wind?.speed || 0,
      pressure: data.main.pressure,
      precipitationProbability,
      precipitation: data.rain?.['1h'] || 0,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}