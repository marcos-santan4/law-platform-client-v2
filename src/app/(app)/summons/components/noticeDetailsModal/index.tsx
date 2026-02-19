'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiExternalLink } from 'react-icons/fi';

import type { Intimacao } from '../noticeCard';
import { AddPrazoModal } from '../deadlineModal';
import { AddAudienciaModal } from '../hearingModal';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  item: Intimacao | null;
  onClose: () => void;
};

export function IntimacaoDetailsModal({ open, item, onClose }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [prazoOpen, setPrazoOpen] = useState(false);
  const [audienciaOpen, setAudienciaOpen] = useState(false);

  const processoOptions = useMemo(
    () =>
      [
        `${item?.numeroProcesso ?? ''} - ${item?.cliente ?? ''}`.trim(),
        '0002696-42.2026.4.05.8400 - Larissa Cardoso',
      ].filter(Boolean),
    [item?.cliente, item?.numeroProcesso],
  );

  const advogadoOptions = useMemo(
    () => [
      'Luiza Medeiros de Jesus',
      'Laura Levine Saraiva Muller de Azevedo',
      'Marcos Dev Santana',
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function closeAll() {
      setPrazoOpen(false);
      setAudienciaOpen(false);
      onClose();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAll();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  if (!open || !item) return null;

  function closeAll() {
    setPrazoOpen(false);
    setAudienciaOpen(false);
    onClose();
  }

  return (
    <>
      <div
        className={styles.backdrop}
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAll();
        }}
      >
        <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <header className={styles.header}>
            <h2 className={styles.headerTitle} id={titleId}>
              Detalhes da Intimação
            </h2>

            <button
              ref={closeBtnRef}
              type="button"
              className={styles.iconClose}
              onClick={closeAll}
              aria-label="Fechar"
            >
              <IoMdClose size={18} />
            </button>
          </header>

          <div className={styles.body}>
            <div className={styles.twoCol}>
              <section className={styles.section}>
                <div className={styles.sectionTitle}>Informações Gerais</div>

                <div className={styles.kv}>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Tribunal</div>
                    <div className={styles.kValue}>{item.tribunalSigla}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Tipo de Comunicação</div>
                    <div className={styles.kValue}>{item.tipoComunicacao}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Número do Processo</div>
                    <div className={styles.kValue}>
                      {item.numeroProcesso.replaceAll('.', '').replaceAll('-', '')}
                    </div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Data de Disponibilização</div>
                    <div className={styles.kValue}>{item.dataDisponibilizacao}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Órgão</div>
                    <div className={styles.kValue}>{item.orgao}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Link da Intimação</div>
                    <button type="button" className={styles.linkBtn}>
                      <span>{item.linkIntimacaoLabel}</span>
                      <FiExternalLink size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionTitle}>Dados Processuais</div>

                <div className={styles.kv}>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Classe Processual</div>
                    <div className={styles.kValue}>{item.classeProcessual}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Código da Classe</div>
                    <div className={styles.kValue}>{item.codigoClasse}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Tipo de Documento</div>
                    <div className={styles.kValue}>{item.tipoDocumento}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Meio Completo</div>
                    <div className={styles.kValue}>{item.meioCompleto}</div>
                  </div>
                  <div className={styles.k}>
                    <div className={styles.kLabel}>Número da Comunicação</div>
                    <div className={styles.kValue}>{item.numeroComunicacao}</div>
                  </div>
                </div>
              </section>
            </div>

            <section className={styles.section}>
              <div className={styles.sectionTitle}>Texto da Intimação</div>
              <div className={styles.textBox}>{item.textoIntimacao}</div>

              <div className={styles.inlineButtons}>
                <button
                  type="button"
                  className={styles.outlineBtn}
                  onClick={() => setPrazoOpen(true)}
                >
                  Adicionar Prazo
                </button>
                <button
                  type="button"
                  className={styles.outlineBtn}
                  onClick={() => setAudienciaOpen(true)}
                >
                  Adicionar Audiência
                </button>
              </div>
            </section>

            <div className={styles.twoCol}>
              <section className={styles.section}>
                <div className={styles.sectionTitle}>Destinatários</div>
                <div className={styles.cardList}>
                  {item.destinatarios.map((d) => (
                    <div key={d.nome} className={styles.miniCard}>
                      <div className={styles.miniTitle}>{d.nome}</div>
                      {d.polo ? <div className={styles.miniMeta}>Polo: {d.polo}</div> : null}
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionTitle}>Advogados</div>
                <div className={styles.cardList}>
                  {item.advogadosLista.map((a) => (
                    <div key={a.nome} className={styles.miniCard}>
                      <div className={styles.miniTitle}>{a.nome}</div>
                      {a.oab ? <div className={styles.miniMeta}>OAB: {a.oab}</div> : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <footer className={styles.footer}>
            <button type="button" className={styles.closeButton} onClick={onClose}>
              Fechar
            </button>
          </footer>
        </div>
      </div>

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
    </>
  );
}
