'use client';

import { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { IntimacaoCard, type Intimacao } from '../../components/noticeCard';
import styles from './styles.module.scss';

type Props = {
  finalizadas: Intimacao[];
  onViewDetails: (item: Intimacao) => void;
};

export function FinalizadasTab({ finalizadas, onViewDetails }: Props) {
  const [search, setSearch] = useState('');

  const filteredFinalizadas = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return finalizadas;
    return finalizadas.filter(
      (i) => i.numeroProcesso.toLowerCase().includes(q) || i.destinatario.toLowerCase().includes(q),
    );
  }, [finalizadas, search]);

  return (
    <>
      <div className={styles.filtersFinalizadas}>
        <div className={styles.searchOnly} role="search">
          <FiSearch size={16} aria-hidden="true" />
          <input
            className={styles.searchOnlyInput}
            placeholder="Buscar por Número do Processo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        {filteredFinalizadas.map((item) => (
          <IntimacaoCard
            key={item.id}
            item={item}
            showMarkConcluida={false}
            showMaisOpcoes={false}
            onViewDetails={onViewDetails}
            onAddPrazo={() => {}}
            onAddAudiencia={() => {}}
            onAddTarefa={() => {}}
          />
        ))}
      </div>

      <div className={styles.paginationRow}>
        <div className={styles.pageSize}>
          <span>Itens por página:</span>
          <div className={styles.pageSizeValue}>25</div>
        </div>
        <div className={styles.pager}>
          <button type="button" className={styles.pagerBtn} disabled aria-label="Anterior">
            ‹
          </button>
          <span className={styles.pageIndex}>1</span>
          <button type="button" className={styles.pagerBtn} disabled aria-label="Próximo">
            ›
          </button>
        </div>
      </div>
    </>
  );
}
