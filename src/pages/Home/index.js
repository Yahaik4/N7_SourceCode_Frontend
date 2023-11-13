import clsx from 'clsx';

import styles from './Home.module.scss';

// Constant data
import productItems from '../../constants/productItems';
import producers from '../../constants/producer';
import categories from '../../constants/categories';
import images from '../../assets/img';

// Component
import Catalog from '../../components/Catalog';
import BannerSlide from './BannerSlide';
import ListProduct from '../../components/ListProducts';
import Section from './Section';
import Slide from '../../components/Slide';
import Categories from './Categories';

function HomePage() {
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
                    {images.banners.map((banner, index) => {
                        return <img key={index} src={banner} className={clsx(styles.banner)} alt="" />;
                    })}
                </div>
            </section>
            {Object.keys(producers).map((key, index) => {
                return (
                    <Section key={index} type={key} data={producers[key]}>
                        <Slide
                            slideShowItemLength={productItems.length / 2 - 5}
                            translatePercent={20}
                            showHandleSlideBtn={true}
                        >
                            <ListProduct data={productItems} />
                        </Slide>
                    </Section>
                );
            })}

            {
                Object.keys(categories).map((key, index) => {
                    return (
                        <Section key={index} type={key} data={[]}>
                            <Categories data={categories[key]} type={key}/>
                        </Section>
                    )
                })
            }


        </div>
    );
}

export default HomePage;
