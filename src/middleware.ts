import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const baseURL = request.url;
  const pathname = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get('auth_session');

  const fetchSession = await fetch(
    'http://localhost:5000/api/v1/auth/session',
    {
      headers: {
        cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    },
  );

  const session = await fetchSession.json();
  const isSessionValid = session.error?.statusCode !== 403;

  const authRoutes = ['/login', '/signup'];

  if (isSessionValid && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', baseURL));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
