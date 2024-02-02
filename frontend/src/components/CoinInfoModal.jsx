import { Divider, Tag, Typography } from 'antd'
import CoinInfo from './CoinInfo'

const CoinInfoModal = ({ coin }) => {
    const textRight = { marginRight: '0.5 rem' }
    return (
        <>
            <CoinInfo coin={coin} children={coin.name} />
            <Divider />
            <Typography.Paragraph>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        1 hour:
                    </Typography.Text>
                    <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                        {coin.priceChange1h}%
                    </Tag>
                </div>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        1 day:
                    </Typography.Text>
                    <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                        {coin.priceChange1d}%
                    </Tag>
                </div>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        1 week:
                    </Typography.Text>
                    <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                        {coin.priceChange1w}%
                    </Tag>
                </div>
                <Divider />
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        Price:
                    </Typography.Text>
                    {+coin.price.toFixed(7)} $
                </div>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        Price in BTC:
                    </Typography.Text>
                    {coin.priceBtc.toFixed(7)}
                </div>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        Market Cap:
                    </Typography.Text>
                    {coin.marketCap}
                </div>
                <div className="block">
                    <Typography.Text strong style={textRight}>
                        Contract Address:
                    </Typography.Text>
                    {coin.contractAddress ? coin.contractAddress : 'no Data'}
                </div>
            </Typography.Paragraph>
        </>
    )
}

export default CoinInfoModal
