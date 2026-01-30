'use client';

import { useState } from 'react';
import logo from '../../../../public/images/logos/logo-mindlaw.png';
import './style.scss';
import Link from 'next/link';

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
    <div className="login-container">
      <button className="back-button" aria-label="Voltar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="login-content">
        <div className="login-main">
          <div className="logo-container">
            <img src={logo.src} alt="logo do LAW" className="logo" />
          </div>

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
              <a href="#" className="forgot-password">Esqueci a senha</a>
            </div>

            <button type="submit" className="login-button">
              ENTRAR
            </button>
          </form>

          <div className="register-link">
            <p>Não tem uma conta?</p>
            <br />
            <Link href="#">Registre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

