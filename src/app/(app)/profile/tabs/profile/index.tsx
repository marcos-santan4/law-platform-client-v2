import styles from './styles.module.scss';
import { useMemo  } from 'react';

export function ProfileTab() {

    const user = useMemo(
        () => ({
          name: 'Marcos Dev Santana',
          role: 'Usuário',
          email: 'ssmarcosantana@gmail.com',
        }),
        [],
      );

    return (
        <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Dados pessoais</h2>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Nome</label>
                <input className={styles.input} defaultValue="Marcos Dev" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Sobrenome</label>
                <input className={styles.input} defaultValue="Santana" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} defaultValue={user.email} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>CPF</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Data nascimento</label>
                <input className={styles.input} defaultValue="19/09/2000" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>OAB</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cargo</label>
                <input className={styles.input} defaultValue="" />
              </div>
            </div>

            <div className={styles.sectionTitle}>Endereço</div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>CEP</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Rua</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Número</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Bairro</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cidade</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Estado</label>
                <input className={styles.input} defaultValue="" />
              </div>
              <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                <label className={styles.label}>Complemento</label>
                <input className={styles.input} defaultValue="" />
              </div>
            </div>

            <div className={styles.bottomRow}>
              <label className={styles.checkboxRow}>
                <input type="checkbox" defaultChecked />
                <span>Profissional (agendamento)</span>
              </label>

              <button type="button" className={styles.dangerButton}>
                Desativar Conta
              </button>
            </div>
          </div>
    )
}