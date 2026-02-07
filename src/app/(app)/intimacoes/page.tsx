'use client';

import { useMemo, useState } from 'react';

import styles from './styles.module.scss';
import type { Intimacao } from './components/intimacaoCard';
import { IntimacaoDetailsModal } from './components/intimacaoDetailsModal';
import { AddAudienciaModal } from './components/audienciaModal';
import { AddPrazoModal } from './components/prazoModal';
import { AddTarefaModal } from './components/addTarefaModal';
import { IntimacoesTab } from './tabs/intimacoes';
import { FinalizadasTab } from './tabs/finalizadas';
import { ConfiguracoesTab } from './tabs/configuracoes';
import { AuditoriaTab } from './tabs/auditoria';

type TabKey = 'intimacoes' | 'finalizadas' | 'configuracoes' | 'auditoria';

export default function IntimacoesPage() {
  const [tab, setTab] = useState<TabKey>('intimacoes');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIntimacao, setSelectedIntimacao] = useState<Intimacao | null>(null);
  const [prazoOpen, setPrazoOpen] = useState(false);
  const [audienciaOpen, setAudienciaOpen] = useState(false);
  const [tarefaOpen, setTarefaOpen] = useState(false);
  const [actionItem, setActionItem] = useState<Intimacao | null>(null);

  const advogadoOptions = useMemo(
    () => ['Luiza Medeiros de Jesus', 'Laura Levine Saraiva Muller de Azevedo', 'Marcos Dev Santana'],
    [],
  );

  const processoOptions = useMemo(() => {
    if (!actionItem) return [];
    return [`${actionItem.numeroProcesso} - ${actionItem.cliente}`.trim()].filter(Boolean);
  }, [actionItem]);

  const initialIntimacoes: Intimacao[] = useMemo(
    () => [
      {
        id: 'i1',
        tribunalSigla: 'TJBA',
        destinatario: 'LUIZA MEDEIROS DE JESUS',
        descricao:
          'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido e...',
        dataDisponibilizacao: '06/02/2026',
        numeroProcesso: '0017701-37.2025.8.05.0113',
        cliente: 'Testaet',
        pasta: '6',
        advogados: 'LUIZA MEDEIROS DE JESUS (76937-BA) +1',
        statusLabel: 'Encontrado',
        tipoComunicacao: 'Intimação',
        orgao: '3ª Vara do Sistema dos Juizados - ITABUNA (MAT)',
        linkIntimacaoLabel: 'Abrir no PJe',
        classeProcessual: 'CUMPRIMENTO DE SENTENÇA',
        codigoClasse: '156',
        tipoDocumento: 'Intimação - Diário',
        meioCompleto: 'Diário de Justiça Eletrônico Nacional',
        numeroComunicacao: '8602',
        textoIntimacao:
          'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido em (04/02/2026 11:12:08): Ato ordinatório praticado Descrição: Intimar parte autora da petição do evento 47, prazo de 05 dias.',
        destinatarios: [{ nome: 'LUIZA MEDEIROS DE JESUS', polo: 'A' }],
        advogadosLista: [
          { nome: 'LUIZA MEDEIROS DE JESUS', oab: '76937-BA' },
          { nome: 'LAURA LEVINE SARAIVA MULLER DE AZEVEDO', oab: '77517-BA' },
        ],
      },
      {
        id: 'i2',
        tribunalSigla: 'TJBA',
        destinatario: 'MELISSA CRUZ DOS SANTOS',
        descricao:
          'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido e...',
        dataDisponibilizacao: '06/02/2026',
        numeroProcesso: '0017701-37.2025.8.05.0113',
        cliente: 'Testaet',
        pasta: '6',
        advogados: 'LUIZA MEDEIROS DE JESUS (76937-BA) +1',
        statusLabel: 'Encontrado',
        tipoComunicacao: 'Intimação',
        orgao: '3ª Vara do Sistema dos Juizados - ITABUNA (MAT)',
        linkIntimacaoLabel: 'Abrir no PJe',
        classeProcessual: 'CUMPRIMENTO DE SENTENÇA',
        codigoClasse: '156',
        tipoDocumento: 'Intimação - Diário',
        meioCompleto: 'Diário de Justiça Eletrônico Nacional',
        numeroComunicacao: '8602',
        textoIntimacao:
          'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido em (04/02/2026 11:12:08): Ato ordinatório praticado Descrição: Intimar parte autora da petição do evento 47, prazo de 05 dias.',
        destinatarios: [{ nome: 'LUIZA MEDEIROS DE JESUS', polo: 'A' }],
        advogadosLista: [
          { nome: 'LUIZA MEDEIROS DE JESUS', oab: '76937-BA' },
          { nome: 'LAURA LEVINE SARAIVA MULLER DE AZEVEDO', oab: '77517-BA' },
        ],
      },
    ],
    [],
  );

  const initialFinalizadas: Intimacao[] = useMemo(
    () => [
      {
        id: 'f1',
        tribunalSigla: 'TJBA',
        destinatario: 'PEDRO TELES LEITE',
        descricao: 'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido e...',
        dataDisponibilizacao: '28/01/2026',
        numeroProcesso: '0007354-42.2025.8.05.0113',
        cliente: '—',
        pasta: '—',
        advogados: 'LUIZA MEDEIROS DE JESUS (76937-BA)',
        statusLabel: 'Não cadastrado',
        tipoComunicacao: 'Intimação',
        orgao: '—',
        linkIntimacaoLabel: 'Abrir no PJe',
        classeProcessual: '—',
        codigoClasse: '—',
        tipoDocumento: '—',
        meioCompleto: '—',
        numeroComunicacao: '—',
        textoIntimacao: '—',
        destinatarios: [{ nome: 'PEDRO TELES LEITE' }],
        advogadosLista: [{ nome: 'LUIZA MEDEIROS DE JESUS', oab: '76937-BA' }],
      },
      {
        id: 'f2',
        tribunalSigla: 'TJBA',
        destinatario: 'EMILLY OLIVEIRA SANTOS',
        descricao: 'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento processual ocorrido e...',
        dataDisponibilizacao: '26/11/2025',
        numeroProcesso: '0011014-74.2025.8.05.0103',
        cliente: '—',
        pasta: '—',
        advogados: 'LUIZA MEDEIROS DE JESUS (76937-BA)',
        statusLabel: 'Encontrado',
        tipoComunicacao: 'Intimação',
        orgao: '—',
        linkIntimacaoLabel: 'Abrir no PJe',
        classeProcessual: '—',
        codigoClasse: '—',
        tipoDocumento: '—',
        meioCompleto: '—',
        numeroComunicacao: '—',
        textoIntimacao: '—',
        destinatarios: [{ nome: 'EMILLY OLIVEIRA SANTOS' }],
        advogadosLista: [{ nome: 'LUIZA MEDEIROS DE JESUS', oab: '76937-BA' }],
      },
    ],
    [],
  );

  const [intimacoes, setIntimacoes] = useState<Intimacao[]>(() => initialIntimacoes);
  const [finalizadas, setFinalizadas] = useState<Intimacao[]>(() => initialFinalizadas);

  function markConcluida(item: Intimacao) {
    setIntimacoes((prev) => prev.filter((x) => x.id !== item.id));
    setFinalizadas((prev) => [item, ...prev]);
  }

  const panelTitle =
    tab === 'intimacoes'
      ? 'Todas Intimações'
      : tab === 'finalizadas'
        ? 'Intimações Finalizadas'
        : tab === 'configuracoes'
          ? 'Gestão de Monitoramento de OABs'
          : 'Histórico de Visualizações';

  return (
    <div className={styles.page}>
      <div className={styles.topTabsRow}>
        <div className={styles.tabs} role="tablist" aria-label="Seções de intimações">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'intimacoes'}
            className={`${styles.tab} ${tab === 'intimacoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('intimacoes')}
          >
            <span>Intimações</span>
            <span className={styles.tabBadge}>{intimacoes.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'finalizadas'}
            className={`${styles.tab} ${tab === 'finalizadas' ? styles.tabActive : ''}`}
            onClick={() => setTab('finalizadas')}
          >
            Finalizados
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'configuracoes'}
            className={`${styles.tab} ${tab === 'configuracoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('configuracoes')}
          >
            Configurações
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'auditoria'}
            className={`${styles.tab} ${tab === 'auditoria' ? styles.tabActive : ''}`}
            onClick={() => setTab('auditoria')}
          >
            Auditoria
          </button>
        </div>

      </div>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>{panelTitle}</h2>
          <div className={styles.credits}>Créditos: 235</div>
        </div>

        {tab === 'intimacoes' ? (
          <IntimacoesTab
            intimacoes={intimacoes}
            onViewDetails={(it) => {
              setSelectedIntimacao(it);
              setDetailsOpen(true);
            }}
            onMarkConcluida={markConcluida}
            onAddPrazo={(it) => {
              setActionItem(it);
              setPrazoOpen(true);
            }}
            onAddAudiencia={(it) => {
              setActionItem(it);
              setAudienciaOpen(true);
            }}
            onAddTarefa={(it) => {
              setActionItem(it);
              setTarefaOpen(true);
            }}
          />
        ) : tab === 'finalizadas' ? (
          <FinalizadasTab
            finalizadas={finalizadas}
            onViewDetails={(it) => {
              setSelectedIntimacao(it);
              setDetailsOpen(true);
            }}
          />
        ) : tab === 'configuracoes' ? (
          <ConfiguracoesTab />
        ) : (
          <AuditoriaTab />
        )}
      </section>

      <IntimacaoDetailsModal
        open={detailsOpen}
        item={selectedIntimacao}
        onClose={() => setDetailsOpen(false)}
      />

      {prazoOpen ? (
        <AddPrazoModal
          open={prazoOpen}
          onClose={() => setPrazoOpen(false)}
          processoOptions={processoOptions}
          advogadoOptions={advogadoOptions}
          defaultProcesso={processoOptions[0] ?? ''}
        />
      ) : null}
      {audienciaOpen ? (
        <AddAudienciaModal
          open={audienciaOpen}
          onClose={() => setAudienciaOpen(false)}
          processoOptions={processoOptions}
          advogadoOptions={advogadoOptions}
          defaultProcesso={processoOptions[0] ?? ''}
        />
      ) : null}

      {tarefaOpen ? (
        <AddTarefaModal
          open={tarefaOpen}
          onClose={() => setTarefaOpen(false)}
          onContinue={() => {
            // próximo passo do fluxo (criar tarefa) fica para a próxima tela/feature
            setTarefaOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}


