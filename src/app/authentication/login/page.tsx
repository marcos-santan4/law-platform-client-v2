'use client';

import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthShell } from '../components/authShell';
import styles from './styles.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar autenticação
    router.push('/clientes');
  };

  return (
    <AuthShell backHref="/">
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Endereço de email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
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
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              aria-pressed={showPassword}
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
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.labelText}>Lembrar-me</span>
          </label>

          <Link href="/request-password" className={styles.forgotPassword}>
            Esqueci a senha
          </Link>
        </div>

        <button type="submit" className={styles.loginButton}>
          ENTRAR
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

