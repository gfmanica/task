import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, password } = body;

    const user = await prisma.user.create({
      data: {
        name,
        password,
      },
    });

    return Response.json(
      { data: user, message: `Usuário ${user.name} criado com sucesso!` },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao cadastrar usuário' },
      { status: 400 },
    );
  }
}

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

    return Response.json({ data: newUser }, { status: 200 });
  } catch {
    return Response.json(
      { data: null, message: 'Falha ao consultar usuários' },
      { status: 400 },
    );
  }
}
