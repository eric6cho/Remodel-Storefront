import React, { useState, useEffect } from "react";
import ProductPage from "./pages/page-product";
import HomePage from "./pages/page-home";
import ArticlePage from "./pages/page-article";
import SavedPage from "./pages/page-saved";
import CartPage from "./pages/page-cart";
import PaymentPage from "./pages/page-payment";
import * as u from '../scripts/utils'; 

export default function Page(props) {
  const [componentName] = useState('page ');
  const [componentClass] = useState('component '+componentName);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActivePage = (id,data,events) => {
    if(id==='products') return <ProductPage data={data} events={events}/>;
    if(id==='articles') return <ArticlePage data={data} events={events}/>;
    if(id==='saved') return <SavedPage data={data} events={events}/>;
    if(id==='cart') return <CartPage data={data} events={events}/>;
    if(id==='payment') return <PaymentPage data={data} events={events}/>;
    return <HomePage data={data} events={events}/>;
  };

  const getComponent = () => {
    let contentData = props.data['contentData'];
    let pageData = props.data['pageData'];
    let navData = props.data['navData'];
    let events = props.events;
    let requiredData = [pageData,contentData,navData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let activePage = navData['activePage'];
    let id = activePage['id'];
    let data = {
      'pageData': pageData[id],
      'contentData': contentData,
    }
    
    let componentContent = getActivePage(id,data,events);

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