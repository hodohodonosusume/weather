import { NextRequest, NextResponse } from 'next/server';
import { scrapeRaceDetail } from '@/app/utils/netkeiba-scraper';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const raceId = searchParams.get('raceId');

  if (!raceId) {
    return NextResponse.json({ error: 'Race ID is required' }, { status: 400 });
  }

  try {
    console.log(`レース詳細取得開始: ${raceId}`);
    
    const raceDetail = await scrapeRaceDetail(raceId);
    
    if (!raceDetail) {
      return NextResponse.json({ error: 'レース情報が見つかりませんでした' }, { status: 404 });
    }
    
    return NextResponse.json(raceDetail);
  } catch (error) {
    console.error('Race detail API error:', error);
    return NextResponse.json({ 
      error: 'レース詳細の取得に失敗しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
