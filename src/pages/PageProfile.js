import { useEffect, useState } from "react";
import styles from "./PageProfile.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserByUsername, updateUser } from "../utils/apiUtils";
import { useCookies } from "react-cookie";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

function PageProfile() {
    const [cookies, setCookies] = useCookies([
        "carerToken",
        "patientToken",
        "username",
    ]);

    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (cookies.carerToken) {
        fetchUserByUsername(cookies.username, cookies.carerToken).then((data) => {
            setUserData(data);
            console.log("do console: ", data);
        });
        } else if (cookies.patientToken) {
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
        if(userData.flag === "Carer"){
            const formattedDataCaregiver = {
                nome: userData.nome,
                cpf: userData.cpf,
                login: userData.login,
                flag: userData.flag,
                sexo: userData.sexo,
                contato: {
                    celular: userData.contato.celular,
                    email: userData.contato.email,
                },
                endereco: {
                    rua: userData.endereco.rua,
                    bairro: userData.endereco.bairro,
                    cidade: userData.endereco.cidade,
                    cep: userData.endereco.cep,
                    numero: userData.endereco.numero,
                    uf: userData.endereco.uf,
                },
                dataNasc: userData.dataNasc,
                descricao: document.getElementById("descricao").value,
                reputacao: userData.reputacao
            }; 

            console.log(formattedDataCaregiver.descricao)

            updateUser(cookies.carerToken, formattedDataCaregiver)            
                .then(() => {
                    userData.descricao = document.getElementById("descricao").value
                    setOpen(false);
            })
            .catch((err) => {
                console.log(err.message)
                alert('Erro ao atualizar a descrição');
            })
            
        }
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
                    <IconButton onClick={handleOpen} className={styles.editButton}>
                    <EditIcon
                        fontSize="large"
                        className={styles.editIcon}
                    />
                    </IconButton>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    className={styles.modal}
                    BackdropProps={{ onClick: handleClose }}
                    >
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>EDITAR PERFIL</h2>
                        <IconButton onClick={handleClose} className={styles.closeButton}>
                            <CancelOutlinedIcon className={styles.closeIcon} />
                        </IconButton>
                        </div>
                        <div className={styles.form_group}>
                        <h3>Descrição:</h3>
                        <label>
                            Insira uma descrição personalizada para que seu perfil chame mais atenção nas buscas.
                        </label>
                        <textarea 
                            value={userData.descricao} 
                            onChange={(e) => setUserData({ ...userData, descricao: e.target.value })} 
                            placeholder="Capriche, seu danado" id="descricao">
                        </textarea>
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
                </div>
                <p className={styles.description}>{userData.descricao}</p>
                </div>
            </div>

            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>
    );
}

export default PageProfile;