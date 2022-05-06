import React, { useState, useEffect } from "react";
import './../styles/comp-navigation.scss';

import * as u from '../scripts/utils'; 

export default function NavigationTheme(props) {

  const defaultClass = 'component nav-theme ';
  const activeClass = 'active ';

  const [isActive, setIsActive] = useState(props.data['isActive']);
  const [componentClass, setComponentClass] = useState(defaultClass);

  useEffect(() => {

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  


  const toggleActive = (state=null) => setActive(state!==null?state:!isActive);

  const setActive = (state) => {
    setComponentClass(defaultClass+(isActive?activeClass:''));
    //setIsActive(state);
    let handleSelect = props.events['handleThemeSelect'];
    handleSelect(props.data['title']);
  };

  const getComponent = () => {

    let title = props.data['title'];
    let componentData = props.data['componentData'];
    let requiredData = [componentData,title];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let headerSection = 
      <div className="theme-preview">
        <div className="theme">
          <h4 className="title">{title}</h4>
          <div className="color-list">
            <div className="color" style={{'background':componentData['--base-1']}}></div>
            <div className="color" style={{'background':componentData['--accent-1']}}></div>
            <div className="color" style={{'background':componentData['--accent-2']}}></div>
            <div className="color" style={{'background':componentData['--accent-3']}}></div>
          </div>
        </div>
      </div>;
  

    return (
      <div className={componentClass} onClick={()=>toggleActive()}>
       
        {headerSection}

      </div>
    );
  }

  return getComponent();
}