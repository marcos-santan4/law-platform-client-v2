'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { AuthShell } from '../authentication/components/authShell';
import styles from '../authentication/components/authShell/styles.module.scss';

export default function RequestPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0 && !isSubmitting, [email, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      // TODO: integrar com API de recuperação de senha
      await new Promise((r) => setTimeout(r, 400));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell backHref="/authentication/login" backAriaLabel="Voltar ao login">
      <h1 className={styles.authTitle}>Recuperação de senha</h1>
      <p className={styles.authSubtitle}>
        Preencha o campo abaixo para solicitar a recuperação de senha
      </p>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Endereço de e-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            autoComplete="email"
            required
            disabled={submitted}
          />
        </div>

        <button type="submit" className={styles.loginButton} disabled={!canSubmit || submitted}>
          {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
        </button>
      </form>

      <div className={styles.registerLink}>
        {submitted ? (
          <p>Se existir uma conta com esse e-mail, você receberá as instruções em instantes.</p>
        ) : null}
        <Link href="/authentication/login">Voltar ao login</Link>
      </div>
    </AuthShell>
  );
}

