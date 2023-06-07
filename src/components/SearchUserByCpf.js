import { useState } from "react";
import { fetchUserByCpf } from "../utils/apiUtils";
import { useEffect } from "react";

function SearchUserByCpf(){

    const [cpf, setCpf] = useState("123.456.789-01")
    
    /*
    useEffect(() => {
        fetchUserByCpf(cpf).then((data) => console.log(data))
    }, [])
    */

    const handleFetchUserByCpf = () => {
        fetchUserByCpf(cpf)
            .then((data) => console.log(data))
            .catch((err) => console.log(err.message))
    }

    return (
        <div>
            <button onClick={handleFetchUserByCpf}>SEARCH SPECIFIC USER</button>
        </div>
    );
}

export default SearchUserByCpf