import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Orders from "./components/Orders";
import { createContext } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const appContext = createContext();
function App(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([])
  const products = [
    { id: 1, name: "Mercedes-Benz", brand: "Mercedes-Benz", year: 2023, price: 50000, desc: "Luxury Mercedes-Benz sedan", imgUrl: "https://imgs.search.brave.com/VZSW97skwY_AWJG4fW8pUxZBnaGxAOZvY2ag0O49D1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E2LzUy/LzM1L2E2NTIzNWZk/MWZmNDgzMGQ5MDQy/MmI5Y2EzMTg2YjQ0/LmpwZw" },
    { id: 2, name: "Audi A4", brand: "Audi", year: 2022, price: 40000, desc: "Premium Audi sedan", imgUrl: "https://imgs.search.brave.com/9ZMvn8Z8e6LfslpyAyCuKgBPUHMGPGvrbF_B79i9Tq0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4MzEw/ODcuanBn" },
    { id: 3, name: "Range-Rover", brand: "Land Rover", year: 2024, price: 95000, desc: "Luxury Range-Rover SUV", imgUrl: "https://imgs.search.brave.com/TZ2jcm27GEycqoFxyqdr5eeeZ5eHIrPqVjBrJidb9ps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMjEw/MzgzMy5qcGc" },
    { id: 4, name: "Lamborghini", brand: "Lamborghini", year: 2023, price: 70000, desc: "High-performance Lamborghini", imgUrl: "https://imgs.search.brave.com/JeCUsEYvtj2OA55xmuCSvrF7jyE9AQ2VeQXbiCTy0lI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDM1MDM0/NTEuanBn" },
    { id: 5, name: "Hyundai Elantra", brand: "Hyundai", year: 2021, price: 25000, desc: "Reliable Hyundai sedan", imgUrl: "https://imgs.search.brave.com/vvRjlLM7QSh7KbF_xqTqEaVdsw9UFzTnE4xYhUWLXf4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQwNDUz/MTQuanBn" },
    { id: 6, name: "Ferrari 488", brand: "Ferrari", year: 2022, price: 35000, desc: "Iconic Ferrari sports car", imgUrl: "https://imgs.search.brave.com/DcOqPBAo0QNQJND1eDY1rXyTBdTiqYnjsJCBtDQDTYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibGFjay1jYXIt/d2l0aC1ibGFjay1y/b29mLWJsYWNrLWhv/b2Qtc2l0cy1ibGFj/ay1iYWNrZ3JvdW5k/XzEwMjExOTgtMjA0/OTEuanBnP3NlbXQ9/YWlzX2h5YnJpZA" },
    { id: 7, name: "Ford F-150", brand: "Ford", year: 2023, price: 39000, desc: "Popular Ford pickup truck", imgUrl: "https://imgs.search.brave.com/4Z5hk3ClQ8Cr4ZlA3tGOXeZvq7ZDacCA_v1qwVAr3cA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE5MjEz/NjMuanBn" },
    { id: 8, name: "Toyota Corolla", brand: "Toyota", year: 2022, price: 45000, desc: "Reliable Toyota sedan", imgUrl: "https://imgs.search.brave.com/jOHzSfXVPvkRoJtNSybEBniqtK0ywuI4Q4ySQ93SCCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTg2/NzIwNC5qcGc" },
    { id: 9, name: "Honda Civic", brand: "Honda", year: 2021, price: 25000, desc: "Compact Honda sedan", imgUrl: "https://imgs.search.brave.com/Y8uF60OYuqGaspfkukxx1v5Pg_d33YJXmyTE0HrU1r4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL3NsZWVrLWJs/YWNrLTRrLWhvbmRh/LWNpdmljLW00Y3o1/aGp3c2VrdGx1aXYu/d2VicA" }
  ];
  return (
    <BrowserRouter>
      <appContext.Provider value={{ users, setUsers, user, setUser, products, cart, setCart, orders, setOrders }}>
        <Header />
        <Routes>
          <Route index element={<Products />} />
          <Route path="home" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Orders/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Footer />
      </appContext.Provider>
    </BrowserRouter>
  );
}
export default App;