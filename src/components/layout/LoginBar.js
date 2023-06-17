import styles from './LoginBar.module.css';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

function LoginBar(){

return(
    <div className={styles.login_container}>
        <div className={styles.login_header}>
            <button>
                <AccountCircle sx={{ color: '#219ca4', fontSize: 50 }} />
            </button>
           <h1>  Username </h1> 
           <h2>  Email </h2>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Meus dados</Link>
          </li>
          <div className={styles.line}></div>
          <li className={styles.item}>
            <Link to="/">Acompanhamento</Link>
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