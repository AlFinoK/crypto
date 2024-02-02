import { Content } from 'antd/es/layout/layout'
import { Typography } from 'antd'
import { useCrypto } from '../../context/ContextWrapper'
import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

const AppContent = () => {
    const { assets, crypto } = useCrypto()
    const contentStyle = {
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        width: '100%',
    }

    const cryptoPriceMap = crypto.reduce((acc, current) => {
        acc[current.id] = current.price
        return acc
    }, {})

    const mappedAssets = assets
        .map((asset) => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, val) => (acc += val), 0)
        .toFixed(2)

    return (
        <Content style={contentStyle}>
            <Typography.Title style={{ color: '#fff' }} level={3}>
                Summary:{' '}
                <span style={{ color: '#00A86B' }}>{mappedAssets}$</span>
            </Typography.Title>
            <div className="rightBox">
                <PortfolioChart />
                <AssetsTable />
            </div>
        </Content>
    )
}

export default AppContent
