import styles from './LoginBar.module.css';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

function LoginBar(){

return(
    <div className={styles.login_container}>
        <div className={styles.login_header}>
              <AccountCircle />
           <h1>  Username </h1> 
           <h2>  Email </h2>
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
            <Link to="/">Sair</Link>
          </li>
          
        </ul>
    </div>
);
}

export default LoginBar