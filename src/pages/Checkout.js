

import React, { useState } from 'react'
import DisplayAddress from '../utils/DisplayAddress'
import classes from './Checkout.module.css'

function Checkout() {

    const [pageType,setPageType] = useState('selectAddress')

  return (
    <div >

        <div className='row'>

            <div className={`col-md-8 col-sm-12 col-xs-12 ${classes['checkout-section']}`}>

                {pageType === 'selectAddress' &&
                    <div className={classes['shipping-address-Section']}>

                        <div className={classes.addressBox + classes.hide}> 
                            <DisplayAddress/>
                        </div>
                        <button  type="button" className={`${classes["new-address-btn"]} ${classes["show-all-address"]}`} ><span >View All Addresses</span></button>
                    </div>
                }


            </div>
            <div className={`col-md-4 col-sm-12 col-xs-12 ${classes['checkout-sidebar']}`}>

            </div>
        </div>



        

    </div>
  )
}

export default Checkout