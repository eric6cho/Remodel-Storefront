import React, { useState, useEffect } from 'react';

import './../styles/comp-form-payment/comp-form-payment.scss';
import './../styles/comp-form-payment/comp-form-payment-variations.scss';

import * as u from './../scripts/utils'; 

export default function PaymentForm(props) {

  const [componentName] = useState('form-payment');
  const [componentClass] = useState('component '+componentName+' '+(props.data['componentData']['isNarrow']?'narrow':''));
  
  const [formValidation,setFormValidation] = useState({});
    
  useEffect(() => {

    setFormValidation({
      'firstName':'',
      'lastName':'',
      'email':'',
      'address':'',
      'state':'',
      'zip':'',
      'cardNum':'',
      'cardExpDate':'',
      'cardCVV':'',
      'cardZip':'',
      'additionalNotes':'',
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateText = (text,field) => {
    
    let msgEmpty='This field cannot be left empty';
    let msgFormat='Please correct the field format. '; 
    let msgExpDateFormat=msgFormat+'Example: 04/25';
    let msgStateFormat=msgFormat+'Example: CA';
    let msgEmailFormat=msgFormat+'Example: correct@email.com';
    let msgCVVFormat=msgFormat+'Example: 111';
    let msgZipFormat=msgFormat+'Example: 11111';
    let msgCardFormat=msgFormat+'Example: 1234567890123456';
    let msg='';
    
    let isMMYYFormat = text => (/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).test(text);
    let isEmailFormat = text => (/\S+@\S+\.\S+/).test(text);
    let isNumberFormat = text => (/^\d+$/).test(text);
    let isCVVFormat = text => isNumberFormat(text) && text.length===3;
    let isZipFormat = text => isNumberFormat(text) && text.length<=6;
    let isCardFormat = text => isNumberFormat(text) && text.length===16;
    let isStateFormat = text => text.length===2;

    if(text.length===0) msg=msgEmpty;
    else{
      if(field==='cardExpDate' && !isMMYYFormat(text)) msg=msgExpDateFormat;
      if(field==='email' && !isEmailFormat(text)) msg=msgEmailFormat;
      if(field==='state' && !isStateFormat(text)) msg=msgStateFormat;
      if((field==='zip' || field==='cardZip') && !isZipFormat(text)) msg=msgZipFormat;
      if(field==='cardNum' && !isCardFormat(text)) msg=msgCardFormat;
      if(field==='cardCVV' && !isCVVFormat(text)) msg=msgCVVFormat;
    }

    let validationCopy = u.shallowCopy(formValidation);
    validationCopy[field]=msg;

    setFormValidation(validationCopy);
  }

  const getInput = (name,placeholder) => 
    (name==='additionalNotes') ? 
      <textarea 
        className='form-input-textarea'
        id={name} 
        name={name} 
        placeholder={placeholder}>
      </textarea> : 
      <input 
        className='form-input-text'
        type='text' 
        id={name} 
        name={name} 
        placeholder={placeholder} 
        onChange={e=>validateText(e.target.value,name)}
      />;

  const getValidation = (msg) => {
    return <div className='form-validation-text'>{msg}</div>;
  };

  const getComponent = () => {
    let data = props.data;
    let componentData = data['componentData'];
    let requiredData = [data,componentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let cartProducts = data['contentData']['cart']['product'];
    let siteProducts = data['contentData']['site']['product'];
    
    let totalPrices = 0;

    Object.keys(cartProducts).forEach(id=>{
        let quantity = parseInt(cartProducts[id]['quantity']);
        let price = parseFloat(siteProducts[id]['data']['price']);
        totalPrices += quantity*price;
    });
    
    let submitText = 'Complete Payment for '+u.formatPrice(totalPrices);

    let form = 
      <form className='form-container' action=''>
        
        <div className='form'>
          <h2 className='form-section-title'>Your Shipping Information</h2>

          <div className='form-section'>
            {getInput('firstName','First Name')}
            {getValidation(formValidation['firstName'])}
          </div>

          <div className='form-section'>
            {getInput('lastName','Last Name')}
            {getValidation(formValidation['lastName'])}
          </div>

          <div className='form-section'>
            {getInput('email','Email Address')}
            {getValidation(formValidation['email'])}
          </div>

          <div className='form-section'>
            {getInput('address','Shipping Address')}
            {getValidation(formValidation['address'])}
          </div>
          
          <div className='form-section'>
            {getInput('state','State')}
            {getValidation(formValidation['state'])}
          </div>
          
          <div className='form-section'>
            {getInput('zip','Zip Code')}
            {getValidation(formValidation['zip'])}
          </div>

          <h2 className='form-section-title'>Your Payment Information</h2>

          <div className='form-section'>
            {getInput('cardNum','Card Number')}
            {getValidation(formValidation['cardNum'])}
          </div>
          
          <div className='form-section'>
            {getInput('cardExpDate','Exp Date (MM/YY)')}
            {getValidation(formValidation['cardExpDate'])}
          </div>
          
          <div className='form-section'>
            {getInput('cardCVV','CVV')}
            {getValidation(formValidation['cardCVV'])}
          </div>
        
          <div className='form-section'>
            {getInput('cardZip','Zip Code')}
            {getValidation(formValidation['cardZip'])}
          </div> 
          
          <h2 className='form-section-title'>Any Additonal Notes</h2>

          <div className='form-section width-full'>
            {getInput('additionalNotes','Additional Notes')}
          </div>

        </div>

        <input className='form-submit' type='submit' value={submitText}/>

      </form>;

    let componentContent = 
      <>
        {form}
      </>;

    let component = 
      <div className={componentClass}>
        <div className='component-wrapper'>
          <div className='component-content'>
            {componentContent}
          </div>
        </div>
      </div>;

    return component;
  };

  return getComponent();
}