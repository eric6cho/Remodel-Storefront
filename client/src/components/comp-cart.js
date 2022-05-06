import React, { useState, useEffect } from "react";

import Collection from "./comp-collection";

import './../styles/comp-cart/comp-cart.scss';

import * as u from './../scripts/utils'; 

export default function Cart(props) {

  const [componentName] = useState('cart');
  const [componentClass] = useState('component '+componentName);
    
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getButton = (title,cssClass='',click=(()=>{})) =>
    <div className={"button "+cssClass} onClick={click}><h4>{title}</h4></div>;

  const getComponent = () => {
    let data = props.data;
    let events = props.events;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let handlePageSelect = props.events['handlePageSelect'];

    let cartProducts = data['contentData']['cart']['product'];
    let siteProducts = data['contentData']['site']['product'];
    
    let totalPrices = 0;
    let totalItems = 0;

    Object.keys(cartProducts).forEach(id=>{
        let quantity = parseInt(cartProducts[id]['quantity']);
        let price = parseFloat(siteProducts[id]['data']['price']);
        totalPrices += quantity*price;
        totalItems += quantity;
    });
    
    let cartEntries = <Collection data={data} events={events}/>;

    let cartActions = 
        <div className="cart-action-container">
            <div className="cart-action">
                <div className="cart-action-section">
                    <h3>Total Items: </h3>
                    <h4>{totalItems}</h4>
                </div>
                <div className="cart-action-section">
                    <h3>Total Price: </h3>
                    <h4>{u.formatPrice(totalPrices)}</h4>
                </div>     
             
            </div>
                {getButton('Continue To Payment','purchase-button',()=>handlePageSelect('payment'))}
        </div>;
        
    
    let componentContent = 
      <>
        {cartEntries}
        {cartActions}
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