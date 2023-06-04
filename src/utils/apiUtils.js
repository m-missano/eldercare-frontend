export const fetchUsers = () => {
    return fetch("http://localhost:8080/api/usuario/")
        .then((response) => response.json())
        .catch((err) => console.log(err.message))
}