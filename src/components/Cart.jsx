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
    <div  style={{ color: 'white', backgroundColor: 'black' }}>
      <h1>Cart</h1>
      {Object.keys(cart).length > 0 ? (
        <>
          {products.map((value) => cart[value.id] > 0 && (
            <div key={value.id}>
              {value.name} - ${value.price} -
              <button onClick={() => decrement(value.id)}>-</button>
              {cart[value.id]} -
              <button onClick={() => increment(value.id)}>+</button>
              ${value.price * cart[value.id]} -
              <button onClick={() => handleDelete(value.id)}>Delete</button>
            </div>
          ))}
          <hr />
          <h2>Total Amount: ${orderValue}</h2>
          <hr />
          <p>
            {user.email ? (
              <button onClick={placeOrder}>Place Order</button>
            ) : (
              <button onClick={()=>Navigate("/login")}>Login to Order</button>
            )}
          </p>
        </>
      ) : (
        <h5>Your cart is Empty</h5>
      )}
    </div>
  );
}