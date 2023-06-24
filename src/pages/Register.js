import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import Header from "../components/Header";
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../components/Footer";
import validator from 'validator';
import Profile from "../components/Profile";
import { cpf } from "cpf-cnpj-validator";
import { removeNonNumeric } from "../utils/Utils";
import { addUser, addElder, deleteUser, fetchUsers } from "../utils/apiUtils";

function Register() {
    const { register, 
            handleSubmit, 
            formState: {errors},
            watch,  
        } = useForm({delayError: 1500});

    const navigate = useNavigate();
    
    const [userType, setUserType] = useState("procuroCuidador");
    //userType = "procuroCuidador"
    //userType = "souCuidador"
    const [addElderSection, setAddSection] = useState();
    //AddElderSection = true : Cadastrando para outra pessoa
    //AddElderSection = false: Cadastrando para mim

    const onSubmit = (data) => {
        console.log(data)
        
        if(userType === "souCuidador"){
        const formattedDataCaregiver = {
            nome: data.name,
            cpf: data.CPF,
            login: data.username,
            password: data.password,
            flag: "Carer",
            sexo: data.gender,
            dataNasc: data.date,
            contato: {
            celular: data.cellphone,
            email: data.email,
            },
            endereco: {
                rua: data.street,
                bairro: data.bairro,
                cidade: data.city,
                cep: data.cep,
                numero: data.number,
                uf: data.uf,
            },
            descricao: `Olá, eu me chamo ${data.name}`,
            reputacao: 0,
            relacaoIdoso: "",
            idososCuidados: [],
            };  

            console.log("Cuidador: " + formattedDataCaregiver)

            addUser(formattedDataCaregiver)            
                .then((client_data) => {
                console.log("ID CuidadorDB: " + client_data)
                alert('Cuidador registrado com sucesso!');
                    navigate('/login');
            })
            .catch((err) => console.log(err.message))
        }
        else if(userType === "procuroCuidador"){
            const formattedDataPatient = {
                nome: data.name,
                cpf: data.CPF,
                login: data.username,
                password: data.password,
                flag: "Patient",
                sexo: data.gender,
                dataNasc: data.date,
                contato: {
                celular: data.cellphone,
                email: data.email,
                },
                endereco: {
                    rua: data.street,
                    bairro: data.bairro,
                    cidade: data.city,
                    cep: data.cep,
                    numero: data.number,
                    uf: data.uf,
                },
                relacaoIdoso: "Parente",
                idososRelacionados: [],
            };      
            
            console.log("Cliente: " + formattedDataPatient)

            addUser(formattedDataPatient)
                .then((client_id) => {
                    
                    console.log("ClienteDB: " + client_id)
                    if(addElderSection){
                        const formattedDataElder = {
                            nome: data.name_elder,
                            cpf: data.CPF_elder,
                            dataNasc: data.date_elder,
                            sexo: data.gender_elder,
                            condicoesMedicas: data.extraInfo,
                        }
        
                        addElder(client_id, formattedDataElder)            
                            .then(() => {
                                alert('Registrado com sucesso!');
                                navigate('/login');
                        })
                        .catch((err) => {
                            console.log(err.message)
                            deleteUser(client_id.cpf)            
                                .then(() => {
                                    alert('Erro de cadastro');
                                    navigate('/home');
                            }).catch((err) => console.log(err.message))
                        })
        
                    }
                    else if(!addElderSection){
                        const formattedDataMyself = {
                            nome: data.name,
                            cpf: data.CPF,
                            dataNasc: data.date,
                            sexo: data.gender,
                            condicoesMedicas: data.extraInfo,
                        }
        
                        addElder(client_id, formattedDataMyself)            
                            .then(() => {
                                alert('Registrado com sucesso!');
                                navigate('/login');
                        })
                        .catch((err) => {
                            console.log(err.message)
                            deleteUser(client_id.cpf)            
                                .then(() => {
                                    alert('Erro de cadastro');
                                    navigate('/home');
                            }).catch((err) => console.log(err.message))
                        })
                    }
                })
                .catch((err) => console.log(err.message))
        }
    };

   
    
    const watchPassword = watch("password");                          

    return (
    <div className={styles.register_container}>
        <div className={styles.header_container}>
            <Header showLoginIcon={false}/>
        </div>

        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.form_box}>
                <div className={styles.profile_area}>
                    <Profile />
                </div>
                <div className={styles.option_box}>
                    <div className={styles.patient_option}>
                        <input
                        type="radio"
                        id="check-patient"
                        name="option"
                        value="procuroCuidador"
                        checked={userType === "procuroCuidador"}
                        onChange={() => setUserType("procuroCuidador")}
                        />
                        <label htmlFor="check-patient">Procuro Cuidador</label>
                    </div>
                    <div className={styles.carer_option}>
                        <input
                        type="radio"
                        id="check-carer"
                        name="option"
                        value="souCuidador"
                        checked={userType === "souCuidador"}
                        onChange={() => {setUserType("souCuidador")
                                        setAddSection(false)           
                        }}
                        />
                        <label htmlFor="check-carer">Sou Cuidador</label>
                    </div>
                </div>
                <div className={styles.form_title}> DADOS DO USUÁRIO </div>
                <div className={styles.column}>
                    <div className={styles.form_group}>
                        <label>Nome</label>
                        <input
                        className={errors?.name && styles.input_error}
                        type="text"
                        placeholder="Seu nome"
                        {...register("name", {required: true })}
                        />
                        {errors?.name?.type === 'required' && <p className={styles.error_message}>Nome é necessário.</p>}
                    </div>
                    <div className={styles.form_group}>
                        <label>Data de nascimento</label>
                        <input
                        className={errors?.date && styles.input_error}
                        type="date"
                        placeholder="Data de nascimento"
                        {...register("date", {
                            required: true,
                            validate: {
                                validAge: (value) => {
                                    const selectedDate = new Date(value);
                                    const currentDate = new Date();
                                    return selectedDate < currentDate;
                                }
                            }
                        })}
                        />
                        {errors?.date?.type === 'required' && <p className={styles.error_message}>Data de nascimento necessária.</p>}
                        {errors?.date?.type === 'validAge' && <p className={styles.error_message}>A data de nascimento deve ser anterior à data atual.</p>}
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.form_group}>
                        <label>CPF</label>
                        <input
                        className={errors?.CPF && styles.input_error}
                        type="text"
                        placeholder="Seu CPF"
                        {...register("CPF", {
                            required: true,
                            validate: (value) => cpf.isValid(value)                                
                        })}
                        />
                        {errors?.CPF?.type === 'required' && <p className={styles.error_message}>CPF necessário.</p>}
                        {errors?.CPF?.type === 'validate' && <p className={styles.error_message}>CPF não é válido.</p>}
                    </div>
                    <div className={styles.form_group_uf}>
                        <div className={styles.selectContainer}>
                            <label>
                                Sexo
                            </label>
                            <select
                            className={`${styles.select_uf} ${errors?.gender && styles.error_selec_message}`}
                            {...register("gender", {validate: (value) => {
                                return value !== "0" 
                            }})}
                            >
                            <option value="0">Selecione sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Não Especificado">Prefiro não dizer</option>
                            </select>

                            {errors?.gender?.type === 'validate' && (
                            <p className={styles.error_message}>Sexo necessário.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label>Nome de usuário</label>
                    <input
                    className={errors?.username && styles.input_error}
                    type="text"
                    placeholder="Seu nome de usuário"
                    {...register("username", {required: true })}
                    />
                    {errors?.username?.type === 'required' && <p className={styles.error_message}>Nome de usuário é necessário.</p>}
                </div>

                <div className={styles.column}>
                    <div className={styles.form_group}>
                        <label>Senha</label>
                        <input
                        className={errors?.password && styles.input_error}
                        type="password"
                        placeholder="Senha"
                        {...register("password", {required: true, minLength: 8})}
                        />
                        {errors?.password?.type === 'required' && (
                        <p className={styles.error_message}>Forneça uma senha, por favor.</p>
                        )}
                        {errors?.password?.type === 'minLength' && (
                        <p className={styles.error_message}>Senha deve ter no mínimo 8 caracteres.</p>
                        )}
                    </div>

                    <div className={styles.form_group}>
                        <label>Confirmação de senha</label>
                        <input
                        className={errors?.passwordConfirmation && styles.input_error}
                        type="password"
                        placeholder="Digite sua senha novamente"
                        {...register("passwordConfirmation", {
                            required: true, 
                            minLength: 8,
                            validate: (value) => value === watchPassword,
                        })}
                        />
                        {errors?.passwordConfirmation?.type === 'required' && (
                        <p className={styles.error_message}>Confirmação de senha necessária.</p>
                        )}
                        {errors?.password?.type === 'minLength' && (
                        <p className={styles.error_message}>Senha deve ter no mínimo 8 caracteres.</p>
                        )}
                        {errors?.passwordConfirmation?.type === 'validate' && (
                        <p className={styles.error_message}>Senhas não são iguais.</p>
                        )}
                    </div>
                </div>  

                <div className={styles.form_title}> CONTATO </div>
                <div className={styles.form_group}>
                    <label>E-mail</label>
                    <input
                    className={errors?.email && styles.input_error}
                    type="email"
                    placeholder="Seu e-mail"
                    {...register("email", {required: true, validate: (value) => validator.isEmail(value)})}
                    />
                    {errors?.email?.type === 'required' && <p className={styles.error_message}>Email é necessário.</p>}
                    {errors?.email?.type === 'validate' && <p className={styles.error_message}>Email não é válido.</p>}
                </div> 
                
                <div className={styles.form_group}>
                    <label>Celular</label>
                    <input
                    className={errors?.cellphone && styles.input_error}
                    type="phone"
                    placeholder="Seu número de celular"
                    {...register("cellphone", {required: true, validate: (value) => validator.isMobilePhone(value)})}
                    />
                    {errors?.cellphone?.type === 'required' && <p className={styles.error_message}>Celular é necessário.</p>}
                    {errors?.cellphone?.type === 'validate' && <p className={styles.error_message}>Celular não é válido.</p>}
                </div> 
                
                <div className={styles.form_title}> ENDEREÇO </div>
                    <div className={styles.column}>
                        <div className={styles.form_group}>
                            <label>Rua</label>
                            <input
                            className={errors?.street && styles.input_error}
                            type="text"
                            placeholder="Sua rua"
                            {...register("street", {required: true})}
                            />
                            {errors?.street?.type === 'required' && (
                            <p className={styles.error_message}>Forneça o nome da rua, por favor.</p>
                            )}
                        </div>

                        <div className={styles.form_group}>
                            <label>Número</label>
                            <input
                            className={`${styles.input_number} ${errors?.number ? styles.input_error : ''}`}
                            type="text"
                            placeholder="Número da residência"
                            {...register("number", {
                                required: true, 
                                validate: (value) => validator.isNumeric(value),
                            })}
                            />
                            {errors?.number?.type === 'required' && (
                            <p className={styles.error_message}>Número da residência necessário</p>
                            )}
                            {errors?.number?.type === 'validate' && (
                            <p className={styles.error_message}>Valor inválido</p>
                            )}
                        </div>
                </div>
                
                <div className={styles.form_group}>
                    <label>Bairro</label>
                    <input
                    className={errors?.bairro && styles.input_error}
                    type="text"
                    placeholder="Seu bairro"
                    {...register("bairro", {required: true})}
                    />
                    {errors?.bairro?.type === 'required' && (
                    <p className={styles.error_message}>Forneça o nome do bairro, por favor.</p>
                    )}
                </div>   

                <div className={styles.column}>
                    <div className={styles.form_group}>
                        <label>Cidade</label>
                        <input
                        className={errors?.city && styles.input_error}
                        type="text"
                        placeholder="Sua cidade"
                        {...register("city", {required: true})}
                        />
                        {errors?.city?.type === 'required' && (
                        <p className={styles.error_message}>Forneça o nome da cidade, por favor.</p>
                        )}
                    </div>

                    <div className={styles.form_group_uf}>
                        <div className={styles.selectContainer}>
                            <label>
                                UF
                            </label>
                            <select
                            className={`${styles.select_uf} ${errors?.uf && styles.error_selec_message}`}
                            {...register("uf", {validate: (value) => {
                                return value !== "0" 
                            }})}
                            >
                            <option value="0">Selecione UF</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                            </select>

                            {errors?.uf?.type === 'validate' && (
                            <p className={styles.error_message}>UF necessária.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label>CEP</label>
                    <input
                    className={errors?.cep && styles.input_error}
                    type="text"
                    placeholder="Insira o CEP"
                    {...register("cep", {
                        required: true, 
                        validate: {
                            validType: (value) => /^[0-9]{5}-[0-9]{3}$/.test(value),
                            validLength: (value) => removeNonNumeric(value).length === 8
                        }    
                    })}
                    />
                    {errors?.cep?.type === 'required' && (
                    <p className={styles.error_message}>CEP necessário</p>
                    )}
                    {errors?.cep?.type === 'validLength' && (
                    <p className={styles.error_message}>CEP deve ter 8 caracteres.</p>
                    )}
                    {errors?.cep?.type === 'validType' && (
                    <p className={styles.error_message}>CEP inválido</p>
                    )}
                </div>
                
                {userType === "procuroCuidador" && (
                 <div className={styles.option_box}>
                    <div className={styles.inner}>
                        <div>
                            <input
                            type="radio"
                            id="check-forMe"
                            name="optionb"
                            value="procuroCuidador"
                            checked={!addElderSection}
                            onChange={() => setAddSection(false)}
                            />
                            <label htmlFor="check-forMe">Estou cadastrando para mim.</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            id="check-forOther"
                            name="optionb"
                            value="forOther"
                            checked={addElderSection}
                            onChange={() => setAddSection(true)}
                            />
                            <label htmlFor="check-forOther">Estou cadastrando para outra pessoa.</label>
                        </div>
                    </div>
                </div>
                )}

                {addElderSection && (
                <div>
                    <div className={styles.form_title}> DADOS DO IDOSO </div>
                    <div className={styles.column}>
                        <div className={styles.form_group}>
                            <label>Nome</label>
                            <input
                            className={errors?.name_elder && styles.input_error}
                            type="text"
                            placeholder="Nome do idoso"
                            {...register("name_elder", {required: true })}
                            />
                            {errors?.elder_name?.type === 'required' && <p className={styles.error_message}>Nome é necessário.</p>}
                        </div>
                        <div className={styles.form_group}>
                            <label>Data de nascimento</label>
                            <input
                            className={errors?.date_elder && styles.input_error}
                            type="date"
                            placeholder="Data de nascimento"
                            {...register("date_elder", {
                                required: true,
                                validate: {
                                    validAge: (value) => {
                                        const selectedDate = new Date(value);
                                        const currentDate = new Date();
                                        return selectedDate < currentDate;
                                    }
                                }
                            })}
                            />
                            {errors?.date_elder?.type === 'required' && <p className={styles.error_message}>Data de nascimento necessária.</p>}
                            {errors?.date_elder?.type === 'validAge' && <p className={styles.error_message}>A data de nascimento deve ser anterior à data atual.</p>}
                        </div>
                    </div>
                            
                    <div className={styles.column}>
                        <div className={styles.form_group}>
                            <label>CPF</label>
                            <input
                            className={errors?.CPF_elder && styles.input_error}
                            type="text"
                            placeholder="CPF do idoso"
                            {...register("CPF_elder", {
                                required: true,
                                validate: (value) => cpf.isValid(value)                                
                            })}
                            />
                            {errors?.CPF_elder?.type === 'required' && <p className={styles.error_message}>CPF necessário.</p>}
                            {errors?.CPF_elder?.type === 'validate' && <p className={styles.error_message}>CPF não é válido.</p>}
                        </div>
                        <div className={styles.form_group_uf}>
                            <div className={styles.selectContainer}>
                                <label>
                                    Sexo
                                </label>
                                <select
                                className={`${styles.select_uf} ${errors?.gender_elder && styles.error_selec_message}`}
                                {...register("gender_elder", {validate: (value) => {
                                    return value !== "0" 
                                }})}
                                >
                                <option value="0">Selecione sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Não Especificado">Prefiro não dizer</option>
                                </select>

                                {errors?.gender_elder?.type === 'validate' && (
                                <p className={styles.error_message}>Sexo necessário.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                )}

                <div className={styles.form_group}>
                    <label>Condições médicas e informações complementares.</label>
                    <textarea
                        placeholder="Insira informações extras, se desejar"
                        {...register("extraInfo", {
                            required: false,
                        })}
                    ></textarea>
                </div>

                <div className={styles.form_group}>
                    <div className={styles.checkbox_group}>
                    <input
                        type="checkbox"
                        name="privacy-policy"
                        {...register("privacyTerms", {required: true })}
                    />
                    <label className={styles.check_label}>Concordo com a política de privacidade</label>
                    </div>

                    {errors?.privacyTerms?.type === 'required' && (
                    <p className={styles.error_message_check}>Você deve concordar com a política de privacidade.</p>
                    )}
                </div>

                <div className={styles.form_button_container}>
                    <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
                </div>
                
                </div>
            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>

    </div>
    );
  };
  
  export default Register;