import { useEffect, useState } from 'react'
import { Order } from '../../types/Order'
import { api } from '../../utils/api'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'

export function Orders (): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    api.get('orders')
      .then(({ data }) => {
        setOrders(data)
      })
      .catch(err => console.log(err))
  }, [])

  const waiting = orders.filter(order => order.status === 'WAITING')
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION')
  const done = orders.filter(order => order.status === 'DONE')

  const handleCancelOrder = (orderId: string): void => {
    setOrders(prevState => prevState.filter(order => order._id !== orderId))
  }

  return (
    <Container>
      <OrdersBoard
        icon='🕦'
        title='Fila de espera'
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon='👨🏻‍🍳'
        title='Em preparação'
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon='✅'
        title='Pronto'
        orders={done}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  )
}
