import React, { useEffect } from "react";
import Banner from "../comp-banner";
import Collection from "../comp-collection";
import * as u from '../../scripts/utils'; 

export default function ProductPage(props) {

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

    let productData = {
      'componentData':pageData['productGrid'], 
      'contentData':contentData,
    };

    let banner = <Banner data={bannerData} events={events}/>;
    let products = <Collection data={productData} events={events}/>;

    let component = 
      <>
        {banner}
        {products}
      </>;

    return component;
  };

  return getComponent();
}