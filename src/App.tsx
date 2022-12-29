import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from './components/Header'
import { GlobalStyles } from './styles/GlobalStyles'
import { Orders } from './components/Orders/index'

export function App (): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position='bottom-center' />
    </>
  )
}
