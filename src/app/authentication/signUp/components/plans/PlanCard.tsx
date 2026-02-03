'use client';

import type { PlanId } from '../../signUpFlowContext';
import styles from './styles.module.scss';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

type Props = {
  id: PlanId;
  title: string;
  priceLabel: string;
  bullets: string[];
  selected: boolean;
  onSelect: (id: PlanId) => void;
  onOpenFeatures: (id: PlanId) => void;
};

export function PlanCard({ id, title, priceLabel, bullets, selected, onSelect, onOpenFeatures }: Props) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(id);
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>{priceLabel}</div>
      </div>

      <ul className={styles.bullets}>
        {bullets.map((b) => (
          <li key={b} className={styles.bulletItem}>
            <IoIosCheckmarkCircleOutline className={styles.bulletIcon} aria-hidden="true" />
            <span className={styles.bulletText}>{b}</span>
          </li>
        ))}
      <button
        type="button"
        className={styles.featuresLink}
        onClick={(e) => {
          e.stopPropagation();
          onOpenFeatures(id);
        }}
      >
        Ver todas as funcionalidades
      </button>
      </ul>


      <div className={styles.ctaRow}>
        <span className={styles.ctaText}>{selected ? 'Selecionado' : 'Selecionar'}</span>
      </div>
    </div>
  );
}


