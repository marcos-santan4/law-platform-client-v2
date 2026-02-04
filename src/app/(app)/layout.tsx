import type { ReactNode } from 'react';
import { AppShell } from './components/appShell';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

