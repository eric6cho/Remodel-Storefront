import React, { useState, useEffect } from "react";
import './../styles/comp-footer.scss';
import * as u from './../scripts/utils'; 

export default function Footer(props) {
  const [componentName] = useState('footer');
  const [componentClass] = useState('component '+componentName);
    
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComponent = () => {
    let data = props.data;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let footerData = data['pageData']['footer']['data'];
    let textList = footerData['text'];
    let gitHubLink = footerData['githubLink'];

    let text = textList.map((line,i)=>
      <p key={i}>{line}{(i<textList.length-1)?'':<a href={gitHubLink} target="_blank" rel="noreferrer">here</a>}</p>);

    let componentContent = 
      <>
        {text}
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