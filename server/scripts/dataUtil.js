const _ = require('lodash');
const moment= require('moment');

const shallowCopy = obj => Object.assign({}, obj);

const shortenNum = value => parseFloat(value).toFixed(2);

const getPrice = (limit=10) => shortenNum((Math.floor(Math.random()*limit*10))+49.99);

const getImage = (folder,i) => './images/'+folder+'/'+i+'.jpg';

const getDateAdded = () => moment().format('YYYY-MM-DD');

const getTags = num => [...Array(num).keys()].map(i=>'tag_'+i);

const getRating = () => Math.floor(Math.random()*200)/100+3;

const getRatingCount = () => Math.floor(Math.random()*1000);

const getText = num => {
    let loremIpsum = 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices dolor justo, vel egestas nunc "+
        "mattis vitae. Aliquam erat volutpat. Nam faucibus urna non arcu ultrices efficitur. Phasellus ut aliquet "+
        "odio, suscipit pulvinar purus. Proin a consequat augue. Praesent finibus odio vel pretium consequat. ";
    
    let length = loremIpsum.length;

    if(num>length) [...Array(parseInt((num-length)/length)+1)].forEach(i=>loremIpsum=loremIpsum.concat(loremIpsum));

    return num?loremIpsum.substring(0,num):loremIpsum;
};

const createProductData = (num=24) => {
    let data = {};

    [...Array(num).keys()].forEach(i => 
        data['productId_'+i] =
            {
                'data':{
                    'name': 'Product '+i,
                    'price': getPrice(),
                    'description': getText(300),
                    'category':'Sample Category',
                    'image': getImage('shop',i),
                    'rating': getRating(),
                    'rating_count': getRatingCount(),
                    'date_added': getDateAdded(),
                },
                'metadata':{
                    'id': 'productId_'+i,
                    'type': 'product',
                    'tags': getTags(4),
                    'is_active': true
                },
            }
    );

    return data;
};

const createArticleData = (num=12) => {
    let data = {};

    [...Array(num).keys()].forEach(i => 
        data['articleId_'+i] = 
            {
                'data':{
                    'title': 'Article '+i,
                    'category':'Sample Category',
                    'author': 'Author Name',
                    'text': getText(2500),
                    'image': getImage('articles',i),
                    'date_added': getDateAdded(),
                },
                'metadata':{
                    'id': 'articleId_'+i,
                    'type': 'article',
                    'tags': getTags(4),
                    'is_active': true
                },
            }
    );

    return data;
};

const createUserData = (num=6) => {
    let data = {};

    [...Array(num).keys()].forEach(i => 
        data['userId_'+i] = 
            {
                'data':{
                    'name':'User Name',
                    'title': 'Member',
                    'description':'This is a sample description of this user.',
                    'image': getImage('users',i),
                    'date_added': getDateAdded(),
                },
                'metadata':{
                    'id': 'userId_'+i,
                    'type': 'user',
                    'is_active': true
                },
            }
    );

    return data;
};

const createSavedData = () => {
    let data = {
        'saved':{
            'article':{
                'articleId_0':{'id':'articleId_0',},
                'articleId_1':{'id':'articleId_1',},
                'articleId_2':{'id':'articleId_2',},
            },
            'product':{
                'productId_0':{'id':'productId_0',},
                'productId_1':{'id':'productId_1',},
                'productId_2':{'id':'productId_2',},
            },
        },
        'cart':{
            'product':{
                'productId_0':{'id':'productId_0','quantity':2,},
                'productId_1':{'id':'productId_1','quantity':1,},
                'productId_2':{'id':'productId_2','quantity':5,},
            },    
        },
    };
   
    return data;
};

const getBannerData = (title='Title',num=3) => {
    let slides = [...Array(num).keys()].map(i => (
      {
        'title':'Slide '+(i+1),
        'description':getText(250),
        'image':'./images/home/'+i+'.jpg',
      }
    ));
    
    let data = {
      'title':title,
      'slides':slides,
    };

    return data;
};

const getProductPageData = (num=24) => {
    let productGrid = {
        'title':'Products',
        'subtitle':'subtitle',
        'description':'List of products',
        'content':[...Array(num).keys()].map(i => 'productId_'+i),
        'contentType':'product',
        'listType':'content-grid',
        'source':'site',
        'rowLength':0,
        'isClickable':true,
        'isNarrow':true,
    };

    let banner = getBannerData('Products Page Title',1);

    let data = {
        'banner': banner,
        'productGrid': productGrid,
    };
   
    return data;
};

