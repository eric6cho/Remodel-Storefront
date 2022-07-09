import React, { useState } from "react";
import Button from "./comp-button";
import './../styles/comp-image-row.scss';
import * as u from '../scripts/utils'; 

export default function ImageRow(props) {
  const [componentName] = useState('image-row');
  const [componentClass] = useState('component '+componentName);
  
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

    let handlePageSelect = events['handlePageSelect'];
    let title = componentData['title'];
    let description = componentData['description'];
    let backgroundImage = componentData['backgroundImage'];
    let focusImage1 = componentData['focusImage1'];
    let focusImage2 = componentData['focusImage2'];
    let focusImage3 = componentData['focusImage3'];
    
    let productLink = <Button title={'View Our Products'} cssClass={'products-link-button'} click={()=>handlePageSelect('products')}/>;
    
    let focusImages = 
      <>
        {getFocusImage(focusImage1,'focus image 1')}
        {getFocusImage(focusImage2,'focus image 2')}
        {getFocusImage(focusImage3,'focus image 3')}
      </>;

    let textContainer = 
      <div className="text-container-background">
        <div className="text-container-wrapper">
          <div className="text-container">
            <div className="text-container-inner">
              <h2 className="title">
                {title}
              </h2>
              <p className="description">
                {description}
              </p>   
              <div className="focus-image-list">
                {focusImages}
              </div>   
            </div> 
          </div>
        </div>
        {productLink}
      </div>;

    let imageContainer = 
      <div className="image-container" style={{'backgroundImage':'url('+backgroundImage+')'}}>
        <div className="image-overlay">
          {textContainer}
        </div>
      </div>;

    let componentContent = 
      <>
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