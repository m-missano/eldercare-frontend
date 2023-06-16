import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} eldercare. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;