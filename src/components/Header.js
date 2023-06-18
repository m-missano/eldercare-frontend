import { useState} from 'react';
import styles from "./Header.module.css"
import AccountCircle from '@mui/icons-material/AccountCircle';
import Navbar from "./layout/Navbar";
import LoginBar from "./layout/LoginBar";
import { GiHamburgerMenu } from 'react-icons/gi';

function Header({ showLoginIcon = true}) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoginBarOpen, setIsLoginBarOpen] = useState(false);
  
  const [isLogged, setisLogged] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const toggleLoginBar = () => {
    setIsLoginBarOpen(!isLoginBarOpen);
  };

  return (
    <header className={styles.header_container}>
      <div className={styles.header_navcontainer}>
        <button className={styles.header_button} onClick={toggleNavbar}>
          <GiHamburgerMenu size={60} color="#fff" />
        </button>
      </div>
      <div className={styles.header_title}>
        <h1>eldercare</h1>
      </div>
      {showLoginIcon && (
      <div className={styles.header_actions}>
        <button className={styles.header_login} onClick={toggleLoginBar}>
          <AccountCircle sx={{ color: '#fff', fontSize: 50 }} />
        </button>
      </div>
    )}
      {isLoginBarOpen && <LoginBar />}
      {<Navbar isOpen={isNavbarOpen} onClose={toggleNavbar} />}
    </header>
  );
}

export default Header;