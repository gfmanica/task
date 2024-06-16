import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const user = await prisma.user.delete({ where: { id: Number(id) } });

    return NextResponse.json(
      { data: user, message: `Usuário ${user.name} excluído com sucesso!` },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao excluir usuário' },
      { status: 400 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { role } = body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        role: role.id,
      },
    });

    return NextResponse.json(
      { data: user, message: `Usuário ${user.name} atualizado com sucesso!` },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao atualizar usuário' },
      { status: 400 },
    );
  }
}
