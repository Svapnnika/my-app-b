import React from "react";
import "./Products.css"
import { appContext } from "../App";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { user, products, cart, setCart, searchTerm, setSearchTerm } = useContext(appContext);
  const navigate = useNavigate();

  const addToCart = (id) => {
    !cart[id] && setCart({...cart, [id]: 1});
  };
  
  const increment = (id) => {
    setCart({ ...cart, [id]: cart[id] + 1 });
  };
  
  const decrement = (id) => {
    setCart({ ...cart, [id]: cart[id] - 1 });
  };

  // Filter products based on search criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [products, searchTerm]);



  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <>
      <h3 color="white">Hello {user.name}</h3>

      {/* Products Display */}
      <div className="App-Products-Row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((value, index) => (
            <div key={value.id} className="App-Products-Box">
              <div 
                className="car-info-clickable"
                onClick={() => handleCarClick(value.id)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img src={value.imgUrl} height={200} width={300} alt={value.name} />
                <h3>{value.name}</h3>
                <p><strong>Brand:</strong> {value.brand}</p>
                <p><strong>Year:</strong> {value.year}</p>
                <p>{value.desc}</p>
                <h4>${value.price.toLocaleString()}</h4>
              </div>
              <div className="cart-actions" style={{ marginTop: '10px' }}>
                {cart[value.id] > 0 ? (
                  <div>
                    <button onClick={() => decrement(value.id)}>-</button>
                    <span style={{ margin: '0 10px' }}>{cart[value.id]}</span>
                    <button onClick={() => increment(value.id)}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(value.id)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            width: '100%', 
            padding: '50px',
            color: '#666' 
          }}>
            <h4>No cars found matching your search criteria</h4>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </>
  );
}