import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        name,
        password,
      },
    });

    if (!user) {
      return NextResponse.json(
        { data: null, message: 'Usuário ou senha incorreta' },
        { status: 400 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({ data: user, message: '' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao realizar o login' },
      { status: 400 },
    );
  }
}
