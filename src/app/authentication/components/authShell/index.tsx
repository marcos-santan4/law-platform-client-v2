'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SlArrowLeft } from 'react-icons/sl';

import logo from '../../../../../public/images/logos/logo-mindlaw.png';
import styles from './styles.module.scss';

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
    <div className={styles.loginContainer}>
      <button className={styles.backButton} aria-label={backAriaLabel} type="button" onClick={handleBack}>
        <SlArrowLeft size={18} />
      </button>

      <div className={styles.loginContent}>
        <div className={styles.loginMain}>
          <div className={styles.logoContainer}>
            <Image src={logo} alt="logo do LAW" className={styles.logo} priority />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

