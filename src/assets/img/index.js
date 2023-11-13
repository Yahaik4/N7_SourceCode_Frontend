import slides from './slides';
import banners from './banners';
import productImgs from './products';
import accessoriesImg from './accessoriesCategories';
import pcComponentsImg from './pcComponentsCategories';
import secondHandsImg from './secondhandsCategories';

const images = {
    logo: require('./logo.svg').default,
    slides: slides,
    banners: banners,
    products: productImgs,
    categories: { accessories: accessoriesImg, pcComponents: pcComponentsImg, secondHands: secondHandsImg },
};

export default images;
