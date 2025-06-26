import { NextRequest, NextResponse } from 'next/server';
import { calculateDiscomfortIndex, calculateOxygenIndex, sunshineScore, apparentTemperature } from '@/app/utils/calculations';

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

    const uvIndex = data.uvi ?? 5;               // OneCall で取得できない場合は仮 5
    const cloud   = data.clouds?.all ?? 50;      // 0-100 (%)
    const precip12h = data.rain?.['1h'] ? data.rain['1h'] * 12 : 0; // 簡易

    const weatherData = {
      location: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      pressure: data.main.pressure,

      apparentTemperature: apparentTemperature(
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      ),
      oxygenIndex: calculateOxygenIndex(data.main.pressure),
      sunshineScore: sunshineScore(cloud, uvIndex),
      precipitation12h: precip12h,

      discomfortIndex: Math.round(
        calculateDiscomfortIndex(data.main.temp, data.main.humidity)
      ),
      windDirection: data.wind.deg,
      windSpeed: data.wind.speed,
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