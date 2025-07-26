import "./Header.css";
import { Link, useNavigate } from "react-router-dom"
import { useContext, useMemo, useEffect, useState } from "react"
import { appContext } from "../App"
import { IoCarSportSharp } from "react-icons/io5";

export default function Header() {
  const {user, setUser, cart, products, orders, searchTerm, setSearchTerm} = useContext(appContext);
  const items = products.filter((value) => cart[value.id] > 0);
  console.log(items);
  const [myOrder, setMyOrder] = useState([]);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setMyOrder(orders.filter((value) => value.email === user.email));
  }, [orders, user]);

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
    navigate('/home'); // Navigate to home page to show search results
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className="App-Header-Row">
      <div style={{ fontWeight: "bolder"}}>My React Store <IoCarSportSharp /></div>
      <div className="App-Header-Links">
        <Link to="home">Home</Link> |
        <div className="search-container" style={{ display: 'inline-flex', alignItems: 'center', margin: '0 10px' }}>
          <input
            type="text"
            placeholder="Search cars..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              width: '200px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '5px 10px',
              marginLeft: '5px',
              backgroundColor: '#45688dff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Search
          </button>
        </div>
        <Link to={"/cart"}>Cart({items.length})</Link>-
        <Link to={"/order"}>Orders({myOrder.length})</Link> |
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