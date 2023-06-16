import styles from "./Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
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