const eurosToFormattedEuros = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const eurosToFormattedEurosWithoutE = new Intl.NumberFormat('fi-FI', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const centsToFormattedEuros = (cents) => {
    return eurosToFormattedEuros.format(cents/100)
}

export const centsToFormattedEurosWithoutE = (cents) => {
    return eurosToFormattedEurosWithoutE.format(cents/100)
}

export const userInputPriceToCleanedEuros = (userInput) => {
    return Number(Number(userInput.replace(",", ".").replace(/\s+/g, "")).toFixed(2))
}
