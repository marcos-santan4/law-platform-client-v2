'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiBell, FiPlus, FiUsers, FiUser } from 'react-icons/fi';

import styles from '../styles.module.scss';
import { NotificationsDrawer } from '../notificationsDrawer';

function getPageTitle(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return 'Dashboard';
  }

  const routeMap: Record<string, string> = {
    clientes: 'Clientes',
    intimacoes: 'Intimações',
    casos: 'Casos e Processos',
    processos: 'Casos e Processos',
    tarefas: 'Tarefas',
    financeiro: 'Financeiro',
    agendamento: 'Agendamento',
    calculadoras: 'Calculadoras jurídicas',
    notificacoes: 'Notificações',
    perfil: 'Perfil',
    equipe: 'Equipe',
  };

  const route = segments[0];
  return routeMap[route] || route.charAt(0).toUpperCase() + route.slice(1);
}

export function AppTopHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className={styles.header} aria-label="Barra superior">
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.quickAdd} type="button">
            <span>Adicionar</span>
            <FiPlus size={18} className={styles.quickAddIcon} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Notificações"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((v) => !v)}
          >
            <FiBell size={18} />
            <span className={styles.badge} aria-label="6 notificações">
              6
            </span>
          </button>

          <Link href="/equipe" className={styles.iconButton} aria-label="Equipe">
            <FiUsers size={18} />
          </Link>

          <Link href="/perfil" className={styles.iconButton} aria-label="Perfil">
            <FiUser size={18} />
          </Link>
        </div>
      </div>

      {notificationsOpen ? <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} /> : null}
    </header>
  );
}


