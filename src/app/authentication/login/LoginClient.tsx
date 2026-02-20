'use client';

import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthShell } from '../components/authShell';
import styles from './styles.module.scss';

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.message || 'Não foi possível autenticar. Verifique seus dados.');
        return;
      }

      const next = searchParams.get('next');
      const safeNext = next && next.startsWith('/') ? next : null;
      router.push(safeNext || '/dashboard');
      router.refresh();
    } catch {
      setError('Erro de rede ao autenticar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell backHref="/">
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {error ? (
          <div role="alert" style={{ marginBottom: 12, color: '#b91c1c', fontWeight: 500 }}>
            {error}
          </div>
        ) : null}

        <div className={styles.formGroup}>
          <label htmlFor="email">Endereço de email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <div className={styles.passwordInputWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              aria-pressed={showPassword}
              disabled={isSubmitting}
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>
        </div>

        <div className={styles.formOptions}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.labelText}>Lembrar-me</span>
          </label>

          <Link href="/request-password" className={styles.forgotPassword}>
            Esqueci a senha
          </Link>
        </div>

        <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
          {isSubmitting ? 'ENTRANDO...' : 'ENTRAR'}
        </button>
      </form>

      <div className={styles.registerLink}>
        <p>Não tem uma conta?</p>
        <br />
        <Link href="/authentication/signUp">Registre-se</Link>
      </div>
    </AuthShell>
  );
}

