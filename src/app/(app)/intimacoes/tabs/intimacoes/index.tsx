'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

import { IntimacaoCard, type Intimacao } from '../../components/intimacaoCard';
import styles from './styles.module.scss';

type Props = {
  intimacoes: Intimacao[];
  onViewDetails: (item: Intimacao) => void;
  onMarkConcluida: (item: Intimacao) => void;
  onAddPrazo: (item: Intimacao) => void;
  onAddAudiencia: (item: Intimacao) => void;
  onAddTarefa: (item: Intimacao) => void;
};

export function IntimacoesTab({
  intimacoes,
  onViewDetails,
  onMarkConcluida,
  onAddPrazo,
  onAddAudiencia,
  onAddTarefa,
}: Props) {
  const [openFilter, setOpenFilter] = useState<'date' | 'type' | 'pageSize' | null>(null);
  const dateFilterRef = useRef<HTMLDivElement | null>(null);
  const typeFilterRef = useRef<HTMLDivElement | null>(null);
  const pageSizeFilterRef = useRef<HTMLDivElement | null>(null);

  const [dateFilter, setDateFilter] = useState<'Todos' | 'Hoje' | 'Ontem' | 'Última semana' | 'Último mês'>('Todos');
  const [typeFilter, setTypeFilter] = useState<'Todos' | 'OAB' | 'Número do processo'>('Todos');
  const [pageSize, setPageSize] = useState<25 | 50 | 100 | 200>(25);
  const [search, setSearch] = useState('');

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      const refs = [dateFilterRef.current, typeFilterRef.current, pageSizeFilterRef.current].filter(Boolean) as HTMLDivElement[];
      const clickedInside = refs.some((r) => r.contains(target));
      if (!clickedInside) setOpenFilter(null);
    }

    if (!openFilter) return;
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [openFilter]);

  const filteredIntimacoes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return intimacoes;
    return intimacoes.filter((i) => i.numeroProcesso.toLowerCase().includes(q) || i.destinatario.toLowerCase().includes(q));
  }, [intimacoes, search]);

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.field}>
          <label className={styles.label}>A partir da data</label>
          <div className={styles.filterWrapper} ref={dateFilterRef}>
            <button
              className={styles.filterButton}
              type="button"
              onClick={() => setOpenFilter((v) => (v === 'date' ? null : 'date'))}
              aria-expanded={openFilter === 'date'}
              aria-haspopup="menu"
            >
              <span className={styles.filterValue}>{dateFilter}</span>
              <FiChevronDown
                size={16}
                className={`${styles.filterIcon} ${openFilter === 'date' ? styles.filterIconOpen : ''}`}
                aria-hidden="true"
              />
            </button>

            {openFilter === 'date' ? (
              <div className={styles.filterDropdown} role="menu" aria-label="A partir da data">
                {(['Todos', 'Hoje', 'Ontem', 'Última semana', 'Último mês'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="menuitemradio"
                    aria-checked={dateFilter === opt}
                    className={`${styles.filterOption} ${dateFilter === opt ? styles.filterOptionActive : ''}`}
                    onClick={() => {
                      setDateFilter(opt);
                      setOpenFilter(null);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tipo de Intimação</label>
          <div className={styles.filterWrapper} ref={typeFilterRef}>
            <button
              className={styles.filterButton}
              type="button"
              onClick={() => setOpenFilter((v) => (v === 'type' ? null : 'type'))}
              aria-expanded={openFilter === 'type'}
              aria-haspopup="menu"
            >
              <span className={styles.filterValue}>{typeFilter}</span>
              <FiChevronDown
                size={16}
                className={`${styles.filterIcon} ${openFilter === 'type' ? styles.filterIconOpen : ''}`}
                aria-hidden="true"
              />
            </button>

            {openFilter === 'type' ? (
              <div className={styles.filterDropdown} role="menu" aria-label="Tipo de intimação">
                {(['Todos', 'OAB', 'Número do processo'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="menuitemradio"
                    aria-checked={typeFilter === opt}
                    className={`${styles.filterOption} ${typeFilter === opt ? styles.filterOptionActive : ''}`}
                    onClick={() => {
                      setTypeFilter(opt);
                      setOpenFilter(null);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles.search} ${styles.field}`} role="search">
          <label className={styles.srOnly}>Buscar por Número do Processo</label>
          <FiSearch size={16} aria-hidden="true" />
          <input
            className={styles.searchInput}
            placeholder="Buscar por Número do Processo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        {filteredIntimacoes.map((item) => (
          <IntimacaoCard
            key={item.id}
            item={item}
            onViewDetails={onViewDetails}
            onMarkConcluida={onMarkConcluida}
            onAddPrazo={onAddPrazo}
            onAddAudiencia={onAddAudiencia}
            onAddTarefa={onAddTarefa}
          />
        ))}
      </div>

      <div className={styles.paginationRow}>
        <div className={styles.pageSize}>
          <span>Itens por página:</span>
          <div className={styles.filterWrapper} ref={pageSizeFilterRef}>
            <button
              className={styles.filterButton}
              type="button"
              onClick={() => setOpenFilter((v) => (v === 'pageSize' ? null : 'pageSize'))}
              aria-expanded={openFilter === 'pageSize'}
              aria-haspopup="menu"
            >
              <span className={styles.filterValue}>{pageSize}</span>
              <FiChevronDown
                size={16}
                className={`${styles.filterIcon} ${openFilter === 'pageSize' ? styles.filterIconOpen : ''}`}
                aria-hidden="true"
              />
            </button>

            {openFilter === 'pageSize' ? (
              <div className={`${styles.filterDropdown} ${styles.filterDropdownUp}`} role="menu" aria-label="Itens por página">
                {([25, 50, 100, 200] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="menuitemradio"
                    aria-checked={pageSize === opt}
                    className={`${styles.filterOption} ${pageSize === opt ? styles.filterOptionActive : ''}`}
                    onClick={() => {
                      setPageSize(opt);
                      setOpenFilter(null);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
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


