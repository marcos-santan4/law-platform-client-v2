import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE } from '../../../../lib/auth/constants';

type LoginRequestBody = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

type ApiLoginResponse = {
  data?: {
    token?: string;
    // demais campos são passados adiante sem tipagem estrita
    [key: string]: unknown;
  };
  message?: string;
  code?: string;
  [key: string]: unknown;
};

function getApiBaseUrl() {
  const url = process.env.REACT_APP_LAW_API_URL;
  if (!url) {
    throw new Error('REACT_APP_LAW_API_URL não está definido no ambiente.');
  }
  return url.replace(/\/$/, '');
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as LoginRequestBody | null;

  const email = body?.email?.trim();
  const password = body?.password;
  const rememberMe = Boolean(body?.rememberMe);

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email e senha são obrigatórios.' },
      { status: 400 },
    );
  }

  let upstreamJson: unknown = null;
  try {
    const upstreamRes = await fetch(`${getApiBaseUrl()}/authentication/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    upstreamJson = await upstreamRes.json().catch(() => null);
    const upstream = upstreamJson as ApiLoginResponse | null;

    if (!upstreamRes.ok) {
      return NextResponse.json(upstream ?? { message: 'Falha no login.' }, {
        status: upstreamRes.status,
      });
    }

    const token = upstream?.data?.token;
    if (!token) {
      return NextResponse.json(
        {
          message:
            upstream?.message ||
            'Login realizado, mas o token não foi retornado pela API.',
        },
        { status: 502 },
      );
    }

    const res = NextResponse.json(upstream, { status: 200 });
    res.headers.set('Cache-Control', 'no-store');

    res.cookies.set(AUTH_TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      ...(rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });

    return res;
  } catch (err: unknown) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : 'Erro inesperado ao autenticar.' },
      { status: 500 },
    );
  }
}

