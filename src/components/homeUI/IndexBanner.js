import React, { Fragment, useEffect } from 'react'
import Slider from "react-slick";
import { toast } from 'react-toastify';

import LoadingSpinner from '../LoadingSpinner'
import useHttp from '../../hooks/httpHook'
import { getIndexBanner } from '../../lib/api'
import classes from './IndexBanner.module.css'


function IndexBanner() {
    const { sendRequest, data:Banner, error, status } = useHttp(getIndexBanner)

    useEffect(() => {
        sendRequest()
    }, [sendRequest])

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    if (status === 'Pending') {
        return <LoadingSpinner/>
    }
    
     

    if (status === 'Error') {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT })
        
        return <h1>{{ error }}</h1>
    }
 
    if (status === 'Success'){

 
     
      

        return (
            <Fragment>
                <section className={classes['desktop-main-banner']}>
                    <Slider {...settings}>
                        {console.log(Banner)}
                        {Banner.length && Banner.map((banner, index) => {
                            return banner.device === 'desktop' ? <div key={index}> <a href={`${banner.url}`} > <img src={banner.image} alt={`${banner.title} photo `} />   </a> </div> : ''
                        })}
                    </Slider>
                </section>
            </Fragment>
        )
    }
}
export default IndexBanner