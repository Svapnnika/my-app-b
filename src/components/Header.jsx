import "./Header.css";
import { Link } from "react-router-dom"
export default function Header() {
  return (
    <div className="App-Header-Row">
      <div>My React Store</div>
      <div className="App-Header-Links">
        <Link to="home">Home</Link>
        <Link to="cart">Cart</Link>
        <Link to="login">Login</Link>
      </div>
    </div>
  );
}