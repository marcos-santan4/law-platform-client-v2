'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PlanCard } from '../../components/plans/planCard';
import { PlanFeaturesModal } from '../../components/plans/planFeaturesModal';
import { useSignUpFlow } from '../..';
import styles from './styles.module.scss';
import type { PlanId } from '../..';

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.stepIndicator} aria-label={`Passo ${current} de ${total}`}>
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: total }).map((_, idx) => {
          const step = idx + 1;
          const isActive = step === current;
          return (
            <span
              key={step}
              className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            />
          );
        })}
      </div>
      <span className={styles.stepText}>
        {current}/{total}
      </span>
    </div>
  );
}

export function Step2() {
  const { selectedPlan, setSelectedPlan, form } = useSignUpFlow();
  const [couponCode, setCouponCode] = useState('');
  const [openFeaturesPlan, setOpenFeaturesPlan] = useState<PlanId | null>(null);

  const commonFeatures = [
    { title: 'Dashboard', description: 'Visão geral do escritório com métricas e indicadores' },
    { title: 'Clientes', description: 'Gestão completa de clientes e seus dados' },
    { title: 'Processos', description: 'Monitoramento e gestão de processos judiciais' },
    { title: 'Intimações', description: 'Recebimento e gestão de intimações com IA' },
    { title: 'Tarefas', description: 'Sistema de tarefas com Kanban e Dashboard' },
    { title: 'Financeiro', description: 'Controle financeiro e fluxo de caixa' },
    { title: 'Agendamento', description: 'Gestão de agendamentos internos e externos' },
    { title: 'Subusuários', description: 'Gestão de equipe e permissões' },
    { title: 'Assistente IA', description: 'Chat com inteligência artificial para suporte jurídico' },
    { title: 'Calculadoras Jurídicas', description: 'Ferramentas de cálculo para processos jurídicos' },
    { title: 'Geração de Documentos', description: 'Criação automatizada de documentos jurídicos' },
    { title: 'Notificações', description: 'Sistema de notificações e alertas' },
  ] as const;

  const planInfo: Record<PlanId, { label: string; credits: string[] }> = {
    starter: {
      label: 'Starter',
      credits: [
        '150 créditos de processos',
        '250 créditos de intimações com IA',
        '10 créditos de resumo de processo',
        'Até 5 usuários',
      ],
    },
    premium: {
      label: 'Premium',
      credits: [
        '500 créditos de processos',
        'Créditos de intimações com IA ilimitados',
        'Créditos de resumo de processo ilimitados',
        'Até 10 usuários',
      ],
    },
    advanced: {
      label: 'Advanced',
      credits: [
        '1000 créditos de processos',
        'Créditos de intimações com IA ilimitados',
        'Créditos de resumo de processo ilimitados',
        'Usuários ilimitados',
      ],
    },
  };

  const canContinue = useMemo(() => {
    const baseOk = !!form.email && !!form.password && form.acceptTerms;
    return baseOk && !!selectedPlan;
  }, [form.acceptTerms, form.email, form.password, selectedPlan]);

  function handleContinue() {
    if (!canContinue) return;
    console.log('signup', { form, selectedPlan, couponCode });
  }

  return (
    <div className={styles.right}>
      <div className={styles.topRow}>
        <Link className={styles.backLink} href="/authentication/signUp">
          ← Voltar
        </Link>
        <StepIndicator current={2} total={3} />
      </div>

      <h1 className={styles.title}>Escolha seu plano</h1>
      <p className={styles.subtitle}>Selecione o plano que melhor se adequa às suas necessidades</p>

      <div className={styles.plansGrid}>
        <PlanCard
          id="starter"
          title="Starter"
          priceLabel="R$ 297,00/mês"
          bullets={planInfo.starter.credits}
          selected={selectedPlan === 'starter'}
          onSelect={setSelectedPlan}
          onOpenFeatures={setOpenFeaturesPlan}
        />

        <PlanCard
          id="premium"
          title="Premium"
          priceLabel="R$ 497,00/mês"
          bullets={planInfo.premium.credits}
          selected={selectedPlan === 'premium'}
          onSelect={setSelectedPlan}
          onOpenFeatures={setOpenFeaturesPlan}
        />

        <PlanCard
          id="advanced"
          title="Advanced"
          priceLabel="R$ 897,00/mês"
          bullets={planInfo.advanced.credits}
          selected={selectedPlan === 'advanced'}
          onSelect={setSelectedPlan}
          onOpenFeatures={setOpenFeaturesPlan}
        />
      </div>

      <PlanFeaturesModal
        open={openFeaturesPlan !== null}
        planLabel={openFeaturesPlan ? planInfo[openFeaturesPlan].label : ''}
        credits={openFeaturesPlan ? planInfo[openFeaturesPlan].credits : []}
        features={[...commonFeatures]}
        onClose={() => setOpenFeaturesPlan(null)}
      />

      <div className={styles.couponBox}>
        <div className={styles.couponTitle}>Tem um cupom de desconto?</div>
        <div className={styles.couponRow}>
          <input
            className={styles.input}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Código do Cupom"
          />
          <button className={styles.secondaryButton} type="button" disabled={!selectedPlan}>
            Validar
          </button>
        </div>
        <div className={styles.couponHint}>Selecione um plano para aplicar o desconto do cupom</div>
      </div>

      <button
        className={styles.primaryButton}
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
      >
        Continuar
      </button>
    </div>
  );
}


