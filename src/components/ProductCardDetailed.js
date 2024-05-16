import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState, forwardRef } from 'react';

// icon
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from './ProductCardDetailed.module.scss';
import { formatCash } from '../utils/helpers';

const ProductCardDetailed = forwardRef((props, ref) => {
    const { item = null, brand } = props;
    const [isHoverWishListBtn, setIsHoverWishListBtn] = useState(false);
    const attributes = item.hasOwnProperty('attributes') ? item.attributes : null;
    let isSaleOff = false;

    if (parseInt(attributes.sellPrice) < parseInt(attributes.originalPrice)) {
        isSaleOff = true;
    }

    return (
        item.hasOwnProperty('attributes') &&
        item && (
            <Link to={`/${brand}/${item.id}`} className={clsx(styles.productItem)} ref={ref}>
                <div className={clsx(styles.percentOffRibbon, { [styles.active]: isSaleOff })}>
                    <p className={clsx(styles.percentOffDetail)}>
                        Giảm{' '}
                        {100 - (parseInt(attributes.sellPrice) / parseInt(attributes.originalPrice)).toFixed(2) * 100} %
                    </p>
                </div>
                <div className={clsx(styles.productImg)}>
                    <img
                        src={`http://localhost:1337${
                            attributes.image
                                ? attributes.image.data
                                    ? attributes.image.data.attributes.url
                                    : null
                                : null
                        }`}
                        alt={attributes.productName}
                    />
                </div>
                <div className={clsx(styles.productDetails)}>
                    <h3 className={clsx(styles.productName)}>{attributes.productName}</h3>

                    <div className={clsx(styles.productPrices)}>
                        <div className={clsx(styles.activePrice)}>
                            {formatCash(attributes.sellPrice)}
                            <span className={clsx(styles.oldPrice, { [styles.active]: true })}>
                                {formatCash(attributes.originalPrice)}
                            </span>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.productPeferential, {
                            [styles.active]: true,
                        })}
                    >
                        Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng
                    </div>

                    <div className={clsx(styles.productRate)}>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </div>
                </div>
                <div
                    className={clsx(styles.wishListBtn)}
                    onMouseEnter={() => setIsHoverWishListBtn(true)}
                    onMouseLeave={() => setIsHoverWishListBtn(false)}
                >
                    Yêu thích
                    {isHoverWishListBtn ? (
                        <AiFillHeart className={clsx(styles.wishListIcon)} />
                    ) : (
                        <AiOutlineHeart className={clsx(styles.wishListIcon)} />
                    )}
                </div>
            </Link>
        )
    );
});

export default ProductCardDetailed;
