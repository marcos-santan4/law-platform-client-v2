'use client';

import { useMemo, useState } from 'react';
import { FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2, FiFolder, FiActivity } from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import { SummaryCard } from '../components/summaryCard';
import { DropdownSelect, type DropdownOption } from '../components/dropdownSelect';
import { CadastrarProcessoModal } from './components/registerCaseModal';
import styles from './styles.module.scss';

const ETIQUETAS_OPTIONS: DropdownOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'processo_trabalhista', label: 'Processo trabalhista' },
  { value: 'meu_escritorio', label: 'Meu escritório' },
];

const STATUS_OPTIONS: DropdownOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'arquivados', label: 'Arquivados' },
  { value: 'ativos', label: 'Ativos' },
];

const CASO_PROCESSO_OPTIONS: DropdownOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'processo', label: 'Processo' },
  { value: 'caso', label: 'Caso' },
];

const RESPONSAVEIS_MOCK: DropdownOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'aline', label: 'Aline' },
  { value: 'patricia', label: 'Patricia' },
  { value: 'emmanuel', label: 'Emmanuel' },
  { value: 'marcos', label: 'Marcos Dev' },
  { value: 'caroline', label: 'caroline' },
  { value: 'emerson', label: 'Emerson' },
  { value: 'henrique', label: 'Henrique' },
];

type Processo = {
  id: string;
  numero: string;
  badge?: number;
  cliente: string;
  cpf?: string;
  etiquetas: string;
  etiquetaTag?: string;
  responsaveis: string;
  responsavelTag?: string;
  monitora: 'Automático' | 'Manual';
};

const PROCESSOS_MOCK: Processo[] = [
  {
    id: '1',
    numero: '0503687-06.2016.8.05.0113',
    badge: 8,
    cliente: 'Leticia',
    cpf: '502.248.720-95',
    etiquetas: 'Nenhuma tag',
    responsaveis: 'Nenhum advogado',
    monitora: 'Automático',
  },
  {
    id: '2',
    numero: '0000426-75.2025.8.05.0113',
    badge: 7,
    cliente: 'Testaet',
    etiquetas: 'Nenhuma tag',
    responsaveis: 'Nenhum advogado',
    monitora: 'Automático',
  },
  {
    id: '3',
    numero: '0017701-37.2025.8.05.0113',
    badge: 6,
    cliente: 'Testaet',
    etiquetas: 'teste',
    etiquetaTag: 'teste',
    responsaveis: 'Emmanuel Suporte',
    responsavelTag: 'emmanuel',
    monitora: 'Manual',
  },
  {
    id: '4',
    numero: 'asdd',
    badge: 5,
    cliente: 'Testaet',
    etiquetas: 'Nenhuma tag',
    responsaveis: 'Henrique ADMIN',
    responsavelTag: 'henrique',
    monitora: 'Manual',
  },
  {
    id: '5',
    numero: '0005438-75.2025.8.05.0079',
    badge: 4,
    cliente: 'Testaet',
    etiquetas: 'Nenhuma tag',
    responsaveis: 'Nenhum advogado',
    monitora: 'Manual',
  },
];

