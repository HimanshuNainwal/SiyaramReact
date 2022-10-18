import React, {  useEffect, useState } from 'react'
import Slider from "react-slick";
import { toast } from 'react-toastify';

import LoadingSpinner from '../LoadingSpinner'
import useHttp from '../../hooks/httpHook'
import { getTrendingItems } from '../../lib/api'
import classes from './TrendingSection.module.css'
import ProductSlider from '../../utils/ProductSlider'
import Modal from '../Modal'
import ProductModal from '../../utils/ProductModal'

function TrendingSection() {
    const { sendRequest, data: trendingItem, error, status } = useHttp(getTrendingItems)
    const [showModal,setShowModal] = useState(false)
    const [activeProduct,setActiveProduct] = useState(null)
  

    useEffect(() => {
        sendRequest()
    }, [sendRequest])


    const openProductModal = (product) => {
        setShowModal(true)
        setActiveProduct(product)
    }
    const closeProductModal = () => {
        setShowModal(false)
        setActiveProduct(null)
    }
   

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
    }


    if (status === 'Pending') {
        return <LoadingSpinner/>
    }

    if (status === 'Error') {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT })
        return <h1>{{ error }}</h1>
    }
    if (status === 'Success') {
        const products = trendingItem.products 

        return (
            <section className='container'>
                <h2 className={classes["mainheading"] + " text-center"}> Timeless classics from the house of Winkle's</h2>

                {showModal && 
                    <Modal onClose={closeProductModal}  > <ProductModal product={activeProduct}  />  </Modal>}

                <Slider {...settings}>
                    {products.map((product,index) => {return <ProductSlider product={product} key={index} viewDetailHandler={openProductModal}/> })}
                </Slider>    

            </section>
        )
    }
}

export default TrendingSection