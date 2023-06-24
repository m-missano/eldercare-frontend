export function removeNonNumeric(value) {
    return value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos (exceto dígitos)
}

export function formatDate(data) {
    const dataAux = new Date(data);
    const formattedDate = `${dataAux.getFullYear()}-${(dataAux.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dataAux.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }