import slides from './slides';
import banners from './banners';
import productImgs from './products';
import accessoriesImg from './accessoriesCategories';
import pcComponentsImg from './pcComponentsCategories';
import secondHandsImg from './secondhandsCategories';
import techNewsImg from './techNews';
import { paymentIcons, webIcons } from './icons';

const images = {
    logo: require('./logo.svg').default,
    slides: slides,
    banners: banners,
    products: productImgs,
    categories: { accessories: accessoriesImg, pcComponents: pcComponentsImg, secondHands: secondHandsImg },
    techNews: techNewsImg,
};
export { paymentIcons, webIcons };
export default images;
