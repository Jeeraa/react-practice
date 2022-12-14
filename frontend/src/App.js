// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react'
import { Store } from './Store'
import CartScreen from './screens/CartScreen'
import BarcodeScanner from './components/BarcodeScanner'
import { Link } from 'react-router-dom'
import NavbarCashier from './components/NavbarCashier'

function App() {
	const { state } = useContext(Store)
	const { cart } = state
	return (
		<Router>
			<div className="d-flex flex-column site-container">
				{/* <header>
					<Navbar bg="dark" variant="dark">
					<Container>
					<LinkContainer to="/">
					<Navbar.Brand>POSME</Navbar.Brand>
					</LinkContainer>
					<Nav className="me-auto">
					<Link to="/cart" className="nav-link">
					Cart
					{cart.cartItems.length > 0 && (
						<Badge pill bg="danger">
						{cart.cartItems.reduce(
							(a, c) => a + c.quantity,
							0
							)}
							</Badge>
							)}
							</Link>
							</Nav>
							</Container>
							</Navbar>
						</header> */}

				<main>
					{/* <NavbarCashier /> */}
					<Container className="mt-3">
						<Routes>
							<Route
								path="/product/:slug"
								element={<ProductScreen />}
							/>
							<Route path="/cart" element={<CartScreen />} />
							<Route
								path="/barcode_scanner"
								exact
								element={<BarcodeScanner />}
							/>
							<Route path="/additem" element={<HomeScreen />} />
						</Routes>
					</Container>
					
				</main>
			</div>
			</Router>
	)
}

export default App
