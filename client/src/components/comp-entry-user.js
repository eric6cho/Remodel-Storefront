import React, { useState } from "react";
import './../styles/comp-entry-user.scss';
import * as u from '../scripts/utils'; 

export default function User(props) {
  const [componentName] = useState('entry-user');
  const [componentClass] = useState('component '+componentName);
  
  const getComponent = () => {
    let componentData = props.data['componentData'];
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let data = componentData['data'];

    let title = data['name'];
    let category = data['title'];
    let description = data['description'];
    let image = data['image'];

    let imageContainer = 
      <div className="image-container"> 
        <img src={image} alt='product'/>
        <div className="image-overlay"></div>
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <div className="title-container">
            <h3 className="name">
              {title}
            </h3>
            <p className="title secondary">
              {category}
            </p>
          </div>
          <p className="description">
            {description}
          </p>
        </div>
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
  };

  return getComponent();
}