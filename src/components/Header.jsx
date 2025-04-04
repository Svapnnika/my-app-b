import "./Header.css";
import { Link } from "react-router-dom"
import { useContext, useMemo, useEffect, useState } from "react"
import { appContext } from "../App"

export default function Header() {
  const {user, setUser, cart, products, orders} = useContext(appContext);
  const items = products.filter((value) => cart[value.id] > 0);
  console.log(items);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    setMyOrder(orders.filter((value) => value.email === user.email));
  }, [orders, user]);
  return (
    <div className="App-Header-Row">
      <div style={{ fontWeight: "bolder"}}>My React Store</div>
      <div className="App-Header-Links">
        <Link to="home">Home</Link> |
        <Link to={"/cart"}>Cart({items.length})</Link>-
        <Link to={"/orders"}>Orders({myOrder.length})</Link> |
        {user.email === "" || (!user.email) ? (
          <Link to={"/login"}>Login</Link>
        ) : (
          <Link
            to={"/login"}
            onClick={() =>
              setUser({ ...user, name: "", email: "", password: "" })
            }
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}