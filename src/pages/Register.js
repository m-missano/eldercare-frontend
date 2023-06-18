import { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import styles from "./Register.module.css";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import validator from 'validator';

function Register() {
    const { register, 
            handleSubmit, 
            formState: {errors},
            watch,  
        } = useForm({delayError: 1500});

    const onSubmit = (data) => {
        console.log(data);
    };

    const [addressSections, setAddressSections] = useState([]);

    const handleAddAddress = () => {
      setAddressSections(prevSections => [...prevSections, {}]);
    };

    const watchPassword = watch("password");                          

    return (
    <div className={styles.register_container}>
        <div className={styles.header_container}>
            <Header showLoginIcon={false}/>
        </div>

        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.form_box}>
                <div className={styles.form_title}> DADOS DE USUÁRIO </div>
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
                
                <div className={styles.column_adress}> 
                    <div className={styles.form_title}> ENDEREÇOS </div>
                    <div className={styles.add_button_container}>
                        <button onClick={handleAddAddress}>+</button>
                    </div>
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
                    <p className={styles.error_message}>Você deve concordar com a política de privacidade.</p>
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