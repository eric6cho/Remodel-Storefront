import React, { useState } from "react";
import Button from "./comp-button";
import Icon from "./comp-icon";
import './../styles/comp-nav-style-preview.scss';
import * as u from '../scripts/utils'; 

export default function NavStylePreview(props) {
  const [componentName] = useState('nav-style-preview ');
  const [componentClass] = useState('component '+componentName);

  const getComponent = () => {
    let data = props.data;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let title = data['title'];
    let description = data['description'];
    let image = data['image'];
    let buttonText = data['buttonText'];
    let iconTextList = data['iconTextList'];
   
    let icons = iconTextList.map((title,i)=><span key={i}><Icon title={title}/></span>);
    let button = <Button title={buttonText}/>;
    
    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <h3>
            {title}
          </h3>
          <p>
            {description}
          </p>
        </div>
        <div className="icon-container">
          {icons}
        </div>
        <div className="button-container">
          {button}
        </div>
      </div>;

    let imageContainer = 
      <div className="image-container">
        <div className="image-overlay"></div>
        <img src={image} alt='Sample'/>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {textContainer}
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
  }

  return getComponent();
}