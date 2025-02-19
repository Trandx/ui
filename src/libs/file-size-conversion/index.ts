function roundTo(num: number, decimals: number) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
const fileSizeCovertion = function (bytes: number) {
    const KO_LIMIT = 1024
    const MO_LIMIT = 1024 * 1024
    const GO_LIMIT = 1024 * 1024 * 1024
    const TO_LIMIT = 1024 * 1024 * 1024 * 1024

    // if (bytes < KO_LIMIT) { 
    //     return `${bytes} O`
    // }

    if (bytes < MO_LIMIT) {
        return `${ roundTo( bytes / KO_LIMIT, 2)} KB`
    }

    if (bytes < GO_LIMIT) {
        return `${roundTo(bytes / MO_LIMIT, 2)} MB`
    }

    if (bytes < TO_LIMIT) {
        return `${roundTo(bytes / GO_LIMIT, 2)} GB`
    }

    return `${roundTo(bytes / TO_LIMIT, 2)} TB`

}

export {fileSizeCovertion}