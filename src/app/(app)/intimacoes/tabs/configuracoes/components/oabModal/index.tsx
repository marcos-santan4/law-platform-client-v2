'use client';

import { useId, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import styles from './styles.module.scss';

type Props = {
  mode: 'add' | 'edit';
  initialOab?: string;
  initialNotes?: string;
  onClose: () => void;
  onSave: (data: { oab: string; notes: string }) => void;
};

export function OabModal({ mode, initialOab = '', initialNotes = '', onClose, onSave }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [oab, setOab] = useState(initialOab);
  const [notes, setNotes] = useState(initialNotes);

  const title =
    mode === 'edit' ? `Editar OAB - ${initialOab || oab || ''}`.trim() : 'Adicionar OAB ao Monitoramento';
  const primaryLabel = mode === 'edit' ? 'Salvar' : 'Adicionar';
  const notesLabel = mode === 'edit' ? 'Notas' : 'Notas (opcional)';

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle} id={titleId}>
            {title}
          </h2>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={onClose}
            aria-label="Fechar"
            autoFocus
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>OAB</label>
            <input className={styles.input} value={oab} onChange={(e) => setOab(e.target.value)} placeholder="" />
            <div className={styles.helperText}>
              Informe a OAB no formato XXXXX-XX (5 alfanuméricos + hífen + 2 letras UF)
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{notesLabel}</label>
            <textarea className={styles.textarea} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => onSave({ oab: oab.trim(), notes: notes.trim() })}
            disabled={!oab.trim()}
          >
            {primaryLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}


