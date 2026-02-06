'use client';

import { useState } from 'react';

import styles from '../styles.module.scss';
import { AppSidebar } from '../AppSidebar';
import { AppTopHeader } from '../AppTopHeader';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`${styles.root} ${isSidebarCollapsed ? styles.rootCollapsed : ''}`}>
      <AppSidebar
        collapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((v) => !v)}
      />

      <div className={styles.main}>
        <AppTopHeader />
        <div className={styles.page}>{children}</div>
      </div>
    </div>
  );
}


