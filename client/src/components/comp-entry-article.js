
import React, { useState, useEffect } from "react";

import './../styles/comp-entry-article/comp-entry-article.scss';
import './../styles/comp-entry-article/comp-entry-article-variations.scss';

import * as u from '../scripts/utils'; 

export default function Article(props) {

  const [componentName] = useState('entry-article');
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
    let isSaved = props.data['isSaved'];
    let requiredData = [componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let data = componentData['data'];
    let metadata = componentData['metadata'];

    let titleText = 
      <h3 className="title">{data['title']}</h3>;

    let categoryText = 
      <p className="category secondary">{data['category']}</p>;

    let authorText = 
      <p className="author">{"Written "+data['date_added']+" By "+data['author']}</p>;
    
    let articleText = 
      <p className="text">{data['text']}</p>;
      
    let closeIcon = getIcon('close','close-icon',e=>handleContentClose(handleContentSelect,e));

    let imageContainer = 
      <div className="image-container"> 
        <img src={data['image']} alt='article'/>
      </div>;

    let imageOverlay = 
      <div className="image-overlay"></div>;

    let activeIconContainer = 
      <div className="active-icon-container">
        {getIcon('share')}
        {getIcon('favorite'+(isSaved?'':'_border'),'',()=>handleContentSave(componentData))}
      </div>;

    let previewButtonContainer = 
      <div className="preview-button-container">
        {getButton('Read More','read-more',()=>handleContentSelect(componentData))}
      </div>;

    let titleContainer = 
      <div className="title-container">
        {titleText}
        {categoryText}
      </div>;
   
    let tagContainer = 
      <div className="tags">
        {metadata['tags'].map(tag=><span key={tag} className="tag">{tag}</span>)}
      </div> ;
    
    let textContainer = 
      <div className="text-container">
        <div className="text-container-inner">
          {titleContainer}
          {authorText}
          {tagContainer}
          {articleText}
          {activeIconContainer}
        </div>
        {previewButtonContainer}
      </div>;

    let componentContent = 
      <>
        {imageContainer}
        {imageOverlay}
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