const getArticlePageData = (num=12) => {
    let articleGrid = {
        'title':'Article',
        'subtitle':'subtitle',
        'description':'List of articles',
        'content':[...Array(num).keys()].map(i => 'articleId_'+i),
        'contentType':'article',
        'listType':'content-grid',
        'source':'site',
        'rowLength':0,
        'isClickable':true,
        'isNarrow':true,
    };

    let banner = getBannerData('Article Page Title',1);

    let data = {
        'banner': banner,
        'articleGrid': articleGrid,
    };
   
    return data;
};

const getHomePageData = () => {
    let articleCollection = {
        'title':'Featured Articles',
        'subtitle':'subtitle',
        'description':'This is a description under the featured articles section.',
        'content':[...Array(5).keys()].map(i => 'articleId_'+i),
        'contentType':'article',
        'listType':'content-row',
        'source':'site',
        'rowLength':2,
        'isClickable':true,
        'isNarrow':true,
    };

    let productCollection = {
        'title':'Featured Products',
        'subtitle':'subtitle',
        'description':'This is a description under the featured products section.',
        'content':[...Array(5).keys()].map(i => 'productId_'+i),
        'contentType':'product',
        'listType':'content-row',
        'source':'site',
        'rowLength':3,
        'isClickable':true,
        'isNarrow':true,
    };

    let userCollection = {
        'title':'Meet Our Team',
        'subtitle':'Our Founders, Developers, and Authors',
        'description':'This is a description under the team section.',
        'content':[...Array(16).keys()].map(i => 'userId_'+(i)),
        'contentType':'user',
        'listType':'content-grid',
        'source':'site',
        'rowLength':0,
        'isClickable':false,
        'isNarrow':true,
    };

    let banner = getBannerData('Home Page Title',3);

    let imageRow = {
      'title': 'Check Out Our Stuff',
      'description': 
        'This is a description for the image row component which features three images of '+
        'a related set. I am writing more text here to fill up the space. '+getText(250),
      'backgroundImage': './images/home/2.jpg',
      'focusImage1': './images/shop/8.jpg',
      'focusImage2': './images/shop/9.jpg',
      'focusImage3': './images/shop/10.jpg',
    };

    let data = {
        'banner': banner,
        'featuredProducts': productCollection,
        'featuredArticles': articleCollection,
        'teamUsers':userCollection,
        'imageRow':imageRow,
    };
   
    return data;
};

const getSavedContentPageData = () => {
    let productCollection = {
        'title':'Saved Products',
        'subtitle':'subtitle',
        'description':'This is a description under the saved products section.',
        'content':[],
        'contentType':'product',
        'listType':'content-grid',
        'source':'saved',
        'rowLength':3,
        'isClickable':true,
        'isNarrow':true,
    };

    let articleCollection = {
        'title':'Saved Articles',
        'subtitle':'subtitle',
        'description':'This is a description under the saved articles section.',
        'content':[],
        'contentType':'article',
        'listType':'content-grid',
        'source':'saved',
        'rowLength':3,
        'isClickable':true,
        'isNarrow':true,
    };

    let banner = getBannerData('Saved Content',1);

    let data = {
        'banner': banner,
        'savedProducts': productCollection,
        'savedArticles': articleCollection,
    };
   
    return data;
};

const getCartPageData = () => {
    let cartCollection = {
        'title':'Items Ready To Be Purchased',
        'subtitle':'subtitle',
        'description':'This is a description under the cart section.',
        'content':[],
        'contentType':'product',
        'listType':'content-column',
        'source':'cart',
        'rowLength':0,
        'isClickable':true,
        'isNarrow':true,
    };
   
    let banner = getBannerData('Your Cart',1);

    let data = {
        'banner': banner,
        'cartProducts': cartCollection,
    };
   
    return data;
};

const getPaymentPageData = () => {
    let paymentForm = {
        'title':'Your Payment Information',
        'subtitle':'subtitle',
        'description':'This is a description for the payment form.',
        'isNarrow':true,
    };
   
    let banner = getBannerData('Payment',1);

    let data = {
        'banner': banner,
        'paymentForm': paymentForm,
    };
   
    return data;
};

const getFooterData = () => {
  
  let data = {
    'text': [
      'This site is a project made for personal and educational use and is '+
      'not meant to be used as any actual ecommerce site or business.',
      'Images for this project are stock images that can be found on pexels, '+
      'and icons are sourced from Google Fonts.',
      'Documentation for this project can be found on this GitHub link '], 
    'githubLink':'https://github.com/eric6cho',
  };
 
  return data;
};

