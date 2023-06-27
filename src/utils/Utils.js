/* Remove todos os caracteres não numéricos (exceto dígitos) */
export function removeNonNumeric(value) {
    return value.replace(/\D/g, "");
}

/* Formata a data recuperada de um JSON */
export function formatDate(data) {
    const dataAux = new Date(data);
    const formattedDate = `${dataAux.getFullYear()}-${(dataAux.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dataAux.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

/* Calcula a idade de acordo com a data de nascimento */
export function getAge(data) {
    const today = new Date();
    const birthDate = new Date(data);
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
