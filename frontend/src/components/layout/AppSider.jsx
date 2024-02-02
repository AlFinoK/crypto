import { Card, List, Statistic, Typography, Tag } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import Item from 'antd/es/list/Item'
import { toUpFirstWord } from '../../utils'
import { useCrypto } from '../../context/ContextWrapper'

const AppSider = () => {
    const { assets } = useCrypto()

    return (
        <Sider width={'35%'} style={{ padding: '1rem', background: 'none' }}>
            {assets.map((asset) => (
                <Card
                    title={toUpFirstWord(asset.id)}
                    key={asset.id + Math.random()}
                    style={{ marginBottom: '1rem' }}>
                    <Statistic
                        title={asset.id.toUpFirstWord}
                        value={asset.totalAmount}
                        precision={1}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                        }}
                        prefix={
                            asset.grow ? (
                                <ArrowUpOutlined />
                            ) : (
                                <ArrowDownOutlined />
                            )
                        }
                        suffix="$"
                    />
                    <List
                        size={'small'}
                        dataSource={[
                            {
                                title: 'Total profit',
                                value: asset.totalProfit,
                                withTag: true,
                            },
                            {
                                title: 'Asset Amount',
                                value: asset.amount,
                                isPlain: true,
                            },
                            // {
                            //     title: 'Difference',
                            //     value: asset.growPercent,
                            // },
                        ]}
                        renderItem={(item) => (
                            <Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && (
                                        <Tag
                                            color={
                                                asset.grow ? 'green' : 'red'
                                            }>
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text
                                            type={
                                                asset.grow
                                                    ? 'success'
                                                    : 'danger'
                                            }>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </Item>
                        )}
                    />
                </Card>
            ))}
        </Sider>
    )
}

export default AppSider
