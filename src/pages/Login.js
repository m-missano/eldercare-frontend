import styles from "./Login.module.css";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function Login() {
    return (
    <div className={styles.login_container}>
        <div className={styles.header_container}>
            <Header showLoginIcon={false}/>
        </div>
        <section>
          <div className={styles.form_box}>
            <div className={styles.form_value}>
              <form action="">
                <h2>Login</h2>
                <div className={styles.input_box}>
                  <input type="username" required />
                  <label>Nome de Usuário</label>
                </div>
                <div className={styles.input_box}>
                  <input type="password" required />
                  <label>Senha</label>
                </div>
                {/*<div className={styles.forget}>
                  <label>
                    <input type="checkbox" />
                    Lembrar de mim     <a href="#">Esqueci minha senha</a>
                  </label>
                </div>*/}
                <button>Entrar</button>
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