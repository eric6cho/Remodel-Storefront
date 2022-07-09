import React, { useState } from "react";
import './../styles/comp-nav-theme.scss';
import * as u from '../scripts/utils'; 

export default function NavTheme(props) {
  const [componentName] = useState('nav-theme ');
  const [componentClass] = useState('component '+componentName);

  const getComponent = () => {
    let title = props.data['title'];
    let componentData = props.data['componentData'];
    let requiredData = [componentData,title];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let handleSelect = props.events['handleThemeSelect'];

    let themeColors = ['--base-1','--accent-1','--accent-2','--accent-3','--accent-4','--accent-5'];
    let themeColorList = themeColors.map((color,i)=><div key={i} className="color" style={{'background':componentData[color]}}></div>);

    let themeContainer = 
      <div className="theme-container" onClick={()=>handleSelect(title)}>
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