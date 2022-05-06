const _ = require('lodash');
const moment= require('moment');


const shallowCopy = obj => Object.assign({}, obj);

const getSampleDescription = () => {
    return 'This is a sample description. I need to change this to a function that takes a param that defines the limit of the length of a sample lorem ipsum text.';
};


const shortenNum = value => parseFloat(value).toFixed(2);


const getSamplePrice = (limit=10) => shortenNum((Math.floor(Math.random()*limit*10))+49.99);

const getProductImage = i => './images/shop/'+i+'.jpg';
 
const getArticleImage = i => './images/articles/'+i+'.jpg';
 
const getUserImage = i => './images/users/'+i+'.jpg';

const getSampleDateAdded = () => moment().format('YYYY-MM-DD');


const getSampleTags = num => [...Array(num).keys()].map(i=>'tag_'+i);


const getSampleRating = num => Math.floor(Math.random()*200)/100+3;

const getSampleRatingCount = num => Math.floor(Math.random()*1000);




const getContentListData = 
    (title,subtitle,description,content,contentType,listType,contentSource,isClickable,rowLength) => {
    
    let data = {
        'title':title,
        'subtitle':subtitle,
        'description':description,
        'content':content,
        'contentType':contentType,
        'listType':listType,
        'isClickable':isClickable,
        'rowLength':rowLength,
        'source':contentSource,
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

const createProductData = (num=24) => {

    let data = {};

    [...Array(num).keys()].forEach(i => 
        data['productId_'+i] =
            {
                'data':{
                    'name': 'Product '+i,
                    'price': getSamplePrice(),
                    'description': getSampleDescription(),
                    'category':'Sample Category',
                    'image': getProductImage(i),
                    'rating': getSampleRating(),
                    'rating_count': getSampleRatingCount(),
                    'date_added': getSampleDateAdded(),
                },
                'metadata':{
                    'id': 'productId_'+i,
                    'type': 'product',
                    'tags': getSampleTags(4),
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
                    'text': getSampleArticleText(),
                    'image': getArticleImage(i),
                    'date_added': getSampleDateAdded(),
                },
                'metadata':{
                    'id': 'articleId_'+i,
                    'type': 'article',
                    'tags': getSampleTags(4),
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
                    'image': getUserImage(i),
                    'date_added': getSampleDateAdded(),
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
            'description':'This is a description under slide '+(i+1)+'. This is an intro for this site and belongs in the home page. Under this are some featured articles',
            'image':'./images/home/'+i+'.jpg',
        }
    ));
    
    let data = {
        'title':title,
        'slides':slides,
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





const getSampleArticleText = (num=200) => {
    let loremIpsum = 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices dolor justo, vel egestas nunc "+
        "mattis vitae. Aliquam erat volutpat. Nam faucibus urna non arcu ultrices efficitur. Phasellus ut aliquet "+
        "odio, suscipit pulvinar purus. Proin a consequat augue. Praesent finibus odio vel pretium consequat. "+
        "Morbi aliquet auctor volutpat. Suspendisse sapien tellus, porta at pharetra at, cursus id mauris. Nullam "+
        "auctor quam augue, et rutrum magna accumsan ac. Fusce in felis nec ipsum dictum porta. Pellentesque "+
        "gravida nulla at tristique lacinia. Vestibulum tristique risus ac nulla convallis aliquet. Sed sit amet "+
        "purus leo. In in hendrerit nibh. Suspendisse non quam eleifend, congue ex vel, mollis lectus. Orci varius "+
        "natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque dignissim maximus "+
        "laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; "+
        "Suspendisse posuere malesuada tortor. Phasellus quis dictum quam. Cras maximus et leo sit amet consequat. "+
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies justo in urna placerat "+
        "maximus non ullamcorper nisi. Donec tortor neque, accumsan id magna nec, bibendum fermentum dui. Duis ac "+
        "dolor imperdiet, fermentum orci eu, luctus nisl. Nullam interdum quam vitae velit condimentum auctor. Nam "+
        "eleifend odio lorem. Praesent vitae pulvinar eros, sit amet pretium lacus. Donec ac purus ultricies dolor "+
        "sagittis vehicula accumsan vitae nunc. Quisque quis laoreet nibh, sed sodales sem. Curabitur tempor nulla "+
        "quis est lobortis consectetur. Praesent efficitur elementum tincidunt. Mauris et dui nec velit sagittis "+
        "vehicula. Etiam gravida turpis lorem, vitae ullamcorper quam interdum eu. Cras condimentum hendrerit eros, "+
        "dignissim bibendum velit mollis eu. Integer a neque ut erat porttitor feugiat. Proin cursus vehicula erat, "+
        "sed accumsan augue placerat vel. In erat nibh, feugiat quis blandit ut, condimentum non libero. Aenean "+
        "vulputate, nisi eu fringilla tincidunt, mauris sapien lacinia neque, sed tincidunt mi lectus quis nibh. "+
        "Vestibulum vitae sem eget dui ultrices elementum. Fusce efficitur ac massa eget pulvinar. In tincidunt "+
        "ligula sem, non blandit velit tincidunt eget. Nunc in diam ut purus volutpat facilisis at eu tellus. Cras "+
        "sagittis urna in auctor condimentum. Quisque et leo ut felis aliquam consectetur ac eget justo. Donec "+
        "accumsan accumsan dapibus. Curabitur pellentesque sapien lectus, id porta odio facilisis et. Donec congue "+
        "eget mauris a condimentum. Quisque at pharetra nulla, vitae venenatis ante.";

    return loremIpsum.substring(num);



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
        '--shadow-3':'inset 7px 7px 9px #282a2c, inset -7px -7px 9px #3c4042', // dark grey shadow inset
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
        '--shadow-3':'inset 7px 7px 9px #9c9894, inset -7px -7px 9px #eae4de', // beige shadow inset
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
        'Orientation' : ['vertical', 'horizontal'],
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


// start dataUtil class definition

let dataUtil = class {

    generatePageData=()=>createPageData();

    generateStyleData=(num)=>createStyleData();
    
    generateProductData=()=>createProductData();
    
    generateArticleData=()=>createArticleData();

    generateUserData=()=>createUserData();
    
    generateSavedData=()=>createSavedData();


}

module.exports = new dataUtil();

/*
  dataUtil.js is meant to be a helper class for severUtil.js

  serverUtils is responsible for:
    generating dummy data to populate the project
*/

// end dataUtil class definition