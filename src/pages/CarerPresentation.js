import { useEffect, useState } from "react";
import styles from "./CarerPresentation.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserById, updateUser } from "../utils/apiUtils";
import { useCookies } from "react-cookie";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

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
            setUserData(data);
        });
        } else if (cookies.patientToken) {
            fetchUserById(carerId, cookies.patientToken).then((data) =>
            setUserData(data)
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
                <div className={styles.caregiver_image}></div>
                <div className={styles.caregiver_contact}>
                    <div className={styles.address}>
                        < LocationOnOutlinedIcon className={styles.location_icon}/>
                        <span>{userData.endereco.cidade}, {userData.endereco.uf}</span>
                    </div>
                    <p>{userData.contato.email}</p>
                    <p>{userData.contato.celular}</p>
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