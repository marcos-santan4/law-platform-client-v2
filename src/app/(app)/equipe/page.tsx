'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { FiEye, FiPlus, FiSearch, FiUsers, FiUserPlus, FiTrash } from 'react-icons/fi';
import { RiRotateLockFill } from 'react-icons/ri';
// import { TbUserShield } from 'react-icons/tb';
import { LuListFilter } from 'react-icons/lu';
import styles from './styles.module.scss';
import { EditTeamMemberModal } from './components/editTeamMemberModal';

type FilterOption = 'Todos' | 'Ativo' | 'Inativo';
type TeamMemberStatus = 'Ativo' | 'Inativo';

type TeamMember = {
  id: string;
  nome: string;
  cargo?: string;
  status: TeamMemberStatus;
  email?: string;
  telefone?: string;
  oab?: string;
};

export default function EquipePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('Todos');
  const filterRef = useRef<HTMLDivElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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

  const teamMembers: TeamMember[] = useMemo(
    () => [
      {
        id: '1',
        nome: 'Patricia Ribeiro',
        cargo: '',
        status: 'Ativo',
        email: 'ribeiro.espec@gmail.com',
        telefone: '(31) 99394-7855',
        oab: '000000-AAA',
      },
      {
        id: '2',
        nome: 'Emmanuel Suporte',
        cargo: '',
        status: 'Inativo',
        email: 'emmanuel@example.com',
        telefone: '(11) 98765-4321',
        oab: '',
      },
      {
        id: '3',
        nome: 'Marcos Dev Santana',
        cargo: '',
        status: 'Ativo',
        email: 'marcos@example.com',
        telefone: '(21) 99876-5432',
        oab: '',
      },
      {
        id: '4',
        nome: 'caroline vargas',
        cargo: 'Administrador',
        status: 'Ativo',
        email: 'caroline@example.com',
        telefone: '(11) 91234-5678',
        oab: '',
      },
      {
        id: '5',
        nome: 'lotaria comercial',
        cargo: 'Administrador',
        status: 'Ativo',
        email: 'lotaria@example.com',
        telefone: '(11) 92345-6789',
        oab: '',
      },
      {
        id: '6',
        nome: 'Emerson Admin',
        cargo: 'Administrador',
        status: 'Ativo',
        email: 'emerson@example.com',
        telefone: '(11) 93456-7890',
        oab: '',
      },
      {
        id: '7',
        nome: 'Larissa Mendes',
        cargo: 'Administrador',
        status: 'Ativo',
        email: 'larissa@example.com',
        telefone: '(11) 94567-8901',
        oab: '',
      },
      {
        id: '8',
        nome: 'Henrique ADMIN',
        cargo: 'Administrador',
        status: 'Ativo',
        email: 'henrique@example.com',
        telefone: '(11) 95678-9012',
        oab: '',
      },
    ],
    [],
  );

  const filteredMembers = useMemo(() => {
    if (selectedFilter === 'Todos') return teamMembers;
    return teamMembers.filter((member) => member.status === selectedFilter);
  }, [teamMembers, selectedFilter]);

  return (
    <div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <FiUsers size={22} aria-hidden="true" />
          <div className={styles.cardValue}>{teamMembers.length}</div>
          <div className={styles.cardLabel}>Equipes cadastradas</div>
        </div>
        <div className={styles.card}>
          <FiUserPlus size={22} aria-hidden="true" />
          <div className={styles.cardValue}>
            {teamMembers.filter((m) => m.status === 'Ativo').length}
          </div>
          <div className={styles.cardLabel}>Equipes ativas</div>
        </div>
      </div>

      <section className={styles.contentPanel} aria-label="Lista de equipe">
        <div className={styles.filtersRow}>
          <div className={styles.searchAndFilter}>
            <div className={styles.search} role="search">
              <FiSearch size={16} aria-hidden="true" />
              <input placeholder="Buscar por nome" />
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

          <button className={styles.primaryAction} type="button">
            <FiPlus size={18} aria-hidden="true" className={styles.primaryActionIcon} />
            <span>Cadastrar</span>
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome completo</th>
                <th>Cargo</th>
                <th className={styles.cellCenter}>Status</th>
                <th className={styles.cellCenter}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.nome}</td>
                  <td>{member.cargo || '—'}</td>
                  <td className={styles.cellCenter}>
                    <span
                      className={`${styles.status} ${member.status === 'Inativo' ? styles.statusInactive : ''}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className={styles.cellCenter}>
                    <div className={styles.actionButtons}>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label={`Visualizar ${member.nome}`}
                        onClick={() => {
                          setSelectedMember(member);
                          setEditOpen(true);
                        }}
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label={`Resetar senha de ${member.nome}`}
                        title="Resetar senha"
                      >
                        <RiRotateLockFill size={18} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionIconButton}
                        aria-label={`Excluir ${member.nome}`}
                        title="Excluir"
                      >
                        <FiTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <EditTeamMemberModal
        open={editOpen}
        member={selectedMember}
        onClose={() => {
          setEditOpen(false);
          setSelectedMember(null);
        }}
      />
    </div>
  );
}
