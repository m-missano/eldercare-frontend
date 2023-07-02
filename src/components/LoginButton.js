import { useState, useEffect } from 'react';
import { IconButton } from "@material-ui/core";
import LoginBar from "./layout/LoginBar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginButton.module.css";
import BackgroundLetterAvatar from './BackgroundLetterAvatar';
import { fetchUserByUsername, fetchImage, setImage } from "../utils/apiUtils";
import { useCookies } from "react-cookie";

function LoginButton({isLoggedIn, isLoggedOut}) {
    const [cookies] = useCookies(['carerToken', 'patientToken', 'username'])
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        let token;
        if (cookies.carerToken || cookies.patientToken || cookies.username) {
            if(cookies.carerToken){
                token = cookies.carerToken;
                console.log("carerToken",token);
            }
            else if(cookies.patientToken){
                token = cookies.patientToken;
            }
            fetchUserByUsername(cookies.username, token)
            .then((username_data) => {
                console.log("username_data:", username_data)
                setNome(username_data.nome);
                setPath(username_data.path);
            })
        } else {
          /*
          TODO: fazer o else
          */
        }
    }, [cookies]);


    useEffect(() =>{
        let token;
        if (cookies.carerToken) {
            token = cookies.carerToken;

        } else if (cookies.patientToken) {
            token = cookies.patientToken;
        }
        fetchImage(cookies.username, token).then((imageUrl) => {
                setPath(imageUrl);
                const divElement = document.getElementById('profile_image');
                divElement.style.backgroundImage = `url(${imageUrl})`;
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);


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
        <>
            {path ? (
            <button className={styles.header_login} onClick={toggleLoginBar}>
                <div id="profile_image" className={styles.profile_image}></div>
            </button>
            ) : (
            <div className={styles.header_actions}>
                <button className={styles.header_login} onClick={toggleLoginBar}>
                <BackgroundLetterAvatar name={nome} />
                </button>
            </div>
            )}
        </>
        )}
        {isLoggedIn && isLoginBarOpen && <LoginBar username={cookies.username} nome={nome} path={path}/>}
        </div>
    );
}

export default LoginButton