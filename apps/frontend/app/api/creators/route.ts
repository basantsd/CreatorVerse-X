import { NextResponse } from 'next/server';
import { creators } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: creators,
      count: creators.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}