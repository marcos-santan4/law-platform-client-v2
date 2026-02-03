'use client';

import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { AuthShell } from '../components/authShell';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
  };

  return (
    <AuthShell backHref="/">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <div className="password-input-wrapper">
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
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              aria-pressed={showPassword}
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="toggle-switch"></span>
            <span className="label-text">Lembrar-me</span>
          </label>

          <Link href="/request-password" className="forgot-password">
            Esqueci a senha
          </Link>
        </div>

        <button type="submit" className="login-button">
          ENTRAR
        </button>
      </form>

      <div className="register-link">
        <p>Não tem uma conta?</p>
        <br />
        <Link href="/authentication/signUp">Registre-se</Link>
      </div>
    </AuthShell>
  );
}

