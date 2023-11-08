import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './Section.module.scss';
// import producers from '../../constants/producer';

function Section(props) {
    const children = props.children;
    const producers = props.data;
    let title = '';
    switch (props.type) {
        case 'phones':
            title = 'ĐIỆN THOẠI NỔI BẬT NHẤT';
            break;
        case 'laptops':
            title = 'LAPTOP';
            break;
        case 'PCs':
            title = 'MÀN HÌNH, MÁY TÍNH ĐỂ BÀN';
            break;
        case 'ipads':
            title = 'MÁY TÍNH BẢNG';
            break;
        case 'audio':
            title = 'ÂM THANH';
            break;
        case 'smartWatchs':
            title = 'ĐỒNG HỒ THÔNG MINH';
            break;
        case 'housewares':
            title = 'ĐỒ GIA DỤNG';
            break;
        case 'tivi':
            title = 'TIVI';
            break;
        default:
            break;
    }
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <h2>{title}</h2>
                <div className={clsx(styles.producers)}>
                    {producers.map((item, index) => {
                        return (
                            <Link key={index} to="/" className={clsx(styles.producer)}>
                                {item}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className={clsx(styles.container)}>
                {children}
            </div>
        </div>
    );
}

export default Section;
