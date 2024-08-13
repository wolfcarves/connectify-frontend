import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const redirectUserToLogin = (
  request: NextRequest,
  response: typeof NextResponse,
) => {
  const baseURL = request.url;

  response.redirect(new URL('/login', baseURL));
  return response.rewrite(new URL('/login', baseURL));
};

export async function middleware(request: NextRequest) {
  const response = NextResponse;
  const baseURL = request.url;
  const pathname = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get('auth_session');

  const signUpRoute = '/signup';
  const loginRoute = '/login';

  if (!sessionCookie && pathname !== signUpRoute) {
    redirectUserToLogin(request, response);
  }

  if (
    sessionCookie &&
    (pathname.startsWith(loginRoute) || pathname.startsWith(signUpRoute))
  ) {
    return response.redirect(new URL('/', baseURL));
  }

  const authCookie = `${sessionCookie?.name}=${sessionCookie?.value}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('cookie', authCookie);

  try {
    const fetchResponse = await fetch(
      process.env.NEXT_PRIVATE_AUTHSESSION_ENDPOINT!,
      {
        headers: requestHeaders,
      },
    );

    const data = await fetchResponse.json();

    if (!data) {
      redirectUserToLogin(request, response);
    }
  } catch (error) {
    redirectUserToLogin(request, response);
  }

  return response.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
