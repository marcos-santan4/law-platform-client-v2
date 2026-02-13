'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi';
import { MdLabel } from 'react-icons/md';

import { DropdownSelect, type DropdownOption } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormProcesso = {
  nomeCliente: string;
  tipo: string;
  numeroProcesso: string;
  codigoPasta: string;
  advogados: string;
  descricao: string;
};

const TIPO_OPTIONS: DropdownOption[] = [
  { value: 'processo', label: 'Processo' },
  { value: 'caso', label: 'Caso' },
];

const ADVOGADOS_OPTIONS: DropdownOption[] = [
  { value: '', label: 'Selecione um advogado' },
  { value: 'emmanuel', label: 'Emmanuel Suporte' },
  { value: 'henrique', label: 'Henrique ADMIN' },
  { value: 'emerson', label: 'Emerson' },
  { value: 'larissa', label: 'Larissa' },
];

const EMPTY_FORM: FormProcesso = {
  nomeCliente: '',
  tipo: 'processo',
  numeroProcesso: '',
  codigoPasta: '',
  advogados: '',
  descricao: '',
};

export function CadastrarProcessoModal({ open, onClose }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [form, setForm] = useState<FormProcesso>(EMPTY_FORM);

  const closeAndReset = useCallback(() => {
    setForm(EMPTY_FORM);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAndReset();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeAndReset, open]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAndReset();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle} id={titleId}>
            Cadastrar processo
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={closeAndReset}
            aria-label="Fechar"
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.twoCols}>
            <div className={styles.colLeft}>
              <div className={styles.clientePrompt}>
                <span>Cliente ainda não existe?</span>
                <button type="button" className={styles.linkButton}>
                  <FiPlus size={16} className={styles.linkButtonIcon} aria-hidden />
                  Cadastrar
                </button>
              </div>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Cliente</h3>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Nome <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWithDropdown}>
                    <input
                      className={styles.input}
                      value={form.nomeCliente}
                      onChange={(e) => setForm((p) => ({ ...p, nomeCliente: e.target.value }))}
                      placeholder="Buscar cliente..."
                    />
                    <span className={styles.inputDropdownIcon} aria-hidden>
                      ▼
                    </span>
                  </div>
                </div>
                <button type="button" className={styles.addButton}>
                  <FiPlus size={16} className={styles.addButtonIcon} aria-hidden />
                  Adicionar Cliente
                </button>
              </section>

              <div className={styles.field}>
                <label className={styles.label}>Tipo</label>
                <DropdownSelect
                  value={form.tipo}
                  onChange={(v) => setForm((p) => ({ ...p, tipo: v }))}
                  options={TIPO_OPTIONS}
                  menuAriaLabel="Tipo de processo"
                />
              </div>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Dados do processo</h3>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Número do Processo <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    value={form.numeroProcesso}
                    onChange={(e) => setForm((p) => ({ ...p, numeroProcesso: e.target.value }))}
                    placeholder="Ex: 0000123-45.2024.1.01.0001"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Código da Pasta</label>
                  <input
                    className={styles.input}
                    value={form.codigoPasta}
                    onChange={(e) => setForm((p) => ({ ...p, codigoPasta: e.target.value }))}
                    placeholder="Será gerado automaticamente"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Identificação ou descrição do processo</label>
                  <textarea
                    className={styles.textarea}
                    value={form.descricao}
                    onChange={(e) => setForm((p) => ({ ...p, descricao: e.target.value }))}
                    placeholder="Ex: Ação de cobrança de dívida trabalhista"
                    rows={3}
                  />
                </div>
              </section>
            </div>

            <div className={styles.colRight}>
              <div className={styles.field}>
                <label className={styles.label}>Advogados do processo</label>
                <DropdownSelect
                  value={form.advogados}
                  onChange={(v) => setForm((p) => ({ ...p, advogados: v }))}
                  options={ADVOGADOS_OPTIONS}
                  placeholder="Selecione um advogado"
                  menuAriaLabel="Advogados"
                />
              </div>

              <div className={styles.tagsArea}>
                <MdLabel size={18} className={styles.tagsIcon} aria-hidden />
                <div className={styles.tagsContent}>
                  <span className={styles.tagsLabel}>Gerenciar tags</span>
                  <span className={styles.tagsValue}>Nenhuma tag selecionada</span>
                </div>
              </div>

              <div className={styles.infoBox}>
                <strong>Apenas processos CNJ podem ser monitorados</strong>
                <p>
                  Para monitorar automaticamente, o número do processo deve estar no formato CNJ.
                </p>
                <p className={styles.infoExample}>
                  Formato exemplo: 0000123-45.2024.1.01.0001
                </p>
              </div>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Anexar Documentos</h3>
                  <button type="button" className={styles.addButton}>
                    <FiPlus size={16} className={styles.addButtonIcon} aria-hidden />
                    Anexar
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={closeAndReset}>
            Voltar
          </button>
          <button type="button" className={styles.primaryButton}>
            Cadastrar
          </button>
        </footer>
      </div>
    </div>
  );
}
