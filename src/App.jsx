import { useState, useEffect } from 'react';
import { fetchProducts } from "./api.js";
import './App.css';
import searchIcon from './assets/search.svg';
import filterIcon from './assets/filter.svg';
import cartIcon from './assets/cart.svg';

const getLevenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const indicator = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1,
                matrix[i - 1][j - 1] + indicator
            );
        }
    }
    return matrix[b.length][a.length];
};

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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
                setIsCartOpen(false);
            }
        };

        if (selectedProduct || isCartOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct, isCartOpen]);

    const categories = ['Все', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
        if (!matchesCategory) return false;
        const query = searchQuery.trim().toLowerCase();

        if (!query) return true;
        const title = product.title.toLowerCase();

        if (title.includes(query)) return true;
        const titleWords = title.split(/[\s,.-]+/);
        const queryWords = query.split(/[\s,.-]+/);

        return queryWords.every(qWord => {
            if (!qWord) return true;
            const maxErrors = qWord.length <= 4 ? 1 : 2;

            return titleWords.some(tWord => {
                if (tWord.includes(qWord)) return true;
                const distance = getLevenshteinDistance(qWord, tWord);
                return distance <= maxErrors;
            });
        });
    });

    const addToCart = (product) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

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
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
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
                                    <button
                                        className="buy-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}>
                                        Купить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
                <img src={cartIcon} alt="корзина" className="cart-icon" />
                {cart.length > 0 && (
                    <span className="floating-cart-badge">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                )}
            </button>

            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>

                        <div className="modal-content">
                            <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image-large" />

                            <div className="modal-details">
                                <span className="product-category">{selectedProduct.category}</span>
                                <h2 className="modal-title">{selectedProduct.title}</h2>
                                <ul className="modal-specs-list">
                                    {selectedProduct.description.split('/').map((spec, index) => (
                                        <li key={index} className="modal-spec-item">
                                            {spec.trim()}
                                        </li>
                                    ))}
                                </ul>

                                <div className="modal-footer">
                                    <span className="modal-price-large">{selectedProduct.price} ₽</span>
                                    <button
                                        className="buy-button modal-buy-btn"
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            setSelectedProduct(null);
                                        }}>
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isCartOpen && (
                <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
                    <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h2>Корзина</h2>
                            <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
                        </div>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <p className="empty-cart">Корзина пуста</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.title} />
                                        <div className="cart-item-info">
                                            <h4>{item.title}</h4>
                                            <p>{item.price} ₽ x {item.quantity}</p>
                                        </div>
                                        <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Удалить</button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="cart-footer">
                            <h3>Итого: <span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽</span></h3>
                            <button className="checkout-btn">Оформить заказ</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;