'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { FiEye, FiPlus, FiSearch, FiUsers, FiUserPlus } from 'react-icons/fi';
import { TbUserShield } from 'react-icons/tb';
import { LuListFilter } from 'react-icons/lu';
import styles from './styles.module.scss';
import { CreateClientModal } from './components/createClientModal';
import { ViewClientModal } from './components/viewClientModal';

type FilterOption = 'Todos' | 'Ativo' | 'Inativo';
type ClientStatus = 'Ativo' | 'Inativo';

type Client = {
  id: string;
  nome: string;
  cpf?: string;
  status: ClientStatus;
  // Dados pessoais (extras para o modal)
  cnpj?: string;
  descricao?: string;
  dataNascimento?: string;
  estadoCivil?: string;
  profissao?: string;
  rg?: string;
  orgaoExpedidor?: string;
  ufDocumento?: string;
  // Contato
  email?: string;
  celular?: string;
  telefoneSecundario?: string;
  // Endereço
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estadoEndereco?: string;
  complemento?: string;
};

export default function ClientesPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('Todos');
  const filterRef = useRef<HTMLDivElement>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }

    if (!filterOpen) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const filterOptions: FilterOption[] = ['Todos', 'Ativo', 'Inativo'];

  const clients: Client[] = useMemo(
    () => [
      {
        id: '1',
        nome: 'Testerct (#1)',
        cpf: '',
        status: 'Ativo',
        cnpj: '',
        descricao: '',
        dataNascimento: '',
        estadoCivil: '',
        profissao: '',
        rg: '',
        orgaoExpedidor: '',
        ufDocumento: '',
        email: '',
        celular: '',
        telefoneSecundario: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estadoEndereco: '',
        complemento: '',
      },
      {
        id: '2',
        nome: 'Larissa Cardoso (#1)',
        cpf: '920.129.000-46',
        status: 'Ativo',
        cnpj: '',
        descricao: '',
      },
      {
        id: '3',
        nome: 'João da Silva Santos',
        cpf: '576.994.670-94',
        status: 'Inativo',
        cnpj: '',
        descricao: '',
      },
    ],
    [],
  );

  return (
    <div>
      {/* <div className={styles.cards}>
        <div className={styles.card}>
          <FiUsers size={22} aria-hidden="true" />
          <div className={styles.cardValue}>22</div>
          <div className={styles.cardLabel}>Total de clientes</div>
        </div>
        <div className={styles.card}>
          <TbUserShield size={22} aria-hidden="true" />
          <div className={styles.cardValue}>11</div>
          <div className={styles.cardLabel}>Clientes com processos atuais</div>
        </div>
        <div className={styles.card}>
          <FiUserPlus size={22} aria-hidden="true" />
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardLabel}>Novos clientes</div>
        </div>
      </div> */}

      <section className={styles.contentPanel} aria-label="Lista de clientes">
        <div className={styles.filtersRow}>
          <div className={styles.searchAndFilter}>
            <div className={styles.search} role="search">
              <FiSearch size={16} aria-hidden="true" />
              <input placeholder="Buscar por nome ou CPF" />
            </div>

            <div className={styles.filterInline}>
              <span className={styles.filterInlineLabel}>Filtrar:</span>

              <div className={styles.filterWrapper} ref={filterRef}>
                <button
                  className={styles.filterButton}
                  type="button"
                  onClick={() => setFilterOpen((v) => !v)}
                  aria-expanded={filterOpen}
                  aria-haspopup="menu"
                >
                  <LuListFilter size={16} className={styles.filterIcon} aria-hidden="true" />
                  <span className={styles.filterValue}>{selectedFilter}</span>
                </button>

                {filterOpen && (
                  <div className={styles.filterDropdown} role="menu" aria-label="Opções de filtro">
                    {filterOptions.map((option) => (
                      <button
                        key={option}
                        className={`${styles.filterOption} ${selectedFilter === option ? styles.filterOptionActive : ''}`}
                        type="button"
                        role="menuitemradio"
                        aria-checked={selectedFilter === option}
                        onClick={() => {
                          setSelectedFilter(option);
                          setFilterOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            className={styles.primaryAction}
            type="button"
            onClick={() => setCreateOpen(true)}
          >
            <FiPlus size={18} aria-hidden="true" className={styles.primaryActionIcon} />
            <span>Cadastrar</span>
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome completo</th>
                <th>CPF</th>
                <th className={styles.cellActions}>Status</th>
                <th className={styles.cellActions}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.cpf ? c.cpf : '—'}</td>
                  <td className={styles.cellActions}>
                    <span
                      className={`${styles.status} ${c.status === 'Inativo' ? styles.statusInactive : ''}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className={styles.cellActions}>
                    <div className={styles.actionsGroup}>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label={`Visualizar ${c.nome}`}
                        onClick={() => {
                          setSelectedClient(c);
                          setViewOpen(true);
                        }}
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

      <CreateClientModal open={createOpen} onClose={() => setCreateOpen(false)} />
      {viewOpen ? (
        <ViewClientModal
          open={viewOpen}
          client={selectedClient}
          onClose={() => setViewOpen(false)}
        />
      ) : null}
    </div>
  );
}
