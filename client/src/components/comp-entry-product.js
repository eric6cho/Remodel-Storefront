import React, { useState } from "react";
import Button from "./comp-button";
import Icon from "./comp-icon";
import './../styles/comp-entry-product.scss';
import * as u from '../scripts/utils'; 

export default function Product(props) {
  const [componentName] = useState('entry-product');
  const [componentClass] = useState('component '+componentName+' '+(props.data['isFocus']?u.ACTIVECLASS:''));
  
  const getComponent = () => {
    let componentData = props.data['componentData'];
    let events = props.events;
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let handleContentSelect = events['handleContentSelect'];
    let handleContentSave = events['handleContentSave'];
    let handleCartChange = events['handleCartChange'];
    let handleContentClose = events['handleContentClose'];

    let data = componentData['data'];
    let metadata = componentData['metadata'];
    let isSaved = props.data['isSaved'];
    
    let title = data['name'];
    let category = data['category'];
    let description = data['description'];
    let price = u.formatPrice(data['price']);
    let image = data['image'];
    let rating = u.shortenNum(data['rating']);
    let ratingCount = '('+data['rating_count']+')';

    let closeIcon = <Icon title={'close'} cssClass={'close-icon'} click={e=>handleContentClose(handleContentSelect,e)}/>;
    let favoriteIcon = <Icon title={'favorite'+(isSaved?'':'_border')} click={()=>handleContentSave(componentData)}/>;
    let cartIcon = <Icon title={'shopping_cart'} click={()=>handleCartChange(componentData,1)}/>;
    let shareIcon = <Icon title={'share'} />;
    let readMoreButton = <Button title={'Read More'} cssClass={'read-more'} click={()=>handleContentSelect(componentData)}/>;
    let findStoreButton = <Button title={'Find Store In Maps'} cssClass={'secondary find-store'}/>;
    let cartButton = <Button title={'Add To Cart'} cssClass={'add-to-cart'} click={()=>handleCartChange(componentData,1)}/>;

    let tags = metadata['tags'].map((tag,i)=><span key={i} className="tag">{tag}</span>);
    
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

    let iconContainer = 
      <div className="preview-icon-container">
        {cartIcon}
        {shareIcon}
        {favoriteIcon}
      </div>;

    let titleContainer = 
      <div className="active-title-container">
        <h3 className="title">
          {title}
        </h3>
        <p className="category secondary">
          {category}
        </p>
      </div>;

    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <div className="preview-title-container">
            <h3 className="title">
              {title}
            </h3>
            <p className="category secondary">
              {category}
            </p>
          </div>
          <p className="price">
            {price}
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
          <div className="tags">
            {tags}
          </div>
          <p className="description">
            {description}
          </p>
          <div className="active-icon-container">
            {shareIcon}
            {favoriteIcon}
          </div>
        </div>
        <div className="active-button-container">
          {findStoreButton}
          {cartButton}
        </div>
        <div className="preview-button-container">
          {readMoreButton}
        </div>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {titleContainer}
        {textContainer}
        {closeIcon}
        {iconContainer}
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