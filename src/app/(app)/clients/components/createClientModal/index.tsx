'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { FaRegCalendar } from 'react-icons/fa';

import { Modal } from '../../../components/modal';
import { DropdownSelect } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Step = 0 | 1 | 2;

type ClientForm = {
  // Dados pessoais
  nome: string;
  cpf: string;
  cnpj: string;
  descricao: string;
  dataNascimento: string;
  estadoCivil: string;
  profissao: string;
  rg: string;
  orgaoExpedidor: string;
  ufDocumento: string;

  // Contato
  email: string;
  celular: string;
  telefoneSecundario: string;

  // Endereço
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estadoEndereco: string;
  complemento: string;
};

const ESTADO_CIVIL_OPTIONS = [
  'Solteiro(a)',
  'Casado(a)',
  'Separado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
] as const;

const UF_OPTIONS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const UF_SELECT_OPTIONS = UF_OPTIONS.map((uf) => ({ value: uf, label: uf }));

const EMPTY_FORM: ClientForm = {
  nome: '',
  cpf: '',
  cnpj: '',
  descricao: '',
  dataNascimento: '',
  estadoCivil: '',
  profissao: '',
  rg: '',
  orgaoExpedidor: '',
  ufDocumento: '',
  email: '',
  celular: '',
  telefoneSecundario: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estadoEndereco: '',
  complemento: '',
};

