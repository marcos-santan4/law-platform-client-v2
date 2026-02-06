import type { ReactNode } from 'react';
import { SignUpShell } from './components/layout';
import { SignUpFlowProvider } from '.';

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <SignUpFlowProvider>
      <SignUpShell>{children}</SignUpShell>
    </SignUpFlowProvider>
  );
}


