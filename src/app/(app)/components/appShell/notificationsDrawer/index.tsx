'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiBell } from 'react-icons/fi';

import styles from './styles.module.scss';

type TabKey = 'todos' | 'processos' | 'mencoes';

type NotificationItem = {
  id: string;
  type: 'processo' | 'mencao' | 'geral';
  title: string;
  subtitle?: string;
  meta?: string;
  dateLabel?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export function NotificationsDrawer({ open, onClose }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<TabKey>('todos');

  const items: NotificationItem[] = useMemo(
    () => [
      {
        id: 'n1',
        type: 'geral',
        title: 'Você foi adicionado à tarefa: Adicionar tela de carregamento',
        subtitle: 'Prioridade: Média',
        meta: 'Workspace: Desenvolvimento',
        dateLabel: '27/01/2026, 19:39',
      },
      {
        id: 'n2',
        type: 'processo',
        title: 'Atualização no processo: 1000709-35.2025.8.13.0024',
        subtitle: 'A captura foi finalizada',
        dateLabel: '23/11/2025, 18:26',
      },
      {
        id: 'n3',
        type: 'processo',
        title: 'Atualização no processo: 0100074-45.2013.4.02.5002',
        subtitle: 'A captura foi finalizada',
        dateLabel: '23/11/2025, 13:28',
      },
      {
        id: 'n4',
        type: 'mencao',
        title: 'Menção em comentário: Revisar petição inicial',
        subtitle: 'Você foi mencionado em um comentário',
        dateLabel: '05/02/2026, 09:12',
      },
      {
        id: 'n5',
        type: 'processo',
        title: 'Atualização no processo: 0002696-42.2026.4.05.8400',
        subtitle: 'Novo andamento registrado',
        dateLabel: '28/01/2026, 08:01',
      },
      {
        id: 'n6',
        type: 'geral',
        title: 'Lembrete: Reunião agendada',
        subtitle: 'Hoje às 15:00',
        dateLabel: '06/02/2026, 10:00',
      },
    ],
    [],
  );

  const counts = useMemo(() => {
    const processos = items.filter((i) => i.type === 'processo').length;
    const mencoes = items.filter((i) => i.type === 'mencao').length;
    return { todos: items.length, processos, mencoes };
  }, [items]);

  const filtered = useMemo(() => {
    if (tab === 'todos') return items;
    if (tab === 'processos') return items.filter((i) => i.type === 'processo');
    return items.filter((i) => i.type === 'mencao');
  }, [items, tab]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return;
    setTab('todos');
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <h2 className={styles.title} id={titleId}>
            Notificações
          </h2>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Filtros de notificações">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'todos'}
            className={`${styles.tab} ${tab === 'todos' ? styles.tabActive : ''}`}
            onClick={() => setTab('todos')}
          >
            <span>Todos</span>
            <span className={styles.tabCount}>{counts.todos}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === 'processos'}
            className={`${styles.tab} ${tab === 'processos' ? styles.tabActive : ''}`}
            onClick={() => setTab('processos')}
          >
            <span>Processo</span>
            <span className={styles.tabCount}>{counts.processos}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === 'mencoes'}
            className={`${styles.tab} ${tab === 'mencoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('mencoes')}
          >
            <span>Menções</span>
            <span className={styles.tabCount}>{counts.mencoes}</span>
          </button>
        </div>

        <div className={styles.list} aria-label="Lista de notificações">
          {filtered.map((n) => (
            <article key={n.id} className={styles.item}>
              <div className={styles.itemIcon} aria-hidden="true">
                <FiBell size={16} />
              </div>
              <div className={styles.itemBody}>
                <div className={styles.itemTitle}>{n.title}</div>
                {n.subtitle ? <div className={styles.itemSubtitle}>{n.subtitle}</div> : null}
                {n.meta ? <div className={styles.itemMeta}>- {n.meta}</div> : null}
                {n.dateLabel ? <div className={styles.itemDate}>{n.dateLabel}</div> : null}
              </div>
            </article>
          ))}
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.primaryButton}>
            Marcar todas como visualizadas
          </button>
          <Link className={styles.footerLink} href="/notificacoes" onClick={onClose}>
            Ver todas
          </Link>
        </footer>
      </aside>
    </div>
  );
}


