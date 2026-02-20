'use client';

import { useEffect, useId, useRef, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './styles.module.scss';

type ModalSize = 'sm' | 'md' | 'lg';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
};

export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }: Props) {
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
      <div
        className={`${styles.dialog} ${styles[`dialog${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <div className={styles.headerCenter}>
            <h2 className={styles.headerTitle} id={titleId}>
              {title}
            </h2>
            {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
          </div>

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

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}
