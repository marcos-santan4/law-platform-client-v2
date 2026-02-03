'use client';

import { useEffect, useId, useRef } from 'react';
import { IoIosCheckmarkCircleOutline, IoMdClose } from 'react-icons/io';
import styles from './PlanFeaturesModal.module.scss';

type FeatureItem = { title: string; description: string };

type Props = {
  open: boolean;
  planLabel: string;
  credits: string[];
  features: FeatureItem[];
  onClose: () => void;
};

export function PlanFeaturesModal({ open, planLabel, credits, features, onClose }: Props) {
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
            Funcionalidades do {planLabel}
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
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Créditos incluídos:</h3>
            <ul className={styles.list}>
              {credits.map((c) => (
                <li key={c} className={styles.listItem}>
                  <IoIosCheckmarkCircleOutline className={styles.listIcon} aria-hidden="true" />
                  <span className={styles.listText}>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Funcionalidades disponíveis:</h3>
            <ul className={styles.list}>
              {features.map((f) => (
                <li key={f.title} className={styles.listItem}>
                  <IoIosCheckmarkCircleOutline className={styles.listIcon} aria-hidden="true" />
                  <span className={styles.listText}>
                    <strong>{f.title}</strong> - {f.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
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


