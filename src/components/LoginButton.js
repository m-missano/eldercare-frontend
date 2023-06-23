import { useState } from 'react';
import { IconButton } from "@material-ui/core";
import LoginBar from "./layout/LoginBar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginButton.module.css";
import BackgroundLetterAvatar from './BackgroundLetterAvatar';

function LoginButton({isLoggedIn, isLoggedOut, username}) {

    const navigate = useNavigate();
    const nome = "Muliro Bell";
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