import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

// ultilities & styles
import { formatCash } from '../../utils/helpers';
import { STATE_SUCCESS, STATE_WARNING } from '../../constants';
import styles from './ProductDetails.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa6';

// components
import Modal from './Modal';
import AlertMsg from '../../components/AlertMsg';

function ProductDetailsPage() {
    const location = useLocation();

    const [product, setProduct] = useState({});
    const [selectPrice, setSelectPrice] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [addAlertMsg, setAddAlertMsg] = useState();

    const handleOnClickPrice = () => {
        setSelectPrice(!selectPrice);
    };
    const handleShowModal = (data) => {
        if (data) {
            setShowModal(data);
        } else {
            setShowModal(!showModal);
        }
    };
    const handleOnAddToCart = () => {
        const auth = localStorage.getItem('auth');
        const cart = localStorage.getItem('cart');
        if (!auth) {
            setAddAlertMsg({ type: STATE_WARNING, msg: 'Vui lòng đăng nhập để để thêm sản phẩm' });
            return;
        }
        if (cart && cart.split(',').filter((item) => item == product.id).length === 0) {
            localStorage.setItem('cart', [...cart.split(','), product.id]);
            setAddAlertMsg({ type: STATE_SUCCESS, msg: 'Thêm vào giỏ hàng thành công' });
            return;
        }

        localStorage.setItem('cart', [product.id]);
    };
    useEffect(() => {
        const fetchData = async () => {
            const id = location.pathname.split('/').pop();
            const options = {
                url: `http://localhost:1337/api/products/${id}?populate[image][fields][0]=url&populate[brand][fields][0]=brandName`,
                method: 'GET',
            };
            try {
                const response = await axios.request(options);
                const result = response.data;
                setProduct({ ...result.data });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [location.pathname]);
    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.title)}>
                    <h1 className={'font-bold text-[30px]'}>
                        {product.attributes ? product.attributes.productName : null}
                    </h1>
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
                        <img
                            src={`http://localhost:1337${
                                product.attributes ? product.attributes.image.data.attributes.url : null
                            }`}
                            alt={product.attributes ? product.attributes.productName : null}
                            width={400}
                        />
                    </div>
                    <div className={clsx(styles.rigthBoxDetail)}>
                        <div className={clsx(styles.prices)}>
                            <div
                                style={{ flexDirection: 'column' }}
                                className={clsx(styles.priceItem, { [styles.active]: selectPrice })}
                                onClick={handleOnClickPrice}
                            >
                                <p className={styles.newPrice}>
                                    {formatCash(parseInt(product.attributes ? product.attributes.sellPrice : 0))}
                                </p>
                                <p className={styles.oldPrice}>
                                    {formatCash(parseInt(product.attributes ? product.attributes.originalPrice : 0))}
                                </p>
                            </div>
                        </div>

                        <div className={clsx(styles.groupBtns)}>
                            <div className={clsx(styles.group)}>
                                <div className={clsx(styles.btn)}>
                                    <p>Mua ngay</p>
                                    <p>(Giao nhanh tử 2 giờ hoặc nhận tại cửa hàng)</p>
                                </div>
                                <div className={clsx(styles.btn, 'text-center')} onClick={handleOnAddToCart}>
                                    <FaCartPlus />
                                    <p>Thêm vào giỏ hàng</p>
                                </div>
                            </div>
                            <div className={clsx(styles.group)}>
                                <div className={clsx(styles.btn)} onClick={handleShowModal}>
                                    <p>Xem cấu hình chi tiết</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? (
                <Modal handleShowModal={handleShowModal} modalTitle={'Thông số kỹ thuật'}>
                    <div className={clsx(styles.content)}>
                        <table className={clsx(styles.description)}>
                            <tbody>
                                {Object.entries(product.attributes).map(([key, value], index) => {
                                    return key !== 'image' &&
                                        key !== 'brand' &&
                                        key !== 'quantity' &&
                                        key !== 'createdAt' &&
                                        key !== 'updatedAt' &&
                                        key !== 'publishedAt' &&
                                        key !== 'description' &&
                                        key !== 'isHot' ? (
                                        <tr key={index}>
                                            <td>{key}</td>
                                            <td>
                                                <p>{value}</p>
                                            </td>
                                        </tr>
                                    ) : null;
                                })}
                            </tbody>
                        </table>
                    </div>
                </Modal>
            ) : null}
            {addAlertMsg && <AlertMsg message={addAlertMsg} />}
        </>
    );
}

export default ProductDetailsPage;
