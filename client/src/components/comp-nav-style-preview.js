import React, { useState, useEffect } from "react";
import './../styles/comp-nav-style-preview.scss';
import * as u from '../scripts/utils'; 

export default function NavStylePreview(props) {
  const [componentName] = useState('nav-style-preview ');
  const [componentClass] = useState('component '+componentName);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const getButton = (title,cssClass='',click=(()=>{}),key) =>
    <div key={key} className={"button "+cssClass} onClick={click}><h4>{title}</h4></div>;

  const getIcon = (title,cssClass='',click=(()=>{}),key) => 
    <span key={key} className={"material-icons icon "+cssClass} onClick={click}>{title}</span>;

  const getComponent = () => {
    let data = props.data;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let title = data['title'];
    let description = data['description'];
    let image = data['image'];
    let buttonText = data['buttonText'];
    let iconTextList = data['iconTextList'];
   
    let buttonContainer = <div className="button-container">{getButton(buttonText)}</div>;
    let iconContainer = <div className="icon-container">{iconTextList.map((title,i)=>getIcon(title,'',()=>{},i))}</div>;
    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {iconContainer}
        {buttonContainer}
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