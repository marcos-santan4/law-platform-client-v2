'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  onAfterLogout?: () => void;
};

export function LogoutButton({ className, children, onAfterLogout }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => null);
    onAfterLogout?.();
    router.replace('/authentication/login');
    router.refresh();
  }

  return (
    <button type="button" className={className} onClick={handleLogout}>
      {children}
    </button>
  );
}

