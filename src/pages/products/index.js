import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

// icon
import { FaSortAmountDown, FaSortAmountDownAlt, FaEye } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

import styles from './Products.module.scss';
// dummy data
import images from '../../assets/img';

// component
import ProductCardDetailed from '../../components/ProductCardDetailed';
import Button from './Button';
import axios from 'axios';

function Products() {
    const location = useLocation();

    const [product, setProduct] = useState([]);
    const [activeSortBtn, setActiveSortBtn] = useState(null);
    const [filteringList, setFilteringList] = useState({ 'Bỏ chọn tất cả': [] });
    const wrapperRef = useRef();

    const handleRemoveItemFilteringList = (data) => {
        if (data.localeCompare('Bỏ chọn tất cả') === 0) {
            setFilteringList({ 'Bỏ chọn tất cả': [] });
        } else {
            delete filteringList[data];
            setFilteringList({ ...filteringList });
        }
    };

    const handleSelecteSortBtn = (btnRef) => {
        setActiveSortBtn(btnRef);
    };

    const handleOnSort = async (order) => {
        getProductBySort(order)
    };

    const getProductsByBrand = async () => {
        const brand = location.pathname.split('/').pop() !== 'search' ? location.pathname.split('/').pop() : '';
        const options = {
            url: `http://localhost:1337/api/products?populate[brand][fields][0]=brandName&filters[brand][brandName][$eq]=${brand}&populate[image][fields][0]=url`,
            method: 'GET',
        };
        await axios
            .request(options)
            .then((res) => res.data)
            .then((result) => setProduct(result.data))
            .catch((err) => console.log(err));
    };

    const getProductBySort = async (order) => {
        if (order === 'none') {
            return getProductsByBrand();
        }
        const brand = location.pathname.split('/').pop() !== 'search' ? location.pathname.split('/').pop() : '';
        const options = {
            url: `http://localhost:1337/api/products?populate[brand][fields][0]=brandName&filters[brand][brandName][$eq]=${brand}&populate[image][fields][0]=url&sort[0]=sellPrice:${order}`,
            method: 'GET',
        };
        await axios
            .request(options)
            .then((res) => res.data)
            .then((result) => setProduct(result.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProductsByBrand();
    }, []);

    return (
        <div className={clsx(styles.wrapper)} ref={wrapperRef}>
            <div className={clsx(styles.bannerSlider)}>
                <div className={clsx(styles.banner)}>
                    <Link to="/">
                        <img src={images.banners.productsPageBanner[0]} alt="" />
                    </Link>
                </div>
                <div className={clsx(styles.banner)}>
                    <Link to="/">
                        <img src={images.banners.productsPageBanner[1]} alt="" />
                    </Link>
                </div>
            </div>

            {Object.keys(filteringList).length > 1 ? (
                <div className={clsx(styles.filterSelected)}>
                    <h4 className={clsx(styles.title)}>Đang lọc theo</h4>
                    <div className={clsx(styles.btnList)}>
                        {Object.keys(filteringList).map((key, index) => {
                            let title = key + ': ' + filteringList[key].join(' | ');
                            return (
                                <Button
                                    key={index}
                                    IconComponent={IoCloseCircle}
                                    title={title}
                                    active={true}
                                    handleRemoveItemFilteringList={handleRemoveItemFilteringList}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : null}

            <div className={clsx(styles.sort)}>
                <h4 className={clsx(styles.title)}>Sắp xếp theo</h4>
                <div className={clsx(styles.btnList)}>
                    <div onClick={() => handleOnSort('desc')}>
                        <Button
                            IconComponent={FaSortAmountDown}
                            title={'Giá Cao - Thấp'}
                            active={activeSortBtn}
                            handleSelectedSortBtn={handleSelecteSortBtn}
                            type="sortList"
                        />
                    </div>
                    <div onClick={() => handleOnSort('asc')}>
                        <Button
                            IconComponent={FaSortAmountDownAlt}
                            title={'Giá Thấp - Cao'}
                            active={activeSortBtn}
                            handleSelectedSortBtn={handleSelecteSortBtn}
                            type="sortList"
                        />
                    </div>
                    <div onClick={() => handleOnSort('none')}>
                        <Button
                            IconComponent={FaEye}
                            title={'Xem Nhiều'}
                            active={activeSortBtn}
                            init={true}
                            handleSelectedSortBtn={handleSelecteSortBtn}
                            type="sortList"
                        />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.products)}>
                {product.map((item, index) => {
                    return <ProductCardDetailed item={item} key={index} />;
                })}
            </div>
        </div>
    );
}

export default Products;
