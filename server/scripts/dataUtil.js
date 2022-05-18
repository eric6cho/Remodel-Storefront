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

    if(num>length) [...Array(parseInt((num-length)/length)+1)].forEach(i=>{loremIpsum=loremIpsum.concat(loremIpsum);console.log('AAA',loremIpsum.length);});
    
    console.log([...Array(parseInt((num-length)/length)+1)]);
    console.log('B',length,num);

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
                    'author': 'Michael Scott',
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

const createUserData = (num=16) => {
    let data = {};

    [...Array(num).keys()].forEach(i => 
        data['userId_'+i] = 
            {
                'data':{
                    'name':'Danny Devito',
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

    let data = {
        'banner': banner,
        'featuredProducts': productCollection,
        'featuredArticles': articleCollection,
        'teamUsers':userCollection,
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
        '--shadow-1': '7px 7px 14px #151718, -7px -7px 14px #313538', // darker grey shadow
        '--shadow-2': ' 7px 7px 9px #282a2c, -7px -7px 9px #3c4042', // dark grey shadow
        '--shadow-3': 'inset 7px 7px 9px #282a2c, inset -7px -7px 9px #3c4042', // dark grey shadow inset
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
        '--shadow-1': '7px 7px 14px #bdb9b4, -7px -7px 14px #f1ebe6', // light beige shadow
        '--shadow-2': '7px 7px 14px #aca7a3, -7px -7px 14px #dad5cf', // beige shadow
        '--shadow-3': 'inset 7px 7px 9px #9c9894, inset -7px -7px 9px #eae4de', // beige shadow inset
    };

    let themes = {
        'light-cerulean': shallowCopy(lightThemeDefaultColors),
        'light-frost': shallowCopy(lightThemeDefaultColors),
        'light-botanical': shallowCopy(lightThemeDefaultColors),
        'light-taro': shallowCopy(lightThemeDefaultColors),
        'light-tropical': shallowCopy(lightThemeDefaultColors),
        'light-slate': shallowCopy(lightThemeDefaultColors),
        'dark-botanical': shallowCopy(darkThemeDefaultColors),
        'dark-cerulean': shallowCopy(darkThemeDefaultColors),
        'dark-taro': shallowCopy(darkThemeDefaultColors),
    };

    themes['light-cerulean']['--accent-1'] = 'rgba(200,180,170,1)'; // beige
    themes['light-cerulean']['--accent-2'] = 'rgba(105,120,155,1)'; // blue
    themes['light-cerulean']['--accent-3'] = 'rgba(205,220,255,1)'; // light blue

    themes['light-frost']['--accent-1'] = 'rgba(250,250,255,1)'; // light blue white
    themes['light-frost']['--accent-2'] = 'rgba(100,110,130,1)'; // blue grey
    themes['light-frost']['--accent-3'] = 'rgba(190,225,240,1)'; // light blue

    themes['light-botanical']['--accent-1'] = 'rgba(185,200,180,1)'; // light green 
    themes['light-botanical']['--accent-2'] = 'rgba(50,90,85,1)'; // teal
    themes['light-botanical']['--accent-3'] = 'rgba(150,190,165,1)'; // green
    
    themes['light-taro']['--accent-1'] = 'rgba(190,180,195,1)'; // light purple
    themes['light-taro']['--accent-2'] = 'rgba(150,145,200,1)'; // light blue
    themes['light-taro']['--accent-3'] = 'rgba(230,210,160,1)'; // yellow
    
    themes['light-tropical']['--accent-1'] = 'rgba(95,170,140,1)'; // teal
    themes['light-tropical']['--accent-2'] = 'rgba(230,160,120,1)'; // orange
    themes['light-tropical']['--accent-3'] = 'rgba(180,220,220,1)'; // light green
    
    themes['light-slate']['--accent-1'] = 'rgba(170,170,180,1)'; // blue grey
    themes['light-slate']['--accent-2'] = 'rgba(60,60,70,1)'; // dark blue grey
    themes['light-slate']['--accent-3'] = 'rgba(185,205,230,1)'; // light blue

    themes['dark-botanical']['--accent-2'] = 'rgba(150,190,165,1)'; // green
    themes['dark-botanical']['--accent-3'] = 'rgba(50,90,85,1)'; // teal
    
    themes['dark-cerulean']['--accent-2'] = 'rgba(170,190,240,1)'; // light blue
    themes['dark-cerulean']['--accent-3'] = 'rgba(180,140,120,1)'; // orange

    themes['dark-taro']['--accent-2'] = 'rgba(150,130,165,1)'; // light purple
    themes['dark-taro']['--accent-3'] = 'rgba(220,200,140,1)'; // yellow

    return themes;
};

const getStyles = () => {

    let styles = {
        'Edges' : ['sharp', 'soft', 'round'],
        'Elevation' : ['flat', 'raised', 'float', 'overlap'],
        'Accent' : ['accent', 'monochrome'],
        'Wrapper' : ['no-wrapper', 'image-wrapper', 'text-wrapper'],
        'Focus Size' : ['focus-card','focus-side','focus-full'],
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

/*
  dataUtil.js is meant to be a helper class for severUtil.js

  serverUtils is responsible for:
    generating data to populate the project
*/

// end dataUtil class definition