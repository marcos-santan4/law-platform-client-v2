'use client';

import {
  FiBriefcase,
  FiUsers,
  FiUser,
  FiFolder,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import { SummaryCard } from '../components/summaryCard';
import { ProcessosPorTag } from './components/casesByTag';
import { Prazos } from './components/proceduralDeadlines';
import { AniversariantesDia } from './components/todayBirthdays';
import { ProcessosPorAdvogado } from './components/casesByLawyer';
import styles from './styles.module.scss';

const NOVIDADES = [
  {
    id: '1',
    titulo: 'Chatbot Jurídico - Tire suas dúvidas instantaneamente',
    descricao:
      'Nosso chatbot inteligente está pronto para responder suas dúvidas sobre diversos temas jurídicos. Envie suas perguntas sobre Contratos, Privacidade e proteção de dados, Compliance e ética, Propriedade intelectual (IP), Direito societário e Direito trabalhista. Acesse o chatbot no canto da tela e obtenha respostas rápidas e precisas para suas questões jurídicas.',
  },
];

const PRAZOS = [
  {
    id: '1',
    tipo: 'Prazo',
    processo: '0002696-42.2026.4.05.8400',
    data: '05 de fev. de 2026 - 16:00',
    advogado: 'Adv Larissa Mendes',
    concluido: true,
  },
  {
    id: '2',
    tipo: 'Prazo',
    processo: '—',
    data: '12 de fev. de 2026 - 00:00',
    advogado: 'Sem advogado responsável',
    concluido: false,
  },
];

const AUDIENCIAS = [
  {
    id: '1',
    tipo: 'Audiência',
    processo: 'e2220b',
    data: '29 de jan. de 2026',
    advogado: 'Sem advogado responsável',
    concluido: false,
  },
];

const PROCESSOS_POR_TAG = [
  { tag: 'Meu escritório', quantidade: 10, cor: '#ddca92' },
  { tag: 'teste', quantidade: 13, cor: '#e8a0a0' },
];

const ADVOGADOS = [
  { nome: 'Henrique', email: 'serra.henrique3@gmail.com', processos: 17, posicao: 1 },
  { nome: 'Emerson', email: 'emerson@admin.com', processos: 2, posicao: 2 },
  { nome: 'Emmanuel', email: 'emmanuel@mindlaw.com.br', processos: 2, posicao: 3 },
  { nome: 'Larissa', email: 'larissamendx@gmail.com', processos: 2, posicao: 4 },
];

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.topRow}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeGlow1} aria-hidden="true" />
          <div className={styles.welcomeGlow2} aria-hidden="true" />
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeGreeting}>Bem-vindo de volta 👋</div>
            <div className={styles.welcomeName}>Marcos Dev Santana</div>
            <p className={styles.welcomeDesc}>
              Acompanhe todas as informações importantes do seu escritório em um só lugar.
            </p>
          </div>
        </div>

        <section className={styles.novidadesCard} aria-label="Novidades">
          <div className={styles.novidadesHeader}>
            <span className={styles.novidadesTitle}>NOVIDADES</span>
            <div className={styles.novidadesControls}>
              <button type="button" className={styles.novidadeControl} aria-label="Anterior">
                <FiChevronLeft size={18} />
              </button>
              <button type="button" className={styles.novidadeControl} aria-label="Próximo">
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className={styles.novidadesContent}>
            <h3 className={styles.novidadeTitulo}>{NOVIDADES[0].titulo}</h3>
            <p className={styles.novidadeDesc}>{NOVIDADES[0].descricao}</p>
          </div>
        </section>
      </div>

      <div className={styles.statsRow}>
        <SummaryCard
          variant="single"
          title="INTIMAÇÕES DE HOJE"
          icon={<FiBriefcase size={24} />}
          iconBgColor="amber"
          value="0"
        />
        <SummaryCard
          variant="single"
          title="CLIENTES"
          icon={<FiUsers size={24} />}
          iconBgColor="blue"
          value="22"
        />
        <SummaryCard
          variant="single"
          title="USUÁRIOS"
          icon={<FiUser size={24} />}
          iconBgColor="blue"
          value="9"
        />
        <SummaryCard
          variant="single"
          title="PROCESSOS"
          icon={<FiFolder size={24} />}
          iconBgColor="blue"
          value="38"
        />
      </div>

      <div className={styles.middleRow}>
        <section className={styles.panel} aria-label="Processos por Tag">
          <ProcessosPorTag data={PROCESSOS_POR_TAG} />
        </section>

        <section className={styles.panel} aria-label="Prazos">
          <Prazos prazos={PRAZOS} audiencias={AUDIENCIAS} />
        </section>
      </div>

      <div className={styles.bottomRow}>
        <section className={styles.panel} aria-label="Aniversariantes do dia">
          <AniversariantesDia aniversariantes={[]} />
        </section>

        <section className={styles.panel} aria-label="Processos por Advogado">
          <ProcessosPorAdvogado advogados={ADVOGADOS} />
        </section>
      </div>

      <button type="button" className={styles.fabHelp} aria-label="Ajuda">
        <MdHelpOutline size={24} />
      </button>
    </div>
  );
}
