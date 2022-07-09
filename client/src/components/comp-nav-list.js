import React, { useState, useEffect } from "react";
import NavTheme from "./comp-nav-theme";
import NavStyle from "./comp-nav-style";
import './../styles/comp-nav-list.scss';
import * as u from '../scripts/utils'; 

export default function NavList(props) {
  const [componentName] = useState('nav-list ');
  const [componentClass] = useState('component '+componentName);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const getComponent = () => {
    let data = props.data;
    let events = props.events;
    let requiredData = [data];
    if(!u.isRequiredDataValid(requiredData)) return null;
        
    let title = data['title'];
    let listData = data['listData'];
    let type = data['type'];
    let active = data['active'];

    let listItems = Object.keys(listData).map((item,i)=>{
      let data = {
        'componentData':listData[item],
        'title':item,
        'active':active,
      };
      return type==='THEME'?<NavTheme key={i} events={events} data={data}/>:<NavStyle key={i} events={events} data={data}/>;
    });
  
    let listContainer = 
      <div className="list-container">
      <div className="list-header">
        <h3>
          {title}
        </h3> 
      </div>
      <div className="list-body">
        {listItems}
      </div>
    </div>;

    let componentContent = 
      <>
        {listContainer}
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