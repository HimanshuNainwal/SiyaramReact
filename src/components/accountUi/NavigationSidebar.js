
import React from 'react'

import './navigationSidebar.css'


function NavigationSidebar(props) {
  return (
    <div>
        <ul className='sidebar'>    
            <li className={props.isActive === 'profile'?'active':''}> <span> My Profile</span></li>
            <li className={props.isActive === 'orders'?'active':''}> <span>My Orders </span></li>

        </ul>
    </div>
  )
}

export default NavigationSidebar