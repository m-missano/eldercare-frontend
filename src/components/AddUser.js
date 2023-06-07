import { useEffect } from "react";
import { addUser } from "../utils/apiUtils";

function AddUser(){

    const dataUser = {
        nome: "Alice",
        cpf: "987.654.321-00",
        login: "alice123",
        password: "senha123",
        contato: {
          telefone: "(99) 9999-9999",
          celular: "(99) 99999-9999",
          email: "alice@example.com"
        },
        endereco: {
          rua: "Rua das Flores",
          bairro: "Centro",
          cidade: "Cidade Nova",
          cep: "12345-678",
          numero: "123",
          uf: "SP"
        },
        relacaoIdoso: "",
        idososRelacionados: []
    }

    console.log(dataUser)
    /*
    useEffect(() => {
        addUser("", dataUser).then((data) => console.log(data))
    })
    */

    const handleAddUser = (e) => {
        e.preventDefault();
        addUser(dataUser)
            .then(() => console.log("usuario inserido com sucesso!"))
            .catch((err) => console.log(err.message))
    }

    return (
        <div>
            <button onClick={handleAddUser}>ADD USER</button>
        </div>
    );
}

export default AddUser