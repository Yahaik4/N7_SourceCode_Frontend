import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Payment.module.scss';
import { IoArrowBack } from 'react-icons/io5';
import { formatCash } from '../../utils/helpers';

import InforTab from './InforTab';
import PaymentTab from './PaymentTab';
// import AlertMsg from '../../components/AlertMsg';

function Payment(props) {
    const [switchTab, setSwitchTab] = useState(true);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentInfor, setPaymentInfor] = useState({
        name: localStorage.getItem('username') || '',
        phoneNumber: localStorage.getItem('userphone') || '',
        email: localStorage.getItem('useremail') || '',
        deliveryAddress: '',
        deliveryType: 'pickup',
        state: 'pending',
    });

    const handleOnFormChange = (data) => {
        setPaymentInfor({ ...paymentInfor, ...data });
    };

    const handleOnSwitchTab = () => {
        setSwitchTab(false);
    };

    const handleOnClickBtnNext = () => {
        const postInvoice = async () => {
            const options = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('auth'),
                },
                url: 'http://localhost:1337/api/invoices',
                method: 'POST',
                data: {
                    data: {
                        customer: localStorage.getItem('customerId'),
                        // staff: 1,
                        product_names: [...products.map((item) => item.id)],
                        deliveryAddress: paymentInfor.deliveryAddress,
                        state: 'pending',
                        totalPrice: totalPrice,
                        quantity: products.length,
                    },
                },
            };
            await axios
                .request(options)
                .then((response) => response.data)
                .then((result) => {
                    localStorage.removeItem('cart');
                    alert('Đặt hàng thành công')
                    navigate('/');
                })
                .catch((err) => console.log(err));
        };

        if (switchTab) {
            setSwitchTab(!switchTab);
            return;
        }
        postInvoice();
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
    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.header)}>
                        <Link to="/cart">
                            <IoArrowBack className={clsx(styles.icon)} />
                        </Link>
                        <p className={clsx(styles.title)}>{switchTab ? 'THÔNG TIN' : 'ĐẶT HÀNG'}</p>
                    </div>
                    <div className={clsx(styles.tabs)}>
                        <div
                            className={clsx(styles.tab, { [styles.active]: switchTab })}
                            onClick={() => setSwitchTab(!switchTab)}
                        >
                            1. Thông tin
                        </div>
                        <div className={clsx(styles.tab, { [styles.active]: !switchTab })} onClick={handleOnSwitchTab}>
                            2. Đặt hàng
                        </div>
                    </div>
                    <div className={clsx(styles.blockWrapper)}>
                        <div className={clsx(styles.listProducts)}>
                            {products.map((item, index) => {
                                return (
                                    <div className={clsx(styles.productItem)} key={index}>
                                        <div className={clsx(styles.checkBoxGroup)}>
                                            <label htmlFor={item.id}>
                                                <img
                                                    src={`http://localhost:1337${
                                                        item.attributes
                                                            ? item.attributes.image.data.attributes.url
                                                            : null
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
                                                        item.attributes
                                                            ? item.attributes.brand.data.attributes.brandName
                                                            : null
                                                    }/${item.id}`}
                                                >
                                                    {item.attributes ? item.attributes.productName : null}
                                                </Link>
                                            </div>
                                            <div>
                                                <div>
                                                    <span className={clsx(styles.newPrice)}>
                                                        {formatCash(
                                                            item.attributes
                                                                ? parseInt(item.attributes.sellPrice)
                                                                : null,
                                                        )}
                                                    </span>{' '}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {switchTab ? (
                        <InforTab
                            fetchedDummyData={products}
                            paymentInfor={paymentInfor}
                            onPaymentInforChange={handleOnFormChange}
                        />
                    ) : (
                        <PaymentTab
                            paymentInfor={paymentInfor}
                            checkoutProductList={products}
                            totalPrice={totalPrice}
                        />
                    )}

                    <div className={clsx(styles.totalPayment)}>
                        <div className={clsx(styles.priceTemp)}>
                            <p>Tổng tiền tạm tính:</p>
                            <p className={clsx(styles.totalPrice)}>{formatCash(totalPrice)}</p>
                        </div>
                        <div className={clsx(styles.button)} onClick={handleOnClickBtnNext}>
                            {switchTab ? 'Tiếp tục' : 'Đặt Hàng'}
                        </div>
                    </div>
                </div>
            </div>
            {/* <AlertMsg message={addAlertMsg} /> */}
        </>
    );
}

export default Payment;
