import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';

export default async function middleware(request: NextRequest) {
  // 1 - Verificar se a rota é protegida
  const currentPath = request.nextUrl.pathname;
  const unprotectedPaths = ['/sign-in', '/sign-up', '/doc'];
  const isProtectedPath = !unprotectedPaths.includes(currentPath);

  if (isProtectedPath) {
    // 2 - Verificar se o usuário está autenticado
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    // 3 - Redireciona usuários não autenticados
    if (!session?.user) {
      return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
  }

  // 4 - Continuar a execução da rota
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};
