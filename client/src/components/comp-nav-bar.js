import React, { useState, useEffect } from "react";
import NavList from "./comp-nav-list";
import NavStylePreview from "./comp-nav-style-preview";
import Icon from "./comp-icon";
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
  
  const getNavIcon = (pageData,page,activePage,handlePageSelect,key) => {
    let isNav = pageData[page]['isNav'];
    let iconTitle = pageData[page]['icon'];
    let iconClass = (activePage['title']===pageData[page]['title']?'active':'')+' desktop-icon';
    let iconClickEvent = ()=>handlePageSelect(page);
    return isNav ? <span key={key}><Icon title={iconTitle} cssClass={iconClass} click={iconClickEvent}/></span> : null;
  };

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
    let navData = props.data['navData'];
    let pageData = props.data['pageData'];
    let events = props.events;
    let requiredData = [navData,pageData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let activeStyles = navData['activeStyles'];
    let activeTheme = navData['activeTheme'];
    let activePage = navData['activePage'];
    let styleData = navData['styleData'];
    let stylePreviewData = navData['stylePreviewData']
    let title = navData['title'];

    let handlePageSelect = events['handlePageSelect'];

    let themesData = {
      'title':'Themes',
      'listData':styleData['themes'],
      'type':'THEME',
      'active':activeTheme,
    }

    let stylesData = {
      'title':'Styles',
      'listData':styleData['styles'],
      'type':'STYLE',
      'active':activeStyles,
    }

    let settingsIcon = <Icon title={'settings'} cssClass={'settings-icon'} click={()=>toggleExpand()}/>;
    let menuIcon = <Icon title={'menu'} cssClass={'mobile-icon'} click={()=>toggleExpand()}/>;
    let navIcons = Object.keys(pageData).map((page,i) => getNavIcon(pageData,page,activePage,handlePageSelect,i));
    let themeMenu = <NavList events={events} data={themesData}/>;
    let styleMenu = <NavList events={events} data={stylesData}/>;
    let stylePreview = <NavStylePreview  events={events} data={stylePreviewData}/>;

    let bodySection = 
      <div className="nav-body-section" id={componentBodyId}>
        <div className="menu-section">

          {navIcons}
        </div>
        <div className="nav-body-subsection">
          {themeMenu}
        </div>
        <div className="nav-body-subsection">
          {styleMenu}
        </div>
        <div className="nav-body-subsection large">
          {stylePreview}
        </div>
      </div>;

    let headerSection = 
      <div className="nav-header-section">
        <div className="title-section">
          <h1>
            {title}
          </h1>
          {menuIcon}
        </div>
        
        <div className="menu-section">

          {navIcons}
          {settingsIcon}
        </div>
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