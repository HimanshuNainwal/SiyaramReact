import axios from "axios"
import { toast } from 'react-toastify';


const baseApiUrl = 'https://sy.cartkm.greenhonchos.com/api/v1/customer'


export const getAccountDetails = async (form) =>{
   
    const response = await axios.post(`${baseApiUrl}/account-details`,form)
    console.log('response.data.success',response.data.success)
    if(response.data.success){
        console.log('response.data.success',response)
       return response
        
    }else{
        throw new Error(response.data.message)
    }

}