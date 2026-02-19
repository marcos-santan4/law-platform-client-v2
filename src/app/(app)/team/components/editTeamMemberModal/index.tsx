'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import { DropdownSelect } from '../../../components/dropdownSelect';
import styles from './styles.module.scss';

type TabKey = 'dados' | 'permissoes';

type PermissionLevel = 'basica' | 'gestor';

type TeamMember = {
  id: string;
  nome: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  oab?: string;
  cargo?: string;
  status: 'Ativo' | 'Inativo';
  permissions?: Record<string, PermissionLevel>;
};

type Props = {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSave?: (member: TeamMember) => void;
};

const CARGOS = [
  { value: 'advogado', label: 'Advogado(a)' },
  { value: 'secretaria', label: 'Secretária' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'administrador', label: 'Administrador' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'diretor', label: 'Diretor' },
  { value: 'estagiario', label: 'Estagiário' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'ceo', label: 'CEO' },
  { value: 'lider-comercial', label: 'Líder comercial' },
  { value: 'socio', label: 'Sócio' },
];

const DEFAULT_PERMISSIONS: Record<string, PermissionLevel> = {
  logs: 'basica',
  clientes: 'basica',
  documentos: 'basica',
  financeiro: 'basica',
  processos: 'basica',
  intimacoes: 'basica',
  agendamentos: 'basica',
  subusuarios: 'basica',
  tags: 'basica',
  tarefas: 'basica',
};

type PermissionCardProps = {
  title: string;
  level: PermissionLevel;
  onSelect: (level: PermissionLevel) => void;
  note?: string;
  onlyView?: boolean;
  onlyGestor?: boolean;
};

function PermissionCard({ title, level, onSelect, note, onlyView, onlyGestor }: PermissionCardProps) {
  return (
    <div className={styles.permissionCard}>
      <div className={styles.permissionCardHeader}>
        <span>{title}</span>
      </div>
      <div className={styles.permissionCardBody}>
        {!onlyGestor && (
          <button
            type="button"
            className={`${styles.permissionOption} ${level === 'basica' ? styles.permissionOptionActive : ''}`}
            onClick={() => onSelect('basica')}
          >
            <div className={styles.permissionOptionContent}>
              <span className={styles.permissionOptionLabel}>Básica</span>
              <span className={styles.permissionOptionDesc}>
                {onlyView ? 'Ver' : 'Ver e editar só os meus'}
              </span>
            </div>
            {level === 'basica' && <FiCheck className={styles.permissionCheck} />}
          </button>
        )}
        <button
          type="button"
          className={`${styles.permissionOption} ${styles.permissionOptionGestor} ${level === 'gestor' ? styles.permissionOptionActive : ''}`}
          onClick={() => onSelect('gestor')}
        >
          <div className={styles.permissionOptionContent}>
            <span className={styles.permissionOptionLabel}>Gestor</span>
            <span className={styles.permissionOptionDesc}>Ver tudo e gerenciar todos</span>
          </div>
          {level === 'gestor' && <FiCheck className={styles.permissionCheck} />}
        </button>
        {note && <div className={styles.permissionNote}>{note}</div>}
      </div>
    </div>
  );
}

