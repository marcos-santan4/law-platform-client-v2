'use client';

import Link from 'next/link';
import { FiBell, FiPlus, FiUsers, FiUser } from 'react-icons/fi';

import styles from './appShell.module.scss';

export function AppTopHeader() {
  return (
    <header className={styles.header} aria-label="Barra superior">
      <div className={styles.headerInner}>
        <div className={styles.headerLeft} />

        <div className={styles.headerRight}>
          <button className={styles.quickAdd} type="button">
            <span className={styles.quickAddIcon} aria-hidden="true">
              <FiPlus size={18} />
            </span>
            <span>Cadastro rápido</span>
          </button>

          <Link href="/notificacoes" className={styles.iconButton} aria-label="Notificações">
            <FiBell size={18} />
            <span className={styles.badge} aria-label="6 notificações">
              6
            </span>
          </Link>

          <Link href="/equipe" className={styles.iconButton} aria-label="Equipe">
            <FiUsers size={18} />
          </Link>

          <Link href="/perfil" className={styles.iconButton} aria-label="Perfil">
            <FiUser size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}

