
import React from 'react'
import classes from './DisplayAddress.module.css'

function DisplayAddress() {
  return (
    <div className={`${classes['shipping-address-item']} ${classes['selected']}`}>
        <div className={classes['address']}>
            <span className={classes['name']}>Himanshu</span> <span className={classes['phone']}>8193986315</span>
            <p> Flat Number, Noida, LandMark, New Delhi, East Delhi, 110092 </p>
            <p>Address Type - Office </p>
        </div>
        <span className={classes.removeAddress}>
            <i className="fa fa-edit"></i>
        </span>

    </div>
  )
}

export default DisplayAddress