import React, { useState, useEffect } from "react";
import './../styles/comp-banner.scss';

import * as u from '../scripts/utils'; 

export default function Banner(props) {

  const [componentName] = useState('banner');
  const [componentClass] = useState('component '+componentName);
  const [componentData] = useState(props.data['componentData']);
  const [style, setStyle] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
   
    goToSlide(0);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getIcon = (title,cssClass='',click=(()=>{})) => 
    <span className={"material-icons icon "+cssClass} onClick={click}>{title}</span>;

  const goToSlide = (i) => {
    let length = componentData['slides'].length;
    
    if(i<0) i=length-1;
    if(i>=length) i=0;

    setStyle({'marginLeft': (i * -100).toString()+'%'});
    setActiveSlide(i);
  };


  const getComponent = () => {
    let componentData = props.data['componentData'];
    let contentData = props.data['contentData'];
    let events = props.events;
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let slides = componentData['slides'];

    let title = <h1 className="title">{componentData['title']}</h1>

    let slider = 
        <div className="slider" style={style}>
            {slides.map(slide=>(
                <div className="slide" key={slide['title']}>
                    <div className="image-container">
                        <img src={slide['image']} alt='product entry'/>
                        <div className="image-overlay"></div>
                    </div>
                    <div className="text-container">
                        <div className="text-container-inner"> 
                            <div className="background-lower"></div>
                            <div className="background-upper"></div>
                            <div className="border-left"></div>
                            <div className="border-right"></div>
                            <h3>{slide['title']}</h3>
                            <p>{slide['description']}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>;

    let slideCounter = slides.length===1?null:
        <div className="slide-counter">
            {getIcon('chevron_left','',()=>goToSlide(activeSlide-1))}
            {slides.map((slide,i)=>
                <div 
                    key={i} 
                    className={"dot "+(activeSlide===i?'active':'')} 
                    onClick={()=>goToSlide(i)}>
                </div>
            )}
            {getIcon('chevron_right','',()=>goToSlide(activeSlide+1))}
        </div>;

    let componentContent = 
        <>
            {title}
            {slideCounter}
            {slider}
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