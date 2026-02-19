'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { GoLaw } from 'react-icons/go';

import { AddDataMenu } from './components/addDataMenu';
import { MissingCourtsModal, type MissingCourtItem } from './components/missingCourtsModal';
import { AddMovementModal } from './components/addMovementModal';
import { AddCoverFieldModal } from './components/addCoverFieldModal';
import { AddPartyModal } from './components/addPartyModal';
import { AddDocumentModal } from './components/addDocumentModal';
import styles from './styles.module.scss';

type AiCourtItem = {
  id: string;
  label: string;
};

type MenuAction = 'movement' | 'coverField' | 'party' | 'document';

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const caseId = params?.id ?? '';

  const [missingCourtsOpen, setMissingCourtsOpen] = useState(false);
  const [movementOpen, setMovementOpen] = useState(false);
  const [coverFieldOpen, setCoverFieldOpen] = useState(false);
  const [partyOpen, setPartyOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  const aiCourts = useMemo<AiCourtItem[]>(
    () => [
      { id: 'tjba-principal', label: 'TJBA - PRINCIPAL' },
      { id: 'tjba-principal-2', label: 'TJBA - PRINCIPAL' },
      { id: 'tjba-recursal', label: 'TJBA - RECURSAL' },
    ],
    [],
  );

  const missingCourts = useMemo<MissingCourtItem[]>(
    () => [
      {
        id: 'stf',
        title: 'Supremo Tribunal Federal',
        subtitle: 'Tribunais Superiores • Consulta de Processos Unificada',
      },
      {
        id: 'tst',
        title: 'Tribunal Superior do Trabalho',
        subtitle: 'PJe da Justiça do Trabalho v3 • Consulta de Processos Unificada',
      },
      {
        id: 'tst-2',
        title: 'Tribunal Superior do Trabalho',
        subtitle: 'Tribunais Superiores • Consulta de Processos Unificada',
      },
      {
        id: 'tjba',
        title: 'Tribunal de Justiça da Bahia',
        subtitle: 'PJe do Justiça Estadual • Consulta de Processos de 2º Grau',
      },
      {
        id: 'stj',
        title: 'Superior Tribunal de Justiça',
        subtitle: 'Tribunais Superiores • Consulta de Processos Unificada',
      },
      {
        id: 'trf1',
        title: 'Tribunal Regional Federal da 1ª Região',
        subtitle: 'Justiça Federal • Consulta de Processos Unificada',
      },
    ],
    [],
  );

  const openAction = (action: MenuAction) => {
    if (action === 'movement') setMovementOpen(true);
    if (action === 'coverField') setCoverFieldOpen(true);
    if (action === 'party') setPartyOpen(true);
    if (action === 'document') setDocumentOpen(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <button type="button" className={styles.backButton} onClick={() => router.back()}>
          <FiArrowLeft size={18} aria-hidden="true" />
          <span>Voltar</span>
        </button>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.heroTitleRow}>
            <div className={styles.heroTitle}>Leticia</div>
            <span className={styles.heroStatus}>Ativo</span>
          </div>
          <div className={styles.heroMeta}>
            Nº do processo: <span className={styles.heroMetaStrong}>0503687-06.2016.8.05.0113</span>
          </div>
          <div className={styles.heroMeta}>Time: Nenhum advogado cadastrado ao processo.</div>
          <div className={styles.heroMetaMuted}>Nenhuma tag associada ao processo</div>
          <div className={styles.heroMetaMuted}>Última atualização: 12/02/2026, 05:45:05</div>
        </div>

        <div className={styles.heroAside}>
          <div className={styles.asideTitleRow}>
            <div className={styles.asideTitle}>Prazos e audiências</div>
            <button type="button" className={styles.asideAddButton} aria-label="Adicionar">
              <FiPlus size={18} />
            </button>
          </div>
        </div>
      </div>

      <nav className={styles.tabs} aria-label="Tópicos do processo">
        {[
          'Processo',
          'Resumo por IA',
          'Tarefas',
          'Intimações',
          'Documentos e Anotações',
          'Financeiro',
          'Auditoria',
        ].map((t) => (
          <button key={t} type="button" className={t === 'Processo' ? styles.tabActive : styles.tab}>
            {t}
          </button>
        ))}
      </nav>

      <div className={styles.grid}>
        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardTitle}>Monitoramento do processo</div>
          </header>

          <div className={styles.cardSubTitle}>DADOS ENCONTRADOS PELA IA ({aiCourts.length})</div>

          <div className={styles.list}>
            {aiCourts.map((it) => (
              <div key={it.id} className={styles.listRow}>
                <div className={styles.listLeft}>
                  <span className={styles.listIcon} aria-hidden="true">
                    <GoLaw size={18} />
                  </span>
                  <span className={styles.listLabel}>{it.label}</span>
                </div>
                <button type="button" className={styles.viewButton}>
                  Ver
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.missingButton}
            onClick={() => setMissingCourtsOpen(true)}
          >
            TRIBUNAIS SEM RESULTADO ({missingCourts.length})
          </button>
        </section>

        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardTitle}>Cadastro Manual</div>
          </header>

          <div className={styles.manualBody}>
            <AddDataMenu
              variant="primary"
              label="+ Adicionar Dados"
              onSelect={(action) => openAction(action)}
            />

            <button type="button" className={styles.manualEmptyAction}>
              <span className={styles.manualEmptyPlus} aria-hidden="true">
                +
              </span>
              <span>Adicionar Dados</span>
            </button>
          </div>
        </section>
      </div>

      <MissingCourtsModal
        open={missingCourtsOpen}
        onClose={() => setMissingCourtsOpen(false)}
        items={missingCourts}
        onSelect={(action) => {
          setMissingCourtsOpen(false);
          openAction(action);
        }}
      />

      <AddMovementModal open={movementOpen} onClose={() => setMovementOpen(false)} caseId={caseId} />
      <AddCoverFieldModal
        open={coverFieldOpen}
        onClose={() => setCoverFieldOpen(false)}
        caseId={caseId}
      />
      <AddPartyModal open={partyOpen} onClose={() => setPartyOpen(false)} caseId={caseId} />
      <AddDocumentModal open={documentOpen} onClose={() => setDocumentOpen(false)} caseId={caseId} />
    </div>
  );
}

