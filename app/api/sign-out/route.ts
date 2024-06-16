import { deleteSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  await deleteSession();

  return NextResponse.json({ data: null, message: '' }, { status: 200 });
}
