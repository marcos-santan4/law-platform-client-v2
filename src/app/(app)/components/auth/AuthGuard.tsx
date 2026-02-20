'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

async function isAuthenticated(): Promise<boolean> {
  const res = await fetch('/api/auth/session', { cache: 'no-store' });
  return res.ok;
}

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAndRedirect() {
      const ok = await isAuthenticated().catch(() => false);
      if (cancelled) return;

      if (!ok) {
        const next = pathname?.startsWith('/') ? pathname : '/dashboard';
        router.replace(`/authentication/login?next=${encodeURIComponent(next)}`);
        router.refresh();
        return;
      }

      setAllowed(true);
    }

    checkAndRedirect();

    function onPageShow(e: PageTransitionEvent) {
      // Se voltou do bfcache, revalida sessão
      if (e.persisted) {
        setAllowed(false);
        checkAndRedirect();
      }
    }

    window.addEventListener('pageshow', onPageShow);
    return () => {
      cancelled = true;
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [pathname, router]);

  if (!allowed) return null;
  return children;
}

