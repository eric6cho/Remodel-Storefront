import React, { useState, useEffect } from "react";
import NavBar from "./components/comp-nav-bar";
import Page from "./components/comp-page";
import Footer from "./components/comp-footer";
import * as u from './scripts/utils'; 

export default function App() {
  const [pageData, setPageData] = useState({});
  const [contentData, setContentData] = useState({});
  const [navData, setNavData] = useState({});
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
        
    fetchGet('/api/data/nav').then(data => {
      data = data['message'];
      setNavData(data);
    });

    fetchGet('/api/data/styles').then(data => {
      data = data['message'];
      changeTheme(data['activeTheme'],data['styleData']);
      changeStyle(data['activeStyles']);
      setStyleData(data['styleData']);
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

    if(subcatergory){
      if(newData[category]===undefined)newData[category]={};
      newData[category][subcatergory]=data;
    }
    else newData[category]=data;

    setContentData(newData);
  };

  const handleStyleSelect = (styleName,styleType) => changeStyle(getStyleClasses(styleName,styleType));
  const handleThemeSelect = themeName => changeTheme(themeName);
  const handlePageSelect = title => setActivePage(pageData[title]);
  const handleCartChange = (item,count) => changeCart(item,count);
  const handleContentSave = item => saveContent(item);
  const handleContentClose = (handleContentSelect,e) => closeContent(handleContentSelect,e)

  const getStyleClasses = (styleName,styleType) => {
    let stylesList = styleData['styles'][styleType];
    let activeStylesList = activeStyles.split(' ');
    let newActiveStyles = activeStylesList.filter(style=>!stylesList.includes(style)); 
    newActiveStyles.push(styleName);

    return newActiveStyles.join(' ');
  };

  const changeStyle = (styleClasses) => {
    document.querySelector(':root').className = styleClasses;
    setActiveStyles(styleClasses);
  };

  const changeTheme = (themeName,data) => {  
    if(!styleData&&!data) return;

    data = styleData?styleData:data;
    let theme = data['themes'][themeName];

    Object.keys(theme).forEach(themeVar =>
      document.documentElement.style.setProperty(themeVar, theme[themeVar]));

    setActiveTheme(theme);
  };

  const changeCart = (item,count) => {
    let type = item['metadata']['type'];
    let id = item['metadata']['id'];
    let contentCopy = u.shallowCopy(contentData['cart'][type]);

    if(contentCopy[id]===undefined)
     contentCopy[id] = {'id':id,'quantity':count};
    else{
      let newQuantity = contentCopy[id]['quantity']+count;
      if(newQuantity===0) delete contentCopy[id];
      else contentCopy[id]['quantity']=newQuantity;
    }

    let newContentData = u.shallowCopy(contentData);
    newContentData['cart'][type] = contentCopy;

    setContentData(newContentData);
  };

  const saveContent = item => {
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

  const closeContent = (handleContentSelect,e) => {
    handleContentSelect(null);
    e.stopPropagation(); // prevent any click events in the parent
  };

  const getLoadingScreen = () => (
    <div className="App">
      <div className="loading-screen">
        <h1>Data is being retrieved. Please Wait.</h1>
      </div>
    </div>
  );

  const getUpdatedEvents = () => ({
      'handleThemeSelect':handleThemeSelect,
      'handleStyleSelect':handleStyleSelect,
      'handlePageSelect':handlePageSelect,
      'handleContentSave':handleContentSave,
      'handleCartChange':handleCartChange,
      'handleContentClose':handleContentClose,
    });

  const getUpdatedData = () => {
    let data = {
      'pageData':pageData,
      'contentData':contentData,
      'navData':navData, 
    };
    
    data['navData']['styleData'] = styleData;
    data['navData']['activeTheme'] = activeTheme;
    data['navData']['activeStyles'] = activeStyles;
    data['navData']['activePage'] = activePage;

    return data;
  };
  
  const getComponent = () => {
    let siteData = contentData['site'];
    let requiredData = [pageData,contentData,siteData,styleData];
    if(!u.isRequiredDataValid(requiredData)) return getLoadingScreen();

    let events = getUpdatedEvents();
    let data = getUpdatedData();
    let navigation = <NavBar data={data} events={events}/>;
    let content = <Page data={data} events={events}/>;
    let footer = <Footer data={data} events={events}/>;

    let component = 
      <div className="App">
        {navigation}
        {content}
        {footer}
      </div>;

    return component;
  };

  return getComponent();
}