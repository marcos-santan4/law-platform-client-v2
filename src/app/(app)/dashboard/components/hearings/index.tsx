'use client';

import { useMemo } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import styles from './styles.module.scss';

export type HearingItem = {
  id: string;
  tipo: string;
  processo: string;
  data: string;
  advogado: string;
  concluido: boolean;
};

type Props = {
  audiencias: HearingItem[];
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

function getStatusCor(item: HearingItem): StatusCor {
  if (item.concluido) return 'concluido';

  const dataAudiencia = parseDataBrasileira(item.data);
  if (!dataAudiencia) return 'normal';

  const agora = new Date();
  const diffMs = dataAudiencia.getTime() - agora.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias < 0) return 'atrasado'; // Atrasado
  if (diffDias <= 3) return 'proximo'; // Próximo (3 dias ou menos)
  return 'normal';
}

export function Audiencias({ audiencias }: Props) {
  const audienciasComStatus = useMemo(
    () => audiencias.map((a) => ({ ...a, statusCor: getStatusCor(a) })),
    [audiencias],
  );

  return (
    <>
      <div className={styles.panelHeaderRow}>
        <h2 className={styles.panelTitle}>Audiências</h2>
      </div>
      <div className={styles.listaAudiencias}>
        {audienciasComStatus.length === 0 ? (
          <div className={styles.emptyState}>Nenhuma audiência pendente.</div>
        ) : (
          audienciasComStatus.map((item) => (
            <div key={item.id} className={styles.audienciaItem}>
              <FiBell
                size={18}
                className={`${styles.audienciaIcon} ${styles[`audienciaIcon${item.statusCor.charAt(0).toUpperCase() + item.statusCor.slice(1)}`]}`}
                aria-hidden
              />
              <div className={styles.audienciaContent}>
                <div className={styles.audienciaTitulo}>
                  {item.tipo} - Processo {item.processo}
                </div>
                <div
                  className={`${styles.audienciaMeta} ${styles[`audienciaMeta${item.statusCor.charAt(0).toUpperCase() + item.statusCor.slice(1)}`]}`}
                >
                  {item.data} · {item.advogado}
                </div>
              </div>
              {item.concluido && (
                <div className={styles.audienciaCheck} aria-hidden>
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
