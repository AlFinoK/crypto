import { Flex, Typography } from 'antd'

const CoinInfo = ({ coin, children }) => {
    const imgStyles = { width: '2rem', height: '2rem', marginRight: '1rem' }

    return (
        <Flex align="center">
            <img src={coin.icon} alt={coin.name} style={imgStyles} />
            <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
                ({coin.symbol}) {children}
            </Typography.Title>
        </Flex>
    )
}

export default CoinInfo
