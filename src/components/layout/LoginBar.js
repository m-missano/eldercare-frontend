import styles from './LoginBar.module.css';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useCookies } from "react-cookie";
import BackgroundLetterAvatar from '../BackgroundLetterAvatar';

function LoginBar({ username, nome}){

  const [cookies, setCookie, removeCookie] = useCookies(['username', 'cuidadorToken', 'patientToken']);

  const logout = () => {
    removeCookie('username');
    removeCookie('cuidadorToken')
    removeCookie('patientToken')
  }

  return(
    <div className={styles.login_container}>
        <div className={styles.login_header}>
            <BackgroundLetterAvatar name = {nome} />
           <h1> {username} </h1> 
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/profile">Meu perfil</Link>
          </li>
          <div className={styles.line}></div>
          <li className={styles.item}>
            <Link to="/updater">Alterar cadastro</Link>
          </li>
          <div className={styles.line}></div>
          <li className={styles.item}>
            <Link to="/" onClick={logout}>Sair</Link>
          </li>
          
        </ul>
    </div>
);
}

export default LoginBar