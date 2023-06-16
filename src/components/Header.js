import { useState } from 'react';
import styles from "./Header.module.css"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Navbar from "./layout/Navbar";

function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <header className={styles.header_container}>
      <div className={styles.header_navcontainer}>
        <button className={styles.header_sidebar} onClick={toggleNavbar}>
          <MenuIcon sx={{ color: '#fff', fontSize: 50 }} />
        </button>
      </div>
      <div className={styles.header_title}>
        <h1>eldercare</h1>
      </div>
      <div className={styles.header_actions}>
        <button className={styles.header_login}>
          <AccountCircle sx={{ color: '#fff', fontSize: 50 }} />
        </button>
      </div>
      <Navbar isOpen={isNavbarOpen} onClose={toggleNavbar} />
    </header>
  );
}

export default Header;