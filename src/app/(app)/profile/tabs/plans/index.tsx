import styles from './styles.module.scss';

export function PlansTab() {

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Informações do Plano</h2>
      <div className={styles.planInfo}>Dia do mês da renovação dos créditos: 10</div>
      <div className={styles.cardsGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Créditos de Monitoramento</div>
          <div className={styles.infoCardMeta}>Limite: 150</div>
          <div className={styles.infoCardMeta}>Consumido: 19</div>
          <div className={styles.infoCardHint}>
            O valor do monitoramento é restituído caso o processo tenha parado de ser monitorado
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Créditos de Intimação</div>
          <div className={styles.infoCardMeta}>Limite: 250</div>
          <div className={styles.infoCardMeta}>Consumido: 235</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Créditos de Atendimento</div>
          <div className={styles.infoCardMeta}>Limite: 10</div>
          <div className={styles.infoCardMeta}>Consumido: 9160</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Máximo de Usuários</div>
          <div className={styles.infoCardMeta}>Limite: 5</div>
          <div className={styles.infoCardMeta}>Consumido: 5</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardTitle}>Máximo de OABs</div>
          <div className={styles.infoCardMeta}>Limite: Ilimitado</div>
          <div className={styles.infoCardMeta}>Consumido: Ilimitado</div>
          <div className={styles.infoCardHint}>
            O número de OABs é ilimitado para todos os planos
          </div>
        </div>
      </div>
      <div className={styles.supportBar}>Em caso de dúvidas contato o suporte</div>
    </div>
  )
}