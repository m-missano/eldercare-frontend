import styles from "./Search.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactComponent as Icone } from "../expand.svg";
import { useCookies } from 'react-cookie';
import { fetchUserById } from "../utils/apiUtils";
import { fetchCarersByPrompt } from "../utils/gptUtils" 
import MediaCard from "../components/MediaCard";

function Search() {
    const [selecionado, setSelecionado] = useState(false);
    const [cookies] = useCookies(['carerToken', 'patientToken', 'username'])
<<<<<<< Updated upstream
    const ids = [];
=======
    const [ids, setIds] = useState();
>>>>>>> Stashed changes
    const [listaCarers, setListaCarers] = useState([]);
    const [query, setQuery] = useState();

    useEffect(() => {
        if (cookies.carerToken || cookies.patientToken) {
          // Se pelo menos um cookie estiver presente, consideramos o usuário como logado
          fetchCuidadores();
        } else {
    
        }
<<<<<<< Updated upstream
    }, [cookies]);
=======
    }, [cookies.carerToken, ids]);
>>>>>>> Stashed changes
    
    const addCarer = (carer) => {
        setListaCarers([...listaCarers, carer]);
    };

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
        const body = {
            prompt: query,
            limit: 5,
            caregivers: [{
                "idCuidador": 14,
                "descricao": "Trabalho em meio período, sou atenciosa e paciente, trabalho com idosos há 9 anos, moro na cidade de Natal - RN, minhas especialidades incluem auxílio na alimentação, administração de medicamentos e suporte nas tarefas diárias."
            }]
        }
        fetchCarersByPrompt(body).then((data) => {
            console.log("MEUS DADOS: ", data)
            setIds([1, 9])
            console.log("OnSubmit Lista: ", ids)
            fetchCuidadores()
        })
    }

    return (
    <div className={styles.search_container}>
        <Header />
        <div className={`${styles.page_container} ${styles.customFont}`}>
            <div className={styles.forms}>
                <div className={styles.search}>
                    <div className={styles.search_left}>
                        <input type="text" id="busca" name="busca" placeholder="Pesquisar..." autocomplete="off"
                                value={query} onChange={(e) => setQuery(e.target.value)}
                        />
                    <button type="button" onClick={onSubmit}></button>
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