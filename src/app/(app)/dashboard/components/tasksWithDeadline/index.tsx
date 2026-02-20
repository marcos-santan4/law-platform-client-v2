'use client';

import { useMemo } from 'react';
import { FiCheckSquare, FiCheck } from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import styles from './styles.module.scss';

export type TaskWithDeadlineItem = {
  id: string;
  titulo: string;
  data: string;
  responsavel: string;
  concluido: boolean;
};

type Props = {
  tarefas: TaskWithDeadlineItem[];
};

type StatusCor = 'atrasado' | 'proximo' | 'normal' | 'concluido';

function parseDataBrasileira(dataStr: string): Date | null {
  // Formato esperado: "05 de fev. de 2026 - 16:00" ou "29 de jan. de 2026"
  try {
    const meses: { [key: string]: string } = {
      jan: '01',
      fev: '02',
      mar: '03',
      abr: '04',
      mai: '05',
      jun: '06',
      jul: '07',
      ago: '08',
      set: '09',
      out: '10',
      nov: '11',
      dez: '12',
    };

    const partes = dataStr.split(' - ');
    const dataParte = partes[0];
    const horaParte = partes[1] || '00:00';

    const match = dataParte.match(/(\d{1,2})\s+de\s+(\w+)\.?\s+de\s+(\d{4})/);
    if (!match) return null;

    const [, dia, mesAbrev, ano] = match;
    const mes = meses[mesAbrev.toLowerCase()];
    if (!mes) return null;

    const [hora, minuto] = horaParte.split(':');
    const dataISO = `${ano}-${mes}-${dia.padStart(2, '0')}T${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}:00`;
    return new Date(dataISO);
  } catch {
    return null;
  }
}

function getStatusCor(item: TaskWithDeadlineItem): StatusCor {
  if (item.concluido) return 'concluido';

  const dataTarefa = parseDataBrasileira(item.data);
  if (!dataTarefa) return 'normal';

  const agora = new Date();
  const diffMs = dataTarefa.getTime() - agora.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias < 0) return 'atrasado'; // Atrasado
  if (diffDias <= 3) return 'proximo'; // Próximo (3 dias ou menos)
  return 'normal';
}

export function TarefasComPrazo({ tarefas }: Props) {
  const tarefasComStatus = useMemo(
    () => tarefas.map((t) => ({ ...t, statusCor: getStatusCor(t) })),
    [tarefas],
  );

  return (
    <>
      <div className={styles.panelHeaderRow}>
        <h2 className={styles.panelTitle}>Tarefas com prazo</h2>
      </div>
      <div className={styles.listaTarefas}>
        {tarefasComStatus.length === 0 ? (
          <div className={styles.emptyState}>Nenhuma tarefa com prazo pendente.</div>
        ) : (
          tarefasComStatus.map((item) => (
            <div key={item.id} className={styles.tarefaItem}>
              <FiCheckSquare
                size={18}
                className={`${styles.tarefaIcon} ${styles[`tarefaIcon${item.statusCor.charAt(0).toUpperCase() + item.statusCor.slice(1)}`]}`}
                aria-hidden
              />
              <div className={styles.tarefaContent}>
                <div className={styles.tarefaTitulo}>{item.titulo}</div>
                <div
                  className={`${styles.tarefaMeta} ${styles[`tarefaMeta${item.statusCor.charAt(0).toUpperCase() + item.statusCor.slice(1)}`]}`}
                >
                  {item.data} · {item.responsavel}
                </div>
              </div>
              {item.concluido && (
                <div className={styles.tarefaCheck} aria-hidden>
                  <FiCheck size={18} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
