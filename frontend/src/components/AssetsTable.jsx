import { Table } from 'antd'
import { useCrypto } from '../context/ContextWrapper'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',

        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price in $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
]

const AssetsTable = () => {
    const { assets } = useCrypto()

    const data = assets.map((asset) => ({
        key: asset.id + Math.random(),
        name: asset.name,
        price: asset.price,
        amount: asset.amount,
    }))

    return (
        <Table
            style={{ margin: '2rem' }}
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    )
}

export default AssetsTable
