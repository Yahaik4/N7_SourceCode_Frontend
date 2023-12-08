import { useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { AiFillStar } from 'react-icons/ai';
import { MdCurrencyExchange } from 'react-icons/md';
import { FaGift } from "react-icons/fa6";

import { formatCash } from '../../utils';
import styles from './ProductDetails.module.scss';

import productItems from '../../constants/productItems';
import ProductImagesSlide from './ProductImagesSlide';
import { useState } from 'react';

function ProductDetailsPage() {
    // const { products, brand, productDetails } = useParams();
    const location = useLocation();

    const product = productItems.filter((item) => {
        return item.href.localeCompare(location.pathname) === 0;
    })[0];

    var indents = [];
    for (let index = 0; index < 15; index++) {
        indents.push(product.img);
    }

    const [selectPrice, setSelectPrice] = useState(true);
    const handleOnClickPrice = () => {
        setSelectPrice(!selectPrice);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <h1 className={clsx(styles.name)}>{product.name}</h1>
                <div className={clsx(styles.rating)}>
                    <AiFillStar className={clsx(styles.icon)} />
                    <AiFillStar className={clsx(styles.icon)} />
                    <AiFillStar className={clsx(styles.icon)} />
                    <AiFillStar className={clsx(styles.icon)} />
                    <AiFillStar className={clsx(styles.icon)} />5 Đánh giá
                </div>
                <button className={clsx(styles.compareBtn)}> + So sánh</button>
            </div>
            <hr />

            <div className={clsx(styles.container)}>
                <div className={clsx(styles.leftBoxDetails)}>
                    <div className={clsx(styles.productImgSlide)}>
                        <ProductImagesSlide slideImages={indents} thumbnailData={indents} />
                    </div>
                </div>
                <div className={clsx(styles.rigthBoxDetail)}>
                    <div className={clsx(styles.prices)}>
                        <div
                            className={clsx(styles.priceItem, { [styles.active]: !selectPrice })}
                            onClick={handleOnClickPrice}
                        >
                            <MdCurrencyExchange className={styles.icon} />
                            <div className={clsx(styles.child)}>
                                <p className={styles.updatePrice}>{formatCash(product.updatePrice)}</p>
                                <span>Khi thu cũ lên đời</span>
                            </div>
                        </div>
                        <div
                            style={{ flexDirection: 'column' }}
                            className={clsx(styles.priceItem, { [styles.active]: selectPrice })}
                            onClick={handleOnClickPrice}
                        >
                            <p className={styles.newPrice}>{formatCash(product.newPrice)}</p>
                            <p className={styles.oldPrice}>{formatCash(product.oldPrice)}</p>
                        </div>
                    </div>
                    <div className={clsx(styles.peferential)}>
                        <div className={clsx(styles.title)}><FaGift className={clsx(styles.icon)}/>Khuyễn mãi</div>
                        <table className={clsx(styles.details)}>
                            {product.peferential.map((prefer, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={clsx(styles.detailNumb)}>{index}</td>
                                        <td>{prefer}</td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className={clsx(styles.groupBtns)}>Buy now Btn & Add to Cart Btn & specifications Btn</div>
                </div>
            </div>
            <div>specifications Modal</div>
        </div>
    );
}

export default ProductDetailsPage;
