'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { DropdownSelect } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: (workspaceId: string) => void;
};

export function AddTarefaModal({ open, onClose, onContinue }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [workspace, setWorkspace] = useState('');

  const workspaceOptions = useMemo(
    () => [
      { value: 'workspace', label: 'Workspace' },
      { value: 'desenvolvimento', label: 'Desenvolvimento' },
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

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
            Escolher Workspace
          </h2>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.field}>
              <label className={styles.label}>Workspace</label>
              <DropdownSelect
                value={workspace}
                onChange={setWorkspace}
                options={workspaceOptions}
                placeholder="Selecione um workspace"
                menuAriaLabel="Workspace"
                maxMenuHeight={220}
              />
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              disabled={!workspace}
              onClick={() => onContinue(workspace)}
            >
              Continuar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}


