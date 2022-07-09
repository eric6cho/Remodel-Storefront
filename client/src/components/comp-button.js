import React from "react";

export default function Button(props) {
  
  const isValid = item => !(item===undefined||item===null);

  const getComponent = () => {  
    let key = isValid(props.key)?props.key:null;
    let cssClass = 'button '+(isValid(props.cssClass)?props.cssClass:'');
    let click = isValid(props.click)?props.click:(()=>{});
    let title = isValid(props.title)?props.title:'';
    let component = <div key={key} className={cssClass} onClick={click}><h4>{title}</h4></div>;
    
    return component;
  }
   
  return getComponent();
}