import styles from './styles.module.scss';

export function SettingsTab() {

    return (
        <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Alterar Senha</h2>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Nova senha</label>
                <input className={styles.input} type="password" defaultValue="********" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirmar senha</label>
                <input className={styles.input} type="password" defaultValue="********" />
              </div>
            </div>

            <div className={styles.actionsRow}>
              <button type="button" className={styles.primaryButton}>
                Editar Senha
              </button>
              <button type="button" className={styles.dangerButton}>
                Desativar Conta
              </button>
            </div>
          </div>
    )
}