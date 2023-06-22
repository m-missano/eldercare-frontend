import styles from "./Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function Home() {

    /*useEffect(() => {
    fetchAuthorization({login:"login3", password: "123"}).then((data) => console.log(data))
  }, [])*/

  return (
    <div className={styles.home_container}>

      <div className={styles.header_container}>
        <Header />
      </div>
      
      <div className={styles.section1}>
        <div className={styles.section1_content}>
          <h1>Cuidamos de você, cuidamos para você 🤗!</h1>
        </div>
      </div>

      <div className={styles.rectangle}>
        <div className={styles.patient_box}>
          <Link className={styles.patient_link} to="/login">
            <div className={styles.patient_image}></div>
            <p>Procuro Cuidador</p>
          </Link>
        </div>
        <div className={styles.stethoscope_box}>
          <Link className={styles.stethoscope_link} to="/login">
            <div className={styles.stethoscope_image}></div>
            <p>Sou Cuidador</p>
          </Link>
        </div>
      </div>

      <div className={styles.section2}>
        <main className={styles.board}>
          <p>
          Conectamos pessoas que precisam de cuidado a cuidadores dedicados, permitindo que você escolha de acordo com suas necessidades e a reputação do cuidador.
          </p>
          <div className={styles.image}></div>
        </main>
      </div>

      <div className={styles.section3}>
        <Footer />
      </div>
      
    </div>
  );
};

export default Home