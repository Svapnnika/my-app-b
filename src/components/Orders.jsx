
import React from "react";
import { appContext } from "../App";
import { useContext } from "react";
export default function Orders() {
  const { orders, user } = useContext(appContext);
  
  // Filter orders for the current user
  const userOrders = orders.filter(order => order.email === user.email);
  
  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px' }}>
      <h3>My Orders</h3>
      {userOrders.length > 0 ? (
        <div>
          {userOrders.map((order, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              margin: '10px 0', 
              padding: '15px', 
              borderRadius: '5px',
              backgroundColor: '#333'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <strong>Order #{index + 1}</strong>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Email:</strong> {order.email}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Items:</strong> {Object.keys(order.items).length} item(s)
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Total:</strong> ${order.total}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Status:</strong> 
                <span style={{ 
                  color: order.status === 'pending' ? '#ffa500' : '#00ff00',
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h5>No orders found</h5>
          <p>You haven't placed any orders yet.</p>
        </div>
      )}
      <hr />
    </div>
  );
}