const createPageData = () => {   
    let pages = {
        'home':{
            'id':'home',
            'title': 'Home',
            'icon': 'home',
            'data': getHomePageData(),
            'isNav':true,
        }, 
        'articles':{
            'id':'articles',
            'title':'Articles',
            'icon':'menu_book',
            'data': getArticlePageData(6),
            'isNav':true,
        },
        'products':{
            'id':'products',
            'title':'Products',
            'icon':'store',
            'data': getProductPageData(24),
            'isNav':true,
        },
        'cart':{
            'id':'cart',
            'title':'Cart',
            'icon':'shopping_cart',
            'data': getCartPageData(),
            'isNav':true,
        },
        'saved':{
            'id':'saved',
            'title': 'Saved Content',
            'icon': 'favorite',
            'data': getSavedContentPageData(),
            'isNav':true,
        },
        'payment':{
            'id':'payment',
            'title':'Payment',
            'icon':'',
            'data': getPaymentPageData(),
            'isNav':false,
        },
        'footer':{
          'id':'footer',
          'title':'footer',
          'icon':'',
          'data': getFooterData(),
          'isNav':false,
        },
    };

    return pages;
};

const getThemes = () => {
    let darkThemeDefaultColors = {
        '--base-1': 'rgba(35,35,40,1)', // darker grey   
        '--base-2': 'rgba(55,55,60,1)', // grey
        '--base-3': 'rgba(55,55,60,1)', // dark grey
        '--accent-1': 'rgba(55,55,60,1)', // grey
        '--text-1': 'rgba(255,255,255,1)', // white
        '--text-2': 'rgba(255,255,255,1)', // white
        '--text-3': 'rgba(0,0,0,1)', // black
        '--light-1': 'rgba(255,255,255,0.2)', // white transparent
        '--glass-1': 'rgba(30,30,30,0.8)',
        '--border-1': '2px solid rgba(90,90,100,0.5)', // grey transparent
        '--shadow-raised': ' 3px 3px 6px #88888888, -3px -3px 6px #fafafa88', // raised shadow
        '--shadow-float': '1px 3px 6px 2px #00000022', // floating shadow
    };

    let lightThemeDefaultColors = {
        '--base-1': 'rgba(215,210,205,1)', // light beige 
        '--base-2': 'rgba(245,245,245,1)', // white
        '--base-3': 'rgba(195,190,185,1)', // beige
        '--text-1': 'rgba(255,255,255,1)', // white
        '--text-2': 'rgba(0,0,0,1)', // black
        '--text-3': 'rgba(255,255,255,1)', // white
        '--light-1': 'rgba(255,255,255,0.8)', // white transparent
        '--glass-1': 'rgba(245,245,245,0.8)',
        '--border-1': '2px solid rgba(90,90,100,0.5)', // grey transparent
        '--shadow-raised': ' 3px 3px 6px #88888888, -3px -3px 6px #fafafa88', // raised shadow
        '--shadow-float': '1px 3px 6px 2px #00000022', // floating shadow
    };

    let themes = {
        'light-frost': shallowCopy(lightThemeDefaultColors),
        'light-cerulean': shallowCopy(lightThemeDefaultColors),
        'light-botanical': shallowCopy(lightThemeDefaultColors),
        'light-lavender': shallowCopy(lightThemeDefaultColors),
        'light-horizon': shallowCopy(lightThemeDefaultColors),
        'light-tangerine': shallowCopy(lightThemeDefaultColors),
        'dark-botanical': shallowCopy(darkThemeDefaultColors),
        'dark-cerulean': shallowCopy(darkThemeDefaultColors),
        'dark-lavender': shallowCopy(darkThemeDefaultColors),
    };

    themes['light-frost']['--accent-1'] = 'rgba(180,190,200,1)';
    themes['light-frost']['--accent-2'] = 'rgba(90,100,120,1)';
    themes['light-frost']['--accent-3'] = 'rgba(225,250,255,1)';
    themes['light-frost']['--accent-4'] = 'rgba(90,110,150,1)';
    themes['light-frost']['--accent-5'] = 'rgba(50,70,80,1)';
    themes['light-frost']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['light-cerulean']['--accent-1'] = 'rgba(200,180,170,1)';
    themes['light-cerulean']['--accent-2'] = 'rgba(105,135,170,1)';
    themes['light-cerulean']['--accent-3'] = 'rgba(190,225,255,1)';
    themes['light-cerulean']['--accent-4'] = 'rgba(55,70,115,1)';
    themes['light-cerulean']['--accent-5'] = 'rgba(40,45,65,1)';
    themes['light-cerulean']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['light-botanical']['--accent-1'] = 'rgba(180,190,180,1)';
    themes['light-botanical']['--accent-2'] = 'rgba(75,115,110,1)';
    themes['light-botanical']['--accent-3'] = 'rgba(180,230,215,1)';
    themes['light-botanical']['--accent-4'] = 'rgba(95,165,145,1)';
    themes['light-botanical']['--accent-5'] = 'rgba(40,70,60,1)';
    themes['light-botanical']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['light-lavender']['--accent-1'] = 'rgba(190,185,200,1)';
    themes['light-lavender']['--accent-2'] = 'rgba(125,110,150,1)';
    themes['light-lavender']['--accent-3'] = 'rgba(245,210,180,1)';
    themes['light-lavender']['--accent-4'] = 'rgba(120,120,190,1)';
    themes['light-lavender']['--accent-5'] = 'rgba(90,70,80,1)';
    themes['light-lavender']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['light-tangerine']['--accent-1'] = 'rgba(230,220,210,1)';
    themes['light-tangerine']['--accent-2'] = 'rgba(220,160,125,1)';
    themes['light-tangerine']['--accent-3'] = 'rgba(255,205,150,1)';
    themes['light-tangerine']['--accent-4'] = 'rgba(215,150,135,1)';
    themes['light-tangerine']['--accent-5'] = 'rgba(90,70,50,1)';
    themes['light-tangerine']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['light-horizon']['--accent-1'] = 'rgba(180,190,200,1)';
    themes['light-horizon']['--accent-2'] = 'rgba(80,105,130,1)';
    themes['light-horizon']['--accent-3'] = 'rgba(250,210,200,1)';
    themes['light-horizon']['--accent-4'] = 'rgba(240,120,100,1)';
    themes['light-horizon']['--accent-5'] = 'rgba(75,70,80,1)';
    themes['light-horizon']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['dark-botanical']['--accent-2'] = 'rgba(75,115,110,1)';
    themes['dark-botanical']['--accent-3'] = 'rgba(180,230,215,1)';
    themes['dark-botanical']['--accent-4'] = 'rgba(95,165,145,1)';
    themes['dark-botanical']['--accent-5'] = 'rgba(40,70,60,1)';
    themes['dark-botanical']['--accent-6'] = 'rgba(100,100,100,1)';
    
    themes['dark-cerulean']['--accent-2'] = 'rgba(105,135,170,1)';
    themes['dark-cerulean']['--accent-3'] = 'rgba(190,225,255,1)';
    themes['dark-cerulean']['--accent-4'] = 'rgba(55,70,115,1)';
    themes['dark-cerulean']['--accent-5'] = 'rgba(40,45,65,1)';
    themes['dark-cerulean']['--accent-6'] = 'rgba(100,100,100,1)';

    themes['dark-lavender']['--accent-2'] = 'rgba(125,100,150,1)';
    themes['dark-lavender']['--accent-3'] = 'rgba(245,210,180,1)';
    themes['dark-lavender']['--accent-4'] = 'rgba(215,185,195,1)';
    themes['dark-lavender']['--accent-5'] = 'rgba(90,70,80,1)';
    themes['dark-lavender']['--accent-6'] = 'rgba(100,100,100,1)';

    return themes;
};

const getStyles = () => {
    let styles = {
        'Accent' : ['accent', 'monochrome'],
        'Edges' : ['sharp', 'soft', 'round'],
        'Elevation' : ['flat', 'raised', 'float'],
        'Wrapper' : ['no-wrapper', 'text-wrapper', 'image-wrapper'],
    };

    return styles;
};

const createStyleData = () => {
    let data = {
        'styles': getStyles(),
        'themes': getThemes(),
    };

    return data;
};

// start dataUtil class definition

let dataUtil = class {
    generatePageData = () => createPageData();
    generateStyleData = () => createStyleData();
    generateProductData = () => createProductData();
    generateArticleData = () => createArticleData();
    generateUserData = () => createUserData();
    generateSavedData = () => createSavedData();
}

module.exports = new dataUtil();

// end dataUtil class definition

/*
  dataUtil.js is meant to be a helper class for severUtil.js

  serverUtils is responsible for:
    generating data to populate the project
*/