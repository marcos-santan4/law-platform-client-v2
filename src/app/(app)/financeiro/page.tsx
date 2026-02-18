'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiEye,
  FiRefreshCw,
  FiUpload,
  FiX,
} from 'react-icons/fi';

import styles from './styles.module.scss';

type TabKey =
  | 'lancamentos'
  | 'centro_custos'
  | 'contas'
  | 'faturas'
  | 'honorarios'
  | 'custas'
  | 'despesas'
  | 'relatorios';

type TransactionKind = 'entrada' | 'saida';
type TransactionStatus = 'paga' | 'pendente';

type Transaction = {
  id: string;
  date: string; // dd/mm/yyyy
  value: number; // em reais
  kind: TransactionKind;
  status: TransactionStatus;
  description?: string;
};

type SidePanelKey = 'new' | 'entrada' | 'saida' | 'pdf' | 'details' | 'edit';

const MONTHS_SHORT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] as const;

function parseBRDate(dateStr: string) {
  // dd/mm/yyyy
  const [dd, mm, yyyy] = dateStr.split('/').map((x) => Number(x));
  if (!dd || !mm || !yyyy) return null;
  const d = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function toBRDate(d: Date) {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function addMonths(date: Date, delta: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d;
}

function sumByMonth(transactions: Transaction[], year: number) {
  const entries = Array.from({ length: 12 }, () => 0);
  const exits = Array.from({ length: 12 }, () => 0);

  for (const t of transactions) {
    const d = parseBRDate(t.date);
    if (!d) continue;
    if (d.getFullYear() !== year) continue;
    const idx = d.getMonth();
    if (t.kind === 'entrada') entries[idx] += t.value;
    else exits[idx] += t.value;
  }

  return { entries, exits };
}

function SimpleLineChart({
  title,
  entries,
  exits,
}: {
  title: string;
  entries: number[];
  exits: number[];
}) {
  const width = 840;
  const height = 240;
  const padding = 28;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const maxValue = Math.max(1, ...entries, ...exits);
  const y = (v: number) => padding + innerH - (v / maxValue) * innerH;
  const x = (i: number) => padding + (i / 11) * innerW;

  const pathFor = (series: number[]) =>
    series
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
      .join(' ');

  return (
    <section className={styles.chartPanel} aria-label={title}>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>{title}</div>
        <div className={styles.legend} aria-label="Legenda do gráfico">
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendEntry}`} aria-hidden="true" />
            Entrada
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendExit}`} aria-hidden="true" />
            Saída
          </span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Gráfico de entradas e saídas"
          className={styles.chartSvg}
        >
          <rect x="0" y="0" width={width} height={height} fill="white" />

          {Array.from({ length: 5 }).map((_, i) => {
            const yy = padding + (innerH / 4) * i;
            return (
              <line
                key={i}
                x1={padding}
                y1={yy}
                x2={width - padding}
                y2={yy}
                stroke="rgba(11,47,54,0.10)"
                strokeWidth="1"
              />
            );
          })}

          <path d={pathFor(entries)} fill="none" stroke="#0b2f36" strokeWidth="2.5" />
          <path d={pathFor(exits)} fill="none" stroke="#7f1d1d" strokeWidth="2.5" />
        </svg>

        <div className={styles.chartMonths} aria-hidden="true">
          {MONTHS_SHORT.map((m) => (
            <span key={m} className={styles.chartMonth}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SidePanelShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.sidePanel} aria-label={title}>
      <div className={styles.sidePanelHeader}>
        <div className={styles.sidePanelTitle}>{title}</div>
        <button type="button" className={styles.sidePanelClose} aria-label="Fechar" onClick={onClose}>
          <FiX size={18} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.sidePanelBody}>{children}</div>
    </section>
  );
}

function calcSummary(transactions: Transaction[], dateRef: Date) {
  const cur = monthKey(dateRef);
  const prev = monthKey(addMonths(dateRef, -1));
  const next = monthKey(addMonths(dateRef, 1));

  const sumMonth = (key: string, kind: TransactionKind) =>
    transactions.reduce((acc, t) => {
      const d = parseBRDate(t.date);
      if (!d) return acc;
      if (monthKey(d) !== key) return acc;
      if (t.kind !== kind) return acc;
      return acc + t.value;
    }, 0);

  return {
    curIn: sumMonth(cur, 'entrada'),
    curOut: sumMonth(cur, 'saida'),
    prevIn: sumMonth(prev, 'entrada'),
    prevOut: sumMonth(prev, 'saida'),
    nextIn: sumMonth(next, 'entrada'),
    nextOut: sumMonth(next, 'saida'),
  };
}

export default function FinanceiroPage() {
  const [tab, setTab] = useState<TabKey>('lancamentos');
  const [sidePanel, setSidePanel] = useState<SidePanelKey>('new');
  const [selected, setSelected] = useState<Transaction | null>(null);

  const today = useMemo(() => new Date(), []);
  const nowMonthLabel = useMemo(() => {
    const m = MONTHS_SHORT[today.getMonth()] ?? '—';
    return m.toLowerCase();
  }, [today]);

  const initialTransactions = useMemo<Transaction[]>(
    () => [
      { id: 't1', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 10)), value: 1500, kind: 'entrada', status: 'paga', description: 'honorários' },
      { id: 't2', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 400, kind: 'entrada', status: 'paga', description: 'entrada' },
      { id: 't3', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 200, kind: 'entrada', status: 'pendente', description: 'entrada' },
      { id: 't4', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 4)), value: 223.23, kind: 'saida', status: 'paga', description: 'saída' },
      { id: 't5', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 1231.23, kind: 'entrada', status: 'pendente', description: 'entrada' },
      { id: 't6', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 300, kind: 'entrada', status: 'pendente', description: 'entrada' },
      { id: 't7', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 100, kind: 'entrada', status: 'paga', description: 'entrada' },
      { id: 't8', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 5)), value: 39999.99, kind: 'entrada', status: 'paga', description: 'entrada' },
      { id: 't9', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 3)), value: 500, kind: 'entrada', status: 'paga', description: 'entrada' },
      { id: 't10', date: toBRDate(new Date(today.getFullYear(), today.getMonth(), 3)), value: 2000, kind: 'entrada', status: 'paga', description: 'entrada' },
    ],
    [today],
  );

  const [transactions, setTransactions] = useState<Transaction[]>(() => initialTransactions);

  const summary = useMemo(() => calcSummary(transactions, today), [transactions, today]);
  const chart = useMemo(() => sumByMonth(transactions, today.getFullYear()), [transactions, today]);

  const [entradaForm, setEntradaForm] = useState({
    value: '',
    date: '',
    description: '',
    parcelado: false,
  });
  const [saidaForm, setSaidaForm] = useState({
    value: '',
    date: '',
    description: '',
    recorrencia: false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  function resetSidePanel() {
    setSelected(null);
    setSidePanel('new');
  }

  function openDetails(t: Transaction) {
    setSelected(t);
    setSidePanel('details');
  }

  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    resetSidePanel();
  }

  function updateTransaction(next: Transaction) {
    setTransactions((prev) => prev.map((t) => (t.id === next.id ? next : t)));
    setSelected(next);
    setSidePanel('details');
  }

  function addTransaction(t: Omit<Transaction, 'id'>) {
    setTransactions((prev) => [{ ...t, id: `t_${Date.now()}` }, ...prev]);
    resetSidePanel();
  }

  const tabs = useMemo(
    () =>
      [
        { key: 'lancamentos', label: 'Lançamentos' },
        { key: 'centro_custos', label: 'Centro de Custos' },
        { key: 'contas', label: 'Contas' },
        { key: 'faturas', label: 'Faturas' },
        { key: 'honorarios', label: 'Honorários' },
        { key: 'custas', label: 'Custas' },
        { key: 'despesas', label: 'Despesas' },
        { key: 'relatorios', label: 'Relatórios' },
      ] as const,
    [],
  );

  const panelTitle =
    tab === 'lancamentos'
      ? 'Lançamentos'
      : tab === 'centro_custos'
        ? 'Centro de Custos'
        : tab === 'contas'
          ? 'Contas'
          : tab === 'faturas'
            ? 'Faturas'
            : tab === 'honorarios'
              ? 'Honorários'
              : tab === 'custas'
                ? 'Custas'
                : tab === 'despesas'
                  ? 'Despesas'
                  : 'Relatórios';

  return (
    <div className={styles.page}>
      <div className={styles.topTabsRow}>
        <div className={styles.tabs} role="tablist" aria-label="Seções do Financeiro">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => {
                setTab(t.key);
                resetSidePanel();
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab !== 'lancamentos' ? (
        <section className={styles.placeholder} aria-label={panelTitle}>
          <h2 className={styles.placeholderTitle}>{panelTitle}</h2>
          <p className={styles.placeholderText}>Conteúdo desta aba será implementado em seguida.</p>
        </section>
      ) : (
        <div className={styles.lancamentosGrid}>
          <div className={styles.mainCol}>
            <div className={styles.cardsGrid} aria-label="Resumo de entradas e saídas">
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Entrada {nowMonthLabel}</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowDownLeft size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.curIn)}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Saída {nowMonthLabel}</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.curOut)}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Entrada mês passado</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowDownLeft size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.prevIn)}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Saída mês passado</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.prevOut)}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Entrada mês seguinte</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowDownLeft size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.nextIn)}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statTitle}>Saída mês seguinte</span>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
                <div className={styles.statValue}>{formatBRL(summary.nextOut)}</div>
              </div>
            </div>

            <SimpleLineChart
              title={`Entradas e saídas ${today.getFullYear()}`}
              entries={chart.entries}
              exits={chart.exits}
            />

            <section className={styles.transactionsPanel} aria-label="Transações">
              <div className={styles.transactionsHeader}>
                <div className={styles.transactionsTitle}>Transações</div>
                <button
                  type="button"
                  className={styles.refreshBtn}
                  aria-label="Atualizar transações"
                  onClick={() => {
                    // no momento, o refresh só mantém a consistência com a UI do protótipo
                  }}
                >
                  <FiRefreshCw size={18} />
                </button>
              </div>

              <div className={styles.transactionsTools} aria-label="Ferramentas da tabela">
                <button type="button" className={styles.toolBtn}>
                  Colunas
                </button>
                <button type="button" className={styles.toolBtn}>
                  Filtros
                </button>
                <button type="button" className={styles.toolBtn}>
                  Densidade
                </button>
                <button type="button" className={styles.toolBtn}>
                  Exportar
                </button>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Valor</th>
                      <th>Tipo</th>
                      <th className={styles.cellActions}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td>{t.date}</td>
                        <td>{formatBRL(t.value)}</td>
                        <td>
                          <span
                            className={`${styles.typeBadge} ${
                              t.kind === 'entrada' ? styles.typeEntry : styles.typeExit
                            }`}
                          >
                            {t.kind === 'entrada'
                              ? t.status === 'paga'
                                ? 'Entrada paga'
                                : 'Entrada pendente'
                              : t.status === 'paga'
                                ? 'Saída paga'
                                : 'Saída pendente'}
                          </span>
                        </td>
                        <td className={styles.cellActions}>
                          <div className={styles.actionsGroup}>
                            <button
                              type="button"
                              className={styles.actionIconButton}
                              aria-label="Ver detalhes"
                              onClick={() => openDetails(t)}
                            >
                              <FiEye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className={styles.sideCol} aria-label="Ações">
            {sidePanel === 'new' ? (
              <section className={styles.newRegisterCard} aria-label="Novo registro">
                <div className={styles.newRegisterTitle}>Novo registro</div>
                <div className={styles.newRegisterSubtitle}>
                  Selecione se deseja registrar uma nova entrada ou nova saída
                </div>

                <div className={styles.newRegisterButtons}>
                  <button
                    type="button"
                    className={styles.btnEntrada}
                    onClick={() => setSidePanel('entrada')}
                  >
                    Entrada
                  </button>
                  <button type="button" className={styles.btnSaida} onClick={() => setSidePanel('saida')}>
                    Saída
                  </button>
                  <button type="button" className={styles.btnPdf} onClick={() => setSidePanel('pdf')}>
                    Enviar PDF
                  </button>
                </div>
              </section>
            ) : sidePanel === 'entrada' ? (
              <SidePanelShell title="Cadastrar Entrada paga" onClose={resetSidePanel}>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value = Number(entradaForm.value.replace(',', '.'));
                    if (!entradaForm.date || !Number.isFinite(value) || value <= 0) return;
                    addTransaction({
                      kind: 'entrada',
                      status: 'paga',
                      value,
                      date: entradaForm.date,
                      description: entradaForm.description || undefined,
                    });
                    setEntradaForm({ value: '', date: '', description: '', parcelado: false });
                  }}
                >
                  <label className={styles.field}>
                    <span className={styles.label}>
                      Valor <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={entradaForm.value}
                      onChange={(e) => setEntradaForm((p) => ({ ...p, value: e.target.value }))}
                      inputMode="decimal"
                      placeholder="Ex.: 1500"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>
                      Data pagamento <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={entradaForm.date}
                      onChange={(e) => setEntradaForm((p) => ({ ...p, date: e.target.value }))}
                      placeholder="dd/mm/aaaa"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Descrição</span>
                    <input
                      className={styles.input}
                      value={entradaForm.description}
                      onChange={(e) => setEntradaForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Ex.: honorários"
                    />
                  </label>

                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={entradaForm.parcelado}
                      onChange={(e) => setEntradaForm((p) => ({ ...p, parcelado: e.target.checked }))}
                    />
                    <span>Parcelado por mês</span>
                  </label>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.primaryBtn}>
                      Confirmar
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={resetSidePanel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </SidePanelShell>
            ) : sidePanel === 'saida' ? (
              <SidePanelShell title="Cadastrar Saída paga" onClose={resetSidePanel}>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value = Number(saidaForm.value.replace(',', '.'));
                    if (!saidaForm.date || !Number.isFinite(value) || value <= 0) return;
                    addTransaction({
                      kind: 'saida',
                      status: 'paga',
                      value,
                      date: saidaForm.date,
                      description: saidaForm.description || undefined,
                    });
                    setSaidaForm({ value: '', date: '', description: '', recorrencia: false });
                  }}
                >
                  <label className={styles.field}>
                    <span className={styles.label}>
                      Valor <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={saidaForm.value}
                      onChange={(e) => setSaidaForm((p) => ({ ...p, value: e.target.value }))}
                      inputMode="decimal"
                      placeholder="Ex.: 200"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>
                      Data de saída <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={saidaForm.date}
                      onChange={(e) => setSaidaForm((p) => ({ ...p, date: e.target.value }))}
                      placeholder="dd/mm/aaaa"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Descrição</span>
                    <input
                      className={styles.input}
                      value={saidaForm.description}
                      onChange={(e) => setSaidaForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Ex.: custas"
                    />
                  </label>

                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={saidaForm.recorrencia}
                      onChange={(e) => setSaidaForm((p) => ({ ...p, recorrencia: e.target.checked }))}
                    />
                    <span>Recorrência mensal</span>
                  </label>

                  <div className={styles.formActions}>
                    <button type="submit" className={`${styles.primaryBtn} ${styles.primaryBtnExit}`}>
                      Confirmar
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={resetSidePanel}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </SidePanelShell>
            ) : sidePanel === 'pdf' ? (
              <SidePanelShell title="Enviar PDF" onClose={resetSidePanel}>
                <div className={styles.pdfBox}>
                  <label className={styles.pdfLabel}>
                    <span className={styles.label}>Arquivo PDF</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  <div className={styles.pdfHint}>
                    {pdfFile ? `Selecionado: ${pdfFile.name}` : 'Selecione um arquivo para enviar.'}
                  </div>
                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={`${styles.primaryBtn} ${styles.primaryBtnPdf}`}
                      onClick={() => {
                        setPdfFile(null);
                        resetSidePanel();
                      }}
                      disabled={!pdfFile}
                    >
                      <FiUpload size={16} aria-hidden="true" />
                      Enviar
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={resetSidePanel}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </SidePanelShell>
            ) : sidePanel === 'details' && selected ? (
              <SidePanelShell title="Detalhes" onClose={resetSidePanel}>
                <div className={styles.detailsCard}>
                  <div className={styles.detailsType}>
                    {selected.kind === 'entrada'
                      ? selected.status === 'paga'
                        ? 'Entrada paga'
                        : 'Entrada pendente'
                      : selected.status === 'paga'
                        ? 'Saída paga'
                        : 'Saída pendente'}
                  </div>

                  <div className={styles.detailsField}>
                    <div className={styles.detailsLabel}>Valor</div>
                    <div className={styles.detailsValue}>{formatBRL(selected.value)}</div>
                  </div>
                  <div className={styles.detailsField}>
                    <div className={styles.detailsLabel}>Data</div>
                    <div className={styles.detailsValue}>{selected.date}</div>
                  </div>
                  <div className={styles.detailsField}>
                    <div className={styles.detailsLabel}>Descrição</div>
                    <div className={styles.detailsValue}>{selected.description || '—'}</div>
                  </div>
                </div>

                <div className={styles.detailsActions}>
                  <button type="button" className={styles.primaryBtn} onClick={() => setSidePanel('edit')}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className={styles.dangerBtn}
                    onClick={() => removeTransaction(selected.id)}
                  >
                    Excluir
                  </button>
                </div>
              </SidePanelShell>
            ) : sidePanel === 'edit' && selected ? (
              <SidePanelShell title={`Editar ${selected.kind === 'entrada' ? 'in_paid' : 'out_paid'}`} onClose={() => setSidePanel('details')}>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value = Number(String(selected.value).replace(',', '.'));
                    if (!Number.isFinite(value) || value <= 0) return;
                    updateTransaction(selected);
                  }}
                >
                  <label className={styles.field}>
                    <span className={styles.label}>
                      Valor <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={String(selected.value)}
                      onChange={(e) =>
                        setSelected((p) => (p ? { ...p, value: Number(e.target.value.replace(',', '.')) } : p))
                      }
                      inputMode="decimal"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>
                      {selected.kind === 'entrada' ? 'Data pagamento' : 'Data de saída'}{' '}
                      <span className={styles.required}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      value={selected.date}
                      onChange={(e) => setSelected((p) => (p ? { ...p, date: e.target.value } : p))}
                      placeholder="dd/mm/aaaa"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>Descrição</span>
                    <input
                      className={styles.input}
                      value={selected.description ?? ''}
                      onChange={(e) => setSelected((p) => (p ? { ...p, description: e.target.value } : p))}
                    />
                  </label>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.primaryBtn}>
                      Confirmar
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setSidePanel('details')}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </SidePanelShell>
            ) : (
              <section className={styles.newRegisterCard} aria-label="Novo registro">
                <div className={styles.newRegisterTitle}>Novo registro</div>
                <div className={styles.newRegisterSubtitle}>
                  Selecione se deseja registrar uma nova entrada ou nova saída
                </div>

                <div className={styles.newRegisterButtons}>
                  <button type="button" className={styles.btnEntrada} onClick={() => setSidePanel('entrada')}>
                    Entrada
                  </button>
                  <button type="button" className={styles.btnSaida} onClick={() => setSidePanel('saida')}>
                    Saída
                  </button>
                  <button type="button" className={styles.btnPdf} onClick={() => setSidePanel('pdf')}>
                    Enviar PDF
                  </button>
                </div>
              </section>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

