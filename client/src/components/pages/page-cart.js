import React, { useEffect } from "react";
import Banner from "../comp-banner";
import Cart from "../comp-cart";
import * as u from '../../scripts/utils'; 

export default function CartPage(props) {

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComponent = () => {
    let pageData = props.data['pageData']['data'];
    let contentData = props.data['contentData'];
    let events = props.events;
    let requiredData = [pageData,contentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let bannerData = {
      'componentData':pageData[u.BANNER],
    };

    let cartData = {
      'componentData':pageData['cartProducts'], 
      'contentData':contentData,
    };

    let banner = <Banner data={bannerData} events={events}/>;
    let cart = <Cart data={cartData} events={events}/>;

    let component = 
      <>
        {banner}
        {cart}
      </>;

    return component;
  };

  return getComponent();
}