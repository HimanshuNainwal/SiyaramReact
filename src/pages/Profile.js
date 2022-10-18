import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

import {getAccountDetails} from '../lib/account'
import './profile.css'
import NavigationSidebar from '../components/accountUi/NavigationSidebar'
import LoadingSpinner from '../components/LoadingSpinner';


function Profile() {
    const [accountData,setAccountData] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const accountStore = useSelector(state => state.account)


    useEffect(() => {
        if(accountStore.customerId && accountStore.customerSession ){

           (async () => {
            try{

                const form = new FormData()
                form.append('customer_id',accountStore.customerId)
                form.append('customer_session',accountStore.customerSession)
                form.append('store',1)

                var response = await getAccountDetails(form)
                if(response.data.success){
                    setAccountData(response.data.data)
                    setIsLoading(false)
                }
            }catch(err){
                console.log(err,'4567890-=')
                toast.error(response.data.message,{
                    position:toast.POSITION.TOP_RIGHT
                })
            }
         })()
        }
      

      
    }, [accountStore])
    


  return (
    <div className='my-account container-fluid'>

        <div className='row'>

            <div className='col-md-3'>
                <NavigationSidebar isActive="profile" />
            </div>
                <div className='col-md-9'>
                    {  isLoading &&<LoadingSpinner/> }
                    {accountData &&
                    <div >
                        <div >
                            <h4 className="main-heading">Contact Information</h4>
                            <div className='content-box'>

                                {accountData.full_name && <p>{accountData.full_name}</p>}
                                {accountData.email && <p>{accountData.email}</p>}
                                {accountData.phone && <p>{accountData.phone}</p>}
                                {accountData.gender && <p>{accountData.gender}</p>}
                                {accountData.dob && <p>{accountData.dob}</p>}
                                

                                
                                <span className='action'>Edit</span>
                            </div>

                        </div>

                            <div >
                                <h4 className="main-heading">Default Shipping Address</h4>
                                <div className='content-box'>

                                
                                    {accountData.maddress.full_name && <p>{accountData.maddress.full_name}</p>}
                                    {accountData.maddress.street_address && <p>{accountData.maddress.street_address}</p>}
                                    {accountData.maddress.city && <p>{accountData.maddress.area} ,  {accountData.maddress.city} </p>}
                                    {accountData.maddress.pincode && <p>{accountData.maddress.state} ,  {accountData.maddress.pincode} </p>}
                                    {accountData.maddress.phone && <p>{accountData.maddress.phone}</p>}
                                    {accountData.maddress.address_type && <p>Address Type - {accountData.maddress.address_type}</p>} 

                                    <span className='action'>Edit</span>

                                </div>

                            </div>
                    </div>
                    }
                </div>

        </div>


    </div>
  )
}

export default Profile