import React, { useState, useEffect, useRef } from "react";

import Product from "./comp-entry-product";
import Article from "./comp-entry-article";
import User from "./comp-entry-user";
import Cart from "./comp-entry-cart";

import * as u from '../scripts/utils'; 

import './../styles/comp-collection/comp-collection.scss';
import './../styles/comp-collection/comp-collection-active.scss';

export default function Collection(props) {

    const listWidth = useRef(null);

    const [activeData, setActiveData] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [style, setStyle] = useState(null);

    const [componentName] = useState('collection');
    const [componentClass,setComponentClass] = useState('component '+componentName+' '+(props.data['componentData']['isNarrow']?' narrow ':' full ')+(activeData?' active ':''));
    
    useEffect(() => { 
       
        goToSlide(0);
    
        console.log('collection use effect');

        console.log(props.data)

        console.log('width', listWidth.current ? listWidth.current.offsetWidth : 0);
        
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        setComponentClass('component '+componentName+' '+(props.data['componentData']['isNarrow']?' narrow ':' full ')+(activeData?' active ':''));
      

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeData]);


    const getContent = (idList, allContentData, source, contentType) => {
        console.log(idList, allContentData, source, contentType);

        
        let content = allContentData['site'][contentType];
        
        if(content===undefined) return null;

        if(source==='saved') idList = Object.keys(allContentData[source][contentType]);
        if(source==='cart') idList = Object.keys(allContentData[source][contentType]);

        console.log(content);
        

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

            console.log(contentType);

            console.log(componentType);
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
    
        let marginLeftValue = 'calc('+(slide * -100).toString()+'% / '+rowLength+')';
        let widthValue = 'calc(100% / '+rowLength+' * '+contentLength+')';
        let style = {
            'marginLeft': marginLeftValue,
            'width': widthValue,
        };
        
        setStyle(style);
        setActiveSlide(slide);
      };

    const getComponent = () => {
            
        let componentData = props.data['componentData'];
        let contentData = props.data['contentData'];
        let events = props.events;
        let requiredData = [componentData,contentData];
        if(!u.isRequiredDataValid(requiredData)) return null;

        console.log(componentData);

        console.log(componentData['isNarrow']);

        let contentIdList = componentData['content'];
        let contentType = componentData['contentType'];
        let collectionType = componentData['listType'];
        let source = componentData['source'];
        let isClickable = componentData['isClickable'];
        let title = componentData['title'];
        let subtitle = componentData['subtitle'];
        let description = componentData['description'];
        let rowLength = componentData['rowLength'];
        let contentLength = contentIdList.length;

        let content = getContent(contentIdList,contentData,source,contentType);
        let entries = getEntries(content,contentData,contentType,source,isClickable,false,events);
        let activeEntry = getEntries(activeData,contentData,contentType,source,isClickable,true,events);
        

        console.log(content);
        console.log(entries);



        let titleText = <h2 className="title">{title}</h2>;
        let subtitleText = <h3 className="subtitle">{subtitle}</h3>;
        let descriptionText = <p className="description">{description}</p>;
        
        let sliderStyle = collectionType==='content-row'?(style?style:{'width':'calc(100% /'+rowLength+' *'+contentLength+')'}):null;

        let textContainer = 
            <div className="text-container">
                <div className="text-container-inner">
                    {titleText}
                    {subtitleText}
                    {descriptionText}
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
                    <div className="entry-list" ref={listWidth}>
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
            <div className={componentClass}>
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