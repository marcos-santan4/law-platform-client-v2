'use client';

import { FaGavel, FaRegCalendar } from 'react-icons/fa';
import { FiCheck, FiClipboard, FiExternalLink, FiEye, FiMoreVertical, FiSearch } from 'react-icons/fi';
import { TbSparkles } from 'react-icons/tb';

import { DropdownMenu } from '../../../components/dropdownMenu';
import styles from './styles.module.scss';

export type Intimacao = {
  id: string;
  tribunalSigla: string;
  destinatario: string;
  descricao: string;
  dataDisponibilizacao: string;
  numeroProcesso: string;
  cliente: string;
  pasta: string;
  advogados: string;
  statusLabel: string;
  // dados extras do modal
  tipoComunicacao: string;
  orgao: string;
  linkIntimacaoLabel: string;
  classeProcessual: string;
  codigoClasse: string;
  tipoDocumento: string;
  meioCompleto: string;
  numeroComunicacao: string;
  textoIntimacao: string;
  destinatarios: { nome: string; polo?: string }[];
  advogadosLista: { nome: string; oab?: string }[];
};

type Props = {
  item: Intimacao;
  onViewDetails: (item: Intimacao) => void;
  onMarkConcluida?: (item: Intimacao) => void;
  onAddPrazo: (item: Intimacao) => void;
  onAddAudiencia: (item: Intimacao) => void;
  onAddTarefa: (item: Intimacao) => void;
  showMarkConcluida?: boolean;
  showMaisOpcoes?: boolean;
};

export function IntimacaoCard({
  item,
  onViewDetails,
  onMarkConcluida,
  onAddPrazo,
  onAddAudiencia,
  onAddTarefa,
  showMarkConcluida = true,
  showMaisOpcoes = true,
}: Props) {
  const canConcluir = Boolean(onMarkConcluida) && showMarkConcluida;

  return (
    <article className={styles.itemCard}>
      <div className={styles.itemMain}>
        <div className={styles.itemRow}>
          {/* 1) Ícone */}
          <div className={styles.iconCol}>
            <div className={styles.avatar} aria-hidden="true">
              <FiEye size={16} />
            </div>
          </div>

          {/* 2) Informações */}
          <div className={styles.itemContent}>
            <div className={styles.itemTopGrid}>
              <div>
                <div className={styles.kicker}>Tribunal</div>
                <div className={styles.valueStrong}>{item.tribunalSigla}</div>
              </div>

              <div>
                <div className={styles.kicker}>Destinatários</div>
                <div className={styles.valueStrong}>{item.destinatario}</div>
              </div>

              <div>
                <div className={styles.kicker}>Descrição</div>
                <div className={styles.value}>{item.descricao}</div>
              </div>
            </div>

            <div className={styles.itemBottomGrid}>
              <div>
                <div className={styles.kicker}>Data de Disponibilização</div>
                <div className={styles.valueStrong}>{item.dataDisponibilizacao}</div>
              </div>
              <div>
                <div className={styles.kicker}>Número do processo</div>
                <div className={styles.valueStrong}>{item.numeroProcesso}</div>
                <span className={styles.pill}>{item.statusLabel}</span>
                <div className={styles.meta}>
                  <div>
                    Cliente: <strong className={styles.metaStrong}>{item.cliente}</strong>
                  </div>
                  <div>
                    Pasta: <strong>{item.pasta}</strong>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.kicker}>Advogados</div>
                <div className={styles.valueStrong}>{item.advogados}</div>
              </div>
            </div>
          </div>

          {/* 3) Botões */}
          <div className={styles.actionsCol}>
            <button type="button" className={styles.btnPrimary} onClick={() => onViewDetails(item)}>
              <FiEye size={18} aria-hidden="true" />
              <span>Ver Detalhes</span>
            </button>
            {canConcluir ? (
              <button type="button" className={styles.btnSuccess} onClick={() => onMarkConcluida?.(item)}>
                <FiCheck size={18} aria-hidden="true" />
                <span>Marcar Concluída</span>
              </button>
            ) : null}
            <button type="button" className={styles.btnOutlinePurple}>
              <FiSearch size={18} aria-hidden="true" />
              <span>Ver Processo</span>
            </button>
            <button type="button" className={styles.btnOutline}>
              <FiExternalLink size={18} aria-hidden="true" />
              <span>Nova Aba</span>
            </button>
            {showMaisOpcoes ? (
              <DropdownMenu
                menuAriaLabel="Mais opções"
                items={[
                  {
                    key: 'prazo',
                    label: 'Adicionar Prazo',
                    icon: <FaRegCalendar size={16} aria-hidden="true" />,
                    onClick: () => onAddPrazo(item),
                  },
                  {
                    key: 'audiencia',
                    label: 'Adicionar Audiência',
                    icon: <FaGavel size={16} aria-hidden="true" />,
                    onClick: () => onAddAudiencia(item),
                  },
                  {
                    key: 'tarefa',
                    label: 'Adicionar Tarefa',
                    icon: <FiClipboard size={16} aria-hidden="true" />,
                    onClick: () => onAddTarefa(item),
                  },
                ]}
                trigger={({ ref, toggle }) => (
                  <button ref={ref} type="button" className={styles.btnOutline} onClick={toggle}>
                    <FiMoreVertical size={18} aria-hidden="true" />
                    <span>Mais Opções</span>
                  </button>
                )}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.aiRow}>
        <button type="button" className={styles.aiButton}>
          <TbSparkles size={18} aria-hidden="true" />
          <span>Interpretar com IA</span>
        </button>
        <div className={styles.aiHint}>
          Clique e otimize seu tempo — a IA destaca o que realmente importa na intimação.
        </div>
      </div>
    </article>
  );
}


