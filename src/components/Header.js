import { useState, useEffect } from 'react';
import styles from "./Header.module.css"
import Navbar from "./layout/Navbar";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCookies } from 'react-cookie';
import LoginButton from './LoginButton';

function Header({ showLoginIcon = true}) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [cookies] = useCookies(['cuidadorToken', 'patientToken', 'username'])
  const [isLogged, setisLogged] = useState(false);
  const [isNotLogged, setisNotLogged] = useState(false);
 

  useEffect(() => {
    if (cookies.cuidadorToken || cookies.patientToken || cookies.username) {
      // Se pelo menos um cookie estiver presente, consideramos o usuário como logado
      setisLogged(true);
      setisNotLogged(false);
    } else {
      setisLogged(false);
      setisNotLogged(true);
    }
  }, [cookies]);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
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
      {showLoginIcon && <LoginButton isLoggedIn={isLogged} isLoggedOut={isNotLogged} username={cookies.username}/>}
      {<Navbar isOpen={isNavbarOpen} onClose={toggleNavbar} />}
    </header>
  );
}

export default Header;