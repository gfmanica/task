import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Cria um novo usuário
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *        description: Falha ao cadastrar usuário
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password } = body;

    const userExists = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { data: null, message: 'Usuário já cadastrado' },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        password,
      },
    });

    return NextResponse.json(
      { data: user, message: `Usuário ${user.name} criado com sucesso!` },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao cadastrar usuário' },
      { status: 400 },
    );
  }
}

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Retorna a lista de usuários
 *     responses:
 *       200:
 *         description: Usuários listados com sucesso
 *       400:
 *        description: Falha ao listar usuários
 */
export async function GET() {
  try {
    const user = await prisma.user.findMany();

    const newUser = user.map((user) => ({
      ...user,
      role: {
        id: user.role,
        role: user.role === 'ADMINISTRATOR' ? 'Administrador' : 'Usuário',
      },
    }));

    return NextResponse.json({ data: newUser }, { status: 200 });
  } catch {
    return NextResponse.json(
      { data: null, message: 'Falha ao consultar usuários' },
      { status: 400 },
    );
  }
}
