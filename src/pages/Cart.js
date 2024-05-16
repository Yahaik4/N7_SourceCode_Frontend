import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Cart.module.scss';
import { formatCash } from './../utils/helpers';
import { IoArrowBack, IoTrashOutline } from 'react-icons/io5';
import images from '../assets/img';

// dummy data
import axios from 'axios';

function CartPage(props) {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    const handleRemoveItem = (id) => {
        setProducts(products.filter((product) => product.id != id));
        const cart = localStorage.getItem('cart');
        localStorage.setItem('cart', [...cart.split(',').filter((item) => item != id)]);
    };

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        const cart = localStorage.getItem('cart');
        if (!auth) {
            navigate('/login');
        }
        const getProductInCart = async () => {
            let url =
                'http://localhost:1337/api/products?populate[image][fields][0]=url&populate[brand][fields][0]=brandName&';
            if (cart) {
                cart.split(',').map((item, index) => (url += `filters[id][$in][${index}]=${item}&`));
                url = url.substring(0, url.length - 1);
                const options = {
                    url: url,
                    method: 'GET',
                };
                await axios
                    .request(options)
                    .then((response) => response.data)
                    .then((result) => setProducts(result.data))
                    .catch((err) => console.log(err));
            }
        };
        getProductInCart();
    }, []);
    useEffect(() => {
        let totalPrice = 0;
        if (products.length > 0) {
            products.map((product) => (totalPrice += parseInt(product.attributes.sellPrice)));
            setTotalPrice(totalPrice);
        }
    }, [products]);
    console.log(products);
    return products.length > 0 ? (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Link to="/">
                        <IoArrowBack className={clsx(styles.icon)} />
                    </Link>
                    <p className={clsx(styles.title)}>Giỏ hàng của bạn</p>
                </div>

                <div className={clsx(styles.listProducts)}>
                    {products.map((item, index) => {
                        return (
                            <div className={clsx(styles.productItem)} key={index}>
                                <div className={clsx(styles.checkBoxGroup)}>
                                    <label htmlFor={item.id}>
                                        <img
                                            src={`http://localhost:1337${
                                                item.attributes ? item.attributes.image.data.attributes.url : null
                                            }`}
                                            alt={item.attributes ? item.attributes.productName : null}
                                        />
                                    </label>
                                </div>
                                <div className={clsx(styles.info)}>
                                    <div>
                                        <Link
                                            className={clsx(styles.name)}
                                            to={`/${
                                                item.attributes ? item.attributes.brand.data.attributes.brandName : null
                                            }/${item.id}`}
                                        >
                                            {item.attributes ? item.attributes.productName : null}
                                        </Link>
                                        <IoTrashOutline
                                            className={clsx(styles.icon)}
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <span className={clsx(styles.newPrice)}>
                                                {formatCash(
                                                    item.attributes ? parseInt(item.attributes.sellPrice) : null,
                                                )}
                                            </span>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.totalPayment)}>
                    <div className={clsx(styles.priceTemp)}>
                        Tạm tính: <p className={clsx(styles.totalPrice)}>{formatCash(totalPrice)}</p>
                    </div>
                    <Link to="/payment" className={clsx(styles.button, { [styles.disable]: false })}>
                        Mua Ngay
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Link to="/">
                        <IoArrowBack className={clsx(styles.icon)} />
                    </Link>
                    <p className={clsx(styles.title)}>Giỏ hàng của bạn</p>
                </div>
                <div className={clsx(styles.cartEmpty)}>
                    <img src={images.cartEmpty} alt="CartEmpty" width={262} height={197} />
                    <span>
                        Giỏ hàng của bạn đang trống.
                        <br /> Hãy chọn thêm sản phẩm để mua sắm nhé
                    </span>
                </div>
                <div className={clsx(styles.totalPayment)}>
                    <Link to="/" className={clsx(styles.buttonEmpty)}>
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
