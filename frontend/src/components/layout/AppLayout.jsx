import { Layout, Spin } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import { useCrypto } from '../../context/ContextWrapper'

const AppLayout = () => {
    const { isLoading } = useCrypto()
    const layoutStyle = {
        backgroundColor: '#D9AFD9',
        backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
    }

    if (isLoading) {
        return <Spin fullscreen size="large" style={layoutStyle} />
    }

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>
    )
}

export default AppLayout
