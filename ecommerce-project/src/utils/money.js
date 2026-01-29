export function formatMoney(anmoutCents){
        return `$${(anmoutCents / 100).toFixed(2)}`
}