import { useState, useEffect } from 'react';
import { IconButton } from "@material-ui/core";
import LoginBar from "./layout/LoginBar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginButton.module.css";
import BackgroundLetterAvatar from './BackgroundLetterAvatar';
import { fetchUserByUsername } from "../utils/apiUtils";
import { useCookies } from "react-cookie";

function LoginButton({isLoggedIn, isLoggedOut, token, username}) {
    const [cookies] = useCookies(['carerToken', 'patientToken', 'username'])
    const navigate = useNavigate();
    const [nome, setNome] = useState('Murilo Bell');

    /*useEffect(() => {
        if (cookies.carerToken || cookies.patientToken || cookies.username) {
          // Se pelo menos um cookie estiver presente, consideramos o usuário como logado
          setisLogged(true);
          setisNotLogged(false);
        } else {
          setisLogged(false);
          setisNotLogged(true);
        }
    }, [cookies]);*/
    
    if(cookies.carerToken){
        token = cookies.carerToken;
    }
    else if(cookies.patientToken){
        token = cookies.patientToken;
    }
    if(token) {
    // fetchUserByUsername(cookies.username, cookies.token)
    //     .then((username_data) => {
    //     console.log(username_data)
    //     setNome(username_data.nome);
    //     console.log("HEEELLLOOOO")
    //     })
    //     .catch((error) => {
    //     console.log(error.message);
    //     console.log("AAAAAA")
    //     });
    }

    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false);

    const toggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen);
    };

    return (
        <div className={styles.header_container}>
        {isLoggedOut && (
            <div className={styles.header_login_container}>
            <div className={styles.login_button}>
                <div className={styles.button_title}>Fazer login</div>
                <IconButton onClick={() => navigate("/login")} className={styles.button_account}>
                    <AccountCircle className={styles.button_icon} />
                </IconButton>
            </div>
            </div>
        )}
        {isLoggedIn && (
        <div className={styles.header_actions}>
        <button className={styles.header_login} onClick={toggleLoginBar}>
            <BackgroundLetterAvatar name = {nome} />
        </button>
        </div>
        )}
        {isLoggedIn && isLoginBarOpen && <LoginBar username={username} nome={nome}/>}
        </div>
    );
}

export default LoginButton