import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import styles from './Cart.module.scss';
import { formatCash } from './../utils';
import { IoArrowBack, IoTrashOutline } from 'react-icons/io5';

import QuantityInput from '../components/QuantityInput';
// dummy data
import productItems from '.././constants/productItems';

function CartPage(props) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const selectAllRef = useRef();

    const handleQuantityOnChange = (quantity) => {
        // console.log(quantity);
    };

    const handleSelectAll = () => {
        if (!selectAll) {
            setSelectedItems([...selectedItems, ...productItems]);
            setSelectAll(true);
        } else {
            setSelectedItems([]);
            setSelectAll(false);
        }
    };
    
    console.log(selectedItems);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Link to="/">
                        <IoArrowBack className={clsx(styles.icon)} />
                    </Link>
                    <p className={clsx(styles.title)}>Giỏ hàng của bạn</p>
                </div>
                <div className={clsx(styles.groupBtn)}>
                    <div className={clsx(styles.selectAll)}>
                        <input
                            type="checkbox"
                            id="selectAll"
                            ref={selectAllRef}
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        <label htmlFor="selectAll">Chọn tất cả</label>
                    </div>
                    <div className={clsx(styles.button)}>Xoá tất cả sản phẩm đã chọn</div>
                </div>
                <div className={clsx(styles.listProducts)}>
                    {productItems.map((item, index) => {
                        return (
                            <div className={clsx(styles.productItem)} key={index}>
                                <div className={clsx(styles.checkBoxGroup)}>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id={index}
                                        // onChange={() => {handleSelectItem(index)}}
                                        // checked={selectAll && selectedItems.length === productItems.length}
                                    />
                                    <label htmlFor={index}>
                                        <img src={item.img} alt={item.name} />
                                    </label>
                                </div>
                                <div className={clsx(styles.info)}>
                                    <div>
                                        <Link className={clsx(styles.name)} to={item.href}>
                                            {item.name}
                                        </Link>
                                        <IoTrashOutline className={clsx(styles.icon)} />
                                    </div>
                                    <div>
                                        <div>
                                            <span className={clsx(styles.newPrice)}>{formatCash(item.newPrice)}</span>{' '}
                                            <span className={clsx(styles.oldPrice)}>{formatCash(item.oldPrice)}</span>
                                        </div>
                                        <QuantityInput onChange={handleQuantityOnChange} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.totalPayment)}>
                    <div className={clsx(styles.priceTemp)}>
                        Tạm tính: <p className={clsx(styles.totalPrice)}>Total Price</p>
                    </div>
                    <div className={clsx(styles.button, { [styles.disable]: true })}>Mua Ngay</div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
