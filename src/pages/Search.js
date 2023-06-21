import styles from "./Search.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { ReactComponent as Icone } from "../expand.svg";

function Search() {
    const [selecionado, setSelecionado] = useState(false);

    const handleIconeClick = () => {
      setSelecionado(true);
    };

    return (
    <div className={styles.search_container}>

        <div className={styles.header_container}>
            <Header />
        </div>
        <div className={`${styles.page_container} ${styles.customFont}`}>

            <form className={styles.forms}>
                <div className={styles.search}>
                    <div className={styles.search_left}>
                        <input type="text" id="busca" name="busca" placeholder="Pesquisar..." autocomplete="off"/>
                        <button type="submit"></button>
                    </div>
                    <div className={styles.search_right}>
                        <select className={styles.select_limit}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        {/*<div className={styles.icon_container}>
                            <Icone className={styles.icon} onClick={handleIconeClick}/>
                        </div>*/}
                    </div>
                </div>
            </form>
             
            <div className={styles.page_content}>
                <div className={styles.filter_box}>
                    <h1>Filtros</h1>
                </div>
                <div className={styles.caregiver_slots}>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.caregiver_box}>
                        <div className={styles.caregiver_content}>
                            <div className={styles.caregiver_image}></div>
                            <div className={styles.caregiver_description}>
                                <p>ENFERMEIRA JOY</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className={styles.footer_section}>
            <Footer />
        </div>

    </div>
    );
};

export default Search