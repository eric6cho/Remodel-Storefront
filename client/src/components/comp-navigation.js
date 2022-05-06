import React, { useState, useEffect } from "react";

import NavigationTheme from "./comp-navigation-theme";
import NavigationStyle from "./comp-navigation-style";
import './../styles/comp-navigation.scss';

import * as u from '../scripts/utils'; 


export default function Navigation(props) {

  const componentId = 'navigation';
  const componentBodyId = 'navigation-body';
  const defaultClass = 'component '+componentId+' ';
  const activeClass = 'active ';

  const [isActive, setIsActive] = useState(false);
  const [componentClass, setComponentClass] = useState(defaultClass);

  useEffect(() => {

    document.addEventListener('click', handleClickOutside.bind(this), true);

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  const handleClickOutside = e => {
    let comp = document.getElementById(componentBodyId);
    if(!comp) return;
    if(!comp.contains(e.target)) toggleExpand(false);
  };

  const toggleExpand = (state=null) => setExpand(state!==null?state:!isActive);

  const setExpand = (state) => {
    setComponentClass(defaultClass+(state?activeClass:''));
    setIsActive(state);
  };

  const getComponent = () => {
    let styleData = props.data['styleData'];
    let pageData = props.data['pageData'];
    let activePage = props.data['activePage'];
    let activeTheme = props.data['activeTheme'];
    let activeStyles = props.data['activeStyles'];
    let title = props.data['title'];
    let events = props.events;
    let requiredData = [styleData,pageData,activePage,title];
    console.log(requiredData);
    if(!u.isRequiredDataValid(requiredData)) return null;
      
    let themeList = styleData['themes'];
    let styleList = styleData['styles'];
    
    let themes = 
      <div className="nav-list-container">
        <h3>Themes</h3> 
        <div className="nav-list-outer">
          <div className="nav-list">
            {Object.keys(themeList).map((theme,i)=>{
              let data = {
                'componentData':themeList[theme],
                'title':theme,
                'isActive':activeTheme===theme,
              };
              return <NavigationTheme key={i} events={events} data={data}/>;
            })}
          </div>
        </div>
      </div>;
     
    let styles = 
        <div className="nav-list-container">
          <h3>Styles</h3> 
          <div className="nav-list-outer styles">
            <div className="nav-list">
              {Object.keys(styleList).map((style,i)=>{
                let data = {
                  'componentData':styleList[style],
                  'title':style,
                  'activeStyles':activeStyles,
                };
                return <NavigationStyle key={i} events={events} data={data}/>;
              })}
            </div>
          </div>
        </div>;

    let bodySection = 
      <div className="nav-body-section" id={componentBodyId}>
        {themes}
        {styles}
      </div>;

    let headerSection = 
      <div className="nav-header-section">
        <h1>{title}</h1> 
        {
          Object.keys(pageData).map(page=> pageData[page]['isNav']?
            <span 
              className={"material-icons icon "+(activePage['title']===pageData[page]['title']?'active':'')} 
              onClick={()=>(events['handlePageSelect'])(page)}
              key={page}>
                {pageData[page]['icon']}
            </span> : null
          )
        }
        <span className="material-icons icon" onClick={(() => toggleExpand(true))}>settings</span>
      </div>;

    let componentContent = 
      <>
        {bodySection}
        {headerSection}
      </>;

    return (
      <div className={componentClass}>
        {componentContent}
      </div>
    );
  }

  return getComponent();
}