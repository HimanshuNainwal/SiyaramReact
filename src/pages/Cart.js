import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartData,removeCartProduct,updateCartProduct } from '../store/cartActions'
import "./cart.css";

const Cart = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    
    const removeProduct = (id) => {
        dispatch(removeCartProduct(id))
    }   
    const updateProduct = (type,qty,id) => {
        if((qty === 1 && type === 'remove') || (qty === 10 && type ==='add') ){
            return
        }else {
            const quantity = type === 'remove' ? qty -1 : qty + 1
            dispatch(updateCartProduct(quantity,id))
        }
    }

    useEffect(() => {
   
        
        if(cart.cartQuantity > 0){
           
            dispatch(fetchCartData())
        }
    },[dispatch])

 
    if(cart.cartQuantity > 0){
        return (
            <Fragment>
              <div className="container-fluid cart-container">
                <h1 className="cartHeading  "> Shopping Cart</h1>

                <div className="row">
                  <div className="col-9 cart-table">
                    <table className="cart table">

                    
                        <thead>
                        <tr>
                            <th className="item font-medium">
                            <span>Item</span>
                            </th>
                            <th className="qty font-medium">
                            <span>Qty</span>
                            </th>
                            <th className="price font-medium">
                            <span>Price</span>
                            </th>
                            <th className="discount font-medium">
                            <span>Discount</span>
                            </th>
                            <th className="subtotal font-medium">
                            <span>Subtotal</span>
                            </th>
                        </tr>
                        </thead>
                        {
                            cart.cartProducts.map((el,index) => {
                                return <tbody className="cart-item" key={index}>
                                    <tr className="item-info">
                                        <td className="item">
                                            <div className="row"> 
                                                <div className="col-md-4">
                                                    {/* <Link to={`/category/${''}`}>  */}
                                                        <img src={el.image} alt={el.name} />
                                                    {/* </Link>      */}
                                                </div>
                                                <div className="col-md-8">
                                                    <h2 className="item-name">
                                                        {el.name}
                                                    </h2>
                                                    <p className="size">
                                                        <span className="font-medium">SIZE: </span> 
                                                        <span className="size">{el.size}</span>
                                                    </p>
                    
                                                    <p className="actionContainer">
                                                        <span className="remove-cart" onClick={removeProduct.bind(this,el.id_product)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                            Remove
                                                        
                                                        </span>
                                                        <span className="move-wishlist">
                                                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                            Add To WishList
                                                        </span>
                    
                                                    </p>
                    
                                                </div>
                                            </div>
                                        </td>
                                        <td className="qty">
                                            <span className={`qtyAction ${el.qty === 1?'disabled':''}`} onClick={updateProduct.bind(this,'remove',el.qty,el.id_product)}> <i className="fa fa-minus" aria-hidden="true"></i> </span> 
                                            <span className="qtyAction displayQty">{el.qty}</span>  
                                            <span className={`qtyAction ${el.qty > 10?'disabled':''}`} onClick={updateProduct.bind(this,'add',el.qty ,el.id_product)} > <i className="fa fa-plus" aria-hidden="true"></i> </span> 
                                        </td>
                                        <td className="price">
                                            <p> Rs. {el.selling_price}</p>
                                        </td>
                                        <td className="discount">
                                            <p> Rs. {el.discount_amount?el.discount_amount :'0.0'}</p>
                    
                                        </td>
                                        <td className="Subtotal">
                                            <p> Rs. {el.selling_price * el.qty}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            })
                        }
                    </table>
                  </div>
                  <div className="col-3 cart-summary">
                    <div className="summary-container">
                        <label className="label summary-label font-medium">
                            <span>Summary</span>
                        </label>
                        <table>
                            <tbody>
                                <tr className="totals sub">
                                    <th className="font-medium">Subtotal</th> 
                                    <td className="amount">
                                        <span className="price">Rs.<span id="m_sub_total" className="sub_total">{cart.cartData.order_subtotal}</span>
                                        </span>
                                    </td>
                                </tr> 
                                <tr className="grand totals">
                                    <th className="font-bold">
                                        <strong>Order Total</strong>
                                    </th>
                                    <td className="amount font-bold">
                                        <strong>
                                            <span className="price">Rs.<span className="sub_total">{cart.cartData.grand_total}</span>
                                        </span></strong>
                                    </td>
                                </tr>
                                {cart.cartData.grand_total > 3000 && cart.cartData.grand_total> 300   && <tr className="error3000" >
                                    <td >
                                        <span className="text-danger">COD is only available for orders values of Rs. 300/- to Rs. 3,000/-</span>
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
    }else{
        return <div className="col-12 text-center">
                 <h1 className="cartHeading  "> Shopping Cart</h1>
            <p>
                You have no items in your shopping cart.<br/> <Link to="/category/top-wear " className=""><span>Click here</span></Link>
                to continue shopping.
            </p></div>
    }
 
};

export default Cart;
