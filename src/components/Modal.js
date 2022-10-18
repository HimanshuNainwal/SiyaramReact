import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />; 
};

const ModalOverlay = (props) => {
 
  return (

    <div className={`${classes.modal} ${props.className} `}>
      {props.heading && <header className={classes.header + ' text-center '}>
        <h2>{props.heading}</h2>
      </header>}
      <div className={classes.content}>
        {props.children}
      </div>
      
    </div>


  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}
        heading={props.heading}
        >{props.children} </ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default Modal;