import { useEffect, useState } from "react";
import styles from "./PagePatient.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserByUsername, updateMedicCond } from "../utils/apiUtils";
import { useCookies } from "react-cookie";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getAge } from "../utils/Utils";
import MyPopper from "../components/MyPopper";

function PagePatient() {
    const [cookies, setCookies] = useCookies([
        "patientToken",
        "username",
    ]);

    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (cookies.patientToken) {
        fetchUserByUsername(cookies.username, cookies.patientToken).then((data) =>
            setUserData(data)
        );
        }
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () => {
        const formattedDataElder = {
            condicoesMedicas: userData.idososRelacionados[0].condicoesMedicas,
        }; 

        console.log(formattedDataElder.descricao)

        updateMedicCond(userData.idososRelacionados[0].id, cookies.patientToken, formattedDataElder)            
            .then(() => {
                userData.idososRelacionados[0].condicoesMedicas = document.getElementById("descricao").value
                setOpen(false);
        })
        .catch((err) => {
            console.log(err.message)
            alert('Erro ao atualizar a descrição');
        })
        
    }; 

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
                <div className={styles.general_info}>
                    <h1>{userData.idososRelacionados[0].nome} ({getAge(userData.idososRelacionados[0].dataNasc)} anos)</h1>
                    <p className={styles.elder_gender}><strong>Sexo: </strong>{userData.idososRelacionados[0].sexo}</p>
                    <div className={styles.address}>
                        <strong>Endereço: </strong>
                        <span>{userData.endereco.cidade}, {userData.endereco.uf}</span>
                        < LocationOnOutlinedIcon className={styles.location_icon}/>
                    </div>
                    <p className={styles.elder_contact}><strong>Email: </strong>{userData.contato.email}</p>
                    <p className={styles.elder_contact}><strong>Celular: </strong>{userData.contato.celular}</p>
                    <div className={styles.token}>
                        <p><strong>Token de Compartilhamento: </strong>{userData.idososRelacionados[0].token}</p>
                        <MyPopper popInfo="Envie o token para o cuidador para ele registrar o idoso"/>
                    </div>
                </div>

                <div className={styles.elder_right_content}>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        className={styles.modal}
                        BackdropProps={{ onClick: handleClose }}
                        >
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>EDITAR CONDICOES MEDICAS</h2>
                            <IconButton onClick={handleClose} className={styles.closeButton}>
                                <CancelOutlinedIcon className={styles.closeIcon} />
                            </IconButton>
                            </div>
                            <div className={styles.form_group}>
                            <h3>Condições Médicas</h3>
                            <label>
                                Informe as condições médicas do idoso para ajudar o cuidador
                            </label>
                            <textarea
                                value={userData.idososRelacionados[0].condicoesMedicas}
                                onChange={(e) => {
                                    const newIdososRelacionados = [...userData.idososRelacionados];
                                    newIdososRelacionados[0].condicoesMedicas = e.target.value;

                                    setUserData({ ...userData, idososRelacionados: newIdososRelacionados });
                                }}
                                placeholder="Complemente seu perfil com suas informações médicas."
                                id="descricao"
                            ></textarea>
                            </div>
                            <div className={styles.buttons_container}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.cancelButton}
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={styles.saveButton}
                                onClick={handleSave}
                            >
                                Salvar
                            </Button>
                            </div>
                        </div>
                        </Modal>

                    <div className={styles.description_header}>
                        <h2>Informações Médicas Complementares</h2>
                        <div className={styles.editBox}>
                            <IconButton onClick={handleOpen} className={styles.editButton}>
                                <EditIcon
                                    fontSize="large"
                                    className={styles.editIcon}
                                />
                            </IconButton>
                        </div>    
                    </div>
                    <p className={styles.description}> {userData.idososRelacionados[0].condicoesMedicas}</p>
                </div>
            </div>

            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>
    );
}

export default PagePatient;