'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  FiCalendar,
  FiBell,
  FiDollarSign,
  FiLogOut,
  FiUsers,
  FiGrid,
} from 'react-icons/fi';
import { FaTasks } from 'react-icons/fa';
import { ImHammer2 } from 'react-icons/im';
import { SlCalculator } from 'react-icons/sl';
import { TbReportSearch } from 'react-icons/tb';

import logo from '../../../../../../public/images/logos/logo-mindlaw.png';
import styles from './styles.module.scss';

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

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} aria-hidden="true" />
      <div ref={menuRef} className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <div className={styles.menuInner}>
          {/* <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <RiMenuFold3Line size={24} />
          </button> */}

          <div className={styles.brandRow}>
            <div className={styles.brand}>
              <Image className={styles.brandLogo} src={logo} alt="MindLaw" priority />
            </div>
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
                  onClick={onClose}
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

          <div className={styles.menuFooter}>
            <Link href="/notificacoes" className={styles.footerItem} onClick={onClose} aria-label="Notificações">
              <span className={styles.navIcon} aria-hidden="true">
                <FiBell size={18} />
              </span>
              <span>Notificações</span>
            </Link>

            <Link href="/authentication/login" className={styles.footerItem} onClick={onClose}>
              <span className={styles.navIcon} aria-hidden="true">
                <FiLogOut size={18} />
              </span>
              <span>Sair</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

