import React, { useState, useEffect } from "react";
import './../styles/comp-nav-theme/comp-nav-theme.scss';
import './../styles/comp-nav-theme/comp-nav-theme-variations.scss';
import * as u from '../scripts/utils'; 

export default function NavTheme(props) {
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
    let handleSelect = props.events['handleThemeSelect'];
    handleSelect(props.data['title']);
  };

  const getComponent = () => {
    let title = props.data['title'];
    let componentData = props.data['componentData'];
    let requiredData = [componentData,title];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let themeColors = ['--base-1','--accent-1','--accent-2','--accent-3','--accent-4','--accent-5'];
    let themeColorList = themeColors.map(color=><div className="color" style={{'background':componentData[color]}}></div>);

    let themeContainer = 
      <div className="theme-container" onClick={()=>toggleActive()}>
        <h4 className="title">
          {title}
        </h4>
        <div className="color-list">
          {themeColorList}
        </div>
      </div>;
 
    let componentContent = 
      <>
        {themeContainer}
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