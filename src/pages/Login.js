import styles from "./Login.module.css";
import Header from "../components/Header";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { useCookies } from 'react-cookie';
import { fetchUserByUsername } from "../utils/apiUtils";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['jwtToken']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "login":username, "password":password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.Authorization;
        setCookie('username', username);
        console.log(token);
        fetchUserByUsername(username, token).then((username_data) => {
          console.log(response)
          console.log(username_data)
          if (username_data.flag === 'Cuidador') {
            setCookie('cuidadorToken', token);
          }
          else if (username_data.flag === 'Patient') {
            setCookie('patientToken', token);
          }
        }).catch((err) => console.log(err.message))
  
        // Redirecione o usuário para a página desejada após o login
        navigate('/');
      } else {
        // Trate o caso de erro no login, por exemplo, exibindo uma mensagem de erro para o usuário
        alert('Falha no login, verifique suas credenciais');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.header_container}>
        <Header showLoginIcon={false} />
      </div>
      <section>
        <div className={styles.form_box}>
          <div className={styles.form_value}>
            <form>
              <h2>Login</h2>
              <div className={styles.input_box}>
                <input type="username" required onChange={(e) => setUsername(e.target.value)} />
                <label>Nome de Usuário</label>
              </div>
              <div className={styles.input_box}>
                <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                <label>Senha</label>
              </div>
              {/*<div className={styles.forget}>
                  <label>
                    <input type="checkbox" />
                    Lembrar de mim     <a href="#">Esqueci minha senha</a>
                  </label>
                </div>*/}
              <button onClick={handleSubmit}>Entrar</button>
              <div className={styles.register}>
                <p>
                  Não possui conta? <Link to="/register">Criar conta</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className={styles.footer_section}>
        <Footer />
      </div>
    </div>
  );
};

export default Login;