import prisma from '@/lib/prisma';
import { statusNameMap } from '@/util/enum';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const task = await prisma.task.findUniqueOrThrow({
      where: { id: Number(id) },
    });

    const newTask = {
      ...task,
      status: {
        id: task.status,
        status: statusNameMap[task.status],
      },
    };

    return Response.json({ data: newTask }, { status: 200 });
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao excluir atividade' },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const user = await prisma.task.delete({ where: { id: Number(id) } });

    return Response.json(
      { data: user, message: `Atividade ${user.name} excluída com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao excluir atividade' },
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
    const { name, description, link, status } = body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        name,
        link,
        description,
        status: status.id,
      },
    });

    return Response.json(
      { data: task, message: `Atividade ${task.name} atualizada com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao atualizar atividade' },
      { status: 400 },
    );
  }
}
