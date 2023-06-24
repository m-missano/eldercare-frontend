import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./FollowCaregiver.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import { AddCircleOutline, Delete } from "@material-ui/icons";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReadMoreReadLess from "../components/ReadMoreReadLess";
import { cpf } from "cpf-cnpj-validator";
import { useCookies } from "react-cookie";
import { fetchUserByUsername, fetchActivityByElderID, updateActivity } from "../utils/apiUtils";
import { formatDate, getAge } from "../utils/Utils";

function FollowCaregiver() {
    const [cookies] = useCookies(['carerToken', 'username'])

    const { register, 
        handleSubmit, 
        formState: {errors},
        reset, 
        clearErrors 
    } = useForm({delayError: 1500});

    const onSubmit = (data) => {
        console.log(data);
    };

    const [selectedIdoso, setSelectedIdoso] = useState(0);
    const [sections, setSections] = useState([]);
    const [nome, setNome] = useState('Idoso');
    const [activityName, setActivityName] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [idososCuidados, setIdososCuidados] = useState([]);

    const resetForm = () => {
        reset(); 
        clearErrors(); 
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const openModalHandler = () => {
        setOpenModal(true);
    };

    const closeModalHandler = () => {
        setOpenModal(false);
    };

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

    const updateDescription = (id, newDescription, newName) => {
        const updatedSections = sections.map((section) => {
           console.log("id que veio",id); 
          if (section.id === id) {
            const formattedData = {
              categoriaAtividade: section.name,
              descricao: newDescription,
              id: idososCuidados[selectedIdoso - 1].rotinas[section.id].id,
            };
      
            updateActivity(idososCuidados[selectedIdoso - 1].id, formattedData.id, cookies.carerToken, formattedData)
              .then((response) => {
                console.log('Descrição atualizada com sucesso!');
              })
              .catch((error) => {
                console.log('Erro ao atualizar descrição:', error.message);
              });
      
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

    useEffect(() => {
        if (cookies.carerToken || cookies.username) {
            fetchUserByUsername(cookies.username, cookies.carerToken)
            .then((carer_data) => {
                setIdososCuidados(carer_data.idososCuidados);
                setSelectOptions(carer_data.idososCuidados.map((idoso, index) => (
                    <option value={index+1}>{`${idoso.nome} - ${getAge(idoso.dataNasc)} anos - ${idoso.sexo}`}</option>
                    ))
                );
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }, [cookies]);

    useEffect(() => {
        if (selectedIdoso != 0) {
            setNome(idososCuidados[selectedIdoso-1].nome);
            const elderID = idososCuidados[selectedIdoso-1].id;
            fetchActivityByElderID(elderID, cookies.carerToken)
            .then((activity_data) => {
                console.log("atv:",activity_data)
                const activities = activity_data.map((activity, index) => ({
                    id: index,
                    name: activity.categoriaAtividade,
                    description: activity.descricao,
                }));
                setSections(activities);
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }, [selectedIdoso]);

    return (
        <div className={styles.profile_container}>
            <div className={styles.header_container}>
                <Header />
            </div>

            <div className={`${styles.page_container} ${styles.customFont}`}>
                <div className={styles.select_idoso}>
                    <select value={selectedIdoso} onChange={(e) => setSelectedIdoso(parseInt(e.target.value))}>
                        <option value="0">Selecione o idoso que deseja acompanhar</option>
                        {selectOptions}
                    </select>
                    <div className={styles.column_addIdoso}>
                        <div className={styles.idosoTitle}> ADICIONAR IDOSO</div>
                        <IconButton onClick={openModalHandler} className={styles.addButton}>
                            <AddCircleOutline className={styles.addIcon} />
                        </IconButton>
                    </div>
                </div>
                <div className={styles.inner_container}>
                    <div className={styles.inner_header}>
                        <div className={styles.header_title}>
                            <h1>{nome}</h1>
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
                            <Modal
                                open={openModal}
                                onClose={closeModalHandler}
                                className={styles.modal}
                                BackdropProps={{
                                      onClick: () => {
                                      closeModalHandler();
                                      resetForm();
                                    }
                                  }}
                            >
                                <div className={styles.modalContentB}>
                                    <div className={styles.modalHeader}>
                                    <h2 className={styles.modalTitle}>DADOS PARA ACOMPANHAMENTO</h2>
                                    <IconButton   onClick={() => { closeModalHandler();
                                                                   resetForm(); 
                                                            }} className={styles.closeButton}>
                                        <CancelOutlinedIcon className={styles.closeIcon} />
                                    </IconButton>
                                    </div>
                                    <div className={styles.form_group}>
                                        <label>CPF</label>
                                        <input
                                        className={errors?.CPF && styles.input_error}
                                        type="text"
                                        placeholder="CPF do idoso"
                                        {...register("CPF", {
                                            required: true,
                                            validate: (value) => cpf.isValid(value)                                
                                        })}
                                        />
                                        {errors?.CPF?.type === 'required' && <p className={styles.error_message}>CPF necessário.</p>}
                                        {errors?.CPF?.type === 'validate' && <p className={styles.error_message}>CPF não é válido.</p>}
                                    </div>
                                    <div className={styles.form_group}>
                                        <label>Token de compartilhamento</label>
                                        <input
                                        className={errors?.token && styles.input_error}
                                        type="text"
                                        placeholder="Insira o token"
                                        {...register("token", {
                                            required: true,                              
                                        })}
                                        />
                                        {errors?.token?.type === 'required' && <p className={styles.error_message}>Token necessário.</p>}
                                        
                                    </div>
                                    <div className={styles.buttons_container}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={styles.cancelButton}
                                            onClick={() => {
                                                closeModalHandler();
                                                resetForm(); 
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={styles.saveButton}
                                            onClick={() => {
                                                handleSubmit(onSubmit)()
                                            }}
                                        >
                                            Cadastrar
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className={styles.column_activity}>
                        <div className={styles.form_title}> ATIVIDADES</div>
                        {selectedIdoso > 0 && (<IconButton onClick={handleOpen} className={styles.addButton}>
                            <AddCircleOutline className={styles.addIcon} />
                        </IconButton>)}
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

export default FollowCaregiver;