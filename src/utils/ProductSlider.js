import classes from '../components/homeUI/TrendingSection.module.css'



function ProductSlider(props) {

    
    const viewProductDetail = () => {
        props.viewDetailHandler(props.product)
    }   


  return (
    <div className={classes.sliderContainer}  >

        <div className={classes["product-box"]} >
            <div className={`${classes["view-detail"]}`} >
                <span className={`${classes["view_detail_btn"]} ` } onClick={viewProductDetail} id="details" >Quick View</span>
            </div> 
            
                <div>
                    <img src={props.product.image} alt="" title="" />
                </div>
            
        </div>

        <div className={classes["product-infos"]}>
            <div className={classes["colorvar"]}>
                <span>{props.product.color_family}</span>
                <ul>
                    <li style={{'backgroundColor': 'rgb(255, 255, 255)'}}>
                        
                    </li>
                    
                </ul>
            </div>
            <p className={classes["product-name"]}>{props.product.name}</p> 
            {/* <p className={classes["product-size"]}>Size -<span>M/38</span><span>L/40</span><span>XL/42</span><span>XXL/44</span></p>  */}
                <div className={classes["price"]}><p><span className={classes["price font-bold"]}>Rs.{props.product.selling_price}</span>
            </p>
                
            </div>
        </div>
    </div>
  )
}

export default ProductSlider