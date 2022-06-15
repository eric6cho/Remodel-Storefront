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
export const SMPX = 576;
export const MDPX = 768;
export const LGPX = 992;
export const XLPX = 1200;
export const XXLPX = 1400;
export const XS = 'xs';
export const SM = 'sm';
export const MD = 'md';
export const LG = 'lg';
export const XL = 'xl';
export const XXL = 'xxl';

export const noAction = ()=>{};

export const shortenNum = value => parseFloat(value).toFixed(2);

export const formatPrice = value => '$'+shortenNum(value);

export const shallowCopy = obj => Object.assign({}, obj);

// go thru data and keep any data that is null or {}. if result length is == 0 then all data is valid
export const isRequiredDataValid = dataList => {
  let invalidList = (dataList.filter(data=>!data||data==={}||Object.keys(data).length===0));
  return invalidList.length===0;
};

export const getBreakpointSize = width => {
  if(width<SMPX) return XS;
  if(width<MDPX) return SM;
  if(width<LGPX) return MD;
  if(width<XLPX) return LG;
  if(width<XXLPX) return XL;
  return XXL;
};