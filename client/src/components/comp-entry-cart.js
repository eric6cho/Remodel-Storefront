import React, { useState } from "react";
import Icon from "./comp-icon";
import './../styles/comp-entry-cart.scss';
import * as u from '../scripts/utils'; 

export default function Product(props) {
  const [componentName] = useState('entry-cart ');
  const [componentClass] = useState('component '+componentName);

  const getComponent = () => {
    let componentData = props.data['componentData'];
    let events = props.events;
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let handleCartChange = events['handleCartChange'];

    let data = componentData['data'];
    let metadata = componentData['metadata'];
    let componentId = metadata['id'];
    
    let title = data['name'];
    let category = data['category'];
    let image = data['image'];
    let rating = u.shortenNum(data['rating']);
    let ratingCount = '('+data['rating_count']+')';
    let quantity = props.data['cartData'][componentId]['quantity'];
    let price = u.formatPrice(parseInt(quantity) * data['price']);
      
    let minusIcon = <Icon title={'remove'} cssClass={'item-action-icon minus'} click={()=>handleCartChange(componentData,-1)}/>;
    let plusIcon = <Icon title={'add'} cssClass={'item-action-icon plus'} click={()=>handleCartChange(componentData,1)}/>;

    let stars = 
      <>
        {[...Array(parseInt(data['rating']))].map((_, i) => <div key={i} className="star full"></div>)}
        {(rating%1>0.3 ? <div className="star full partial"></div> : null)}
      </>;

    let imageContainer = 
      <div className="image-container"> 
        <img src={image} alt='product'/>
        <div className="image-overlay"></div>
      </div>;

    let cartActionContainer = 
      <div className="item-action-container">
        <div className="item-action-section">
          {minusIcon} 
          <h4>
            {quantity}
          </h4> 
          {plusIcon}
        </div>
        <div className="item-action-section">
          <h4 className="price">
            {price}
          </h4> 
        </div>     
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <h3 className="title">
            {title}
          </h3>
          <p className="category secondary">
            {category}
          </p>
          <div className="reviews">
            <p>
              {rating}
            </p>
            <p className="review-count">
              {ratingCount}
            </p>
            <div className="star-container">
              {stars}
            </div>
          </div>
        </div>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {textContainer}
        {cartActionContainer}
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