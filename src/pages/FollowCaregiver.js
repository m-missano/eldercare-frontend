import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./FollowCaregiver.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, IconButton, Button } from "@material-ui/core";
import { AddCircleOutline, Delete } from "@material-ui/icons";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReadMoreReadLess from "../components/ReadMoreReadLess";
import { cpf } from "cpf-cnpj-validator";

function FollowCaregiver() {

    const cuidadorData = {
        "idPessoa": 1,
        "nome": "Cuidador",
        "cpf": "123456789",
        "login": "cuidador1",
        "password": "senha123",
        "contato": {
            "idContato": 1,
            "telefone": "123456789",
            "celular": "987654321",
            "email": "cuidador1@example.com"
        },
        "endereco": {
            "idEndereco": 1,
            "rua": "Rua dos Cuidados",
            "bairro": "Bairro Cuidadoso",
            "cidade": "Cidade dos Cuidadores",
            "cep": "12345-678",
            "numero": "123",
            "uf": "UF"
        },
        "descricao": "Descrição do Cuidador",
        "reputacao": 5,
        "idososCuidados": [
            {
                "id": 1,
                "idade": 70,
                "sexo": "Masculino",
                "condicoesMedicas": "Hipertensão",
                "nome": "Idoso 1"
            },
            {
                "id": 2,
                "idade": 75,
                "sexo": "Feminino",
                "condicoesMedicas": "Diabetes",
                "nome": "Idoso 2"
            },
            {
                "id": 3,
                "idade": 80,
                "sexo": "Masculino",
                "condicoesMedicas": "Artrite",
                "nome": "Idoso 3"
            }
        ]
    };

    const { register, 
        handleSubmit, 
        formState: {errors},
        reset, 
        clearErrors 
    } = useForm({delayError: 1500});

    const onSubmit = (data) => {
        console.log(data);
    };
    const [selectedIdoso, setSelectedIdoso] = useState('');
    const [sections, setSections] = useState([]);
    const [activityName, setActivityName] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const idososCuidados = cuidadorData.idososCuidados;

    const selectOptions = idososCuidados.map((idoso) => (
        <option value={idoso.id}>{`${idoso.nome} - ${idoso.idade} anos - ${idoso.sexo}`}</option>
    ));
    
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
                <div className={styles.select_idoso}>
                    <select value={selectedIdoso} onChange={(e) => setSelectedIdoso(e.target.value)}>
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
                                        {errors?.CPF?.type === 'required' && <p className={styles.error_message}>Token necessário.</p>}
                                        
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

export default FollowCaregiver;