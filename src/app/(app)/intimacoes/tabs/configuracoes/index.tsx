'use client';

import { useState } from 'react';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

import { OabModal } from './components/oabModal';
import styles from './styles.module.scss';

type OabRow = { id: string; oab: string; users: number; active: boolean; notes?: string };

export function ConfiguracoesTab() {
  const [oabsMonitoradas, setOabsMonitoradas] = useState<OabRow[]>([
    { id: 'o1', oab: '06835--MS', users: 0, active: true, notes: 'Anna Paula' },
    { id: 'o2', oab: '76937--BA', users: 1, active: true, notes: 'Luiza' },
  ]);
  const [oabsDisponiveis, setOabsDisponiveis] = useState<{ id: string; oab: string; users: number }[]>([
    { id: 'od1', oab: 'SERRAH-OM', users: 1 },
  ]);

  const [modal, setModal] = useState<
    | { mode: 'add'; initialOab?: string; fromAvailableId?: string; fromAvailableUsers?: number }
    | { mode: 'edit'; rowId: string }
    | null
  >(null);

  const editingRow = modal?.mode === 'edit' ? oabsMonitoradas.find((r) => r.id === modal.rowId) ?? null : null;

  return (
    <>
      <div className={styles.configIntro}>
        <p className={styles.configSubtitle}>
          Gerencie quais OABs devem ser monitoradas para receber intimações. Apenas OABs ativas serão utilizadas na busca e sincronização de
          intimações.
        </p>
        <button type="button" className={styles.btnAddOab} onClick={() => setModal({ mode: 'add' })}>
          Adicionar OAB <span aria-hidden="true">+</span>
        </button>
      </div>

      <div className={styles.configWrap}>
        <section className={styles.configSection}>
          <div className={styles.configSectionHeader}>
            <div className={styles.configSectionTitle}>OABs Monitoradas ({oabsMonitoradas.length})</div>
          </div>

          <div className={styles.table}>
            <div className={`${styles.tr} ${styles.th}`}>
              <div>OAB</div>
              <div className={styles.center}>
                <FiUsers size={16} aria-hidden="true" /> Usuários
              </div>
              <div className={styles.center}>Status</div>
              <div>Notas</div>
              <div className={styles.right}>Ações</div>
            </div>

            {oabsMonitoradas.map((row) => (
              <div key={row.id} className={styles.tr}>
                <div className={styles.oabCell}>{row.oab}</div>
                <div className={styles.center}>
                  <span className={styles.userBadge}>
                    <FiUsers size={14} aria-hidden="true" /> {row.users}
                  </span>
                </div>
                <div className={styles.center}>
                  <button
                    type="button"
                    className={`${styles.switch} ${row.active ? styles.switchOn : ''}`}
                    onClick={() => setOabsMonitoradas((prev) => prev.map((p) => (p.id === row.id ? { ...p, active: !p.active } : p)))}
                    aria-label={row.active ? 'Desativar' : 'Ativar'}
                  >
                    <span className={styles.switchKnob} />
                  </button>
                  <span className={`${styles.statusPill} ${row.active ? styles.statusOn : styles.statusOff}`}>
                    {row.active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                <div className={styles.notesCell}>{row.notes ?? ''}</div>
                <div className={styles.right}>
                  <button
                    type="button"
                    className={styles.iconAction}
                    onClick={() => setModal({ mode: 'edit', rowId: row.id })}
                    aria-label="Editar OAB e notas"
                    title="Editar OAB e notas"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.iconAction} ${styles.iconDanger}`}
                    onClick={() => setOabsMonitoradas((prev) => prev.filter((p) => p.id !== row.id))}
                    aria-label="Excluir"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.configSection}>
          <div className={styles.configSectionHeaderAlt}>
            <div className={styles.configSectionTitleAlt}>OABs Disponíveis (Não Monitoradas) ({oabsDisponiveis.length})</div>
          </div>

          <div className={styles.tableAlt}>
            <div className={`${styles.trAlt} ${styles.thAlt}`}>
              <div>OAB</div>
              <div className={styles.center}>
                <FiUsers size={16} aria-hidden="true" /> Usuários
              </div>
              <div className={styles.right}>Ações</div>
            </div>

            {oabsDisponiveis.map((row) => (
              <div key={row.id} className={styles.trAlt}>
                <div className={styles.oabCell}>{row.oab}</div>
                <div className={styles.center}>
                  <span className={styles.userBadge}>
                    <FiUsers size={14} aria-hidden="true" /> {row.users}
                  </span>
                </div>
                <div className={styles.right}>
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={() => setModal({ mode: 'add', initialOab: row.oab, fromAvailableId: row.id, fromAvailableUsers: row.users })}
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {modal ? (
        <OabModal
          key={
            modal.mode === 'edit'
              ? `edit-${modal.rowId}`
              : `add-${modal.fromAvailableId ?? 'new'}-${modal.initialOab ?? ''}`
          }
          mode={modal.mode}
          initialOab={modal.mode === 'edit' ? editingRow?.oab ?? '' : modal.initialOab ?? ''}
          initialNotes={editingRow?.notes ?? ''}
          onClose={() => setModal(null)}
          onSave={({ oab, notes }) => {
            if (modal.mode === 'add') {
              const id = `o-${Date.now()}`;
              const users = modal.fromAvailableUsers ?? 0;
              setOabsMonitoradas((prev) => [...prev, { id, oab, users, active: true, notes }]);
              if (modal.fromAvailableId) {
                setOabsDisponiveis((prev) => prev.filter((x) => x.id !== modal.fromAvailableId));
              }
              setModal(null);
              return;
            }

            if (modal.mode !== 'edit') return;
            setOabsMonitoradas((prev) =>
              prev.map((r) => (r.id === modal.rowId ? { ...r, oab: oab || r.oab, notes } : r)),
            );
            setModal(null);
          }}
        />
      ) : null}
    </>
  );
}