export function CreateClientModal({ open, onClose }: Props) {
  const birthDateInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<{ nome?: boolean }>({});

  const closeAndReset = useCallback(() => {
    setStep(0);
    setForm(EMPTY_FORM);
    setTouched({});
    onClose();
  }, [onClose]);

  const canGoNext = useMemo(() => {
    if (step === 0) return form.nome.trim().length > 0;
    return true;
  }, [form.nome, step]);

  const stepLabel = step === 0 ? 'Dados pessoais' : step === 1 ? 'Contato' : 'Endereço';

  const subtitle = (
    <div className={styles.stepper} aria-label="Etapas do cadastro">
      <div className={styles.dots} aria-hidden="true">
        <span className={`${styles.dot} ${step === 0 ? styles.dotActive : ''}`} />
        <span className={`${styles.dot} ${step === 1 ? styles.dotActive : ''}`} />
        <span className={`${styles.dot} ${step === 2 ? styles.dotActive : ''}`} />
      </div>
      <span className={styles.stepText}>
        {step + 1} / 3 — {stepLabel}
      </span>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={closeAndReset}
      title="Cadastrar cliente"
      subtitle={subtitle}
      size="lg"
      footer={
        <>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              if (step > 0) {
                setStep((s) => (s - 1) as Step);
              } else {
                closeAndReset();
              }
            }}
          >
            {step === 0 ? 'Voltar' : 'Anterior'}
          </button>
          {step < 2 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                if (step === 0 && !form.nome.trim()) {
                  setTouched((p) => ({ ...p, nome: true }));
                  return;
                }
                setStep((s) => (s + 1) as Step);
              }}
              disabled={!canGoNext}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                // Aqui você faria a chamada à API para cadastrar o cliente
                console.log('Cadastrar cliente:', form);
                closeAndReset();
              }}
            >
              Salvar
            </button>
          )}
        </>
      }
    >
          {step === 0 ? (
            <section className={styles.section} aria-label="Dados pessoais">
              <div className={styles.grid3}>
                <div className={`${styles.field} ${styles.colSpan2}`}>
                  <label className={styles.label}>
                    Nome <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={`${styles.input} ${touched.nome && !form.nome.trim() ? styles.inputError : ''}`}
                    value={form.nome}
                    onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                    onBlur={() => setTouched((p) => ({ ...p, nome: true }))}
                    placeholder=""
                  />
                  {touched.nome && !form.nome.trim() ? (
                    <div className={styles.errorText}>O nome é obrigatório.</div>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>CPF</label>
                  <input
                    className={styles.input}
                    value={form.cpf}
                    onChange={(e) => setForm((p) => ({ ...p, cpf: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>CNPJ</label>
                  <input
                    className={styles.input}
                    value={form.cnpj}
                    onChange={(e) => setForm((p) => ({ ...p, cnpj: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Descrição</label>
                <textarea
                  className={styles.textarea}
                  value={form.descricao}
                  onChange={(e) => setForm((p) => ({ ...p, descricao: e.target.value }))}
                  placeholder=""
                />
              </div>

              <div className={styles.grid3}>
                <div className={styles.field}>
                  <label className={styles.label}>Data de Nascimento</label>
                  <div className={styles.inputIconWrap}>
                    <input
                      ref={birthDateInputRef}
                      className={`${styles.input} ${styles.inputWithIcon}`}
                      type="date"
                      value={form.dataNascimento}
                      onChange={(e) => setForm((p) => ({ ...p, dataNascimento: e.target.value }))}
                      placeholder="dd/mm/aaaa"
                    />
                    <button
                      type="button"
                      className={styles.inputIconButton}
                      aria-label="Selecionar data"
                      onClick={() => {
                        const el = birthDateInputRef.current;
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
                  <label className={styles.label}>Estado civil</label>
                  <DropdownSelect
                    value={form.estadoCivil}
                    onChange={(v) => setForm((p) => ({ ...p, estadoCivil: v }))}
                    options={ESTADO_CIVIL_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
                    placeholder="Selecione"
                    menuAriaLabel="Estado civil"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Profissão</label>
                  <input
                    className={styles.input}
                    value={form.profissao}
                    onChange={(e) => setForm((p) => ({ ...p, profissao: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className={styles.grid3}>
                <div className={styles.field}>
                  <label className={styles.label}>RG</label>
                  <input
                    className={styles.input}
                    value={form.rg}
                    onChange={(e) => setForm((p) => ({ ...p, rg: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Órgão Expedidor</label>
                  <input
                    className={styles.input}
                    value={form.orgaoExpedidor}
                    onChange={(e) => setForm((p) => ({ ...p, orgaoExpedidor: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>UF</label>
                  <DropdownSelect
                    value={form.ufDocumento}
                    onChange={(v) => setForm((p) => ({ ...p, ufDocumento: v }))}
                    options={UF_SELECT_OPTIONS}
                    placeholder="Selecione"
                    menuAriaLabel="UF"
                    maxMenuHeight={220}
                  />
                </div>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className={styles.section} aria-label="Contato">
              <div className={styles.grid3}>
                <div className={`${styles.field} ${styles.colSpan2}`}>
                  <label className={styles.label}>E-mail</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Celular</label>
                  <input
                    className={styles.input}
                    value={form.celular}
                    onChange={(e) => setForm((p) => ({ ...p, celular: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className={styles.grid3}>
                <div className={styles.field}>
                  <label className={styles.label}>Telefone Secundário</label>
                  <input
                    className={styles.input}
                    value={form.telefoneSecundario}
                    onChange={(e) => setForm((p) => ({ ...p, telefoneSecundario: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className={styles.section} aria-label="Endereço">
              <div className={styles.grid4}>
                <div className={styles.field}>
                  <label className={styles.label}>CEP</label>
                  <input
                    className={styles.input}
                    value={form.cep}
                    onChange={(e) => setForm((p) => ({ ...p, cep: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={`${styles.field} ${styles.colSpan2}`}>
                  <label className={styles.label}>Rua</label>
                  <input
                    className={styles.input}
                    value={form.rua}
                    onChange={(e) => setForm((p) => ({ ...p, rua: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Número</label>
                  <input
                    className={styles.input}
                    value={form.numero}
                    onChange={(e) => setForm((p) => ({ ...p, numero: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>

              <div className={styles.grid4}>
                <div className={styles.field}>
                  <label className={styles.label}>Bairro</label>
                  <input
                    className={styles.input}
                    value={form.bairro}
                    onChange={(e) => setForm((p) => ({ ...p, bairro: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Cidade</label>
                  <input
                    className={styles.input}
                    value={form.cidade}
                    onChange={(e) => setForm((p) => ({ ...p, cidade: e.target.value }))}
                    placeholder=""
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Estado</label>
                  <DropdownSelect
                    value={form.estadoEndereco}
                    onChange={(v) => setForm((p) => ({ ...p, estadoEndereco: v }))}
                    options={UF_SELECT_OPTIONS}
                    placeholder="Selecione"
                    menuAriaLabel="Estado"
                    maxMenuHeight={220}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Complemento</label>
                  <input
                    className={styles.input}
                    value={form.complemento}
                    onChange={(e) => setForm((p) => ({ ...p, complemento: e.target.value }))}
                    placeholder=""
                  />
                </div>
              </div>
            </section>
          ) : null}
    </Modal>
  );
}
