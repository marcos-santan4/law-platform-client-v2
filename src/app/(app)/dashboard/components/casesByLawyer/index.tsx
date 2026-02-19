'use client';

import { ImTrophy } from 'react-icons/im';
import { IoMdArrowRoundDown } from 'react-icons/io';
import styles from './styles.module.scss';

export type AdvogadoRanking = {
  nome: string;
  email: string;
  processos: number;
  posicao: number;
};

type Props = {
  advogados: AdvogadoRanking[];
};

export function ProcessosPorAdvogado({ advogados }: Props) {
  return (
    <>
      <h2 className={styles.panelTitle}>Processos por Advogado</h2>
      {advogados.length === 0 ? (
        <div className={styles.emptyState}>Nenhum advogado com processos.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>ADVOGADO</th>
                <th>TOTAL DE PROCESSOS</th>
              </tr>
            </thead>
            <tbody>
              {advogados.map((adv) => (
                <tr key={adv.email}>
                  <td>{adv.posicao}º Lugar</td>
                  <td>
                    <div className={styles.advInfo}>
                      <span className={styles.advNameRow}>
                        {adv.posicao === 1 && (
                          <ImTrophy size={18} className={styles.trofeu} aria-hidden />
                        )}
                        {adv.posicao === 2 && (
                          <IoMdArrowRoundDown
                            size={18}
                            className={styles.setaVermelha}
                            aria-hidden
                          />
                        )}
                        {adv.nome}
                      </span>
                      <span className={styles.advEmail}>{adv.email}</span>
                    </div>
                  </td>
                  <td>{adv.processos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
