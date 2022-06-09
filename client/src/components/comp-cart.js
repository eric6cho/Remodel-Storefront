import React, { useState, useEffect } from "react";

import Collection from "./comp-collection";
import CartSummary from "./comp-cart-summary";

import './../styles/comp-cart/comp-cart.scss';
import './../styles/comp-cart/comp-cart-variations.scss';

import * as u from './../scripts/utils'; 

export default function Cart(props) {

  const [componentName] = useState('cart');
  const [componentClass] = useState('component '+componentName);
    
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComponent = () => {
    let data = props.data;
    let events = props.events;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let cartProducts = data['contentData']['cart']['product'];
    let siteProducts = data['contentData']['site']['product'];
    
    let totalPrices = 0;
    let totalItems = 0;

    Object.keys(cartProducts).forEach(id => {
      let quantity = parseInt(cartProducts[id]['quantity']);
      let price = parseFloat(siteProducts[id]['data']['price']);
      totalPrices += quantity*price;
      totalItems += quantity;
    });
    
    let cartEntries = <Collection data={data} events={events}/>;
    let cartSummary = 
      <div className="cart-summary-container">
        <CartSummary items={totalItems} total={u.formatPrice(totalPrices)} events={events}/>
      </div>;
      
    let componentContent = 
      <>
        {cartEntries}
        {cartSummary}
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