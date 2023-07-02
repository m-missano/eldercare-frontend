import styles from './LoginBar.module.css';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useCookies } from "react-cookie";
import BackgroundLetterAvatar from '../BackgroundLetterAvatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchImage } from "../../utils/apiUtils";
import { useState, useEffect } from 'react';

function LoginBar({ username, nome, path}){

  const [cookies, setCookie, removeCookie] = useCookies(['username', 'carerToken', 'patientToken']);

  const logout = () => {
    removeCookie('username');
    removeCookie('carerToken')
    removeCookie('patientToken')
    localStorage.removeItem("ids")
    localStorage.removeItem("query")
    localStorage.removeItem("currentCarerId")
  }

  useEffect(() =>{
    let token;
    console.log("PATH: ", path);
    if (cookies.carerToken) {
        token = cookies.carerToken;

    } else if (cookies.patientToken) {
        token = cookies.patientToken;
    }
    fetchImage(cookies.username, token).then((imageUrl) => {
            const divElement = document.getElementById('profile_pic0');
            divElement.style.backgroundImage = `url(${imageUrl})`;
        })
        .catch((error) => {
            console.log(error.message);
        });
  }, []);

  return(
    <div className={styles.login_container}>
         {path ? (
            <div className={styles.login_header}>
              <div id="profile_pic0" className={styles.profile_image}></div>
              <h1> {username} </h1>
            </div>
            ) : (
          <div className={styles.login_header}>
            <BackgroundLetterAvatar name={nome} />
            <h1> {username} </h1> 
          </div>
          )}
        <ul className={styles.list}>
          <li className={styles.item}>
            <AccountBoxIcon className={styles.perfil}></AccountBoxIcon>
            <Link to="/profile">Meu perfil</Link>
          </li>
          <div className={styles.line}></div>
          <li className={styles.item}>
            <EditIcon className={styles.edit}></EditIcon>
            <Link to="/updater">Alterar cadastro</Link>
          </li>
          <div className={styles.line}></div>
          <li className={styles.item}>
            <LogoutIcon className={styles.logout}></LogoutIcon>
            <Link to="/" onClick={logout}>Sair</Link>
          </li>
          
        </ul>
    </div>
);
}

export default LoginBar