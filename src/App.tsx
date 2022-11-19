import { Header } from './components/Header'
import { GlobalStyles } from './styles/GlobalStyles'
import { Orders } from './components/Orders/index'

export function App (): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
    </>
  )
}
