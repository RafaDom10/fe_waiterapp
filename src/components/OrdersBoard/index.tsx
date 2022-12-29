import { Board, OrdersContainer } from './styles'
import { Order } from '../../types/Order'
import { OrderModal } from '../OrderModal'
import { useState } from 'react'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'

interface OrderBoardProps {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void

}

export function OrdersBoard ({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrderBoardProps): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)

  const handleOpenModal = (order: Order): void => {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  const handleCloseModal = (): void => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  const handleChangeOrderStatus = async (): Promise<void> => {
    setIsLoading(true)

    if (selectedOrder == null) return

    const status = selectedOrder.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE'

    await api.patch(`orders/${selectedOrder._id}`, { status })

    toast.success(`O pedido da mesa ${selectedOrder.table} teve o status alterado!`)
    onChangeOrderStatus(selectedOrder._id, status)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  const handleCancelOrder = async (): Promise<void> => {
    setIsLoading(true)

    if (selectedOrder == null) return
    await api.delete(`orders/${selectedOrder._id}`)

    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`)
    onCancelOrder(selectedOrder._id)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        isLoading={isLoading}
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
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
