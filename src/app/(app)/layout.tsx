import type { ReactNode } from 'react';
import { AppShell } from './components/appShell/AppShell';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

