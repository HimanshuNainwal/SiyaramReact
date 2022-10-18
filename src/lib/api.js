import axios from "axios";

const baseApiUrl = 'https://sy.pimkm.greenhonchos.com'


export  async function getMenu (){
    
    
    const response = await axios.get(`${baseApiUrl}/pim/pimresponse.php/?service=menu&store=1`)
    if(response.data.response.success === 1) {
        return response.data.result
    }else{
        throw new Error(response.data.response.error_message)
    }
    

}
export  async function getIndexBanner (){
    
    
    const response = await axios.get(`${baseApiUrl}/pim/pimresponse.php/?service=banner_slider&store=1`)
    if(response.data.response.success === 1) {

        return response.data.result
    }else{
   
        throw new Error(response.data.response.error_message)
    }
    

}
export  async function getTrendingItems (){
    
    const response = await axios.get(`${baseApiUrl}/pim/pimresponse.php/?service=category&store=1&url_key=top-wear&count=15&page=1&sort_by=product_position&sort_dir=desc&filter=fashion_type~Core`)
    if(response.data.response.success === 1) {
        return response.data.result
    }else{
        throw new Error(response.data.response.error_message)
    }
    

}

// CATEGORY PAGE API 
export async function getProductslisting (url_key,filter,page){
    console.log(page,'page')
    const response = await axios.get(`${baseApiUrl}/pim/pimresponse.php/`,{
        params:{
            service: 'category',
            store: 1,
            url_key,
            page: page?page:1,
            count: 16,
            sort_by: 'product_position',
            sort_dir: 'desc',
            filter: filter?filter.join('|'):'',
        }
    })
    if(response.data.response.success === 1) {
        return response.data.result
    }else{
        throw new Error(response.data.response.error_message)
    }
}
