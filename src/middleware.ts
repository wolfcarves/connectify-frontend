import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse;
  const baseURL = request.url;
  const pathname = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get('auth_session');
  const authRoutes = ['/login', '/signup'];

  if (!sessionCookie?.value && !authRoutes.includes(pathname)) {
    return response.redirect(new URL('/login', baseURL));
  }

  if (sessionCookie && (pathname === '/login' || pathname === '/signup')) {
    return response.redirect(new URL('/', baseURL));
  }

  return response.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
