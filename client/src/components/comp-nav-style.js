import React, { useState, useEffect } from "react";
import './../styles/comp-nav-style/comp-nav-style.scss';
import './../styles/comp-nav-style/comp-nav-style-variations.scss';
import * as u from '../scripts/utils'; 

export default function NavStyle(props) {
  const defaultClass = 'component nav-style ';
  const [componentClass] = useState(defaultClass);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getStyleButton = (title,isActive,click=(()=>{})) => 
    <div className={"style-wrapper "+(isActive?'active':'')} onClick={click}>
      <div className="style">{title}</div>      
    </div>; 
  
  const getComponent = () => {
    let categoryTitle = props.data['title'];
    let componentData = props.data['componentData'];
    let activeStyles = props.data['activeStyles'];
    let handleSelect = props.events['handleStyleSelect'];
    let requiredData = [componentData,categoryTitle];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let styleList = componentData.map(styleTitle=>{
      let isActive = activeStyles.split(' ').includes(styleTitle);
      return getStyleButton(styleTitle,isActive,()=>handleSelect(styleTitle,categoryTitle));
    });

    let styleContainer = 
      <div className="style-container">
        <h3 className="title">
          {categoryTitle}
        </h3>
        <div className="style-list">
          {styleList}
        </div>
      </div>;

    let componentContent = 
      <>
        {styleContainer}
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