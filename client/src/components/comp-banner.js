import React, { useState, useEffect, useRef } from "react";
import BannerSlide from "./comp-entry-banner-slide";
import './../styles/comp-banner.scss';
import * as u from '../scripts/utils'; 

export default function Banner(props) {
  const [componentName] = useState('banner');
  const [componentClass] = useState('component '+componentName);
  const [componentData] = useState(props.data['componentData']);
  const [activeSlide, setActiveSlide] = useState(0);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setActiveSlide(i);
  };

  const getComponent = () => {
    let componentData = props.data['componentData'];
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let slides = componentData['slides'];

    let sliderStyles = {
      'width': width===0?'100'+slides.length+'vx':width*slides.length+'px',
      'marginLeft': 'calc('+ (0-activeSlide*width)+'px - 0px)',
    };

    let slider = 
      <div className="slider" style={sliderStyles}>
        {slides.map((slide,i)=>
          <BannerSlide 
            key={i}
            image={slide['image']}
            title={slide['title']}
            description={slide['description']}
            width={width}
            />
        )}
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

    let title = <h1 className="title">{componentData['title']}</h1>

    let componentContent = 
      <>
        {title}
        {slideCounter}
        {slider}
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