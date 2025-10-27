import { NextResponse } from 'next/server';

export const dynamic = "force-static";

export async function GET() {
  try {
  const response = await fetch('https://cp-rating-api.vercel.app/codechef/knsl');

    if (!response.ok) {
      throw new Error(`CodeChef API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to fetch CodeChef data: ${errorMessage}` }, { status: 500 });
  }
}
