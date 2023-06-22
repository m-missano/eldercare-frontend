
/* Recupera todos os usuarios */
export const fetchUsers = (cpf) => {
    return fetch(`http://localhost:8080/api/usuario/`)
        .then((response) => response.json())
        .catch((err) => console.log(err.message))
}

/* Recupera um usuario especifico passando seu cpf */
export const fetchUserByCpf = (cpf) => {
    return fetch(`http://localhost:8080/api/usuario/${cpf}`)
        .then((response) => response.json())
        .catch((err) => console.log(err.message))
}

/* Adiciona um novo usuario */
export const addUser = async (body) => {
    await fetch(`http://localhost:8080/api/usuario/`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .catch((err) => console.log(err.message))
}

export const fetchUserByUsername = (username, token) => {
    return fetch(`http://localhost:8080/api/usuario?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  };