export function EditTeamMemberModal({ open, member, onClose, onSave }: Props) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<TabKey>('dados');

  const initialFormData = useMemo(() => {
    if (!member) {
      return { nome: '', sobrenome: '', email: '', telefone: '', oab: '', cargo: '' };
    }

    const nomeParts = member.nome.split(' ');
    const cargoValue = member.cargo
      ? CARGOS.find((c) => c.label.toLowerCase() === member.cargo?.toLowerCase())?.value || ''
      : '';

    return {
      nome: nomeParts[0] || '',
      sobrenome: nomeParts.slice(1).join(' ') || '',
      email: member.email || '',
      telefone: member.telefone || '',
      oab: member.oab || '',
      cargo: cargoValue,
    };
  }, [member]);

  const initialPermissions = useMemo(() => {
    return {
      ...DEFAULT_PERMISSIONS,
      ...(member?.permissions ?? {}),
    };
  }, [member]);

  const [draftFormData, setDraftFormData] = useState<Partial<typeof initialFormData>>({});
  const [draftPermissions, setDraftPermissions] = useState<Record<string, PermissionLevel>>({});

  const formData = useMemo(() => {
    return { ...initialFormData, ...draftFormData };
  }, [draftFormData, initialFormData]);

  const permissions = useMemo(() => {
    return { ...initialPermissions, ...draftPermissions };
  }, [draftPermissions, initialPermissions]);

  const handleClose = useCallback(() => {
    setDraftFormData({});
    setDraftPermissions({});
    setTab('dados');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || !member) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, member, handleClose]);

  if (!open || !member) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...member,
        ...formData,
        nome: `${formData.nome} ${formData.sobrenome}`.trim(),
        permissions,
      });
    }
    handleClose();
  };

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <div className={styles.headerCenter}>
            <h2 className={styles.headerTitle} id={titleId}>
              Editar sub usuário
            </h2>
            <div className={styles.headerSubtitle}>{member.nome}</div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.iconClose}
            onClick={handleClose}
            aria-label="Fechar"
          >
            <IoMdClose size={18} />
          </button>
        </header>

        <div className={styles.tabs}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'dados'}
            className={`${styles.tab} ${tab === 'dados' ? styles.tabActive : ''}`}
            onClick={() => setTab('dados')}
          >
            Dados Pessoais
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'permissoes'}
            className={`${styles.tab} ${tab === 'permissoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('permissoes')}
          >
            Permissões
          </button>
        </div>

        <div className={styles.body}>
          {tab === 'dados' ? (
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="nome">
                  Nome
                </label>
                <input
                  id="nome"
                  className={styles.input}
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setDraftFormData((prev) => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sobrenome">
                  Sobrenome
                </label>
                <input
                  id="sobrenome"
                  className={styles.input}
                  type="text"
                  value={formData.sobrenome}
                  onChange={(e) => setDraftFormData((prev) => ({ ...prev, sobrenome: e.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  className={styles.input}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setDraftFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="telefone">
                  Telefone
                </label>
                <input
                  id="telefone"
                  className={styles.input}
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setDraftFormData((prev) => ({ ...prev, telefone: e.target.value }))}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="oab">
                  OAB
                </label>
                <input
                  id="oab"
                  className={styles.input}
                  type="text"
                  value={formData.oab}
                  onChange={(e) => setDraftFormData((prev) => ({ ...prev, oab: e.target.value }))}
                />
              </div>
            </div>
          ) : (
            <div className={styles.permissionsContent}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Cargo <span className={styles.required}>*</span>
                </label>
                <DropdownSelect
                  value={formData.cargo}
                  onChange={(value) => setDraftFormData((prev) => ({ ...prev, cargo: value }))}
                  options={CARGOS}
                  placeholder="Selecione o cargo"
                />
              </div>

              <div className={styles.permissionsSection}>
                <label className={styles.label}>
                  Permissões <span className={styles.required}>*</span>
                </label>
                <div className={styles.permissionsGrid}>
                  <PermissionCard
                    title="Logs de Auditoria"
                    level={permissions.logs}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, logs: level }))}
                    note="Visualização habilitada por padrão para todos os usuários."
                    onlyView
                  />
                  <PermissionCard
                    title="Clientes"
                    level={permissions.clientes}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, clientes: level }))}
                    note="Visualização habilitada automaticamente"
                  />
                  <PermissionCard
                    title="Documentos"
                    level={permissions.documentos}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, documentos: level }))}
                  />
                  <PermissionCard
                    title="Financeiro"
                    level={permissions.financeiro}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, financeiro: level }))}
                    onlyGestor
                  />
                  <PermissionCard
                    title="Processos"
                    level={permissions.processos}
                    onSelect={(level) => {
                      setDraftPermissions((prev) => ({
                        ...prev,
                        processos: level,
                        intimacoes: level === 'gestor' ? 'gestor' : permissions.intimacoes,
                        agendamentos: level === 'gestor' ? 'gestor' : permissions.agendamentos,
                      }));
                    }}
                    note="Pode ser selecionado independentemente. Se Processos for selecionado, Intimações receberá automaticamente o mesmo nível de permissão (espelho)."
                  />
                  <PermissionCard
                    title="Intimações"
                    level={permissions.intimacoes}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, intimacoes: level }))}
                    note="Pode ser selecionado independentemente. Se Processos for selecionado, Intimações receberá automaticamente o mesmo nível de permissão."
                  />
                  <PermissionCard
                    title="Agendamentos"
                    level={permissions.agendamentos}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, agendamentos: level }))}
                    note="Pode ser selecionado independentemente. Se Processos for selecionado, Agendamentos receberá automaticamente o mesmo nível de permissão."
                  />
                  <PermissionCard
                    title="Subusuários"
                    level={permissions.subusuarios}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, subusuarios: level }))}
                    onlyGestor
                  />
                  <PermissionCard
                    title="Tags"
                    level={permissions.tags}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, tags: level }))}
                  />
                  <PermissionCard
                    title="Tarefas"
                    level={permissions.tarefas}
                    onSelect={(level) => setDraftPermissions((prev) => ({ ...prev, tarefas: level }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={handleClose}>
            Cancelar
          </button>
          <button type="button" className={styles.primaryButton} onClick={handleSave}>
            Salvar
          </button>
        </footer>
      </div>
    </div>
  );
}

