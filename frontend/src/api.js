import { cryptoData, cryptoAssets } from './data'

export function fetchCryptoData() {
    return new Promise((res) => {
        setTimeout(() => {
            res(cryptoData)
        }, 200)
    })
}
export function fetchCryptoAssets() {
    return new Promise((res) => {
        setTimeout(() => {
            res(cryptoAssets)
        }, 200)
    })
}
