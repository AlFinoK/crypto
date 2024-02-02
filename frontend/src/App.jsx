import AppLayout from './components/layout/AppLayout'
import { ContextWrapper } from './context/ContextWrapper'

export default function App() {
    return (
        <ContextWrapper>
            <AppLayout />
        </ContextWrapper>
    )
}
