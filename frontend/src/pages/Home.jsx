import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const Home = () => {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('api/products')
        const data = await response.json()
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='home-container'>
      <div className="hero-banner">
        <h1>Welcome to FlyCart</h1>
        <p>Explore our product. quality is our first priority</p>
      </div>
      {loading? (
        <div>Loading...</div>
      ):(
        <div className="product-grid">
          {product.map((product) => (
            <ProductCard key={product._id} product={product} ></ProductCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home