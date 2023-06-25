import React, { useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import Backdrop from './Backdrop';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';


function Navbar({ isOpen, onClose }) {
  const navRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      navRef.current.style.transform = 'translateX(100%)';
    } else {
      navRef.current.style.transform = 'translateX(0)';
    }
  }, [isOpen]);

  const handleBackdropClick = () => {
    onClose();
  }

  return (
    <>
      {isOpen && <Backdrop closeNav={handleBackdropClick}/>}
      <div ref={navRef} className={styles.nav_container}>
        <div className={styles.nav_header}>
          <button className={styles.close_button} onClick={onClose}>
           <GiHamburgerMenu size={60} color="#219ca4" />
          </button>
          <h1>eldercare</h1>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <HomeIcon className={styles.icon}></HomeIcon>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <SearchIcon className={styles.icon}></SearchIcon>
            <Link to="/buscar">Buscar</Link>
          </li>
          <li className={styles.item}>
            <ImportContactsIcon className={styles.icon}></ImportContactsIcon>
            <Link to="/acompanhamento">Acompanhamento</Link>
          </li>
          <li className={styles.item}>
            <InfoIcon className={styles.icon}></InfoIcon>
            <Link to="/sobre">Sobre</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;