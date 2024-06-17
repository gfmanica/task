import { TUser } from '@/app/user/type';
import prisma from '@/lib/prisma';
import { statusNameMap } from '@/util/enum';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/task:
 *   post:
 *     description: Cria uma nova atividade
 *     responses:
 *       200:
 *         description: Atividade criada com sucesso
 *       400:
 *        description: Falha ao criar a atividade
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, link, status, users } = body;

    const task = await prisma.task.create({
      data: {
        name,
        link,
        description,
        status: status.id,
        users: {
          connect: users?.map((user: TUser) => ({
            id: user.id,
          })),
        },
      },
    });

    return NextResponse.json(
      { data: task, message: `Atividade ${task.name} criada com sucesso!` },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao cadastrar atividade' },
      { status: 400 },
    );
  }
}

/**
 * @swagger
 * /api/task:
 *   get:
 *     description: Retorna todas as atividades
 *     responses:
 *       200:
 *         description: Atividades retornadas com sucesso
 *       400:
 *        description: Falha ao retornar as atividades
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const role = searchParams.get('role') || undefined;

    const id = Number(searchParams.get('id')) || undefined;

    const filterUser =
      role === 'USER' && id
        ? {
            id: id,
          }
        : undefined;

    const task = await prisma.task.findMany({
      where: {
        users: {
          some: filterUser,
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    const newTask = task.map((task) => ({
      ...task,
      status: {
        id: task.status,
        status: statusNameMap[task.status],
      },
      users: task.users.map((user) => ({
        ...user,
        role: {
          id: user.role,
          role: user.role === 'ADMINISTRATOR' ? 'Administrador' : 'Usuário',
        },
      })),
    }));

    return NextResponse.json({ data: newTask }, { status: 200 });
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao consultar usuários' },
      { status: 400 },
    );
  }
}
