import React, { useState, useEffect } from "react";
import './../styles/comp-cart-summary/comp-cart-summary.scss';
import './../styles/comp-cart-summary/comp-cart-summary-variations.scss';

export default function CartSummary(props) {
  const [componentName] = useState('cart-summary');
  const [componentClass] = useState('component '+componentName);
    
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getButton = (title,cssClass='',click=(()=>{})) =>
    <div className={"button "+cssClass} onClick={click}><h4>{title}</h4></div>;

  const getComponent = () => {
    let total = props.total;
    let items = props.items;
    let events = props.events;
    let handlePageSelect = events['handlePageSelect'];
        
    let textContainer = 
      <div className="text-container">
        <div className="text-section">
          <h3>Items: </h3>
          <h4>{items}</h4>
        </div>
        <div className="text-section">
          <h3>Total: </h3>
          <h4>{total}</h4>
        </div>     
      </div>;

    let paymentButton = getButton('Continue To Payment','purchase-button',()=>handlePageSelect('payment'));
    
    let componentContent = 
      <>
        {textContainer}
        {paymentButton}
      </>;

    let component = 
      <div className={componentClass}>
        <div className="component-wrapper">
          <div className="component-content">
            {componentContent}
          </div>
        </div>
      </div>;

    return component;
  };

  return getComponent();
}