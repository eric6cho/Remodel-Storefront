import React, { useState, useEffect } from "react";
import './../styles/comp-navigation.scss';

import * as u from '../scripts/utils'; 

export default function NavigationStyle(props) {

  const defaultClass = 'component nav-style ';
  const activeClass = 'active ';

  const [isActive, setIsActive] = useState(props.data['isActive']);
  const [componentClass, setComponentClass] = useState(defaultClass);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const toggleActive = (state=null) => setActive(state!==null?state:!isActive);

  const setActive = (state) => {
  //  setComponentClass(defaultClass+(isActive?activeClass:''));
    //setIsActive(state);
    let handleSelect = props.events['handleStyleSelect'];
    handleSelect(props.data);
  };

  const getComponent = () => {

    let title = props.data['title'];
    let componentData = props.data['componentData'];
    let activeStyles = props.data['activeStyles'];
    let handleSelect = props.events['handleStyleSelect'];
    let requiredData = [componentData,title];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let styles = 
     <div className="style-list">
       {componentData.map(style=>{
         let isActive = activeStyles.split(' ').includes(style);
         return (
          <div 
            key={style} 
            className={"style "+(isActive?'active':'')} 
            onClick={()=>handleSelect(style,title)}>
            {style}
          </div>
         );
       })}
     </div>;

    let componentContent = 
      <>
        <h3>{title}</h3>
        {styles}
      </>;

    return (
    <div className={componentClass}>
      <div className="component-wrapper">
        <div className="component-content">
          {componentContent}
        </div>
      </div>
    </div>
    );
    
  }

  return getComponent();
}