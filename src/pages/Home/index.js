import clsx from 'clsx';

import styles from './Home.module.scss';

// Constant data
import productItems from '../../constants/productItems';
import producers from '../../constants/producer';

// Component
import Catalog from '../../components/Catalog';
import Slider from '../../components/Slider';
import Banner from './Banner';
import ListProduct from '../../components/ListProducts';
import Section from './Section';
import Slide from '../../components/Slide';
import Draggable from '../../components/DraggableSlide';

function HomePage() {
    return (
        <div className={clsx(styles.wrapper)}>
            <section className={clsx(styles.topHome)}>
                <div className={clsx(styles.mainMenu)}>
                    <Catalog />
                </div>
                <div className={clsx(styles.slider)}>
                    <Slider />
                </div>
                <div className={clsx(styles.banner)}>
                    <Banner />
                </div>
            </section>
            <section className={clsx(styles.listPhones)}>
                <Section type={'phones'} data={producers.phones}>
                    <Draggable>
                        <Slide slideShowItemLength={productItems.length / 2 - 5} translatePercent={20}>
                            <ListProduct isSlideShow={true} data={productItems} />
                        </Slide>
                    </Draggable>
                </Section>
            </section>
            <section className={clsx(styles.listLaptops)}>List Laptop Products</section>
            <section className={clsx(styles.listPCs)}>List Screen&PC Products</section>
            <section className={clsx(styles.listIpads)}>List Ipad Products</section>
            <section className={clsx(styles.listAudios)}>List Audio Products</section>
            <section className={clsx(styles.listSmartWatches)}>List SmartWatch Products</section>
            <section className={clsx(styles.listHousewares)}>List Houseware Products</section>
            <section className={clsx(styles.listAccessories)}>List Accessories Products</section>
            <section className={clsx(styles.listPCComponents)}>List PC Components Products</section>
            <section className={clsx(styles.listSecondhands)}>List Secondhand Products</section>
        </div>
    );
}

export default HomePage;
