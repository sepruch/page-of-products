import { useState, useEffect } from 'react';
import { fetchProducts } from "./api.js";
import './App.css';
import searchIcon from './assets/search.svg';
import filterIcon from './assets/filter.svg';

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProduct(null);
            }
        };

        if (selectedProduct) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct]);

    const categories = ['Все', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="page-wrapper">
            <header className="header">
                <h1>Каталог товаров</h1>

                <div className="search-wrapper">
                    <img src={searchIcon} alt="Поиск" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Поиск товаров..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className={`filter-btn ${isFilterOpen ? 'active' : ''}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <img src={filterIcon} alt="Фильтр" className="filter-icon" />
                    </button>

                    {isFilterOpen && (
                        <div className="categories-dropdown">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsFilterOpen(false);
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <section className="products-grid">
                {isLoading ? (
                    <div className="loader">Загрузка товаров</div>
                ) : filteredProducts.length === 0 ? (
                    <p className="not-found">Мы ничего не нашли</p>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h2>{product.title}</h2>
                                <div className="product-bottom">
                                    <span className="product-price">{product.price} ₽</span>
                                    <button className="buy-button" onClick={(e) => e.stopPropagation()}>Купить</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>

                        <div className="modal-content">
                            <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image-large" />

                            <div className="modal-details">
                                <span className="product-category">{selectedProduct.category}</span>
                                <h2 className="modal-title">{selectedProduct.title}</h2>
                                <p className="modal-description-full">{selectedProduct.description}</p>

                                <div className="modal-footer">
                                    <span className="modal-price-large">{selectedProduct.price} ₽</span>
                                    <button className="buy-button modal-buy-btn">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;