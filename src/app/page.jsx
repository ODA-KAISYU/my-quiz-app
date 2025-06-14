

'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>ようこそ！</h1>
      <p className={styles.description}>このアプリでは小テストを受けて学習を深めることができます。</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.buttonPrimary} onClick={handleClick}>
          小テストへ進む
        </button>
      </div>
    </main>
  );
}