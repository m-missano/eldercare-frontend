import { useState } from "react";
import styles from "./Follow.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import { AddCircleOutline, Delete, ExpandMore } from "@material-ui/icons";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReadMoreReadLess from "../components/ReadMoreReadLess";

function Follow() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sections, setSections] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const addSection = () => {
    const newId = sections.length + 1;
    const newSection = {
      id: newId,
      name: activityName,
      description: activityDescription,
    };
    setSections([...sections, newSection]);
    setActivityName("");
    setActivityDescription("");
  };

  const updateDescription = (id, newDescription) => {
    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        return {
          ...section,
          description: newDescription,
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const removeSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.header_container}>
        <Header />
      </div>

      <div className={`${styles.page_container} ${styles.customFont}`}>
        <div className={styles.inner_container}>
          <div className={styles.inner_header}>
            <div className={styles.header_title}>
              <h1>Nome do idoso vai aqui</h1>
              <Modal
                open={open}
                onClose={handleClose}
                className={styles.modal}
                BackdropProps={{ onClick: handleClose }}
              >
                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>NOVA ATIVIDADE</h2>
                    <IconButton onClick={handleClose} className={styles.closeButton}>
                      <CancelOutlinedIcon className={styles.closeIcon} />
                    </IconButton>
                  </div>
                  <div className={styles.form_group}>
                    <h3>Nome da atividade:</h3>
                    <input
                      type="text"
                      placeholder="Nome da atividade"
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                    />
                    <h3>Descrição da atividade:</h3>
                    <textarea
                      placeholder="Descrição da atividade"
                      value={activityDescription}
                      onChange={(e) => setActivityDescription(e.target.value)}
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
                      onClick={() => {
                        addSection();
                        handleClose();
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className={styles.column_activity}>
            <div className={styles.form_title}> ATIVIDADES</div>
            <IconButton onClick={handleOpen} className={styles.addButton}>
              <AddCircleOutline className={styles.addIcon} />
            </IconButton>
          </div>
          <div className={styles.activities}>
            {sections.map((section) => (
              <div key={section.id} className={styles.activity}>
                <div className={styles.ReadMore_container}>
                    <ReadMoreReadLess
                        description={section.description}
                        onSave={(newDescription) => updateDescription(section.id, newDescription)}
                    />
                </div>
                <span className={styles.activityName}>{section.name}</span>
                <IconButton
                  onClick={() => removeSection(section.id)}
                  className={styles.removeButton}
                >
                  <Delete className={styles.removeIcon} />
                </IconButton>
                
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer_section}>
        <Footer />
      </div>
    </div>
  );
}

export default Follow;