import { useContext, useReducer } from 'react'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageBox from '../components/MessageBox'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BrowserRouter, Link, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BarcodeScanner from '../components/BarcodeScanner'
import { LinkContainer } from 'react-router-bootstrap'
import logger from 'use-reducer-logger'
import NavbarCashier from '../components/NavbarCashier'

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true }
		case 'FETCH_SUCCESS':
			return { ...state, products: action.payload, loading: false }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}

export default function CartScreen() {
	const [{ loading, error, products }, dispatch] = useReducer(
		logger(reducer),
		{
			products: [],
			loading: true,
			error: '',
		}
	)

	const navigate = useNavigate()
	const { state, dispatch: ctxDispatch } = useContext(Store)
	const {
		cart: { cartItems },
	} = state

	const updateCartHandler = async (item, quantity) => {
		const { data } = await axios.get(`/api/products/${item._id}`)
		if (data.countInStock < quantity) {
			window.alert('Sorry. Product is out of stock')
			return
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		})
	}
	const removeItemHandler = (item) => {
		ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
	}

	const checkoutHandler = () => {
		navigate('/payment')
	}

	const scannerHandler = () => {
		navigate('/barcode_scanner')
	}

	const additemHandler = () => {
		navigate('/additem')
	}

	return (
		<div>
			<NavbarCashier />
			<Helmet>
				<title>Shopping Cart</title>
			</Helmet>
			<a href='/barcode_scanner'>
				<div className="d-grid mt-sm-2 mb-sm-2">
					<Button
						type="button"
						variant="primary"
						onClick={scannerHandler}
						disabled={cartItems.length === 0}
					>
						<i className="fas fa-barcode fa-5x"></i>
					</Button>
				</div>
			</a>
			<a href='/additem'>
			<div className="d-grid mt-sm-2 mb-sm-2">
				<Button
					type="button"
					variant="primary"
					onClick={additemHandler}
					disabled={cartItems.length === 0}
				>
					เพิ่มสินค้า
				</Button>
			</div>
			</a>
			<Row>
				<Col>
					{cartItems.length === 0 ? (
						<MessageBox>
							Cart is empty. <Link to="/">Go Shopping</Link>
						</MessageBox>
					) : (
						<ListGroup>
							{cartItems.map((item) => (
								<ListGroup.Item key={item._id}>
									<Row className="align-items-center">
										<Col md={4}>
											{/* <Link to={`/product/${item.slug}`}> */}
											{item.name}
											{/* </Link> */}
										</Col>
										<Col md={3}>
											<Button
												onClick={() =>
													updateCartHandler(
														item,
														item.quantity - 1
													)
												}
												variant="light"
												disabled={item.quantity === 1}
											>
												<i className="fas fa-minus-circle"></i>
											</Button>{' '}
											<span>{item.quantity}</span>{' '}
											<Button
												variant="light"
												onClick={() =>
													updateCartHandler(
														item,
														item.quantity + 1
													)
												}
												disabled={
													item.quantity ===
													item.countInStock
												}
											>
												<i className="fas fa-plus-circle"></i>
											</Button>
										</Col>
										<Col md={3} justify-content-end>
											฿ {item.price}
										</Col>
										<Col md={2}>
											<Button
												onClick={() =>
													removeItemHandler(item)
												}
												variant="light"
											>
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<div className="d-grid mt-sm-2">
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<div className="d-flex justify-content-between">
												<h3>
													ยอดสุทธิ (
													{cartItems.reduce(
														(a, c) =>
															a + c.quantity,
														0
													)}{' '}
													ชิ้น)
												</h3>
												<h3>
													{cartItems.reduce(
														(a, c) =>
															a +
															c.price *
																c.quantity,
														0
													)}{' '}
													฿
												</h3>
											</div>
										</ListGroup.Item>
										<ListGroup.Item>
											<div className="d-grid">
												<Button
													type="button"
													variant="primary"
													onClick={checkoutHandler}
													disabled={
														cartItems.length === 0
													}
												>
													ชำระเงิน
												</Button>
											</div>
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</Row>
		</div>
	)
}
