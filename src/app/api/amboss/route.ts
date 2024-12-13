import { OffersResponse } from '@/app/types/types';
import { NextRequest, NextResponse } from 'next/server';

interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<OffersResponse | ErrorResponse>> {
  const API_KEY = process.env.AMBOSS_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }
  
  try {
    const body = await request.json();
    
    const response = await fetch('https://api.amboss.space/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data: OffersResponse = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Amboss API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Amboss' },
      { status: 500 }
    );
  }
}