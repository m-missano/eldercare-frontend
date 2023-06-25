import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Updater.module.css";
import Header from "../components/Header";
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../components/Footer";
import validator from 'validator';
import Profile from "../components/Profile";
import { cpf } from "cpf-cnpj-validator";
import { removeNonNumeric } from "../utils/Utils";
import { useCookies } from "react-cookie";
import { fetchUserByUsername } from "../utils/apiUtils";
import { formatDate } from "../utils/Utils"
import { updateUser } from "../utils/apiUtils";


function Updater() {

    const [cookies, setCookies] = useCookies(['carerToken', 'patientToken', 'username'])
    const navigate = useNavigate();

    const [userData, setUserData] = useState();

    const { register, 
            handleSubmit, 
            formState: {errors},
            watch,  
        } = useForm({
                delayError: 1500,
                defaultValues: () => {
                    let token                    
                    if (cookies.carerToken || cookies.patientToken || cookies.username) {
                        if(cookies.carerToken){
                            token = cookies.carerToken;
                        }
                        else if(cookies.patientToken){
                            token = cookies.patientToken;
                        }
                        
                        return fetchUserByUsername(cookies.username, token)
                        .then((username_data) => {
                            setUserData(username_data)
                            return {
                                name: username_data.nome,
                                username: username_data.login,
                                date: formatDate(username_data.dataNasc),
                                gender: username_data.sexo,
                                email: username_data.contato.email,
                                cellphone: username_data.contato.celular,
                                street: username_data.endereco.rua,
                                number: username_data.endereco.numero.toString(),
                                bairro: username_data.endereco.bairro,
                                city: username_data.endereco.cidade,
                                uf: username_data.endereco.uf,
                                cep: username_data.endereco.cep
                            };
                        })
                    } else {
                      /*
                      TODO: fazer o else
                      */
                    }

                }
            });

    const onSubmit = (data) => {
        if(userData.flag === "Carer"){
            const formattedDataCaregiver = {
                nome: data.name,
                cpf: userData.cpf,
                login: data.username,
                flag: userData.flag,
                sexo: data.gender,
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
                dataNasc: data.date,
                descricao: userData.descricao,
                reputacao: userData.reputacao
            }; 

            updateUser(cookies.carerToken, formattedDataCaregiver)            
                .then((client_data) => {
                alert('Dados atualizados com sucesso!');
                if(cookies.username !== data.username){
                    navigate('/login');
                }
                else{
                    navigate('/');
                }
            })
            .catch((err) => console.log(err.message))
        }
        else if(userData.flag === "Patient"){
            const formattedDataPatient = {
                nome: data.name,
                cpf: userData.cpf,
                login: data.username,
                flag: userData.flag,
                sexo: data.gender,
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
                dataNasc: data.date,
            };      

            updateUser(cookies.patientToken, formattedDataPatient)
                .then((client_id) => {
                    alert('Perfil atualizado com sucesso!');

                    if(cookies.username !== data.username){
                        navigate('/login');
                    }
                    else{
                        navigate('/');
                    }
                })
                .catch((err) => console.log(err.message))
        }
    };                          

    return (
    <div className={styles.updater_container}>
        <div className={styles.header_container}>
            <Header showLoginIcon={false}/>
        </div>

        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.form_box}>
                <div className={styles.profile_area}>
                    <Profile />
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
                
                <div className={styles.form_button_container}>
                    <button onClick={() => handleSubmit(onSubmit)()}>Atualizar dados</button>
                </div>
                
                </div>
            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>

    </div>
    );
  };
  
  export default Updater;