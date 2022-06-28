import React, { useState, useEffect } from "react";
import NavTheme from "./comp-nav-theme";
import NavStyle from "./comp-nav-style";
import './../styles/comp-nav-bar.scss';
import * as u from '../scripts/utils'; 

export default function NavBar(props) {
  const componentId = 'nav-bar';
  const componentBodyId = 'nav-bar-body';
  const defaultClass = 'component '+componentId+' ';
  const activeClass = 'active ';
  const [isActive, setIsActive] = useState(false);
  const [componentClass, setComponentClass] = useState(defaultClass);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside.bind(this), true);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const getIcon = (title,cssClass='',click=(()=>{}),key) => 
    <span className={"material-icons icon "+cssClass} onClick={click} key={key}>{title}</span>;

  const getNavIcon = (pageData,page,activePage,handlePageSelect,key) => {
    let isNav = pageData[page]['isNav'];
    let iconTitle = pageData[page]['icon'];
    let iconClass = activePage['title']===pageData[page]['title']?'active':'';
    let iconClickEvent = ()=>handlePageSelect(page);
    return isNav ? getIcon(iconTitle,iconClass,iconClickEvent,key) : null;
  };

  const getNavList = (title,cssClass,list) => (
    <div className={"list-wrapper "+cssClass}> 
      <div className="list-container">
        <div className="list-header">
          <h3>
            {title}
          </h3> 
        </div>
        <div className="list-body">
          {list}
        </div>
      </div>
    </div>
  );

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
    if(!u.isRequiredDataValid(requiredData)) return null;
      
    let themeList = styleData['themes'];
    let styleList = styleData['styles'];
    let handlePageSelect = events['handlePageSelect'];

    let themes = Object.keys(themeList).map((theme,i)=>{
      let data = {
        'componentData':themeList[theme],
        'title':theme,
        'isActive':activeTheme===theme,
      };
      return <NavTheme key={i} events={events} data={data}/>;
    });
     
    let styles = Object.keys(styleList).map((style,i)=>{
      let data = {
        'componentData':styleList[style],
        'title':style,
        'activeStyles':activeStyles,
      };
      return <NavStyle key={i} events={events} data={data}/>;
    });

    let navIcons = Object.keys(pageData).map((page,i) => getNavIcon(pageData,page,activePage,handlePageSelect,i));
    
    let settingsIcon = getIcon('settings','',() => toggleExpand(true));

    let bodySection = 
      <div className="nav-body-section" id={componentBodyId}>
        {getNavList('Themes','',themes)}
        {getNavList('Styles','styles-list',styles)}
      </div>;

    let headerSection = 
      <div className="nav-header-section">
        <h1>{title}</h1> 
        {navIcons}
        {settingsIcon}
      </div>;

    let componentContent = 
      <>
        {bodySection}
        {headerSection}
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