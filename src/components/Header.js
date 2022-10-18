import React ,{Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


import useHttp from '../hooks/httpHook'
import {getMenu} from '../lib/api'
import './header.css'
import Login from './Login';


export default function Header() {
	const {sendRequest,data:menus,error,status} = useHttp(getMenu)
	const cartQuantity = useSelector(state => state.cart.cartQuantity)
	const [showLoginModal,setShowLoginModal] = useState(false)
	const accountStore = useSelector(state => state.account)
	

	useEffect(() => {
		sendRequest()
	}, [sendRequest])
	
	const openLoginModal = () => {
		setShowLoginModal(true)
	} 
	const closeLoginModal = () => {
		setShowLoginModal(false)
	}

	if(error){
        return toast.error(error,{ position: toast.POSITION.TOP_CENTER})
	}
		
  if(status === 'Success' ){
	return (

		<Fragment>

			<div className='goto-here'>
				<div className="py-1 bg-black">
				<div className="container">
					<div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
						<div className="col-lg-12 d-block">
							<div className="row d-flex">
								<div className="col-md pr-4 d-flex topper align-items-center">
									<div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
									<span className="text">+ 1235 2355 98</span>
								</div>
								<div className="col-md pr-4 d-flex topper align-items-center">
									<div className="icon mr-2 d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
									<span className="text">youremail@email.com</span>
								</div>
								<div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
									<span className="text">3-5 Business days delivery &amp; Free Returns</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg  ftco-navbar-light" id="ftco-navbar">
				<div className="container">
				<Link className="navbar-brand" to="/">Siyarams</Link>
					
		
				<div className="collapse navbar-collapse" id="ftco-nav">
					<ul className="navbar-nav ml-auto">
					
						{menus.map((menu,index) => {
							return  <li className="nav-item" key={index}> <Link to={`/category/${menu.menu_url_key}`} className="nav-link">{menu.name} </Link></li>
						})}
						
						<li className='headerIcons'>
							<Link to={`/cart`}>
									<span  id="navbardrop" className="nav-item dropdown cart" >
									<i className="fa fa-shopping-cart shoppingBasketIcon" aria-hidden="true"></i>
									<span className="counter-number">{cartQuantity}</span></span>
							</Link>
						</li>
						<li className={`headerIcons ${accountStore.is_login === 1?'userdropContainer':''}`} >
							<i className="fa fa-user userIcon" aria-hidden="true"  onClick={openLoginModal}></i>

							{accountStore.is_login === 1 && <div className='loginDropDown' >
									 <span className='customer-name'>Hi {accountStore.customerName?accountStore.customerName :"Guest"}</span> 

									<Link className='dropdown-item' to='/my-profile'>My Profile</Link>
									<Link  className='dropdown-item' to="/my-order">My Order</Link>
									<Link className='dropdown-item' to="/">SignOut</Link>


								</div>
							}
						
						</li>
						
		
					</ul>
				</div>
				</div>
			</nav>
			</div>
			
			{showLoginModal && !accountStore.customerId &&  <Login onClose={closeLoginModal}/>}

		</Fragment>

	  )
  }
	
}
