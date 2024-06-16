import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const cookieConfig = {
  name: 'session',
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(session: any = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (e) {
    return null;
  }
}

export async function createSession(user: any) {
  const expires = new Date(Date.now() + cookieConfig.duration);
  const session = await encrypt({ user, expires });

  cookies().set(cookieConfig.name, session, {
    expires,
    secure: true,
    httpOnly: true,
    path: '/',
    sameSite: 'lax', // todo jogar isso pro cookieConfig (problema de tipagem)
  });
}

export async function deleteSession() {
  cookies().delete(cookieConfig.name);
}

// export async function verifySession() {
//   const cookie = cookies().get(cookieConfig.name)?.value;
//   const session = await decrypt(cookie);

//   if (!session?.userId) {
//     redirect('/sign-in');
//   }

//   return { userId: session.userId };
// }
