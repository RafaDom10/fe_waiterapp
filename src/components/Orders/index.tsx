import { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'

import { Order } from '../../types/Order'
import { api } from '../../utils/api'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'

export function Orders (): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket']
    })

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order))
    })
  }, [])

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

  const handleStatusChange = (orderId: string, status: Order['status']): void => {
    setOrders(prevState => prevState.map(order => (
      order._id === orderId
        ? { ...order, status }
        : order
    )))
  }

  return (
    <Container>
      <OrdersBoard
        icon='🕦'
        title='Fila de espera'
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        icon='👨🏻‍🍳'
        title='Em preparação'
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
      <OrdersBoard
        icon='✅'
        title='Pronto'
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusChange}
      />
    </Container>
  )
}
