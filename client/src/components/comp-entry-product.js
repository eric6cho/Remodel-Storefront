import React, { useState, useEffect, useRef } from "react";

import './../styles/comp-entry-product/comp-entry-product.scss';
import './../styles/comp-entry-product/comp-entry-product-active.scss';
import './../styles/comp-entry-product/comp-entry-product-active-variations.scss';
import './../styles/comp-entry-product/comp-entry-product-variations.scss';

import * as u from '../scripts/utils'; 

export default function Product(props) {

  const [componentName] = useState('entry-product');
  const [componentClass] = useState('component '+componentName+' '+(props.data['isFocus']?u.ACTIVECLASS:''));
  
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContentClose = (handleContentSelect,e) => {
    handleContentSelect(null);
    e.stopPropagation(); // prevent any click events in the parent
  };
  
  const getButton = (title,cssClass='',click=(()=>{})) =>
    <div className={"button "+cssClass} onClick={click}><h4>{title}</h4></div>;

  const getIcon = (title,cssClass='',click=(()=>{})) => 
    <span className={"material-icons icon "+cssClass} onClick={click}>{title}</span>;

  const getComponent = () => {

    let componentData = props.data['componentData'];
    let handleContentSelect = props.events['handleContentSelect'];
    let handleContentSave = props.events['handleContentSave'];
    let handleCartChange = props.events['handleCartChange'];
    let isSaved = props.data['isSaved'];
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let data = componentData['data'];
    let metadata = componentData['metadata'];
    
    let titleText = 
      <h3 className="title">{data['name']}</h3>;

    let categoryText = 
      <p className="category secondary">{data['category']}</p>;

    let priceText = 
      <p className="price">{u.formatPrice(data['price'])}</p>;
    
    let descriptionText = 
      <p className="description">{data['description']}</p>;

    let closeIcon = getIcon('close','close-icon',e=>handleContentClose(handleContentSelect,e));

    let imageContainer = 
      <div className="image-container"> 
        <img src={data['image']} alt='product'/>
      </div>;

    let imageOverlay = 
      <div className="image-overlay"></div>;

    let activeIconContainer = 
      <div className="active-icon-container">
        {getIcon('share')}
        {getIcon('favorite'+(isSaved?'':'_border'),'',()=>handleContentSave(componentData))}
      </div>;

    let previewIconContainer = 
      <div className="preview-icon-container">
        {getIcon('shopping_cart','',()=>handleCartChange(componentData,1))}
        {getIcon('share')}
        {getIcon('favorite'+(isSaved?'':'_border'),'',()=>handleContentSave(componentData))}
      </div>;
    
    let previewButtonContainer = 
      <div className="preview-button-container">
        {getButton('Read More','read-more secondary',()=>handleContentSelect(componentData))}
      </div>;  
    
    let activeButtonContainer = 
      <div className="active-button-container">
        {getButton('Add To Cart','add-to-cart')}
        {getButton('Find Store In Maps','secondary find-store')}
      </div>;

    let activeTitleContainer = 
      <div className="active-title-container">
        {titleText}
        {categoryText}
      </div>;

    let previewTitleContainer = 
      <div className="preview-title-container">
        {titleText}
        {categoryText}
      </div>;

    let reviewContainer = 
      <div className="reviews">
        <p>{u.shortenNum(data['rating'])}</p>
        <p className="review-count">({data['rating_count']})</p>
        <div className="star-container">
          {[...Array(parseInt(data['rating']))].map((_, i) => <div key={i} className="star full"></div>)}
          {(data['rating']%1 > 0.3? <div className="star full partial"></div>:null)}
        </div>
      </div>;

    let tagContainer = 
      <div className="tags">
        {metadata['tags'].map((tag,i)=><span key={i} className="tag">{tag}</span>)}
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          {previewTitleContainer}
          {priceText}
          {reviewContainer}
          {tagContainer}
          {descriptionText}
          {activeIconContainer}
        </div>
        {activeButtonContainer}
        {previewButtonContainer}
        {previewIconContainer}
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {imageOverlay}
        {activeTitleContainer}
        {textContainer}
        {closeIcon}
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