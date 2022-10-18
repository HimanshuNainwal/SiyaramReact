import React, { useState } from 'react'


import {sendOtp,validateOtp} from '../store/accountActions'
import Modal from "./Modal";
import loginBanner from '../assets/images/loginBanner.jpg'
import './Login.css'
import { useDispatch } from 'react-redux';






function Login(props) {

    const [userNumber,setUserNumber] = useState('')
    const [userNumberError,setUserNumberError] = useState('')
    const [showOtpField,setShowOtpField] = useState(false)
 

    const dispatch = useDispatch()
   
    
    const validateNumberHandler = (event)=>{
        if(event.target.value){
            const phoneno = /^([0-9]{10,})+$/;
            setUserNumber(event.target.value)
            if(event.target.value.match(phoneno)){
                setShowOtpField(true)
                sendOtp(event.target.value).then(res => {
                     console.log(res)
                    if(res){
                        
                    }
                })
                
                setUserNumberError('')

            }else{
                setUserNumberError('Please enter valid Phone Number')
            }
            
        }
    }
    const validateOtpHandler = async (event) => {
     
        if(event.target.value){
           
            if(event.target.value.length === 4){
                console.log(event.target.value)
                dispatch(validateOtp(userNumber,event.target.value))
              
            }
        }   
    } 
    const resendOtpHandler = (props) =>{
        sendOtp(userNumber)

    }

  return (
    <Modal onClose={props.onClose} className={'LoginModal'} > 

        <div className='loginModal'>

        
            <div className='loginImageContainer'>
                <img src={loginBanner} alt="login image"/>
                <button onClick={props.onClose} className='closeButton'> <i className="fa fa-times" aria-hidden="true"></i></button>
            </div>

            <div className='LoginInputContainer'>
                <h3 className="loginTitle">Login <span className="font-weight-normal">or</span> Signup</h3>
                <form className='login-form text-center'>
                    <div className='field'>
                    <input type="text" className='input-text form-control' value={userNumber} placeholder="Mobile Number" onInput={validateNumberHandler} />
                    {userNumberError && <p className='errMsg'>{userNumberError} </p>}
                    </div>
                    {showOtpField &&
                        <div className='field'>
                            <input type='text'  className='input-text form-control' placeholder='Enter OTP' onInput={validateOtpHandler} />
                            <p className='resendOtpBtn' onClick={resendOtpHandler}>Resend OTP</p>
                        </div>
                    }

                </form>
            </div>
        </div>

    </Modal>
  )
}

export default Login