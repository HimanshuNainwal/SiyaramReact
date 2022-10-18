import React, { useState } from 'react'
import {  useSelector,useDispatch } from "react-redux";
import Slider from 'react-slick'

import classes from '../components/homeUI/TrendingSection.module.css'
import { add_product } from '../lib/cartApi.js'
import {cartActions} from '../store/cartSlice'

function ProductModal(props) {
    const [slider1, setSlider1] = useState(null)
    const [slider2, setSlider2] = useState(null)
    const [sizeSelect, setSizeSelect] = useState(null)
    const [sizeError, setSizeError] = useState(null)
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)
   
    // const { sendRequest} = useHttp(add_product)
    
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

    }
    const settings2 = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        className: classes.verticleSLider


    }
   

    const selectSizeHandler = (el) => {
        setSizeError('')
        setSizeSelect(el)

    }


    const addToCart = async () => {

        if (sizeSelect) {
            
            const form = new FormData()
            form.append('product_id', props.product.variation[sizeSelect].id_product)
            form.append('product_parent_id', props.product.id_product)
            form.append('product_options', props.product.variation[sizeSelect].size)
            form.append('name', props.product.name)
            form.append('sku', props.product.variation[sizeSelect].sku)
            form.append('master_sku', props.product.sku)
            form.append('price', props.product.price)
            form.append('qty_ordered', 1)
            form.append('group_id', props.product.group_id)
            form.append('final_price', props.product.selling_price)
            form.append('store', 1)
            if(cartState.cartSession && cartState.cartId){
                form.append('cart_id', cartState.cartId)
                form.append('cart_session', cartState.cartSession)
               
            }   


            const responseData =  await add_product(form);
            console.log(responseData.products,responseData)
            if(!cartState.cartSession && !cartState.cartId){
                  dispatch(cartActions.setCartInfo({ cartId:responseData.cart_id,cartSession:responseData.cart_session,cartProducts:responseData.products}))
                  localStorage.setItem('cart_id', responseData.cart_id)
                  localStorage.setItem('cart_session', responseData.cart_session)
            }else {
                dispatch(cartActions.updateCartQuantity({cartQuantity:responseData.products.length}))
            }
            setSizeSelect('')

        } else {
            setSizeError('Please Select a size first')
        }

    }



    return (
        <div className={classes.productModalContainer}> 

            <div className='row'>

                <div className='col-md-5'>
                    <div className='row'>
                        <div className={`col-md-3 verticalSlide`}>
                            <Slider {...settings2} asNavFor={slider2} ref={el => setSlider1(el)}>
                                {props.product.gallery.map((item, index) => {
                                    return <div className={classes["product-box"]} key={index} >
                                        <div>
                                            <img src={item.image} alt="" title="" />
                                        </div>
                                    </div>
                                })}
                            </Slider>
                        </div>
                        <div className='col-md-9'>
                            <Slider {...settings} asNavFor={slider1} ref={el => setSlider2(el)}>
                                {props.product.gallery.map((item, index) => {
                                    return <div className={classes["product-box"]} key={index} >
                                        <div>
                                            <img src={item.image} alt="" title="" />
                                        </div>
                                    </div>
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className={`col-md-7 ${classes['content-section']} `}>
                    <h1 className={classes["page-title"]} > {props.product.name}</h1>
                    <div className={classes.price}>
                        <span className={`${classes.price} font-medium pr-2`} > Rs. {props.product.selling_price} </span>
                    </div>
                    <div className={classes["size-container"]}>

                        {/* {color image} */}
                        <div className={classes["size-bg"] + classes["color_option"]}>
                            <label >Available Colors</label>
                            <ul className={classes["size-buttons"]} >
                                {props.product.color_options.map((color, index) => {
                                    return <li className="" key={index}>
                                        {/* <Link  to={} className="size select-one-size nuxt-link-exact-active nuxt-link-active"> */}
                                        <span>  <img src={color.image} className="w-100" /></span>
                                        {/* </Link> */}
                                    </li>
                                })}
                            </ul>
                        </div>
                        {/* size buttons  */}

                        <div className={classes['size-bg']}>
                            <label >Select Size</label>
                            <div className={classes['size-box']} >
                                {Object.keys(props.product.variation).map(el => {
                                    return <label className={`${classes["size-button"]} ${sizeSelect === props.product.variation[el].size ? classes['selected'] : ''} `} onClick={selectSizeHandler.bind(this, el)} key={el}  >
                                        <span >{props.product.variation[el].size}</span>
                                    </label>
                                })
                                }
                            </div>
                            {sizeError && <p className={classes.error}>{sizeError}</p>}
                        </div>
                    </div>

                    <div className="btns ">
                        <button type="button" id="product-addtocart-button" title="Add to cart" className={classes["add-to-cart"] + " " + classes['btn']} onClick={addToCart}>
                            <i className="fa fa-shopping-bag" ></i>
                            Add to cart
                        </button>
                        <button type="button" id="buy-now" title="Wishlist" className={classes["wishlist"] + " " + classes['btn']}>
                            <i className="fa fa-heart-o"></i>
                            WISHLIST
                        </button>
                    </div>

                    <div className={classes['check-delivery']}>
                        <label >DELIVERY OPTIONS </label>
                        <div>
                            <input type="text" maxLength="6" placeholder="Check pincode" className={classes['input-text']}></input>
                        </div>
                    </div>

                    <div className={classes['product_desc']}>
                        <h3 className="font-medium"> Product Details </h3>
                        <div className={classes['description']}>
                            <p>
                                {props.product.description}
                            </p>
                        </div>

                    </div>




                </div>

            </div>
        </div>



    )
}

export default ProductModal