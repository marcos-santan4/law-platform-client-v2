'use client';

import { MdCake } from 'react-icons/md';
import styles from './styles.module.scss';

export type Aniversariante = {
  id: string;
  nome: string;
};

type Props = {
  aniversariantes: Aniversariante[];
};

export function AniversariantesDia({ aniversariantes }: Props) {
  return (
    <>
      <h2 className={styles.panelTitleWithIcon}>
        <MdCake size={20} aria-hidden />
        Aniversariantes do dia
      </h2>
      {aniversariantes.length === 0 ? (
        <div className={styles.emptyState}>Nenhum cliente faz aniversário hoje.</div>
      ) : (
        <ul className={styles.lista} aria-label="Aniversariantes do dia">
          {aniversariantes.map((a) => (
            <li key={a.id} className={styles.item}>
              {a.nome}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
