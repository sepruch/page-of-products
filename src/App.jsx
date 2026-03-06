import { useState } from 'react'
import './App.css'
import background from './assets/background.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
      <main className="page-wrapper">
          <header className="header">
              <h1>Каталог товаров</h1>
          </header>
          <section className="products-grid">
              <div className="product-card">
                  <h2>Название товара</h2>
                  <button className="buy-button">Купить</button>
              </div>
          </section>
      </main>
  )
}

export default App
