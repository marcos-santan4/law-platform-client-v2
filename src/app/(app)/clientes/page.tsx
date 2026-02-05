import { FiPlus, FiSearch, FiUsers, FiUserPlus } from 'react-icons/fi';
import { TbUserShield } from 'react-icons/tb';
import styles from './clientes.module.scss';

export default function ClientesPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.title}>Clientes</div>

        <button className={styles.primaryAction} type="button">
          <FiPlus size={18} aria-hidden="true" />
          <span>Adicionar</span>
        </button>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <FiUsers size={22} aria-hidden="true" />
          <div className={styles.cardValue}>22</div>
          <div className={styles.cardLabel}>Total de clientes</div>
        </div>
        <div className={styles.card}>
          <TbUserShield size={22} aria-hidden="true" />
          <div className={styles.cardValue}>11</div>
          <div className={styles.cardLabel}>Clientes com processos atuais</div>
        </div>
        <div className={styles.card}>
          <FiUserPlus size={22} aria-hidden="true" />
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardLabel}>Novos clientes</div>
        </div>
      </div>

      <section className={styles.contentPanel} aria-label="Lista de clientes">
        <div className={styles.title} style={{ fontSize: 20 }}>
          Clientes
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.search} role="search">
            <FiSearch size={16} aria-hidden="true" />
            <input placeholder="Buscar por nome ou CPF" />
          </div>

          <button className={styles.primaryAction} type="button">
            <FiPlus size={18} aria-hidden="true" />
            <span>Cadastrar</span>
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome completo</th>
              <th>CPF</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Testerct (#1)</td>
              <td>—</td>
              <td>
                <span className={styles.status}>Ativo</span>
              </td>
              <td>👁️</td>
            </tr>
            <tr>
              <td>Larissa Cardoso (#1)</td>
              <td>920.129.000-46</td>
              <td>
                <span className={styles.status}>Ativo</span>
              </td>
              <td>👁️</td>
            </tr>
            <tr>
              <td>João da Silva Santos</td>
              <td>576.994.670-94</td>
              <td>
                <span className={styles.status}>Ativo</span>
              </td>
              <td>👁️</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

