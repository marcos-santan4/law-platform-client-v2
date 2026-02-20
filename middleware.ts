import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE, DEFAULT_LOGIN_REDIRECT } from './src/lib/auth/constants';

const PUBLIC_PATH_PREFIXES = [
  '/',
  '/authentication',
  '/request-password',
  '/api',
  '/_next',
  '/favicon.ico',
];

const INTERNAL_PATH_PREFIXES = [
  '/dashboard',
  '/clients',
  '/cases',
  '/summons',
  '/finance',
  '/team',
  '/profile',
  '/tasks',
  '/schedule',
  '/calculators',
  '/notificacoes',
  '/notifications',
  '/intimacoes',
  '/processos',
  '/clientes',
  '/casos',
  '/financeiro',
  '/equipe',
  '/perfil',
  '/tarefas',
  '/agendamento',
  '/calculadoras',
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isInternalPath(pathname: string) {
  return INTERNAL_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Arquivos públicos estáticos (ex: .png, .svg, etc)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  const isLoggedIn = Boolean(token);

  // Se já estiver logado e tentar acessar telas de autenticação, redireciona pro app
  if (isLoggedIn && pathname.startsWith('/authentication')) {
    const url = req.nextUrl.clone();
    url.pathname = DEFAULT_LOGIN_REDIRECT;
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Se não estiver logado e tentar acessar telas internas, manda pro login
  if (!isLoggedIn && (isInternalPath(pathname) || (!isPublicPath(pathname) && pathname !== '/'))) {
    const url = req.nextUrl.clone();
    url.pathname = '/authentication/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  if (isInternalPath(pathname)) {
    // Ajuda a evitar que o browser re-use páginas internas do histórico após logout
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.headers.set('Pragma', 'no-cache');
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};

