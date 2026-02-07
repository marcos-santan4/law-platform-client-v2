'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaRegCalendar } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

import { DropdownSelect } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  processoOptions: string[];
  advogadoOptions: string[];
  defaultProcesso: string;
};

export function AddAudienciaModal({ open, onClose, processoOptions, advogadoOptions, defaultProcesso }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  const [processo, setProcesso] = useState(defaultProcesso);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [advogado, setAdvogado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [link, setLink] = useState('');
  const [importante, setImportante] = useState(false);

  const processoSelectOptions = useMemo(() => processoOptions.map((p) => ({ value: p, label: p })), [processoOptions]);
  const advogadoSelectOptions = useMemo(() => advogadoOptions.map((a) => ({ value: a, label: a })), [advogadoOptions]);

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
            Adicionar audiência
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
          <div className={styles.field}>
            <label className={styles.label}>
              Processo <span className={styles.required}>*</span>
            </label>
            <DropdownSelect
              value={processo}
              onChange={setProcesso}
              options={processoSelectOptions}
              menuAriaLabel="Processo"
            />
          </div>

          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Data</label>
              <div className={styles.inputIconWrap}>
                <input
                  ref={dateInputRef}
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="dd/mm/aaaa"
                />
                <button
                  type="button"
                  className={styles.inputIconButton}
                  aria-label="Selecionar data"
                  onClick={() => {
                    const el = dateInputRef.current;
                    if (!el) return;
                    const dateEl = el as HTMLInputElement & { showPicker?: () => void };
                    dateEl.showPicker?.();
                    el.focus();
                  }}
                >
                  <FaRegCalendar size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Hora</label>
              <div className={styles.inputIconWrap}>
                <input
                  ref={timeInputRef}
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.inputIconButton}
                  aria-label="Selecionar hora"
                  onClick={() => {
                    const el = timeInputRef.current;
                    if (!el) return;
                    const timeEl = el as HTMLInputElement & { showPicker?: () => void };
                    timeEl.showPicker?.();
                    el.focus();
                  }}
                >
                  <FiClock size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Advogado responsável</label>
              <DropdownSelect
                value={advogado}
                onChange={setAdvogado}
                options={advogadoSelectOptions}
                placeholder="Selecione"
                menuAriaLabel="Advogado responsável"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descrição</label>
            <textarea className={styles.textarea} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Local</label>
              <input
                className={styles.input}
                placeholder="Endereço da audiência (opcional)"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Link</label>
              <input
                className={styles.input}
                placeholder="URL da audiência (opcional)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <label className={styles.checkboxRow}>
            <input type="checkbox" checked={importante} onChange={(e) => setImportante(e.target.checked)} />
            <span>Marcar como importante</span>
          </label>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className={styles.primaryButton} onClick={onClose}>
            SALVAR
          </button>
        </footer>
      </div>
    </div>
  );
}


