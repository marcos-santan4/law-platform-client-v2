'use client';

import { useMemo } from 'react';
import {
  FiBriefcase,
  FiUsers,
  FiUser,
  FiFolder,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiBell,
} from 'react-icons/fi';
import { ImTrophy } from 'react-icons/im';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { MdHelpOutline, MdCake } from 'react-icons/md';
import { SummaryCard } from '../components/summaryCard';
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
  { tag: 'Meu escritório', quantidade: 5, cor: '#ddca92' },
  { tag: 'teste', quantidade: 3, cor: '#e8a0a0' },
];

const ADVOGADOS = [
  { nome: 'Henrique', email: 'serra.henrique3@gmail.com', processos: 17, posicao: 1 },
  { nome: 'Emerson', email: 'emerson@admin.com', processos: 2, posicao: 2 },
  { nome: 'Emmanuel', email: 'emmanuel@mindlaw.com.br', processos: 2, posicao: 3 },
  { nome: 'Larissa', email: 'larissamendx@gmail.com', processos: 2, posicao: 4 },
];

export default function DashboardPage() {
  const totalProcessos = useMemo(
    () => PROCESSOS_POR_TAG.reduce((acc, p) => acc + p.quantidade, 0),
    []
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.topRow}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeGreeting}>Bem-vindo de volta 👋</div>
          <div className={styles.welcomeName}>Marcos Dev Santana</div>
          <p className={styles.welcomeDesc}>
            Acompanhe todas as informações importantes do seu escritório em um só lugar.
          </p>
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
          <h2 className={styles.panelTitle}>Processos por Tag</h2>
          <div className={styles.chartWrap}>
            <div
              className={styles.donutChart}
              style={{
                background: `conic-gradient(${PROCESSOS_POR_TAG.map((p, i) => {
                  const start = (PROCESSOS_POR_TAG.slice(0, i).reduce((a, x) => a + x.quantidade, 0) / totalProcessos) * 100;
                  const end = (PROCESSOS_POR_TAG.slice(0, i + 1).reduce((a, x) => a + x.quantidade, 0) / totalProcessos) * 100;
                  return `${p.cor} ${start}% ${end}%`;
                }).join(', ')})`,
              }}
            >
              <div className={styles.donutHole}>
                <span className={styles.donutTotal}>Total de processos</span>
                <span className={styles.donutValue}>{totalProcessos}</span>
              </div>
            </div>
            <div className={styles.chartLegend}>
              {PROCESSOS_POR_TAG.map((p) => (
                <div key={p.tag} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: p.cor }} />
                  <span>
                    {p.tag} ({p.quantidade})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.panel} aria-label="Prazos">
          <div className={styles.panelHeaderRow}>
            <h2 className={styles.panelTitle}>Prazos</h2>
            <button type="button" className={styles.helpButton} aria-label="Ajuda">
              <MdHelpOutline size={18} />
            </button>
          </div>
          <div className={styles.listaPrazos}>
            {PRAZOS.map((p) => (
              <div key={p.id} className={styles.prazoItem}>
                <FiBell size={18} className={styles.prazoIcon} aria-hidden />
                <div className={styles.prazoContent}>
                  <div className={styles.prazoTitulo}>
                    {p.tipo} - Processo {p.processo}
                  </div>
                  <div className={styles.prazoMeta}>
                    {p.data} · {p.advogado}
                  </div>
                </div>
                {p.concluido && (
                  <div className={styles.prazoCheck} aria-hidden>
                    <FiCheck size={18} />
                  </div>
                )}
              </div>
            ))}
            {AUDIENCIAS.map((a) => (
              <div key={a.id} className={styles.prazoItem}>
                <FiBell size={18} className={styles.prazoIcon} aria-hidden />
                <div className={styles.prazoContent}>
                  <div className={styles.prazoTitulo}>
                    {a.tipo} - Processo {a.processo}
                  </div>
                  <div className={styles.prazoMeta}>
                    {a.data} · {a.advogado}
                  </div>
                </div>
                {a.concluido && (
                  <div className={styles.prazoCheck} aria-hidden>
                    <FiCheck size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.bottomRow}>
        <section className={styles.panel} aria-label="Aniversariantes do dia">
          <h2 className={styles.panelTitleWithIcon}>
            <MdCake size={20} aria-hidden />
            Aniversariantes do dia
          </h2>
          <div className={styles.emptyState}>Nenhum cliente faz aniversário hoje.</div>
        </section>

        <section className={styles.panel} aria-label="Processos por Advogado">
          <h2 className={styles.panelTitle}>Processos por Advogado</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ADVOGADO</th>
                  <th>TOTAL DE PROCESSOS</th>
                </tr>
              </thead>
              <tbody>
                {ADVOGADOS.map((adv) => (
                  <tr key={adv.email}>
                    <td>{adv.posicao}º Lugar</td>
                    <td>
                      <div className={styles.advInfo}>
                        <span className={styles.advNameRow}>
                          {adv.posicao === 1 && (
                            <ImTrophy size={18} className={styles.trofeu} aria-hidden />
                          )}
                          {adv.posicao === 2 && (
                            <IoMdArrowRoundDown size={18} className={styles.setaVermelha} aria-hidden />
                          )}
                          {adv.nome}
                        </span>
                        <span className={styles.advEmail}>{adv.email}</span>
                      </div>
                    </td>
                    <td>{adv.processos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <button type="button" className={styles.fabHelp} aria-label="Ajuda">
        <MdHelpOutline size={24} />
      </button>
    </div>
  );
}
