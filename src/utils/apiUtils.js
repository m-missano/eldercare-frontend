
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
  try {
      const response = await fetch(`http://localhost:8080/api/usuario/`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }
      
      const data = await response.json();

      return data.idPessoa;
   } catch (err) {
      console.log(err.message);
  }
}

/* Adiciona um novo usuario */
export const updateUser = async (token, body) => {
  try {
      const response = await fetch(`http://localhost:8080/api/usuario/`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }
  
      const data = await response.json();
      return data
   } catch (err) {
      console.log(err.message);
  }
}



/* Deleta usuario */
export const deleteUser = async (cpf) => {
  await fetch(`http://localhost:8080/api/usuario/${cpf}`, {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
  .then((response) => response.json())
  .catch((err) => console.log(err.message))
}


/* Adiciona um novo idoso */
export const addElder = async (clientId, body) => {
  await fetch(`http://localhost:8080/api/idoso/${clientId}`, {
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

export const fetchActivityByElderID = (elderID, token) => {
  return fetch(`http://localhost:8080/api/idoso/atividade/${elderID}`, {
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
    .catch((error) => {
      console.log(error.message);
    });
};

export const addActivity = (idosoId, token, body) => {
  return fetch(`http://localhost:8080/api/idoso/atividade/${idosoId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

export const deleteActivity = (idosoid, actid, token) => {
  return fetch(`http://localhost:8080/api/idoso/atividade/${idosoid}/${actid}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }
      return response;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

  
export const updateActivity = (idosoId, atividadeId, token, data) => {
return fetch(`http://localhost:8080/api/idoso/atividade/${idosoId}/${atividadeId}`, {
  method: 'PUT',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro na requisição da API');
    }
    return response.json();
  })
  .catch((error) => {
    console.log(error.message);
  });
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

export const fetchUserById = (userId, token) => {
  return fetch(`http://localhost:8080/api/usuario/busca/${userId}`, {
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

export const fetchElderByCPF = (CPF, token) => {
  return fetch(`http://localhost:8080/api/idoso/busca/${CPF}`, {
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

export const setCarerForElder = (username, CPF, token, tokenJWT) => {
  return fetch(`http://localhost:8080/api/idoso/${username}/${CPF}/${token}`, {
    method: "POST",
    headers: {
      'Authorization': tokenJWT,
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

export const updateMedicCond = async (idosoid, token, body) => {
  try {
      const response = await fetch(`http://localhost:8080/api/idoso/${idosoid}/medicDescription`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      } 
      const data = await response.json();
      return data
   } catch (err) {
      console.log(err.message);
  }
}
