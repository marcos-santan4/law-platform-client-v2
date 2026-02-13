'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiCalendar,
  FiBell,
  FiDollarSign,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiGrid,
} from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';
import { ImHammer2 } from 'react-icons/im';
import { SlCalculator } from 'react-icons/sl';
import { TbReportSearch } from 'react-icons/tb';

import logo from '../../../../../../public/images/logos/logo-mindlaw.png';
import logoCollapsed from '../../../../../../public/images/logos/logo-mindlaw2.png';
import styles from '../styles.module.scss';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { href: '/clientes', label: 'Clientes', icon: FiUsers },
  { href: '/intimacoes', label: 'Intimações', icon: ImHammer2 },
  { href: '/casos', label: 'Casos e Processos', icon: TbReportSearch },
  { href: '/tarefas', label: 'Tarefas', icon: FaTasks },
  { href: '/financeiro', label: 'Financeiro', icon: FiDollarSign },
  { href: '/agendamento', label: 'Agendamento', icon: FiCalendar },
  { href: '/calculadoras', label: 'Calculadoras jurídicas', icon: SlCalculator },
];

type AppSidebarProps = {
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export function AppSidebar({ collapsed, onToggleCollapsed }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} aria-label="Menu lateral">
      <div className={styles.sidebarInner}>
        <div className={styles.brandRow}>
          <div className={styles.brand}>
            <Image
              className={styles.brandLogo}
              src={collapsed ? logoCollapsed : logo}
              alt="MindLaw"
              priority
            />
          </div>

          <button
            className={styles.collapseButton}
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'Expandir menu' : 'Minimizar menu'}
            aria-pressed={collapsed}
          >
            {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </button>
        </div>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                aria-label={item.label}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/notificacoes" className={styles.footerItem} aria-label="Notificações">
            <span className={styles.navIcon} aria-hidden="true">
              <FiBell size={18} />
            </span>
            <span>Notificações</span>
          </Link>

          <Link href="/authentication/login" className={styles.footerItem}>
            <span className={styles.navIcon} aria-hidden="true">
              <FiLogOut size={18} />
            </span>
            <span>Sair</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}


