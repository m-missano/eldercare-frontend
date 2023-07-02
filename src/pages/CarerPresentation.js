import { useEffect, useState } from "react";
import styles from "./CarerPresentation.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchUserById, fetchImage } from "../utils/apiUtils";
import { useCookies } from "react-cookie";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';

function CarerPresentation() {
    const [cookies, setCookies] = useCookies([
        "carerToken",
        "patientToken",
        "username",
    ]);

    const [userData, setUserData] = useState(null);

    
    useEffect(() => {
        let carerId = localStorage.getItem('currentCarerId')
        if (cookies.carerToken) {
            fetchUserById(carerId, cookies.carerToken).then((data) => {
                
                fetchImage(data.login, cookies.carerToken).then((imageUrl) => {
                    const divElement = document.getElementById('carer_pic');
                    console.log(divElement)
                    divElement.style.backgroundImage = `url(${imageUrl})`;
                })
                .catch((error) => {
                    console.log(error.message);
                });   

            setUserData(data);
        });
        } else if (cookies.patientToken) {
            fetchUserById(carerId, cookies.patientToken).then((data) => {
                
                fetchImage(data.login, cookies.patientToken).then((imageUrl) => {
                    const divElement = document.getElementById('carer_pic');
                    console.log(divElement)
                    divElement.style.backgroundImage = `url(${imageUrl})`;
                })
                .catch((error) => {
                    console.log(error.message);
                });   
                setUserData(data)
            }
        );
        }
    }, []);



    // Renderização condicional quando userData estiver definido
    if (userData === null) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.profile_container}>
            <div className={styles.header_container}>
                <Header />
            </div>

            <div className={`${styles.page_container} ${styles.customFont}`}>
                <div className={styles.caregiver_left_content}>
                {userData.path ? (
                <div id="carer_pic" className={styles.caregiver_image}></div>
                ) : (
                <div className={styles.caregiver_image}><AccountCircle className={styles.button_icon} /></div>
                )}
                <div className={styles.caregiver_contact}>
                <div className={styles.address}>
                        <div>
                            <strong>Endereço: </strong>
                            <span>{userData.endereco.cidade}, {userData.endereco.uf}</span>
                        </div>
                        < LocationOnOutlinedIcon className={styles.location_icon}/>
                    </div>
                    <p className={styles.elder_contact}><strong>Email: </strong>{userData.contato.email}</p>
                    <p className={styles.elder_contact}><strong>Celular: </strong>{userData.contato.celular}</p>
                </div>
                </div>
                <div className={styles.caregiver_right_content}>
                <div className={styles.caregiver_header}>
                    <h1>{userData.nome}</h1>
                </div>
                <p className={styles.description}><p>{userData.descricao}</p></p>
                </div>
            </div>

            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>
    );
}

export default CarerPresentation;