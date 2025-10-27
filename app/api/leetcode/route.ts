import { NextResponse } from 'next/server';

export const dynamic = "force-static";

export async function GET() {
  try {
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/kshkansal');

    if (!response.ok) {
      throw new Error(`LeetCode API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to fetch LeetCode data: ${errorMessage}` }, { status: 500 });
  }
}
