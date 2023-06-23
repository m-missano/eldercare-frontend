import styles from "./About.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function About() {

    return (
    <div className={styles.about_container}>

        <div className={styles.header_container}>
            <Header showLoginIcon={false}/>
        </div>

        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.about_box}>
                <div className={styles.about_content}> 
                    <h1> SOBRE NÓS</h1>
                    <p> © 2023 eldercare. Cuidamos de você, cuidamos para você 🤗! </p>
                    <p> Contato: +55 (19) 91234-5678 - eldercare@unesp.br </p>
                    <p> Endereço: Av. 24 A - Bela Vista, Rio Claro - SP, 13506-900 </p>
                </div>
            </div>

            <div className={styles.footer_section}>
                <Footer />
            </div>
        </div>

    </div>
    );
};

export default About