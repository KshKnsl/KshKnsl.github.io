import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://geeks-for-geeks-api.vercel.app/kushkansal', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GeeksForGeeks API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to fetch GFG data: ${errorMessage}` }, { status: 500 });
  }
}
