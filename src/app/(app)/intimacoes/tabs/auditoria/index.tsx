'use client';

import { useMemo } from 'react';

import styles from './styles.module.scss';

type AuditRow = { id: string; nome: string; email: string; processo: string; descricao: string; data: string };

export function AuditoriaTab() {
  const auditRows: AuditRow[] = useMemo(
    () => [
      {
        id: 'a1',
        nome: 'Marcos Dev',
        email: 'ssmarcossantana@gmail.com',
        processo: '0017701-37.2025.8.05.0113',
        descricao: 'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento...',
        data: '06/02/2026',
      },
      {
        id: 'a2',
        nome: 'Emmanuel',
        email: 'emmanuel@mindlaw.com.br',
        processo: '0018401-13.2025.8.05.0113',
        descricao: 'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento...',
        data: '30/01/2026',
      },
      {
        id: 'a3',
        nome: 'Henrique',
        email: 'serra.henrique3@gmail.com',
        processo: '0021004-07.2025.8.05.0001',
        descricao: 'Fica(m) a(s) Parte(s), por seu(s) Advogado(s), intimada(s) do evento...',
        data: '28/11/2025',
      },
      {
        id: 'a4',
        nome: 'Henrique',
        email: 'serra.henrique3@gmail.com',
        processo: '8002130-60.2020.8.05.0113',
        descricao: 'PODER JUDICIÁRIO TRIBUNAL DE JUSTIÇA DO ESTADO DA BAHIA...',
        data: '28/11/2025',
      },
    ],
    [],
  );

  return (
    <div className={styles.auditList}>
      {auditRows.map((row) => (
        <div key={row.id} className={styles.auditCard}>
          <div className={styles.auditGrid}>
            <div className={styles.auditCol}>
              <div className={styles.auditLabel}>Nome</div>
              <div className={styles.auditValue}>{row.nome}</div>

              <div className={styles.auditLabel}>
                E-mail
              </div>
              <div className={styles.auditValue}>{row.email}</div>

              <div className={styles.auditLabel}>
                Processo
              </div>
              <div className={styles.auditValue}>{row.processo}</div>
            </div>

            <div className={styles.auditCol}>
              <div className={styles.auditLabel}>Descrição</div>
              <div className={styles.auditValue}>{row.descricao}</div>
            </div>

            <div className={styles.auditColRight}>
              <div className={styles.auditLabel}>Data de Visualização</div>
              <div className={styles.auditValue}>{row.data}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


