'use client';

import { FiBell, FiCheck } from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import styles from './styles.module.scss';

export type PrazoItem = {
  id: string;
  tipo: string;
  processo: string;
  data: string;
  advogado: string;
  concluido: boolean;
};

type Props = {
  prazos: PrazoItem[];
  audiencias?: PrazoItem[];
};

export function Prazos({ prazos, audiencias = [] }: Props) {
  type ItemWithKind = PrazoItem & { _kind: 'prazo' | 'audiencia' };
  const itens: ItemWithKind[] = [
    ...prazos.map((p) => ({ ...p, _kind: 'prazo' as const })),
    ...audiencias.map((a) => ({ ...a, _kind: 'audiencia' as const })),
  ];

  return (
    <>
      <div className={styles.panelHeaderRow}>
        <h2 className={styles.panelTitle}>Prazos</h2>
        <button type="button" className={styles.helpButton} aria-label="Ajuda">
          <MdHelpOutline size={18} />
        </button>
      </div>
      <div className={styles.listaPrazos}>
        {itens.length === 0 ? (
          <div className={styles.emptyState}>Nenhum prazo ou audiência pendente.</div>
        ) : (
          itens.map((item) => (
            <div key={`${item._kind}-${item.id}`} className={styles.prazoItem}>
              <FiBell size={18} className={styles.prazoIcon} aria-hidden />
              <div className={styles.prazoContent}>
                <div className={styles.prazoTitulo}>
                  {item.tipo} - Processo {item.processo}
                </div>
                <div className={styles.prazoMeta}>
                  {item.data} · {item.advogado}
                </div>
              </div>
              {item.concluido && (
                <div className={styles.prazoCheck} aria-hidden>
                  <FiCheck size={18} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
