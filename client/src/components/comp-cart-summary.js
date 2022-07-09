import React, { useState } from "react";
import Button from "./comp-button";
import './../styles/comp-cart-summary.scss';

export default function CartSummary(props) {
  const [componentName] = useState('cart-summary');
  const [componentClass] = useState('component '+componentName);
    
  const getComponent = () => {
    let total = props.total;
    let items = props.items;
    let events = props.events;
    let handlePageSelect = events['handlePageSelect'];
        
    let paymentButton = <Button title={'Continue To Payment'} cssClass={'purchase-button'} click={()=>handlePageSelect('payment')}/>;

    let textContainer = 
      <div className="text-container">
        <div className="text-section">
          <h3>
            Items: 
          </h3>
          <h4>
            {items}
          </h4>
        </div>
        <div className="text-section">
          <h3>
            Total: 
          </h3>
          <h4>
            {total}
          </h4>
        </div>     
      </div>;

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