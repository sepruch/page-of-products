import { useState, useEffect } from 'react';
import { fetchProducts } from "./api.js";
import './App.css';

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
      fetchProducts().then((data) => {
          setProducts(data);
          setIsLoading(false);
      });
  }, []);

    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
      <main className="page-wrapper">
          <header className="header">
              <h1>Каталог товаров</h1>
          </header>
          <input
          type="text"
          placeholder="Поиск"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          <section className="products-grid">
              {isLoading ? (
                  <div className="loader">Загрузка товаров</div>
              ) : filteredProducts.length === 0 ? (
                  <p>Мы ничего не нашли</p>
              ) : (filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                      <img src={product.image} alt={product.title} className="product-image" />
                      <div className="product-info">
                          <span className="product-category">{product.category}</span>
                          <h2>{product.title}</h2>
                          <p className="product-desc">{product.description}</p>
                          <div className="product-bottom">
                              <span className="product-price">{product.price} ₽</span>
                              <button className="buy-button">Купить</button>
                          </div>
                      </div>
                  </div>
                  ))
              )}
          </section>
      </main>
  );
}

export default App;
