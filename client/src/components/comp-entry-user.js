import React, { useState, useEffect, useRef } from "react";

import './../styles/comp-entry-user/comp-entry-user.scss';
import './../styles/comp-entry-user/comp-entry-user-active.scss';
import './../styles/comp-entry-user/comp-entry-user-active-variations.scss';
import './../styles/comp-entry-user/comp-entry-user-variations.scss';

import * as u from '../scripts/utils'; 

export default function User(props) {

  const [componentName] = useState('entry-user');
  const [componentClass,setComponentClass] = useState('component '+componentName);

  useEffect(() => {

    setComponentClass('component '+componentName+' '+(props.data['isFocus']?u.ACTIVECLASS:''))

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);
  
  const getComponent = () => {

    let componentData = props.data['componentData'];
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let data = componentData['data'];

    let imageContainer = 
      <div className="image-container"> 
        <img src={data['image']} alt='product'/>
      </div>;

    let imageOverlay = <div className="image-overlay"></div>;
      
    let title = <h3 className="name">{data['name']}</h3>;

    let category = <p className="title secondary">{data['title']}</p>;
    
    let description = <p className="description">{data['description']}</p>;

    let titleContainer = 
      <div className="title-container">
        {title}
        {category}
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          {titleContainer}
          {description}
        </div>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {imageOverlay}
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