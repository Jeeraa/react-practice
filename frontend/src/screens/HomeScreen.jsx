import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import data from '../data'

function HomeScreen() {
	const [Products, setProducts] = useState([])

	useEffect(() => {
		axios.get('http://localhost:5000/api/products').then((response) => {
			setProducts(response.data)
		})
	}, [])

	return (
		<div>
			<h1>Featured Products</h1>
			<div className="products">
				{Products.map((product) => {
					return (
						<div className="product" key={product.slug}>
							<Link to={`/product/${product.slug}`}>
								<img src={product.image} alt={product.name} />
							</Link>
							<div className="product-info">
								<Link to={`/product/${product.slug}`}>
									<p>{product.name}</p>
								</Link>
								<p>
									<strong>${product.price}</strong>
								</p>
								<button>Add to cart</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default HomeScreen
