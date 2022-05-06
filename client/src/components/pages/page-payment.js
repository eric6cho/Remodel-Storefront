import React, { useState, useEffect } from "react";

import Banner from "../comp-banner";
import PaymentForm from "../comp-form-payment";

import * as u from '../../scripts/utils'; 

export default function PaymentPage(props) {

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComponent = () => {

    let pageData = props.data['pageData']['data'];
    let contentData = props.data['contentData'];
    let events = props.events;
    let requiredData = [pageData,contentData];
    if(!u.isRequiredDataValid(requiredData)) return null;

    let paymentFormData = {
      'componentData':pageData['paymentForm'], 
      'contentData':contentData,
    };

    let form = <PaymentForm data={paymentFormData} events={events}/>;

    let component = 
      <>
        {form}
      </>;

    return component;
  };

  return getComponent();
}