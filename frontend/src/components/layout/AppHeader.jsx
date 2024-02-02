import { Button, Modal, Drawer, Select, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useCrypto } from '../../context/ContextWrapper'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const AppHeader = () => {
    const { crypto } = useCrypto()
    const [isSelect, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState(null)

    const headerStyle = {
        textAlign: 'center',
        height: 60,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'none',
    }

    const handleSelect = (value) => {
        setCoin(crypto.find((c) => c.id == value))
        setModal(true)
    }

    useEffect(() => {
        const keypress = (e) => {
            if (e.key == '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    return (
        <Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                open={isSelect}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value={'press / to open'}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: '1.5rem' }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
            <Modal
                // title={}
                open={modal}
                footer={null}
                onCancel={() => setModal(false)}>
                <CoinInfoModal coin={coin} />
            </Modal>

            <Button type="primary" onClick={() => setDrawer(true)}>
                Open drawer
            </Button>
            <Drawer
                // title="Basic Drawer"
                onClose={() => setDrawer(false)}
                width={420}
                open={drawer}>
                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Header>
    )
}

export default AppHeader
