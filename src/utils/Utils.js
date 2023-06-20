export function removeNonNumeric(value) {
    return value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos (exceto dígitos)
}