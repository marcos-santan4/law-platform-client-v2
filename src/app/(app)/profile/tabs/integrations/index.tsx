import styles from './styles.module.scss';

export function IntegrationsTab() {

    return (
        <div className={styles.panel}>
            <div className={styles.notice}>Apenas administradores podem gerenciar integrações.</div>
        </div>
    )
}