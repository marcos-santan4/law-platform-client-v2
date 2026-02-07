'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiEye, FiPlus, FiSearch } from 'react-icons/fi';

import styles from './styles.module.scss';

type TabKey = 'detalhes' | 'processos' | 'atendimento';

type Client = {
  id: string;
  nome: string;
  cpf?: string;
  status?: string;
  cnpj?: string;
  descricao?: string;
  dataNascimento?: string;
  estadoCivil?: string;
  profissao?: string;
  rg?: string;
  orgaoExpedidor?: string;
  ufDocumento?: string;
  email?: string;
  celular?: string;
  telefoneSecundario?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estadoEndereco?: string;
  complemento?: string;
};

type Props = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
};

export function ViewClientModal({ open, client, onClose }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<TabKey>('detalhes');

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  const processes = useMemo(
    () => [
      { id: 'p1', numero: 'asdd', descricao: 'Sem descrição', criadoEm: '04/02/2026' },
      { id: 'p2', numero: '0005438-75.2025.8.05.0079', descricao: 'Sem descrição', criadoEm: '02/02/2026' },
      { id: 'p3', numero: '123', descricao: '12345', criadoEm: '30/01/2026' },
      { id: 'p4', numero: '0002696-42.2026.4.05.8400', descricao: 'Sem descrição', criadoEm: '28/01/2026' },
    ],
    [],
  );

  if (!open || !client) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <div className={styles.headerCenter}>
            <h2 className={styles.headerTitle} id={titleId}>
              Visualizar cliente
            </h2>
            <div className={styles.headerSubtitle}>{client.nome}</div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'detalhes' ? styles.tabActive : ''}`}
            onClick={() => setTab('detalhes')}
          >
            Detalhes
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'processos' ? styles.tabActive : ''}`}
            onClick={() => setTab('processos')}
          >
            Processos
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'atendimento' ? styles.tabActive : ''}`}
            onClick={() => setTab('atendimento')}
          >
            Atendimento
          </button>
        </div>

        <div className={styles.body}>
          {tab === 'detalhes' ? (
            <div className={styles.sectionStack}>
              <section className={styles.section}>
                <div className={styles.sectionTitle}>Dados pessoais</div>

                <div className={styles.grid3}>
                  <div className={`${styles.field} ${styles.colSpan2}`}>
                    <label className={styles.label}>Nome</label>
                    <input className={styles.input} value={client.nome ?? ''} disabled />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>CPF</label>
                    <input className={styles.input} value={client.cpf ?? ''} disabled />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>CNPJ</label>
                    <input className={styles.input} value={client.cnpj ?? ''} disabled />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Descrição</label>
                  <textarea className={styles.textarea} value={client.descricao ?? ''} disabled />
                </div>

                <div className={styles.grid3}>
                  <div className={styles.field}>
                    <label className={styles.label}>Data Nascimento</label>
                    <input className={styles.input} value={client.dataNascimento ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Estado civil</label>
                    <input className={styles.input} value={client.estadoCivil ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Profissão</label>
                    <input className={styles.input} value={client.profissao ?? ''} disabled />
                  </div>
                </div>

                <div className={styles.grid3}>
                  <div className={styles.field}>
                    <label className={styles.label}>RG</label>
                    <input className={styles.input} value={client.rg ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Órgão Emissor</label>
                    <input className={styles.input} value={client.orgaoExpedidor ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>UF</label>
                    <input className={styles.input} value={client.ufDocumento ?? ''} disabled />
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionTitle}>Contato</div>

                <div className={styles.grid3}>
                  <div className={`${styles.field} ${styles.colSpan2}`}>
                    <label className={styles.label}>E-mail</label>
                    <input className={styles.input} value={client.email ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Celular</label>
                    <input className={styles.input} value={client.celular ?? ''} disabled />
                  </div>
                </div>

                <div className={styles.grid3}>
                  <div className={styles.field}>
                    <label className={styles.label}>Telefone Secundário</label>
                    <input className={styles.input} value={client.telefoneSecundario ?? ''} disabled />
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionTitle}>Endereço</div>

                <div className={styles.grid4}>
                  <div className={styles.field}>
                    <label className={styles.label}>CEP</label>
                    <input className={styles.input} value={client.cep ?? ''} disabled />
                  </div>
                  <div className={`${styles.field} ${styles.colSpan2}`}>
                    <label className={styles.label}>Rua</label>
                    <input className={styles.input} value={client.rua ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Número</label>
                    <input className={styles.input} value={client.numero ?? ''} disabled />
                  </div>
                </div>

                <div className={styles.grid4}>
                  <div className={styles.field}>
                    <label className={styles.label}>Bairro</label>
                    <input className={styles.input} value={client.bairro ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Cidade</label>
                    <input className={styles.input} value={client.cidade ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Estado</label>
                    <input className={styles.input} value={client.estadoEndereco ?? ''} disabled />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Complemento</label>
                    <input className={styles.input} value={client.complemento ?? ''} disabled />
                  </div>
                </div>
              </section>
            </div>
          ) : null}

          {tab === 'processos' ? (
            <section className={styles.section}>
              <div className={styles.sectionTopRow}>
                <div className={styles.search} role="search">
                  <FiSearch size={16} aria-hidden="true" />
                  <input placeholder="Buscar por Número do Processo" />
                </div>

                <button className={styles.primaryButton} type="button">
                  <span>Cadastrar Novo Processo</span>
                  <FiPlus size={18} aria-hidden="true" className={styles.primaryButtonIcon} />
                </button>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Número do Processo</th>
                      <th>Descrição</th>
                      <th>Criado em</th>
                      <th className={styles.cellCenter}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map((p) => (
                      <tr key={p.id}>
                        <td>{p.numero}</td>
                        <td>{p.descricao}</td>
                        <td>{p.criadoEm}</td>
                        <td className={styles.cellCenter}>
                          <button type="button" className={styles.iconButton} aria-label="Visualizar processo">
                            <FiEye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className={styles.tableFooter}>
                  <span>1–{processes.length} de {processes.length}</span>
                  <div className={styles.pager}>
                    <button type="button" className={styles.pagerBtn} disabled aria-label="Anterior">
                      ‹
                    </button>
                    <button type="button" className={styles.pagerBtn} disabled aria-label="Próximo">
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {tab === 'atendimento' ? (
            <section className={styles.section}>
              <div className={styles.sectionTopRow}>
                <div className={styles.search} role="search">
                  <FiSearch size={16} aria-hidden="true" />
                  <input placeholder="Buscar por código ou título" />
                </div>

                <button className={styles.primaryButton} type="button">
                  <span>Novo Atendimento</span>
                  <FiPlus size={18} aria-hidden="true" className={styles.primaryButtonIcon} />
                </button>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Código</th>
                      <th>Atualizado em</th>
                      <th className={styles.cellCenter}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <div className={styles.emptyState}>Sem dados</div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className={styles.tableFooter}>
                  <span>0–0 de 0</span>
                  <div className={styles.pager}>
                    <button type="button" className={styles.pagerBtn} disabled aria-label="Anterior">
                      ‹
                    </button>
                    <button type="button" className={styles.pagerBtn} disabled aria-label="Próximo">
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}


