import Image from 'next/image';
import logo from '../../../../../../public/images/logos/logo-mindlaw.png';
import styles from './styles.module.scss';

export function SignUpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.left}>
          <div className={styles.leftInner}>
            <div className={styles.brand}>
              <Image className={styles.logo} src={logo} alt="MindLaw" priority />
            </div>

            <div className={styles.content}>
              <div className={styles.contentInner}>
                <div className={styles.badge}>Seu próximo nível começa agora</div>
              </div>

              <h2 className={styles.headline}>
                Inteligência jurídica
                <br />
                que trabalha por
                <br />
                você
              </h2>

              <p className={styles.copy}>
                Centralize processos, crie documentos e otimize sua rotina jurídica com tecnologia
                desenvolvida para advogados.
              </p>
            </div>
          </div>
        </aside>

        <section className={styles.right}>{children}</section>
      </div>
    </div>
  );
}


