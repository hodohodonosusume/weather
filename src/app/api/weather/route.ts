// src/app/api/weather/route.ts の場合
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // ★★★ 環境変数の読み込み確認（サーバーサイドでは NEXT_PUBLIC_ は不要）★★★
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // ★★★ APIキーが設定されているかチェック ★★★
    if (!apiKey) {
      console.error('OPENWEATHER_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API key not configured' }, 
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' }, 
        { status: 400 }
      );
    }

    // ★★★ OpenWeatherMap API呼び出し ★★★
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`
    );

    if (!response.ok) {
      console.error('OpenWeatherMap API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Weather API request failed' }, 
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
