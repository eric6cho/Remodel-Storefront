import React, { useState, useEffect, useRef } from "react";
import Product from "./comp-entry-product";
import Article from "./comp-entry-article";
import User from "./comp-entry-user";
import Cart from "./comp-entry-cart";
import './../styles/comp-collection/comp-collection.scss';
import * as u from '../scripts/utils'; 

export default function Collection(props) {
  const [activeData, setActiveData] = useState(null);
  const [componentName] = useState('collection');
  const [componentClass,setComponentClass] = useState('component '+componentName+' '+(props.data['componentData']['isNarrow']?' narrow ':' full ')+(activeData?' active ':''));
  const [activeSlide, setActiveSlide] = useState(0);
  const [style, setStyle] = useState(null);
  const [rowLength,setRowLength] = useState(props.data['componentData']['rowLength']);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const setComponentWidth = () => setWidth(ref.current?ref.current.offsetWidth:0);

    const resizeAction = () => {
      clearTimeout(timeout);
      timeout = setTimeout(setComponentWidth, 200);
    };

    let timeout = false;
    window.addEventListener('resize', resizeAction);
    setComponentWidth();
    return () => {};
  }, []);

  useEffect(() => { 
    goToSlide(0);
    adjustRowLength();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => { 
    adjustRowLength();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => { 
    setComponentClass('component '+componentName+' '+(props.data['componentData']['isNarrow']?' narrow ':' full ')+(activeData?' active ':''));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeData]);
  
  const adjustRowLength = () => {
    let defaultRowLength = props.data['componentData']['rowLength'];
    let breakpoint = u.getBreakpointSize(width);
    let newRowLength = defaultRowLength;

    if(breakpoint===u.SM)newRowLength=2;
    if(breakpoint===u.XS)newRowLength=1;

    setRowLength(newRowLength);
  };

  const getContent = (idList, allContentData, source, contentType) => {
    let content = allContentData['site'][contentType];
    
    if(content===undefined) return null;
    if(source==='saved') idList = Object.keys(allContentData[source][contentType]);
    if(source==='cart') idList = Object.keys(allContentData[source][contentType]);

    let parsedContent = Object.values(content).filter(entry=>idList.includes(entry['metadata']['id']));
  
    return parsedContent;
  };

  const getEntries = (data,contentData,contentType,contentSource,isClickable=false,isFocus=false,events) => {
    if (!data||!contentType) return null;
    data=Array.isArray(data) ? data : [data];

    events['handleContentSelect'] = setActiveData;

    return data.map((entryData,i) => {
      let metadata = entryData['metadata'];
      let componentId = metadata['id'];
      let componentType = metadata['type'];
      let cartContent = contentData['cart'][componentType];
      let savedContent = contentData['saved'][componentType];
      let isSaved = savedContent===null||savedContent===undefined ? 
        false : Object.keys(savedContent).includes(componentId);

      let data = {
        'componentData': entryData,
        'cartData': cartContent,
        'isSaved':isSaved,
        'isFocus':isFocus,
      };

      if(contentSource===u.SITE || contentSource===u.SAVED){
        if(contentType===u.PRODUCT) return <Product key={i} data={data} events={events}/>;
        if(contentType===u.ARTICLE) return <Article key={i} data={data} events={events}/>;
        if(contentType===u.USER) return <User key={i} data={data} events={events}/>;
      }
      else if(contentSource===u.CART)return <Cart key={i} data={data} events={events}/>;
      return null;
    });
  }

  const goToSlide = (slide,rowLength,contentLength) => {
    if(slide < 0) slide = contentLength-rowLength;
    if(slide >= contentLength-rowLength+1) slide = 0;

    setStyle(style);
    setActiveSlide(slide);
  };

  const getComponent = () => {
    let componentData = props.data['componentData'];
    let contentData = props.data['contentData'];
    let events = props.events;
    let requiredData = [componentData,contentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let contentIdList = componentData['content'];
    let contentType = componentData['contentType'];
    let collectionType = componentData['listType'];
    let source = componentData['source'];
    let isClickable = componentData['isClickable'];
    let title = componentData['title'];
    let subtitle = componentData['subtitle'];
    let description = componentData['description'];
    let contentLength = contentIdList.length;

    let content = getContent(contentIdList,contentData,source,contentType);
    let entries = getEntries(content,contentData,contentType,source,isClickable,false,events);
    let activeEntry = getEntries(activeData,contentData,contentType,source,isClickable,true,events);
  
    let sliderStyle = 
      collectionType!=='content-row'?null:{
        'width':'calc(100% /'+rowLength+' *'+contentLength+')',
        'marginLeft': 'calc('+(activeSlide * -100).toString()+'% / '+rowLength+')',
      };

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <h2 className="title">{title}</h2>
          <h3 className="subtitle">{subtitle}</h3>
          <p className="description">{description}</p>
        </div>
      </div>;

    let arrowControls = 
      <div className="arrow-controls">
        <div className="arrow-left" onClick={()=>goToSlide(activeSlide-1,rowLength,contentLength)}></div>
        <div className="arrow-right" onClick={()=>goToSlide(activeSlide+1,rowLength,contentLength)}></div>
      </div>;

    let listContent = 
      <div className={collectionType}>
        <div className="entry-list-wrapper">
          <div className="entry-list">
            <div className="slider" style={sliderStyle}>
              {entries}
            </div>
          </div>
          {arrowControls}
        </div>
        <div className="active-entry">{activeEntry}</div>
      </div>;                

    let componentContent = 
      <>
        {textContainer}
        {listContent}
      </>;

    let component = 
      <div className={componentClass} ref={ref}>
        <div className="component-wrapper">
          <div className="component-content">
            {componentContent}
          </div>
        </div>
      </div>;

    return component;
  };

  return getComponent();
}