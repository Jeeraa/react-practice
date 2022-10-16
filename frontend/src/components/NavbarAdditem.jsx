import React, { useEffect, useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { GoSignOut } from 'react-icons/go'
import './NavbarCashier.css'

function NavbarAdditem() {
	const [sticky, setSticky] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setSticky(window.scrollY > 0)
			// console.log(window.screenY)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	return (
		<nav className={`${sticky ? 'sticky' : ''}`}>
			<div className="nav-inner">
				<div className="links">
					<a href="/cart">
						<BsFillArrowLeftCircleFill />
					</a>
				</div>
				<div className="namepage">
					<span>เพิ่มสินค้า</span>
				</div>
				<div className="links">
					<a href="/cart">
						<GoSignOut />
					</a>
				</div>
			</div>
		</nav>
	)
}

export default NavbarAdditem
