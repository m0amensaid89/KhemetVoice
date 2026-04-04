import { NextResponse } from 'next/server';
import db from '@khemet/db';

export async function GET() {
  try {
    const sessions = await db.session.findMany({
      orderBy: { createdAt: 'desc' },
      include: { leads: true },
      take: 20
    });
    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
