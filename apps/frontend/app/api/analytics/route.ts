import { NextResponse } from 'next/server';
import { analyticsData } from '@/lib/data';

export async function GET() {
  try {
    // In a real app, this would fetch from database/cache
    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}