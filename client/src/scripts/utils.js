export const PRODUCT = 'product';
export const ARTICLE = 'article';
export const SAVED = 'saved';
export const SITE = 'site';
export const CART = 'cart';
export const USER = 'user';
export const BANNER = 'banner';
export const GRID = 'grid';
export const ROW = 'row';
export const COLUMN = 'column';
export const ACTIVECLASS = ' active ';

export const noAction = ()=>{};

export const shortenNum = value => parseFloat(value).toFixed(2);

export const formatPrice = value => '$'+shortenNum(value);

// go thru data and keep any data that is null or {}. if result length is == 0 then all data is valid
export const isRequiredDataValid = dataList => {
  let invalidList = (dataList.filter(data=>!data||data==={}||Object.keys(data).length===0));
  
  return invalidList.length===0;
};
  

export const shallowCopy = obj => Object.assign({}, obj);

