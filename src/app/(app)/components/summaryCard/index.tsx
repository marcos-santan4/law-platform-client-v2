'use client';

import type { ReactNode } from 'react';
import styles from './styles.module.scss';

export type SummaryCardItem = {
  label: string;
  value: string;
};

type Props =
  | {
      variant: 'single';
      title: string;
      icon: ReactNode;
      iconBgColor?: 'blue' | 'amber' | 'yellow';
      cardBg?: 'white' | 'gray' | 'cream';
      value: string;
    }
  | {
      variant: 'double' | 'triple';
      title: string;
      icon: ReactNode;
      iconBgColor?: 'blue' | 'amber' | 'yellow';
      cardBg?: 'white' | 'gray' | 'cream';
      items: SummaryCardItem[];
    };

export function SummaryCard(props: Props) {
  const { title, icon, iconBgColor = 'blue', cardBg = 'white', variant } = props;

  return (
    <div
      className={`${styles.card} ${styles[`cardBg_${cardBg}`]} ${styles[`iconBg_${iconBgColor}`]}`}
    >
      <div className={styles.iconWrap}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className={styles.title}>{title}</div>
      {variant === 'single' && <div className={styles.value}>{props.value}</div>}
      {(variant === 'double' || variant === 'triple') && (
        <div className={styles[`grid_${variant}`]}>
          {props.items.map((item) => (
            <div key={item.label} className={styles.gridItem}>
              <span className={styles.gridLabel}>{item.label}</span>
              <span className={styles.gridValue}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
