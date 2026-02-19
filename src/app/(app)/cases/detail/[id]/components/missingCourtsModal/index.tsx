'use client';

import { useEffect, useId, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

import { AddDataMenu, type AddDataAction } from '../addDataMenu';
import styles from './styles.module.scss';

export type MissingCourtItem = {
  id: string;
  title: string;
  subtitle: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: MissingCourtItem[];
  onSelect: (action: AddDataAction) => void;
};

export function MissingCourtsModal({ open, onClose, items, onSelect }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle} id={titleId}>
            Tribunais sem resultado ({items.length})
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

        <div className={styles.body}>
          <div className={styles.list}>
            {items.map((it) => (
              <div key={it.id} className={styles.row}>
                <div className={styles.rowText}>
                  <div className={styles.rowTitle}>{it.title}</div>
                  <div className={styles.rowSub}>{it.subtitle}</div>
                </div>
                <AddDataMenu variant="outline" label="Adicionar" onSelect={onSelect} />
              </div>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
}

