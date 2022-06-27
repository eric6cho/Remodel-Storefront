/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import './../styles/comp-image-row/comp-image-row.scss';
import './../styles/comp-image-row/comp-image-row-variations.scss';
import * as u from '../scripts/utils'; 

export default function ImageRow(props) {
  const [componentName] = useState('image-row');
  const [componentClass] = useState('component '+componentName);
  
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getButton = (title,cssClass='',click=(()=>{})) =>
    <div className={"button "+cssClass} onClick={click}><h4>{title}</h4></div>;

  const getFocusImage = (src,alt) => 
    <div className="focus-image-wrapper">
      <div className="focus-image-container">
        <img src={src} alt={alt}/>
      </div>
    </div>;

  const getComponent = () => {
    let componentData = props.data['componentData'];
    let events = props.events;
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let title = componentData['title'];
    let description = componentData['description'];
    let backgroundImage = componentData['backgroundImage'];
    let focusImage1 = componentData['focusImage1'];
    let focusImage2 = componentData['focusImage2'];
    let focusImage3 = componentData['focusImage3'];
    let handlePageSelect = events['handlePageSelect'];
    
    let productLink = getButton('View Our Products','products-link-button',()=>handlePageSelect('products'));
    
    let imageContainer = 
      <div 
        className="image-container" 
        style={{'backgroundImage':'url('+backgroundImage+')'}}>
        <div className="image-overlay"> </div>
      </div>;

    let focusImages = 
      <div className="focus-image-list-wrapper">
        {productLink}
        <div className="focus-image-list">
          {getFocusImage(focusImage1,'focus image 1')}
          {getFocusImage(focusImage2,'focus image 2')}
          {getFocusImage(focusImage3,'focus image 3')}
        </div>
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
        </div>
        {focusImages}
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {textContainer}
        {imageContainer}
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