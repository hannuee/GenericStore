import React from 'react'
import { useSelector } from 'react-redux'

const MyOrdersPage = (props) => {

  const orders = useSelector(state => state.orders.customers)

    return (
      <>
        {orders.map(order =>
        <div key={order.id}>
          {order.id}, {order.customer_id}, {order.orderreceived}, {order.orderdispatched}, {order.purchaseprice}, {order.customerinstructions} <br />
          {order.orderDetails.map(orderDetail => 
            <div key={orderDetail.name}>
              {orderDetail.name}, {orderDetail.quantity}, {orderDetail.priceandsize.price}, {orderDetail.priceandsize.size}
            </div>)}
          <br /><br />
        </div>
        )}
      </>
    )

  }
  
  export default MyOrdersPage