import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Orders from "./components/Orders";
import CarDetails from "./components/CarDetails";
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
    { id: 2, name: "Audi A7", brand: "Audi", year: 2022, price: 40000, desc: "Premium Audi sedan", imgUrl: "https://imgs.search.brave.com/9ZMvn8Z8e6LfslpyAyCuKgBPUHMGPGvrbF_B79i9Tq0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE4MzEw/ODcuanBn" },
    { id: 3, name: "Range-Rover", brand: "Land Rover", year: 2024, price: 95000, desc: "Luxury Range-Rover SUV", imgUrl: "https://imgs.search.brave.com/TZ2jcm27GEycqoFxyqdr5eeeZ5eHIrPqVjBrJidb9ps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMjEw/MzgzMy5qcGc" },
    { id: 4, name: "Lamborghini", brand: "Lamborghini", year: 2023, price: 70000, desc: "High-performance Lamborghini", imgUrl: "https://imgs.search.brave.com/JeCUsEYvtj2OA55xmuCSvrF7jyE9AQ2VeQXbiCTy0lI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDM1MDM0/NTEuanBn" },
    { id: 5, name: "Hyundai Elantra", brand: "Hyundai", year: 2021, price: 25000, desc: "Reliable Hyundai sedan", imgUrl: "https://imgs.search.brave.com/vvRjlLM7QSh7KbF_xqTqEaVdsw9UFzTnE4xYhUWLXf4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDQwNDUz/MTQuanBn" },
    { id: 6, name: "Ferrari 488", brand: "Ferrari", year: 2022, price: 35000, desc: "Iconic Ferrari sports car", imgUrl: "https://imgs.search.brave.com/DcOqPBAo0QNQJND1eDY1rXyTBdTiqYnjsJCBtDQDTYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9ibGFjay1jYXIt/d2l0aC1ibGFjay1y/b29mLWJsYWNrLWhv/b2Qtc2l0cy1ibGFj/ay1iYWNrZ3JvdW5k/XzEwMjExOTgtMjA0/OTEuanBnP3NlbXQ9/YWlzX2h5YnJpZA" },
    { id: 7, name: "Ford F-150", brand: "Ford", year: 2023, price: 39000, desc: "Popular Ford pickup truck", imgUrl: "https://imgs.search.brave.com/4Z5hk3ClQ8Cr4ZlA3tGOXeZvq7ZDacCA_v1qwVAr3cA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDE5MjEz/NjMuanBn" },
    { id: 8, name: "Toyota Corolla", brand: "Toyota", year: 2022, price: 45000, desc: "Reliable Toyota sedan", imgUrl: "https://imgs.search.brave.com/jOHzSfXVPvkRoJtNSybEBniqtK0ywuI4Q4ySQ93SCCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTg2/NzIwNC5qcGc" },
    { id: 9, name: "Honda Civic", brand: "Honda", year: 2021, price: 25000, desc: "Compact Honda sedan", imgUrl: "https://imgs.search.brave.com/Y8uF60OYuqGaspfkukxx1v5Pg_d33YJXmyTE0HrU1r4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL3NsZWVrLWJs/YWNrLTRrLWhvbmRh/LWNpdmljLW00Y3o1/aGp3c2VrdGx1aXYu/d2VicA" },
    { id: 10, name: "Thar", brand: "Mahindra", year: 2020, price: 55000, desc: "Mahindra Thar", imgUrl: "https://imgs.search.brave.com/vFbKD4axQbZmkXw_vl2ewUsPzqqxksbuo4XtFfFKDU4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvODQx/MTQxMS5qcGc" },
    { id: 11, name: "Swift Dzire", brand: "Maruti Suzuki", year: 2021, price: 45000, desc: "Maruti Suzuki Swift Dzire", imgUrl: "https://imgs.search.brave.com/cRQWZ1cgQWn5xckpqpkwNrSDY9LePRvvAGPTNcTBLhI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtd2l4bXAtZWQz/MGE4NmI4YzRjYTg4/Nzc3MzU5NGMyLndp/eG1wLmNvbS9mL2Zm/ZGJmNzY0LWMyOGMt/NGRmNC04NWQ4LTBl/OGMyZTdiNjk0NS9k/ZTFkNHo5LTM4NThk/ZmE0LTY0OTctNDkx/Mi05MzNlLWMzY2Iy/MGNmZGY3Zi5wbmc_/dG9rZW49ZXlKMGVY/QWlPaUpLVjFRaUxD/SmhiR2NpT2lKSVV6/STFOaUo5LmV5Snpk/V0lpT2lKMWNtNDZZ/WEJ3T2pkbE1HUXhP/RGc1T0RJeU5qUXpO/ek5oTldZd1pEUXhO/V1ZoTUdReU5tVXdJ/aXdpYVhOeklqb2lk/WEp1T21Gd2NEbzNa/VEJrTVRnNE9UZ3lN/alkwTXpjellUVm1N/R1EwTVRWbFlUQmtN/alpsTUNJc0ltOWlh/aUk2VzF0N0luQmhk/R2dpT2lKY0wyWmNM/MlptWkdKbU56WTBM/V015T0dNdE5HUm1O/QzA0TldRNExUQmxP/R015WlRkaU5qazBO/Vnd2WkdVeFpEUjZP/UzB6T0RVNFpHWmhO/QzAyTkRrM0xUUTVN/VEl0T1RNelpTMWpN/Mk5pTWpCalptUm1O/Mll1Y0c1bkluMWRY/U3dpWVhWa0lqcGJJ/blZ5YmpwelpYSjJh/V05sT21acGJHVXVa/RzkzYm14dllXUWlY/WDAuVXcwdko4M3Mw/LWF5Y3NZbUdRbkNr/ZWM2cDdycFdkc2FV/djZCSU5KQ01LQQ" },
    { id: 12, name: "Fortuner Legender", brand: "Toyota", year: 2022, price: 85000, desc: "Toyota Fortuner Legender", imgUrl: "https://imgs.search.brave.com/yAGGOapuhylxL37vj6wDKcpIv5ILchP_WrZvZsM9_ag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby9n/aXJuYXIvc2F5YXJh/dGJheS9sYXJnZS9n/YWxsZXJ5L2V4dGVy/aW9yLzQwLzQyNC90/b3lvdGEtZm9ydHVu/ZXItZnJvbnQtc2lk/ZS12aWV3LTM2Mzkx/MS5qcGc" }
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
          <Route path="car/:id" element={<CarDetails />} />
        </Routes>
        <Footer />
      </appContext.Provider>
    </BrowserRouter>
  );
}
export default App;