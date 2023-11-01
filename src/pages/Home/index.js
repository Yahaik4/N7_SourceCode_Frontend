import clsx from 'clsx';

import styles from './Home.module.scss';
import Catalog from '../../components/Catalog';
import Slider from '../../components/Slider';
import Banner from './Banner';

function HomePage() {
    return (
        <div className="wrappper">
            <section className={clsx(styles.topHome)}>
                <div className={clsx(styles.mainMenu)}>
                    <Catalog />
                </div>
                <div className={clsx(styles.slider)}>
                    <Slider />
                </div>
                <div className={clsx(styles.banner)}>
                    <Banner/>
                </div>
            </section>
            <section className={clsx(styles.listPhones)}>List Phone Products</section>
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
