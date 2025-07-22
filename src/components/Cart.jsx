import React from 'react'
import { useContext } from 'react';
import { appContext } from '../App';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { products, cart, setCart, orders, setOrders, user } = useContext(appContext);
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate();

  const handleDelete = (id) =>{
    setCart({...cart,[id]: 0 });
  };

  const increment = (id) => {
    setCart({...cart,[id]: (cart[id] || 0) + 1});
  };

  const decrement = (id) => {
    if (cart[id] > 1) {
      setCart({...cart,[id]: cart[id] - 1});
    } else {
      handleDelete(id);
    }
  };
  const placeOrder = () => {
    setOrders([
      ...orders,
      {
        email: user.email,
        orderDate: new Date().toISOString(),
        items: cart,
        status: "pending",
        total: orderValue,
      },
    ]);
    setCart({});
    Navigate("/order");
  };
  useEffect(() => {
    setOrderValue(products.reduce((sum, value) => {
      return sum + value.price * (cart[value.id] ?? 0);
    }, 0));
  }, [cart]);

  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Shopping Cart</h1>
      {Object.keys(cart).length > 0 ? (
        <>
          <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#333', color: 'white' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #555' }}>Product</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Image</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Brand</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Year</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Unit Price</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Quantity</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Total</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #555' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => cart[product.id] > 0 && (
                  <tr key={product.id} style={{ 
                    borderBottom: '1px solid #444',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{ 
                      padding: '15px', 
                      fontWeight: 'bold',
                      color: '#fff'
                    }}>
                      {product.name}
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#ccc', 
                        marginTop: '5px',
                        maxWidth: '200px'
                      }}>
                        {product.desc}
                      </div>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <img 
                        src={product.imgUrl} 
                        alt={product.name}
                        style={{ 
                          width: '80px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #555'
                        }}
                      />
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#fff' }}>
                      {product.brand}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#fff' }}>
                      {product.year}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#4CAF50', fontWeight: 'bold' }}>
                      ${product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <button 
                          onClick={() => decrement(product.id)}
                          style={{
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span style={{ 
                          minWidth: '30px', 
                          textAlign: 'center',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#fff'
                        }}>
                          {cart[product.id]}
                        </span>
                        <button 
                          onClick={() => increment(product.id)}
                          style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#4CAF50', fontWeight: 'bold', fontSize: '16px' }}>
                      ${(product.price * cart[product.id]).toLocaleString()}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        style={{
                          backgroundColor: '#ff4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ff6666'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'right',
            border: '1px solid #333'
          }}>
            <h2 style={{ 
              color: '#4CAF50', 
              margin: '0',
              fontSize: '24px'
            }}>
              Total Amount: ${orderValue.toLocaleString()}
            </h2>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            {user.email ? (
              <button 
                onClick={placeOrder}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Place Order
              </button>
            ) : (
              <button 
                onClick={() => Navigate("/login")}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px 30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
              >
                Login to Order
              </button>
            )}
          </div>
        </>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#ccc', marginBottom: '20px' }}>Your cart is empty</h3>
          <p style={{ color: '#888' }}>Add some items to your cart to see them here!</p>
        </div>
      )}
    </div>
  );
}