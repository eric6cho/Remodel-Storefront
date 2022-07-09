import React from "react";

export default function Icon(props) {
  
  const isValid = item => !(item===undefined||item===null);

  const getComponent = () => {  
    let key = isValid(props.key)?props.key:null;
    let cssClass = 'material-icons icon '+(isValid(props.cssClass)?props.cssClass:'');
    let click = isValid(props.click)?props.click:(()=>{});
    let title = isValid(props.title)?props.title:'';
    let component = <span key={key} className={cssClass} onClick={click}>{title}</span>;
    
    return component;
  }
   
  return getComponent();
}