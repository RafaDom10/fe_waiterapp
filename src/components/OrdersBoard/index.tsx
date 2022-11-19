import { Board, OrdersContainer } from './styles'

interface OrderBoardProps {
  icon: string
  title: string
}

export function OrdersBoard ({ icon, title }: OrderBoardProps): JSX.Element {
  return (
    <Board>
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>(1)</span>
        </header>
        <OrdersContainer>
          <button type='button'>
            <strong>Mesa 2</strong>
            <span>2 items</span>
          </button>
          <button type='button'>
            <strong>Mesa 2</strong>
            <span>2 items</span>
          </button>
        </OrdersContainer>
      </Board>
  )
}
