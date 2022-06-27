import React, { useState, useEffect, useRef } from "react";
import Banner from '../comp-banner';
import Collection from "../comp-collection";
import ImageRow from "../comp-image-row";
import * as u from '../../scripts/utils'; 

export default function HomePage(props) {

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
      'componentData':pageData['featuredProducts'], 
      'contentData':contentData,
    };
    
    let articleData = {
      'componentData':pageData['featuredArticles'], 
      'contentData':contentData,
    };

    let userData = {
      'componentData':pageData['teamUsers'], 
      'contentData':contentData,
    };


    let imageRowData = {
      'componentData':pageData['imageRow'], 
      'contentData':contentData,
    };

    let banner = <Banner data={bannerData} events={events}/>;
    let products = <Collection data={productData} events={events}/>;
    let articles = <Collection data={articleData} events={events}/>;
    let users = <Collection data={userData} events={events}/>;
    let imageRow = <ImageRow data={imageRowData} events={events}/>;

    let component = 
      <>
        {banner}
        {imageRow}
        {products}
        {articles}
        {users}  
      </>;

    return component;
  };

  return getComponent();
}