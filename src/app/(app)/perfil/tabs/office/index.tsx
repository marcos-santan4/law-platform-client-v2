import styles from './styles.module.scss';

export function OfficeTab() {
    return (
        <div className={styles.panel}>
            <div className={styles.notice}>Apenas administradores podem editar dados do escritório.</div>
        </div>
    )
}