export default function CasosPage() {
  const [cadastrarOpen, setCadastrarOpen] = useState(false);
  const [etiquetas, setEtiquetas] = useState('todos');
  const [responsaveis, setResponsaveis] = useState('todos');
  const [status, setStatus] = useState('ativos');
  const [casoProcesso, setCasoProcesso] = useState('todos');

  const responsaveisOptions = useMemo(() => RESPONSAVEIS_MOCK, []);

  return (
    <div className={styles.casos}>
      <div className={styles.cardsRow}>
        <SummaryCard
          variant="single"
          title="TOTAL DA BUSCA"
          icon={<FiSearch size={24} />}
          iconBgColor="blue"
          cardBg="gray"
          value="34"
        />
        <SummaryCard
          variant="double"
          title="PROCESSOS E CASOS"
          icon={<FiFolder size={24} />}
          iconBgColor="blue"
          cardBg="white"
          items={[
            { label: 'PROCESSOS', value: '33' },
            { label: 'CASOS', value: '1' },
          ]}
        />
        <SummaryCard
          variant="triple"
          title="MONITORAMENTO"
          icon={<FiActivity size={24} />}
          iconBgColor="yellow"
          cardBg="cream"
          items={[
            { label: 'MONITORADO', value: '15' },
            { label: 'PROCESSANDO', value: '0' },
            { label: 'MANUAL', value: '19' },
          ]}
        />
      </div>

      <section className={styles.contentPanel} aria-label="Lista de casos e processos">
        <div className={styles.filtersRow}>
          <div className={styles.search} role="search">
            <FiSearch size={16} aria-hidden="true" />
            <input placeholder="Buscar por Número do Processo, c..." />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Etiquetas</span>
              <DropdownSelect
                value={etiquetas}
                onChange={setEtiquetas}
                options={ETIQUETAS_OPTIONS}
                menuAriaLabel="Filtrar por etiquetas"
              />
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Responsáveis</span>
              <DropdownSelect
                value={responsaveis}
                onChange={setResponsaveis}
                options={responsaveisOptions}
                menuAriaLabel="Filtrar por responsáveis"
              />
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Status</span>
              <DropdownSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                menuAriaLabel="Filtrar por status"
              />
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Caso/Processo</span>
              <DropdownSelect
                value={casoProcesso}
                onChange={setCasoProcesso}
                options={CASO_PROCESSO_OPTIONS}
                menuAriaLabel="Filtrar por tipo"
              />
            </div>
          </div>

          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => setCadastrarOpen(true)}
          >
            <FiPlus size={18} aria-hidden="true" className={styles.primaryButtonIcon} />
            <span>Cadastrar</span>
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Número do Processo / Pasta / Cliente / CPF</th>
                <th>Etiquetas</th>
                <th>Responsáveis</th>
                <th>Monitoramento</th>
                <th className={styles.cellActions}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {PROCESSOS_MOCK.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.celNumero}>
                      <span className={styles.celNumeroPart}>
                        {p.numero}
                        {p.badge != null && (
                          <span className={styles.badge} aria-label={`${p.badge} movimentações`}>
                            {p.badge}
                          </span>
                        )}
                      </span>
                      <span className={styles.celCliente}>
                        {p.cliente}
                        {p.cpf ? ` ${p.cpf}` : ''}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={p.etiquetaTag ? styles.tag : styles.tagEmpty}>
                      {p.etiquetas}
                    </span>
                  </td>
                  <td>
                    <span className={p.responsavelTag ? styles.tagResponsavel : styles.tagEmpty}>
                      {p.responsaveis}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        p.monitora === 'Automático' ? styles.monitorAuto : styles.monitorManual
                      }
                    >
                      {p.monitora}
                    </span>
                  </td>
                  <td className={styles.cellActions}>
                    <div className={styles.actionsGroup}>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label="Visualizar"
                      >
                        <FiEye size={18} />
                      </button>
                      <button type="button" className={styles.actionIconButton} aria-label="Editar">
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label="Excluir"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <span>
            1–{PROCESSOS_MOCK.length} de {PROCESSOS_MOCK.length}
          </span>
          <div className={styles.pager}>
            <button type="button" className={styles.pagerBtn} disabled aria-label="Anterior">
              ‹
            </button>
            <button type="button" className={styles.pagerBtn} disabled aria-label="Próximo">
              ›
            </button>
          </div>
        </div>
      </section>

      <CadastrarProcessoModal open={cadastrarOpen} onClose={() => setCadastrarOpen(false)} />

      <button type="button" className={styles.fabHelp} aria-label="Ajuda">
        <MdHelpOutline size={24} />
      </button>
    </div>
  );
}
