import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useRef, useState } from 'react';

// icon
import { FaFilter, FaTruckFast, FaMoneyBill } from 'react-icons/fa6';
import { FaSortAmountDown, FaSortAmountDownAlt, FaPercent, FaEye } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

import styles from './Products.module.scss';
// dummy data
import images from '../../assets/img';
import productItems from '../../constants/productItems';
import filter from '../../constants/filter';

// component
import Slide from '../../components/Slide';
import DropDownBtn from './DropDownBtn';
import Button from './Button';
import ListProduct from '../../components/ListProducts';

function Products() {
    let { products, brand } = useParams();
    const productFilter = { 'Bộ lọc': [], 'Sẵn hàng': [], Giá: [], ...filter[products] };

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSortBtn, setActiveSortBtn] = useState(null);
    const [filteringList, setFilteringList] = useState({ 'Bỏ chọn tất cả': [] });
    const wrapperRef = useRef();

    const handleSelectedFilter = (data) => {
        setActiveDropdown(data);
    };

    const handleSelecteFilterItem = (data) => {
        if (!(Object.keys(data) in filteringList)) {
            setFilteringList({ ...data, ...filteringList });
        } else {
            setFilteringList({ ...filteringList, ...data });
        }
    };

    const handleRemoveItemFilteringList = (data) => {
        if (data.localeCompare('Bỏ chọn tất cả') === 0) {
            setFilteringList({ 'Bỏ chọn tất cả': [] });
        } else {
            delete filteringList[data];
            setFilteringList({ ...filteringList });
        }
    };

    const handleSelecteSortBtn = (data) => {
        setActiveSortBtn(data);
    };

    return (
        <div className={clsx(styles.wrapper)} onClick={() => setActiveDropdown(wrapperRef)} ref={wrapperRef}>
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
            <div className={clsx(styles.filter)}>
                <h4 className={clsx(styles.title)}>Chọn theo tiêu chí</h4>
                <div className={clsx(styles.btnList)}>
                    {Object.keys(productFilter).map((key, index) => {
                        let IconComponent;
                        switch (key) {
                            case 'Bộ lọc':
                                IconComponent = FaFilter;
                                break;
                            case 'Sẵn hàng':
                                IconComponent = FaTruckFast;
                                break;
                            case 'Giá':
                                IconComponent = FaMoneyBill;
                                break;
                            default:
                                break;
                        }
                        return (
                            <DropDownBtn
                                key={index}
                                IconComponent={IconComponent}
                                title={key}
                                active={activeDropdown}
                                menuData={productFilter[key]}
                                onSelectedFilter={handleSelectedFilter}
                                onSelectedFilterItem={handleSelecteFilterItem}
                            />
                        );
                    })}
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
                    <Button
                        IconComponent={FaSortAmountDown}
                        title={'Giá Cao - Thấp'}
                        active={activeSortBtn}
                        handleSelectedSortBtn={handleSelecteSortBtn}
                        type="sortList"
                    />
                    <Button
                        IconComponent={FaSortAmountDownAlt}
                        title={'Giá Thấp - Cao'}
                        active={activeSortBtn}
                        handleSelectedSortBtn={handleSelecteSortBtn}
                        type="sortList"
                    />
                    <Button
                        IconComponent={FaPercent}
                        title={'Khuyến mãi Hot'}
                        active={activeSortBtn}
                        handleSelectedSortBtn={handleSelecteSortBtn}
                        type="sortList"
                    />
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
            <div className={clsx(styles.products)}>
                <ListProduct data={productItems} />
            </div>
        </div>
    );
}

export default Products;
