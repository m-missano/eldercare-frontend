
export const fetchCarersByPrompt = (body) => {
    return fetch(`http://localhost:5000/find-caregivers`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error('Erro na requisição da API');
    }

    return response.json();
    })
    .catch((err) => console.log(err.message));
};