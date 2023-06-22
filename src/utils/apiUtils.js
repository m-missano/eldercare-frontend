
/* Recupera todos os usuarios */
export const fetchUsers = () => {
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
    //const tokenWithoutBearer = token.replace('Bearer ', '');
    //console.log(tokenWithoutBearer);
    return fetch(`http://localhost:8080/api/usuario/username/${username}`, {
        headers: {
            'Authorization': token,
        },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição da API');
        }
        return response.json();
      })
      .catch((err) => console.log(err.message));
};

export const fetchAuthorization = (body) => {
    return fetch(`http://localhost:8080/api/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .catch((err) => console.log(err.message));
};