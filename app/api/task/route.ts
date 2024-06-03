import prisma from '@/lib/prisma';
import { statusNameMap } from '@/util/enum';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, expirationDate, link, status } = body;

    const user = await prisma.task.create({
      data: {
        name,
        link,
        description,
        expirationDate,
        status: status.id,
      },
    });

    return Response.json(
      { data: user, message: `Atividade ${user.name} criada com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao cadastrar atividade' },
      { status: 400 },
    );
  }
}

export async function GET() {
  try {
    const task = await prisma.task.findMany();

    const newTask = task.map((task) => ({
      ...task,
      status: {
        id: task.status,
        status: statusNameMap[task.status],
      },
    }));

    return Response.json({ data: newTask }, { status: 200 });
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao consultar usuários' },
      { status: 400 },
    );
  }
}
