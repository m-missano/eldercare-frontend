import {useState} from "react";
import styles from "./PageProfile.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from '@material-ui/core';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';

function PageProfile() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div className={styles.profile_container}>

            <div className={styles.header_container}>
                <Header />
            </div>

            <div className={`${styles.page_container} ${styles.customFont}`}>
                <div className={styles.caregiver_left_content}>
                    <div className={styles.caregiver_image}></div>
                    <div className={styles.cargiver_contact}>
                        <p>Um texto aqui</p>
                        <p>Um texto aqui</p>
                        <p>Um texto aqui</p>
                        <p>Um texto aqui</p>
                    </div>
                </div>
                <div className={styles.caregiver_right_content}>
                    <div className={styles.caregiver_header}>
                        <h1>Outro texto aqui</h1>
                        <IconButton 
                        onClick={handleOpen}
                        className={styles.editButton}
                        >
                        <EditIcon 
                        fontSize="large"
                        className={styles.editIcon}
                        />
                        </IconButton>
                        <Modal open={open} onClose={handleClose} className={styles.modal} BackdropProps={{ onClick: handleClose }}>
                          <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                              <h2 className={styles.modalTitle}>EDITAR PERFIL</h2>
                                <IconButton onClick={handleClose} className={styles.closeButton} >
                                  <CancelOutlinedIcon className={styles.closeIcon}/>
                                </IconButton>
                            </div>
                            <div className={styles.form_group}>
                                <h3>Descrição:</h3>
                                <label>Insira uma descrição personalizada para que seu perfil chame mais atenção nas buscas.</label>
                                <textarea
                                    placeholder="Capriche, seu danado"
                                ></textarea>
                            </div>
                            <div className={styles.buttons_container}>
                                <Button variant="contained"
                                        color="primary"
                                        className={styles.cancelButton}
                                        onClick={handleClose}
                                >
                                Cancelar
                                </Button>
                                <Button variant="contained"
                                        color="primary"
                                        className={styles.saveButton}
                                        onClick={handleClose}
                                >
                                Salvar
                                </Button>
                            </div>
                          </div>
                        </Modal>
                    </div>
                    <p>Mais um texto</p>
                </div>
            </div>

            <div className={styles.footer_section}>
                <Footer />
            </div>            
        </div>
    );
}

export default PageProfile