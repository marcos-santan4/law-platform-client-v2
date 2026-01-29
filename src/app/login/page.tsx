'use client';

import { useState } from 'react';
import './style.scss';

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
            <h1 className="logo-text">MINDLAW</h1>
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
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {showPassword ? (
                      <>
                        <path d="M10 3C6 3 3.5 5.5 2 8.5C3.5 11.5 6 14 10 14C14 14 16.5 11.5 18 8.5C16.5 5.5 14 3 10 3Z" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M3 3L17 17" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                      </>
                    ) : (
                      <>
                        <path d="M10 3C6 3 3.5 5.5 2 8.5C3.5 11.5 6 14 10 14C14 14 16.5 11.5 18 8.5C16.5 5.5 14 3 10 3Z" stroke="#D4AF37" strokeWidth="1.5"/>
                        <path d="M10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" stroke="#D4AF37" strokeWidth="1.5"/>
                      </>
                    )}
                  </svg>
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
              <a href="#" className="forgot-password">Esqueci a senha</a>
            </div>

            <button type="submit" className="login-button">
              ENTRAR
            </button>
          </form>

          <div className="register-link">
            <p>Não tem uma conta?</p>
            <a href="#">Registre-se</a>
          </div>
        </div>
{/* 
        <div className="login-divider"></div>
        <div className="login-sidebar"></div> */}
      </div>
    </div>
  );
}

