'use client';

import { useMemo } from 'react';
import styles from './styles.module.scss';

export type ProcessosPorTagItem = {
  tag: string;
  quantidade: number;
  cor: string;
};

type Props = {
  data: ProcessosPorTagItem[];
};

export function ProcessosPorTag({ data }: Props) {
  const totalProcessos = useMemo(() => data.reduce((acc, p) => acc + p.quantidade, 0), [data]);

  if (data.length === 0) {
    return (
      <>
        <h2 className={styles.panelTitle}>Processos por Tag</h2>
        <div className={styles.emptyState}>Nenhum processo cadastrado por tag.</div>
      </>
    );
  }

  return (
    <>
      <h2 className={styles.panelTitle}>Processos por Tag</h2>
      <div className={styles.chartWrap}>
        <div
          className={styles.donutChart}
          style={{
            background: `conic-gradient(${data
              .map((p, i) => {
                const start =
                  (data.slice(0, i).reduce((a, x) => a + x.quantidade, 0) / totalProcessos) * 100;
                const end =
                  (data.slice(0, i + 1).reduce((a, x) => a + x.quantidade, 0) / totalProcessos) *
                  100;
                return `${p.cor} ${start}% ${end}%`;
              })
              .join(', ')})`,
          }}
        >
          <div className={styles.donutHole}>
            <span className={styles.donutTotal}>Total de processos</span>
            <span className={styles.donutValue}>{totalProcessos}</span>
          </div>
        </div>
        <div className={styles.chartLegend}>
          {data.map((p) => (
            <div key={p.tag} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: p.cor }} />
              <span>
                {p.tag} ({p.quantidade})
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
