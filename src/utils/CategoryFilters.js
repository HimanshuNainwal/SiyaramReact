import React, { useState } from 'react'
import classes from './CategoryFilters.module.css'


function CategoryFilters(props) {
  const [showDropDown,setShowDropDown] = useState(true)
  const addFilterHandler = (value) => {
      props.addFilter(value.join('~'))
  }
  const toggleDropDown = () => {
    setShowDropDown(state => {
      return !state 
    })
  }
  return (
    <div className={classes.filterBox}>
      <p className={classes['filterHeadingContainer']} onClick={toggleDropDown}>
        <span className={classes['filterName']} >{props.filter.filter_lable} </span>
        <i className={`fa-solid fa-caret-down ${showDropDown ? classes.activeBox:'' } ${classes.filterIcon}`}  ></i>
      </p>
        {showDropDown && 
          <ul className={classes.dropContainer}>
             {Object.keys(props.filter.options).map(el => {
                 return <li className={classes.dropItems} key={el} >
                   {props.filter.filter_lable_code ==='selling_price' ? <input type='checkbox' checked={props.selectedFilter.includes(`${props.filter.options[el].code}~${props.filter.options[el].value}`)} onChange={addFilterHandler.bind(this,[props.filter.options[el].code,props.filter.options[el].value])}/>:
                    <input type='checkbox' checked={props.selectedFilter.includes(`${props.filter.options[el].code}~${props.filter.options[el].value_key}`)} onChange={addFilterHandler.bind(this,[props.filter.options[el].code,props.filter.options[el].value_key])}/>
                  }
                    <span className={classes.filterItemName }>{props.filter.options[el].value}</span>
                </li>
             })}
          </ul>
        }
    </div>
  )
}

export default CategoryFilters