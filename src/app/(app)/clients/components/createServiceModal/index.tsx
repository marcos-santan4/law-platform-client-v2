'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';

import { Modal } from '../../../components/modal';
import { DropdownSelect } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  clientName: string;
  onClose: () => void;
};

type ServiceForm = {
  codigo: string;
  processo: string;
  titulo: string;
  descricao: string;
};

const EMPTY_FORM: ServiceForm = {
  codigo: '',
  processo: '',
  titulo: '',
  descricao: '',
};

// Mock de processos - em produção viria de uma API
const PROCESS_OPTIONS = [
  { value: 'p1', label: 'asdd' },
  { value: 'p2', label: '0005438-75.2025.8.05.0079' },
  { value: 'p3', label: '123' },
  { value: 'p4', label: '0002696-42.2026.4.05.8400' },
];

function generateCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function CreateServiceModal({ open, clientName, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ServiceForm>(() => ({
    ...EMPTY_FORM,
    codigo: generateCode(),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada à API para cadastrar o atendimento
    console.log('Cadastrar atendimento:', form);
    handleClose();
  };

  const handleClose = () => {
    // Resetar formulário e gerar novo código quando fechar
    setForm({
      ...EMPTY_FORM,
      codigo: generateCode(),
    });
    onClose();
  };

  const handleCreateProcess = () => {
    router.push('/cases');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Cadastrar atendimento do cliente"
      subtitle={clientName}
      size="md"
      footer={
        <>
          <button type="button" className={styles.secondaryButton} onClick={handleClose}>
            Voltar
          </button>
          <button type="submit" className={styles.primaryButton} form="service-form">
            Cadastrar
          </button>
        </>
      }
    >
      <form id="service-form" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.createProcessSection}>
          <span className={styles.createProcessText}>O processo ainda não existe?</span>
          <button
            type="button"
            className={styles.createProcessButton}
            onClick={handleCreateProcess}
          >
            <FiPlus size={18} aria-hidden="true" />
            <span>Cadastrar Novo Processo</span>
          </button>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>Dados do atendimento</div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>
                Código <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                value={form.codigo}
                onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Processo</label>
              <DropdownSelect
                options={PROCESS_OPTIONS}
                value={form.processo}
                onChange={(value) => setForm({ ...form, processo: value })}
                placeholder="Selecione um processo"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Título <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Descrição do serviço realizado</label>
            <textarea
              className={styles.textarea}
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={4}
            />
          </div>
        </section>
      </form>
    </Modal>
  );
}
