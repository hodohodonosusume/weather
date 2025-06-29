// ★★★ 不足していたimport文を追加 ★★★
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Weather API request failed' }, { status: 500 });
    }

    const rawData = await response.json();
    
    // ★★★ WeatherDataインターフェースに合わせてデータを変換 ★★★
    const weatherData = {
      temperature: Math.round(rawData.main?.temp || 0),
      humidity: rawData.main?.humidity || 0,
      pressure: rawData.main?.pressure || 1013,
      windDirection: rawData.wind?.deg || 0,
      windSpeed: Math.round((rawData.wind?.speed || 0) * 10) / 10,
      description: rawData.weather?.[0]?.description || '不明',
      icon: rawData.weather?.[0]?.icon || '01d',
      timestamp: Date.now(),
      
      // 計算が必要なプロパティを追加
      discomfortIndex: Math.round(rawData.main?.temp * 0.81 + 0.01 * (rawData.main?.humidity || 0) * (0.99 * rawData.main?.temp - 14.3) + 46.3),
      apparentTemperature: Math.round(rawData.main?.feels_like || rawData.main?.temp || 0),
      sunshineScore: rawData.weather?.[0]?.main === 'Clear' ? 100 : rawData.weather?.[0]?.main === 'Clouds' ? 50 : 0,
      precipitation: rawData.rain?.['1h'] || 0,
      precipitation12h: (rawData.rain?.['1h'] || 0) * 12,
    };
    
    return NextResponse.json(weatherData);

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
