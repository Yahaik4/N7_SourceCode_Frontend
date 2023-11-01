import clsx from 'clsx';

import images from '../../assets/img';
import styles from './Banner.module.scss';

function Banner() {
    return (
        <div className={clsx(styles.wrapper)}>
            {images.banners.map((banner, index) => {
                return <img key={index} src={banner} className={clsx(styles.banner)} alt="" />;
            })}
        </div>
    );
}

export default Banner;
