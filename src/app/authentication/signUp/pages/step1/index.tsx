'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpFlow } from '../..';
import styles from './styles.module.scss';

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

export function Step1() {
  const router = useRouter();
  const { form, setForm } = useSignUpFlow();
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  const passwordsMatch = useMemo(() => {
    if (!form.password || !form.confirmPassword) return true;
    return form.password === form.confirmPassword;
  }, [form.password, form.confirmPassword]);

  const canContinue =
    !!form.firstName &&
    !!form.lastName &&
    !!form.email &&
    !!form.phone &&
    !!form.password &&
    !!form.confirmPassword &&
    passwordsMatch &&
    form.acceptTerms;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canContinue) return;
    router.push('/authentication/signUp/step2');
  }

  return (
    <div className={styles.right}>
      <div className={styles.topRow}>
        <Link className={styles.backLink} href="/authentication/login">
          ← Voltar para login
        </Link>
        <StepIndicator current={1} total={3} />
      </div>

      <h1 className={styles.title}>Crie sua conta</h1>
      <p className={styles.subtitle}>Preencha seus dados para começar</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Nome *</span>
            <input
              className={styles.input}
              value={form.firstName}
              onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
              placeholder="Digite seu nome"
              autoComplete="given-name"
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Sobrenome *</span>
            <input
              className={styles.input}
              value={form.lastName}
              onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
              placeholder="Digite seu sobrenome"
              autoComplete="family-name"
              required
            />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>E-mail *</span>
          <input
            className={styles.input}
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="Digite seu e-mail"
            autoComplete="email"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Celular *</span>
          <input
            className={styles.input}
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="Digite seu celular"
            autoComplete="tel"
            required
          />
        </label>

        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Senha *</span>
            <input
              className={styles.input}
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="Digite sua senha"
              autoComplete="new-password"
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Confirmar senha *</span>
            <input
              className={styles.input}
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
              onBlur={() => setTouchedConfirm(true)}
              placeholder="Digite novamente"
              autoComplete="new-password"
              aria-invalid={touchedConfirm && !passwordsMatch}
              required
            />
            {touchedConfirm && !passwordsMatch && (
              <span className={styles.error}>As senhas não conferem.</span>
            )}
          </label>
        </div>

        <label className={styles.termsRow}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => setForm((p) => ({ ...p, acceptTerms: e.target.checked }))}
            required
          />
          <span className={styles.termsText}>
            Eu concordo com os{' '}
            <a className={styles.termsLink} href="#" onClick={(e) => e.preventDefault()}>
              Termos e Condições
            </a>
          </span>
        </label>

        <button className={styles.primaryButton} type="submit" disabled={!canContinue}>
          Continuar
        </button>
      </form>
    </div>
  );
}


