import React, { useState, useEffect, useRef } from "react";

import Navigation from "./components/comp-navigation";
import Page from "./components/comp-page";

import * as u from './scripts/utils'; 

export default function App() {
  
  const appTitle = 'Re-Model';

  const [pageData, setPageData] = useState({});
  const [contentData, setContentData] = useState({});

  const [styleData, setStyleData] = useState(null);

  const [activePage, setActivePage] = useState(null);
  const [activeStyles, setActiveStyles] = useState(null);
  const [activeTheme, setActiveTheme] = useState(null);

  useEffect(() => {

    fetchGet('/api/data/pages').then(data => {
      data = data['message'];
      setPageData(data);
      setActivePage(data['home']);
    });

    fetchGet('/api/data/products').then(data => {
      data = data['message'];
      addContent(data,'site','product');
    });

    fetchGet('/api/data/articles').then(data => {
      data = data['message'];
      addContent(data,'site','article');
    });
    
    fetchGet('/api/data/users').then(data => {
      data = data['message'];
      addContent(data,'site','user');
    });
    
    fetchGet('/api/data/saved').then(data => {
      data = data['message'];
      addContent(data['saved'],'saved');
      addContent(data['cart'],'cart');
    });

    fetchGet('/api/data/styles').then(data => {
      data = data['message'];

      let styles = data['styles'];
      let themes = data['themes'];
      let defaultTheme = themes[Object.keys(themes)[0]]['class'];
      let defaultStyles = Object.keys(styles).map(style=> styles[style][Object.keys(styles[style])[0]]).join(' ');

      getRoot().className=(defaultStyles);

      setActiveStyles(defaultStyles);
      setActiveTheme(defaultTheme);
      setStyleData(data);
    });

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchGet = async (url) => new Promise (resolve=>{
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data));  
  });

  
  const addContent = (data,category,subcatergory) => {
    let newData = contentData;
//  let newData = u.shallowCopy(contentData);
    if(subcatergory){
      if(newData[category]===undefined)newData[category]={};
      newData[category][subcatergory]=data;
    }
    else newData[category]=data;


    console.log(newData);
    setContentData(newData);
  };


  const getRoot = () => document.querySelector(':root');;


  
  const changeTheme = themeName => {
    let theme = styleData['themes'][themeName];
    
    Object.keys(theme).forEach(themeVar =>
      document.documentElement.style.setProperty(themeVar, theme[themeVar])
    );
  };


  const handlePageSelect = (title) => {
    setActivePage(pageData[title]);
  };



  const handleThemeSelect = (theme) => {
    setActiveTheme(theme);
    changeTheme(theme);
  };


  const handleStyleSelect = (style,styleType) => {
    let stylesList = styleData['styles'][styleType];
    let activeStylesList = activeStyles.split(' ');
    let newActiveStyles = activeStylesList.filter(style=>!stylesList.includes(style));
    
    newActiveStyles.push(style);
    newActiveStyles = newActiveStyles.join(' ');
    
    getRoot().className = newActiveStyles;
    
    setActiveStyles(newActiveStyles);
  };


  const handleContentSave = (item) => {
    console.log(item);

    let type = item['metadata']['type'];
    let id = item['metadata']['id'];
    let savedContentCopy = u.shallowCopy(contentData['saved'][type]);
    let prevContentLength = Object.keys(savedContentCopy).length;

    savedContentCopy[id] = {'id':id};

    let newContentLength = Object.keys(savedContentCopy).length;

    if(prevContentLength===newContentLength) delete savedContentCopy[id];
    
    let newContentData = u.shallowCopy(contentData);
    newContentData['saved'][type] = savedContentCopy;

    setContentData(newContentData);
  };

  const handleCartChange = (item,countChange) => {

    let type = item['metadata']['type'];
    let id = item['metadata']['id'];
    let contentCopy = u.shallowCopy(contentData['cart'][type]);

    if(contentCopy[id]===undefined)
      contentCopy[id] = {'id':id,'quantity':countChange};
    else{
      let newQuantity = contentCopy[id]['quantity']+countChange;
      if(newQuantity===0) delete contentCopy[id];
      else contentCopy[id]['quantity']=newQuantity;
    }

    let newContentData = u.shallowCopy(contentData);
    newContentData['cart'][type] = contentCopy;

    setContentData(newContentData);
  };
  

  const getLoadingScreen = () => (
    <div className="App">
      <div className="loading-screen">
        <h1>Data is being retrieved. Please Wait.</h1>
      </div>
    </div>
  );
  

  const getComponent = () => {
    let siteData = contentData['site'];
    let requiredData = [pageData,contentData,siteData,styleData];
    if(!u.isRequiredDataValid(requiredData)) return getLoadingScreen();

    let events = {
      'handleThemeSelect':handleThemeSelect,
      'handleStyleSelect':handleStyleSelect,
      'handlePageSelect':handlePageSelect,
      'handleContentSave':handleContentSave,
      'handleCartChange':handleCartChange,
    };

    let data = {
      'title':appTitle,
      'pageData':pageData,
      'contentData':contentData,
      'styleData':styleData,
      'activeTheme':activeTheme,
      'activeStyles':activeStyles,
      'activePage':activePage,
    };
      
    let navigation = <Navigation data={data} events={events}/>;

    let mainContent = <Page data={data} events={events}/>;

    let component = 
      <div className="App">
        {navigation}
        {mainContent}
      </div>;

    return component;
  };

  return getComponent();
}