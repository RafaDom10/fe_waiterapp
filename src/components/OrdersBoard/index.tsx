import { Board, OrdersContainer } from './styles'
import { Order } from '../../types/Order'
import { OrderModal } from '../OrderModal'
import { useState } from 'react'

interface OrderBoardProps {
  icon: string
  title: string
  orders: Order[]
}

export function OrdersBoard ({ icon, title, orders }: OrderBoardProps): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)

  const handleOpenModal = (order: Order): void => {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  const handleCloseModal = (): void => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{orders.length}</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order: Order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

    </Board>
  )
}
