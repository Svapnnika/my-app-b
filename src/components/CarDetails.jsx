import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { appContext } from '../App';
import './CarDetails.css';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, setCart } = useContext(appContext);
  
  // Find the car by ID
  const car = products.find(product => product.id === parseInt(id));
  
  // If car not found, show error message
  if (!car) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        color: '#666' 
      }}>
        <h2>Car not found</h2>
        <p>The car you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const addToCart = (id) => {
    !cart[id] && setCart({...cart, [id]: 1});
  };
  
  const increment = (id) => {
    setCart({ ...cart, [id]: cart[id] + 1 });
  };
  
  const decrement = (id) => {
    setCart({ ...cart, [id]: cart[id] - 1 });
  };

  return (
    <div className="car-details-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        style={{
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      >
        ← Back to Products
      </button>

      <div className="car-details-content">
        <div className="car-image-section">
          <img 
            src={car.imgUrl} 
            alt={car.name}
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <div className="car-info-section">
          <h1 style={{ 
            color: 'white', 
            marginBottom: '10px',
            fontSize: '2.5rem'
          }}>
            {car.name}
          </h1>
          
          <div className="car-details-grid">
            <div className="detail-item">
              <strong>Brand:</strong> {car.brand}
            </div>
            <div className="detail-item">
              <strong>Year:</strong> {car.year}
            </div>
            <div className="detail-item">
              <strong>Price:</strong> <span style={{ color: '#28a745', fontSize: '1.5rem', fontWeight: 'bold' }}>${car.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="description-section">
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Description</h3>
            <p style={{ 
              color: '#666', 
              lineHeight: '1.6',
              fontSize: '1.1rem',
              marginBottom: '30px'
            }}>
              {car.desc}
            </p>
          </div>

          <div className="cart-actions">
            {cart[car.id] > 0 ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                marginBottom: '20px'
              }}>
                <button 
                  onClick={() => decrement(car.id)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  minWidth: '30px',
                  textAlign: 'center'
                }}>
                  {cart[car.id]}
                </span>
                <button 
                  onClick={() => increment(car.id)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
                <span style={{ 
                  marginLeft: '20px',
                  color: '#28a745',
                  fontWeight: 'bold'
                }}>
                  Added to Cart!
                </span>
              </div>
            ) : (
              <button 
                onClick={() => addToCart(car.id)}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}
              >
                Add to Cart
              </button>
            )}
          </div>

          <div className="additional-info">
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Features</h3>
            <ul style={{ 
              color: '#666', 
              lineHeight: '1.8',
              paddingLeft: '20px'
            }}>
              <li>Premium interior design</li>
              <li>Advanced safety features</li>
              <li>Fuel efficient engine</li>
              <li>Modern infotainment system</li>
              <li>Comfortable seating</li>
              <li>Excellent build quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}