import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse;
  const baseURL = request.url;
  const pathname = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get('auth_session');

  const signUpRoute = '/signup';
  const loginRoute = '/login';

  if (!sessionCookie && pathname !== signUpRoute) {
    response.redirect(new URL('/login', baseURL));
    return response.rewrite(new URL('/login', baseURL));
  }

  if (
    sessionCookie &&
    (pathname.startsWith(loginRoute) || pathname.startsWith(signUpRoute))
  ) {
    return response.redirect(new URL('/', baseURL));
  }

  return response.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
