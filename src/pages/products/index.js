import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Products.module.scss';
import images from '../../assets/img';
import productItems from '../../constants/productItems';

import Slide from '../../components/Slide';

function Products(props) {
    let { products, producer } = useParams();
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.bannerSlider)}>
                <div className={clsx(styles.banner)}>
                    <Slide
                        slideShowItemLength={images.banners.productsPageBanner.length - 1}
                        translatePercent={100 / images.banners.productsPageBanner.length}
                        showHandleSlideBtn={true}
                        settingStyles={{ maxHeight: 104, display: 'flex' }}
                    >
                        {images.banners.productsPageBanner.map((banner, index) => {
                            return (
                                <Link to="/" key={index}>
                                    <img src={banner} alt="" />
                                </Link>
                            );
                        })}
                    </Slide>
                </div>
                <div className={clsx(styles.banner)}>
                    <Slide
                        slideShowItemLength={images.banners.productsPageBanner.length - 1}
                        translatePercent={100 / images.banners.productsPageBanner.length}
                        showHandleSlideBtn={true}
                        settingStyles={{ maxHeight: 104, display: 'flex' }}
                    >
                        {images.banners.productsPageBanner.map((banner, index) => {
                            return (
                                <Link to="/" key={index}>
                                    <img src={banner} alt="" />
                                </Link>
                            );
                        })}
                    </Slide>
                </div>
            </div>
            <div className={clsx(styles.bestSeller)}>Best Seller</div>
            <div className={clsx(styles.filter)}>Filter</div>
            <div className={clsx(styles.sort)}>Sort</div>
            <div className={clsx(styles.products)}>Products list</div>
        </div>
    );
}

export default Products;
