import styles from "./Search.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactComponent as Icone } from "../expand.svg";
import { useCookies } from 'react-cookie';
import { fetchUserById, fetchCarers } from "../utils/apiUtils";
import { fetchCarersByPrompt } from "../utils/gptUtils" 
import MediaCard from "../components/MediaCard";

function Search() {
    const [selecionado, setSelecionado] = useState(false);
    const [cookies] = useCookies(['carerToken', 'patientToken', 'username'])
    const [ids, setIds] = useState();
    const [listaCarers, setListaCarers] = useState([]);
    const [query, setQuery] = useState('');


    useEffect(() => {
        const savedQuery = localStorage.getItem('query');
        const savedIds = localStorage.getItem('ids');
        console.log("executuou2: ", savedIds)
        if (savedQuery) {
           setQuery(savedQuery);
        }
        
        if (savedIds) {
            let listaInteiros = savedIds.split(",").map(Number);
            setIds(listaInteiros);
        }

    }, []);

    useEffect(() => {
        if (cookies.carerToken || cookies.patientToken) {
            console.log("executuou")
            fetchCuidadores();
        }
    }, [cookies.carerToken, cookies.patientToken, ids]);

    
    const fetchCuidadores = async () => {
        let token;
        try {
          if(cookies.carerToken){
            token = cookies.carerToken
          }
          else if(cookies.patientToken){
            token = cookies.patientToken
          }
          const promises = ids.map(id => fetchUserById(id, token));
          const cuidadores = await Promise.all(promises);
      
          setListaCarers(cuidadores);
          console.log("lista",cuidadores);
        } catch (error) {
          console.log(error.message);
        }
    };

    const onSubmit = () => {
        let token;
        if(cookies.carerToken){
            token = cookies.carerToken
        }
        else if(cookies.patientToken){
            token = cookies.patientToken
        }

        fetchCarers(token).then((data) => {
            
            var caregiverList = []
            data.forEach((item) => {
                caregiverList.push({
                    "idCuidador": item.idPessoa,
                    "descricao": item.descricao
                });
            })

            console.log("caregiverList", caregiverList);

            const body = {
                prompt: query,
                limit: 5,
                caregivers: caregiverList
            }
            fetchCarersByPrompt(body).then((data) => {
                console.log("MEUS DADOS: ", data)
                console.log(data.data)
                
                const listaInteiros = data.data.split(",").map(Number);
                setIds(listaInteiros);
                localStorage.setItem('query', query);
                localStorage.setItem('ids', listaInteiros);
                console.log("Lista de Inteiros", listaInteiros);
            })
        }).catch((err) => console.log(err));
    }

    return (
    <div className={styles.search_container}>
        <Header />
        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.forms}>
                <div className={styles.search}>
                    <div className={styles.search_left}>
                        <input type="text" id="busca" name="busca" placeholder="Pesquisar..." autocomplete="off"
                                value={query}  onChange={(e) => setQuery(e.target.value)}
                        />
                    <button type="button" onClick={onSubmit}></button>
                    </div>
                    <div className={styles.search_right}>
                        <select className={styles.select_limit} id="limitSelection">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        {/*<div className={styles.icon_container}>
                            <Icone className={styles.icon} onClick={handleIconeClick}/>
                        </div>*/}
                    </div>
                </div>
            </div>
            
            <div className={styles.page_content}>
                
                <div className={styles.caregiver_slots}>
                    <div className={styles.caregiver_boxes}>
                        {listaCarers.map((cuidador) => (
                            <MediaCard
                            nome={cuidador.nome}
                            cidade={cuidador.endereco.cidade}
                            uf={cuidador.endereco.uf}
                            descricao={cuidador.descricao}
                            id={cuidador.idPessoa}
                            />
                        ))}
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