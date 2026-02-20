import type { ReactNode } from 'react';
import { AppShell } from './components/appShell/AppShell';
import { AuthGuard } from './components/auth/AuthGuard';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}

