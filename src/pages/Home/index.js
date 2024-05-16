import clsx from 'clsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Home.module.scss';

// dummy data
// import productItems from '../../constants/productItems';
// import categories from '../../constants/categories';
import images from '../../assets/img';
// import banners from '../../assets/img/banners';

// Component
import Catalog from '../../components/Catalog';
import BannerSlide from './BannerSlide';
// import Section from './Section';
// import Categories from './Categories';
import ProductCardDetailed from '../../components/ProductCardDetailed';
import SlideScrollable from '../../components/SlideScrollable';
import { useEffect, useState } from 'react';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const fetchAllProduct = async () => {
        const options = {
            url: 'http://localhost:1337/api/products?populate[image][fields][1]=url&populate[brand][fields][0]=brandName&_limit=-1',
            method: 'GET',
        };
        await axios
            .request(options)
            .then((response) => response.data)
            .then((result) => {
                setProducts(result.data)
                console.log(result.data.length);
            })
            .catch((err) => console.log(err));
    };
    const fetchAllBrand = async () => {
        const options = {
            url: 'http://localhost:1337/api/brands?_limit=-1',
            method: 'GET',
        };
        await axios
            .request(options)
            .then((response) => response.data)
            .then((result) => setBrands(result.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAllBrand();
                await fetchAllProduct();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // console.log(products.length)
    return (
        <div className={clsx(styles.wrapper)}>
            <section className={clsx(styles.topHome)}>
                <div className={clsx(styles.mainMenu)}>
                    <Catalog />
                </div>
                <div className={clsx(styles.slider)}>
                    <BannerSlide />
                </div>
                <div className={clsx(styles.banner)}>
                    {images.banners.topHomeBanner.map((banner, index) => {
                        return (
                            <Link to="/" key={index}>
                                <img src={banner} className={clsx(styles.banner)} alt="" />
                            </Link>
                        );
                    })}
                </div>
            </section>
            {/* {brands.map((brand, index) => {
                if (brand.hasOwnProperty('attributes')) {
                    return (
                        <div key={index} className="flex flex-col gap-3 mt-5">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-[30px]">{brand.attributes.brandName}</h1>
                                <Link
                                    className="decoration-none color-[#444] rounded-xl border-gray-200 bg-gray-200 p-3 font-bold text-[13px]"
                                    to={`/${brand.attributes.brandName}`}
                                >
                                    Xem tất cả
                                </Link>
                            </div>
                            <SlideScrollable
                                slideShowItemLength={Math.round(products.length / 2 - 5)}
                                translatePercent={20}
                                scrollable={true}
                                settingSlideLayout={{
                                    maxHeight: 926,
                                    display: 'flex',
                                    flexFlow: 'column wrap',
                                    gap: 10,
                                    padding: '0 5px',
                                }}
                                autoTranslate={false}
                            >
                                {products.map((item, index) => {
                                    console.log();

                                    if (item.hasOwnProperty('attributes') && item.attributes.brand.data.attributes.brandName === brand.attributes.brandName)
                                        return (
                                            <ProductCardDetailed
                                                item={item}
                                                key={index}
                                                brand={brand.attributes.brandName}
                                            />
                                        );
                                    return;
                                })}
                            </SlideScrollable>
                        </div>
                    );
                }
                return;
            })} */}
            {brands.map((brand, index) => {
                let productByBrand = [
                    ...products.filter(
                        (product) => product.attributes.brand.data.attributes.brandName === brand.attributes.brandName,
                    ),
                ];
                return (
                    productByBrand.length > 0 && (
                        <div key={index} className="flex flex-col gap-3 mt-5">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-[30px]">{brand.attributes.brandName}</h1>
                                <Link
                                    className="decoration-none color-[#444] rounded-xl border-gray-200 bg-gray-200 p-3 font-bold text-[13px]"
                                    to={`/${brand.attributes.brandName}`}
                                >
                                    Xem tất cả
                                </Link>
                            </div>
                            <SlideScrollable
                                slideShowItemLength={Math.round(products.length / 2 - 5)}
                                translatePercent={20}
                                scrollable={true}
                                settingSlideLayout={{
                                    maxHeight: 926,
                                    display: 'flex',
                                    flexFlow: 'column wrap',
                                    gap: 10,
                                    padding: '0 5px',
                                }}
                                autoTranslate={true}
                            >
                                {productByBrand.map((item, index) => {
                                    return <ProductCardDetailed item={item} key={index} />;
                                })}
                            </SlideScrollable>
                        </div>
                    )
                );
            })}
        </div>
    );
}

export default HomePage;
