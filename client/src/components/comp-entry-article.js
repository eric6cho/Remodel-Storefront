
import React, { useState } from "react";
import Button from "./comp-button";
import Icon from "./comp-icon";
import './../styles/comp-entry-article.scss';
import * as u from '../scripts/utils'; 

export default function Article(props) {
  const [componentName] = useState('entry-article');
  const [componentClass] = useState('component '+componentName+' '+(props.data['isFocus']?u.ACTIVECLASS:''));

  const getComponent = () => {
    let componentData = props.data['componentData'];
    let events = props.events;
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let handleContentSelect = events['handleContentSelect'];
    let handleContentSave = events['handleContentSave'];
    let handleContentClose = events['handleContentClose'];

    let data = componentData['data'];
    let metadata = componentData['metadata'];
    let isSaved = props.data['isSaved'];
    
    let title = data['title'];
    let category = data['category'];
    let text = data['text'];
    let image = data['image'];
    let authorText = "Written "+data['date_added']+" By "+data['author'];

    let closeIcon = <Icon title={'close'} cssClass={'close-icon'} click={e=>handleContentClose(handleContentSelect,e)}/>;
    let favoriteIcon = <Icon title={'favorite'+(isSaved?'':'_border')} click={()=>handleContentSave(componentData)}/>;
    let shareIcon = <Icon title={'share'} />;
    let readMoreButton = <Button title={'Read More'} cssClass={'read-more'} click={()=>handleContentSelect(componentData)}/>;

    let tags = metadata['tags'].map(tag=><span key={tag} className="tag">{tag}</span>);

    let imageContainer = 
      <div className="image-container"> 
        <img src={image} alt='article'/>
        <div className="image-overlay"></div>
      </div>;   
    
    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          <div className="title-container">
            <h3 className="title">{title}</h3>
            <p className="category secondary">{category}</p>
          </div>
          <p className="author">{authorText}</p>
          <div className="tags">
            {tags}
          </div>
          <p className="text">{text}</p>
          <div className="active-icon-container">
            {shareIcon}
            {favoriteIcon}
          </div>
        </div>
        <div className="preview-button-container">
          {readMoreButton}
        </div>
      </div>;

    let componentContent = 
      <>
        {imageContainer}
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