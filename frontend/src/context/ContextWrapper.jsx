import { percentDifference } from '../utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCryptoAssets, fetchCryptoData } from '../api'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    isLoading: false,
})

export const ContextWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result) {
        return assets.map((asset) => {
            const coin = result.find((c) => c.id == asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit:
                    asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setIsLoading(true)
            const { result } = await fetchCryptoData()
            const assets = await fetchCryptoAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setIsLoading(false)
        }
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    return (
        <CryptoContext.Provider value={{ isLoading, assets, crypto, addAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}
