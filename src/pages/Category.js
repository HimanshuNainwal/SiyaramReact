import React, { useCallback, useEffect, useState,useRef } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux/es/exports'; 

import {getProductslisting} from '../lib/api'
import ProductSlider from '../utils/ProductSlider';
import classes from './Category.module.css'
import LoadingSpinner from '../components/LoadingSpinner';
import ProductModal from '../utils/ProductModal'
import Modal from '../components/Modal'
import CategoryFilters from '../utils/CategoryFilters'





function Category() {
  
  const {category} = useParams()
  const [categoryResult,setCategoryResult] = useState('')
  const [categoryProducts,setCategoryProducts] = useState([])

  const [selectedFilter,setSelectedFilter] = useState([])

  const [showModal,setShowModal] = useState(false)
  const [activeProduct,setActiveProduct] = useState(null)
  

  const [categoryLoader,setCategoryLoader] = useState(false)
  const [lazyLoader,setLazyLoader] = useState(false)


  const [pageNumber,setPageNumber] = useState(1)  
  const [loadMoreProduct,setLoadMoreProduct] = useState(false)  
  // const page_loader = useSelector(state => state.ui.page_loader)
  
  const dispatch = useDispatch()
  const observer = useRef()

  const getProducts = useCallback( async(url_key,filter,page) => {
    return await getProductslisting(url_key,filter,page)
  },[])


  
  const loaderElemet = useCallback(async (node) =>{ 
    // console.log('hi',loadMoreProduct)
      if (!loadMoreProduct) return

      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(async(entries) => {
        console.log(entries[0].isIntersecting,'entries[0].isIntersecting')
        if (entries[0].isIntersecting && loadMoreProduct ) {
          setLoadMoreProduct(false)
          
          const productData = await getProducts(category,selectedFilter,pageNumber)
          
          if(productData.products.length){
            setPageNumber(prevPageNumber => prevPageNumber + 1)
            setCategoryProducts(products => [...products,...productData.products])
            setTimeout(()=> {
              setLoadMoreProduct(true)
            },2000)  
          }else{
            setLoadMoreProduct(false)
            // setLazyLoader(false)

          }
        
      }
    })
      if (node) observer.current.observe(node)
    },[loadMoreProduct,pageNumber,category,getProducts,selectedFilter])




  
  useEffect( () => {
    const fetchData = async () =>  {
      
    
      setCategoryLoader(true)
      const productData = await getProducts(category,selectedFilter)

      setCategoryResult(productData)
      window.scrollTo(0,0)
      setCategoryLoader(false)
      setLazyLoader(true)
      setLoadMoreProduct(true)
      setCategoryProducts(productData.products)
      setPageNumber(2)


      
    }
    fetchData()

  },[getProducts,category,dispatch,selectedFilter])
  
  const openProductModal = (product) => {
    setShowModal(true)
    setActiveProduct(product)
  }
  const closeProductModal = () => {
      setShowModal(false)
      setActiveProduct(null)
  }

  const onSetFilterState = (filter) => {
    setSelectedFilter(state => {
      if(state.includes(filter)){
        return state.filter(el => {
          return el !== filter
        } )
      }else{
        return state.concat(filter)
      }
    })
  }

   
  return (

    
    <div>
      <div>
        <h1  className={classes['productPageHeading']}>{categoryResult.description}</h1>
        <span  className={classes["item_count"]}> -{categoryResult.count}</span>

      </div>
      
      <div className='row w-100'>
      

        <div className='col-md-2 p-0'>
          <div className={classes['filter_header']}><h3 className={classes['productPageHeading']}>filters </h3></div>
        {categoryResult.filters &&  categoryResult.filters.map((filter,index) => {
            return <CategoryFilters filter={filter} key={index} selectedFilter={selectedFilter} addFilter={onSetFilterState}/>
        })  }
        </div>
        <div className='col-md-10 p-0'>
          <div className={`${classes.filterShadowBox} row `}>
              <div className={`${classes.filterContainer} col-md-9 col-sm-9`}>
                <ul className='p-0 m-0'>
                  {
                    selectedFilter.map((el,index) => {
                      return <li key={index}>
                        <span className={classes.aplliedFilterName}>{el.split('~')[1]}</span>
                        <span className={classes.remove} onClick={onSetFilterState.bind(this,el)}><i  className="fa fa-close"></i></span>
                      </li>
                    })

                  }
                </ul>

              </div>
              <div className='col-md-3 col-sm-3'>
                
              </div>
          </div>

          <div className={`${classes['productCardContianer']} row` } >
            { categoryLoader ?<div className={classes.spinnerContainer}><LoadingSpinner/> </div>: categoryProducts &&  categoryProducts.map((product,index) => {return <div className='col-md-3' key={index}><ProductSlider  product={product}  viewDetailHandler={openProductModal}/> </div>}) }
            </div>

               
        </div>

      </div>
        
        { categoryProducts.length && <div className='loader' ref={loaderElemet}> 
          {lazyLoader && <LoadingSpinner/>}
        </div>}
       

      {showModal && <Modal onClose={closeProductModal}  > <ProductModal product={activeProduct}  />  </Modal>}
    </div>
  )
}

export default Category