import "./Products.css"
export default function Products() {
  const products = [
    { id: 1, url:"https://www.jagsfresh.com/product-details/dairy-milk-silk", name: "Diary Milk Silk", price: 30 },
    { id: 2, name: "Kitkat", price: 40 },
    { id: 3, name: "Dark chacolate", price: 45 },
    { id: 4, name: "Milky Bar", price: 95 },
    { id: 5, name: "Ferroro Rocher", price: 70 },
    { id: 6, name: "Munch", price: 25 },
  ];
  return (
    <div>
      <div className="App-Products-Row">
        {products.map((value, index) => (
          <div className="App-Products-Box" key={index}>
            <h3>{value.name}</h3>
            <h4>{value.price}</h4>
            <button>Add to Cart</button>
            </div>
        ))}
      </div>
    </div>
  );
}