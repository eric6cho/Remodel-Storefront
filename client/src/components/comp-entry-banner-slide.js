import React, { useState } from "react";
import './../styles/comp-entry-banner-slide.scss';
import * as u from '../scripts/utils'; 

export default function BannerSlide(props) {
  const [componentName] = useState('entry-banner-slide');
  const [componentClass] = useState('component '+componentName);
  
  const getComponent = () => {
    let requiredData = [props.title,props.image,props.description];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let title = props.title;
    let image = props.image;
    let description = props.description;

    let componentStyle = {'width': props.width+'px',};

    let imageContainer = 
      <div className="image-container">
        <img src={image} alt='banner slide entry'/>
        <div className="image-overlay"></div>
      </div>;

    let textContainer = 
      <div className="text-container-wrapper">
        <div className="text-container">
          <div className="text-background"></div>
          <div className="border-left"></div>
          <div className="border-right"></div>
          <div className="text-foreground"> 
            <h3>
              {title}
            </h3>
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {textContainer}
      </>;

    let component =  
      <div className={componentClass} style={componentStyle}>
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