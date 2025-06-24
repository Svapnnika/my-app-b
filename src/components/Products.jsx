import React from "react";
import "./Products.css"
import { appContext } from "../App";
import { useContext, useState, useMemo } from "react";

export default function Products() {
  const { user, products, cart, setCart } = useContext(appContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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
      
      const matchesMinPrice = minPrice === "" || product.price >= parseInt(minPrice);
      const matchesMaxPrice = maxPrice === "" || product.price <= parseInt(maxPrice);
      const matchesYear = selectedYear === "" || product.year.toString() === selectedYear;
      
      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesYear;
    });
  }, [products, searchTerm, minPrice, maxPrice, selectedYear]);

  // Get unique years for dropdown
  const availableYears = [...new Set(products.map(product => product.year))].sort((a, b) => b - a);

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedYear("");
  };

  return (
    <>
      <h3>Hello {user.name}</h3>
      
      {/* Search Bar Section */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '10px 15px', 
        margin: '10px auto', 
        borderRadius: '3px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        width: '320px',
        maxWidth: '100%'
      }}>
        <h5 style={{ color: '#333', marginBottom: '8px', fontSize: '14px' }}>Search Cars</h5>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Search by name/brand */}
          <div>
            <input
              type="text"
              placeholder="Search by brand or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '6px 8px',
                borderRadius: '3px',
                border: '1px solid #ddd',
                width: '100%',
                fontSize: '12px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Price range and Year filter row */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Price range */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flex: 1 }}>
              <span style={{ color: '#333', fontSize: '11px' }}>Price:</span>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{
                  padding: '5px',
                  borderRadius: '3px',
                  border: '1px solid #ddd',
                  width: '45px',
                  fontSize: '11px'
                }}
              />
              <span style={{ color: '#333', fontSize: '11px' }}>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{
                  padding: '5px',
                  borderRadius: '3px',
                  border: '1px solid #ddd',
                  width: '45px',
                  fontSize: '11px'
                }}
              />
            </div>

            {/* Year filter */}
            <div style={{ flex: 1 }}>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  padding: '5px',
                  borderRadius: '3px',
                  border: '1px solid #ddd',
                  fontSize: '11px',
                  width: '100%'
                }}
              >
                <option value="">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Clear filters button */}
            <button
              onClick={clearFilters}
              style={{
                padding: '5px 8px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div style={{ marginTop: '5px', color: '#666', fontSize: '11px' }}>
          Showing {filteredProducts.length} of {products.length} cars
        </div>
      </div>

      {/* Products Display */}
      <div className="App-Products-Row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((value, index) => (
            <div key={value.id} className="App-Products-Box">
              <img src={value.imgUrl} height={200} width={300} alt={value.name} />
              <h3>{value.name}</h3>
              <p><strong>Brand:</strong> {value.brand}</p>
              <p><strong>Year:</strong> {value.year}</p>
              <p>{value.desc}</p>
              <h4>${value.price.toLocaleString()}</h4>
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