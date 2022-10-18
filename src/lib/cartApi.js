import { toast } from 'react-toastify'
import axios from "axios";

const cartBaseApiUrl = "https://sy.cartkm.greenhonchos.com/api/v1"


export async function add_product(cartData){
   
const response = await axios.post(`${cartBaseApiUrl}/product/add-product`,cartData,{ headers:{ "Content-Type": "application/json"}})

    if(response.data.success) {
        toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
        return response.data.data
    }else{
        toast.error(response.data.message, { position: toast.POSITION.TOP_CENTER })
    }

}