import { NextResponse } from 'next/server';
import { nfts } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rarity = searchParams.get('rarity');
    const status = searchParams.get('status');

    let filteredNfts = nfts;

    if (rarity && rarity !== 'All') {
      filteredNfts = filteredNfts.filter(nft => nft.rarity === rarity);
    }

    if (status && status !== 'All') {
      if (status === 'Buy Now') {
        filteredNfts = filteredNfts.filter(nft => nft.status === 'fixed');
      } else if (status === 'Live Auction') {
        filteredNfts = filteredNfts.filter(nft => nft.status === 'auction');
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredNfts,
      count: filteredNfts.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}