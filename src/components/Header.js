import clsx from 'clsx';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';

// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { SlBag, SlLocationPin } from 'react-icons/sl';
import { HiOutlineUserCircle, HiOutlinePhone, HiOutlineTruck } from 'react-icons/hi2';
import { LuMenuSquare } from 'react-icons/lu';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { FaHouse } from 'react-icons/fa6';

// file
import styles from './Header.module.scss';
import images from '../assets/img';
import Catalog from './Catalog';

function Header() {
    let { products, brand } = useParams();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const [showCatalogModal, setShowCatalogModal] = useState(false);

    const handleShowCatalog = () => {
        setShowCatalogModal(!showCatalogModal);
    };

    return (
        <>
            <header className={clsx(styles.wrapper)}>
                <nav className={clsx(styles.content)}>
                    <Link to="/">
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <div
                        className={clsx(styles.menuButton, styles.btn)}
                        onClick={handleShowCatalog}
                    >
                        <LuMenuSquare className={clsx(styles.icon)} /> Danh mục
                    </div>
                    <div className={clsx(styles.localStoreButton, styles.btn)}>
                        <SlLocationPin className={clsx(styles.icon)} />
                        <div className={clsx(styles.localStoreContent)}>
                            <div className={clsx(styles.localStoreTitle)}>
                                <p>Xem giá tại</p>
                                <IoIosArrowDown />
                            </div>
                            <p>Hồ chí minh</p>
                        </div>
                    </div>
                    <form>
                        <div className={clsx(styles.searchBar)}>
                            <button type="submit">
                                <BiSearchAlt2 className={clsx(styles.icon)} />
                            </button>
                            <input className={clsx(styles.inputGroupBtn)} placeholder="Bạn cần tìm gì?"></input>
                        </div>
                    </form>
                    <Link to="/">
                        <div className={clsx(styles.contactButton)}>
                            <HiOutlinePhone className={clsx(styles.icon)} />
                            <p>
                                Gọi mua Hàng
                                <br />
                                1800.2097
                            </p>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={clsx(styles.localStoreButton)}>
                            <SlLocationPin className={clsx(styles.icon)} />
                            <div className={clsx(styles.localStoreContent)}>
                                Cửa hàng <br /> gần bạn
                            </div>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={clsx(styles.cartButton)}>
                            <HiOutlineTruck className={clsx(styles.icon)} />
                            Tra cứu <br /> đơn hàng
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className={clsx(styles.cartButton)}>
                            <SlBag className={clsx(styles.icon)} />
                            Giỏ <br /> Hàng
                        </div>
                    </Link>
                    <Link to="/login">
                        <div className={clsx(styles.loginButton, styles.btn)}>
                            <HiOutlineUserCircle className={clsx(styles.icon)} />
                            Đăng nhập
                        </div>
                    </Link>
                </nav>
            </header>
            {products || brand ? (
                <div className={clsx(styles.breadcrumb)}>
                    <div className={clsx(styles.content)}>
                        <FaHouse className={clsx(styles.icon)} />
                        <div className={clsx(styles.location)}>
                            <Link to="/">
                                <span>Trang chủ</span>
                            </Link>
                            <IoIosArrowForward />
                        </div>
                        {pathnames.map((item, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;
                            let title = '';
                            switch (item) {
                                case 'phones':
                                    title = 'ĐIỆN THOẠI';
                                    break;
                                case 'laptops':
                                    title = 'LAPTOP';
                                    break;
                                case 'PCs':
                                    title = 'MÀN HÌNH';
                                    break;
                                case 'tablets':
                                    title = 'MÁY TÍNH BẢNG';
                                    break;
                                case 'audio':
                                    title = 'ÂM THANH';
                                    break;
                                case 'smartWatchs':
                                    title = 'ĐỒNG HỒ THÔNG MINH';
                                    break;
                                case 'accessories':
                                    title = 'PHỤ KIỆN';
                                    break;
                                case 'pcComponents':
                                    title = 'LINH KIỆN MÁY TÍNH';
                                    break;
                                case 'secondHands':
                                    title = 'HÀNG CŨ';
                                    break;
                                default:
                                    title = item;
                                    break;
                            }
                            return isLast ? (
                                <div key={index} className={clsx(styles.location)}>
                                    <Link to="">
                                        <span>{title}</span>
                                    </Link>
                                    <IoIosArrowForward />
                                </div>
                            ) : (
                                <div key={index} className={clsx(styles.location)}>
                                    <Link to={routeTo}>
                                        <span>{title}</span>
                                    </Link>
                                    <IoIosArrowForward />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}

            {showCatalogModal ? (
                <div className={clsx(styles.catalogDropDownModal)} onClick={handleShowCatalog}>
                    <Catalog isDropDown={showCatalogModal}/>
                </div>
            ) : null}
        </>
    );
}

export default Header;
