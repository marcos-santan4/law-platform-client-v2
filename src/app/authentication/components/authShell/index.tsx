'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from 'react-icons/sl';

import logo from '../../../../../public/images/logos/logo-mindlaw.png';
import './styles.scss';

type AuthShellProps = {
  children: React.ReactNode;
  /**
   * Se informado, o botão de voltar faz push para essa rota.
   * Caso contrário, usa router.back().
   */
  backHref?: string;
  backAriaLabel?: string;
};

export function AuthShell({ children, backHref, backAriaLabel = 'Voltar' }: AuthShellProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <div className="login-container">
      <button className="back-button" aria-label={backAriaLabel} type="button" onClick={handleBack}>
        <SlArrowLeft size={18} />
      </button>

      <div className="login-content">
        <div className="login-main">
          <div className="logo-container">
            <Image src={logo} alt="logo do LAW" className="logo" priority />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

