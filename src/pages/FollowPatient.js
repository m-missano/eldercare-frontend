import { useState, useEffect } from "react";
import styles from "./FollowPatient.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchUserByUsername, fetchActivityByElderID } from "../utils/apiUtils";
import ReadMoreReadLess from "../components/ReadMoreReadLess";
import { useCookies } from "react-cookie";

function FollowPatient() {
    const [cookies] = useCookies(['patientToken', 'username'])
    const [nome, setNome] = useState('');
    const [sections, setSections] = useState([]);

    useEffect(() => {
        if (cookies.patientToken || cookies.username) {
            fetchUserByUsername(cookies.username, cookies.patientToken)
            .then((username_data) => {
                setNome(username_data.idososRelacionados[0].nome);
                const elderID = username_data.idososRelacionados[0].id;
                fetchActivityByElderID(elderID, cookies.patientToken)
                .then((activity_data) => {
                    console.log("atv:",activity_data)
                    const activities = activity_data.map((activity) => ({
                        id: activity.id,
                        name: activity.categoriaAtividade,
                        description: activity.descricao,
                    }));
                    setSections(activities);
                })
                .catch((error) => {
                    console.log(error.message);
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }, [cookies]);

    return (
        <div className={styles.profile_container}>
            <div className={styles.header_container}>
                <Header />
            </div>

            <div className={`${styles.page_container} ${styles.customFont}`}>
                <div className={styles.inner_container}>
                    <div className={styles.inner_header}>
                        <div className={styles.header_title}>
                            <h1>{nome}</h1>
                        </div>
                    </div>
                    <div className={styles.column_activity}>
                        <div className={styles.form_title}> ATIVIDADES</div>
                    </div>
                    <div className={styles.activities}>
                        {sections.map((section) => (
                            <div key={section.id} className={styles.activity}>
                                <div className={styles.ReadMore_container}>
                                    <ReadMoreReadLess
                                        description={section.description}
                                        onSave={''}
                                        allow={false}
                                    />
                                </div>
                                <span className={styles.activityName}>{section.name}</span>
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

export default FollowPatient;