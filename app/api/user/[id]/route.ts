import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const user = await prisma.user.delete({ where: { id: Number(id) } });

    return Response.json(
      { data: user, message: `Usuário ${user.name} excluído com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao excluir usuário' },
      { status: 400 },
    );
  }
}

export async function PUT(
  request: Request,
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

    return Response.json(
      { data: user, message: `Usuário ${user.name} atualizado com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao atualizar usuário' },
      { status: 400 },
    );
  }
}
