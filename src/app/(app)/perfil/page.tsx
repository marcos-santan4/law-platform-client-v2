'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

import styles from './styles.module.scss';
import { ProfileTab } from './tabs/profile';
import { PlansTab } from './tabs/plans';
import { SettingsTab } from './tabs/settings';
import { IntegrationsTab } from './tabs/integrations';
import { OfficeTab } from './tabs/office';

type TabKey = 'perfil' | 'escritorio' | 'planos' | 'integracoes' | 'configuracoes';

const COVER_COLORS = [
  '#22c55e',
  '#16a34a',
  '#0ea5e9',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f97316',
  '#facc15',
  '#14b8a6',
  '#111827',
  '#0b2f36',
] as const;

export default function PerfilPage() {
  const [tab, setTab] = useState<TabKey>('perfil');
  const [coverColor, setCoverColor] = useState<string>('#22c55e');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();

  const user = useMemo(
    () => ({
      name: 'Marcos Dev Santana',
      role: 'Usuário',
      email: 'ssmarcosantana@gmail.com',
    }),
    [],
  );

  return (
    <div className={styles.page}>
      <section className={styles.profileCard} aria-label="Perfil">
        <div className={styles.cover} style={{ background: coverColor }}>
          <div className={styles.coverOverlay} />

          <button
            type="button"
            className={styles.coverEdit}
            aria-label="Editar cor do cabeçalho"
            aria-haspopup="dialog"
            aria-expanded={colorPickerOpen}
            // aria-controls={popoverId}
            onClick={() => setColorPickerOpen((v) => !v)}
          >
            <FiEdit2 size={16} aria-hidden="true" />
          </button>

          {colorPickerOpen ? (
            <div
              id={popoverId}
              ref={popoverRef}
              className={styles.colorPopover}
              role="dialog"
              aria-label="Selecionar cor"
            >
              <div className={styles.colorTitle}>Selecione uma cor</div>

              <div className={styles.colorGrid} role="listbox" aria-label="Cores disponíveis">
                {COVER_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={styles.colorSwatch}
                    style={{ background: c }}
                    aria-label={`Cor ${c}`}
                    role="option"
                    aria-selected={coverColor === c}
                    onClick={() => setCoverColor(c)}
                  />
                ))}
              </div>

              <div className={styles.colorPreview} aria-label="Cor selecionada" style={{ background: coverColor }} />
            </div>
          ) : null}
        </div>

        <div className={styles.profileTop}>
          <div className={styles.avatar} aria-hidden="true">
            <div className={styles.avatarMark} />
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        </div>

        <div className={styles.tabsRow} role="tablist" aria-label="Seções do perfil">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'perfil'}
            className={`${styles.tab} ${tab === 'perfil' ? styles.tabActive : ''}`}
            onClick={() => setTab('perfil')}
          >
            Perfil Pessoal
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'escritorio'}
            className={`${styles.tab} ${tab === 'escritorio' ? styles.tabActive : ''}`}
            onClick={() => setTab('escritorio')}
          >
            Escritório
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'planos'}
            className={`${styles.tab} ${tab === 'planos' ? styles.tabActive : ''}`}
            onClick={() => setTab('planos')}
          >
            Planos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'integracoes'}
            className={`${styles.tab} ${tab === 'integracoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('integracoes')}
          >
            Integrações
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'configuracoes'}
            className={`${styles.tab} ${tab === 'configuracoes' ? styles.tabActive : ''}`}
            onClick={() => setTab('configuracoes')}
          >
            Configurações
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.panel}>
          {tab === 'perfil' ? <ProfileTab /> : tab === 'escritorio' ? <OfficeTab /> : tab === 'planos' ? <PlansTab /> : tab === 'integracoes' ? <IntegrationsTab /> : <SettingsTab />}
        </div>

      </section>
    </div>
  );
}


