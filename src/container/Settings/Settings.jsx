import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './Settings.module.css';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.getElementById('root');
    if (darkMode) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.settingsContainer}
    >
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Dark Mode</p>
            <p className={styles.settingDescription}>
              Switch between light and dark theme
            </p>
          </div>
          <button
            className={`${styles.toggle} ${darkMode ? styles.toggleOn : ''}`}
            onClick={() => setDarkMode(x => !x)}
            aria-label="Toggle dark mode"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Notifications</h2>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Email Notifications</p>
            <p className={styles.settingDescription}>
              Receive email alerts for low stock items
            </p>
          </div>
          <button
            className={`${styles.toggle} ${styles.toggleOn}`}
            aria-label="Toggle email notifications"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Order Updates</p>
            <p className={styles.settingDescription}>
              Get notified when purchase orders are shipped
            </p>
          </div>
          <button
            className={`${styles.toggle} ${styles.toggleOn}`}
            aria-label="Toggle order updates"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
