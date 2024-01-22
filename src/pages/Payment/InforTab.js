import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './InforTab.module.scss';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { formatCash } from '../../utils';

import Input from '../../components/Form/Input';
import DeliveryOptiosForm from './DeliveryOptionsForm';

function InforTab(props) {
    const { fetchedDummyData, customerInfor, onCustomerInforChange, onDeliveriOptionsFormChange } = props;

    const [showAllItem, setShowAllItem] = useState(false);
    const numbItemDisplay = showAllItem ? fetchedDummyData.length : 1;
    const [deliveriOption, setDeliveriOption] = useState('pickup');
    const [showCompanyInforForm, setShowCompanyInforForm] = useState(false);
    const [showReceiverForm, setShowReceiverForm] = useState(false);

    useEffect(() => {
        setShowCompanyInforForm(customerInfor.VAT);
    }, [customerInfor.VAT]);

    useEffect(() => {
        setShowReceiverForm(customerInfor.receiver);
    }, [customerInfor.receiver]);

    return (
        <>
            <div className={clsx(styles.blockWrapper)}>
                <div className={clsx(styles.listProducts)}>
                    {fetchedDummyData.slice(0, numbItemDisplay).map((item, index) => {
                        return (
                            <div className={clsx(styles.productItem)} key={index}>
                                <img src={item.img} alt={item.name} />
                                <div className={clsx(styles.info)}>
                                    <div>{item.name}</div>
                                    <div>
                                        <div>
                                            <span className={clsx(styles.newPrice)}>{formatCash(item.newPrice)}</span>
                                            {item.oldPrice !== 0 ? (
                                                <span className={clsx(styles.oldPrice)}>
                                                    {formatCash(item.oldPrice)}
                                                </span>
                                            ) : null}
                                        </div>
                                        <div>
                                            Số lượng:
                                            <span className={clsx(styles.newPrice)}>{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.buttonDropdown)} onClick={() => setShowAllItem(!showAllItem)}>
                    {showAllItem ? 'Thu gọn' : 'và ' + (fetchedDummyData.length - 1) + ' sản phẩm khác'}
                    {showAllItem ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
            </div>
            <h1 className={clsx(styles.title)}>THÔNG TIN KHÁCH HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <form className={clsx(styles.form)}>
                    <div className={clsx(styles.formGroup)}>
                        <Input
                            type={'text'}
                            id={'name'}
                            value={customerInfor.name}
                            label={'Họ và tên'}
                            placeHolder={'Họ và tên (Bắt buộc)'}
                            onChange={onCustomerInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'phoneNumber'}
                            value={customerInfor.phoneNumber}
                            label={'Số điện thoại'}
                            placeHolder={'Số điện thoại (Bắt buộc)'}
                            onChange={onCustomerInforChange}
                        />
                    </div>
                    <Input
                        type={'text'}
                        id={'email'}
                        value={customerInfor.email}
                        label={'email'}
                        annote={'(*) Hóa đơn VAT sẽ được gửi qua email này'}
                        placeHolder={'email'}
                        alertMsg={'không để trống mail'}
                        onChange={onCustomerInforChange}
                    />
                    <Input
                        type={'checkbox'}
                        id={'notification'}
                        value={customerInfor.notification}
                        label={'Nhận email thông báo và ưu đãi từ CellphoneS'}
                        onChange={onCustomerInforChange}
                    />
                </form>
            </div>
            <h1 className={clsx(styles.title)}>THÔNG TIN NHẬN HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <div className={clsx(styles.deliveriTabs)}>
                    <div className={clsx(styles.deliveriTab, { [styles.active]: deliveriOption === 'pickup' })}>
                        <input
                            id="pickup"
                            type="radio"
                            name="deliveriOption"
                            value={'pickup'}
                            checked={deliveriOption === 'pickup'}
                            onChange={(event) => setDeliveriOption(event.target.value)}
                        />
                        <label htmlFor="pickup">Nhận tại cửa hàng</label>
                    </div>
                    <div className={clsx(styles.deliveriTab, { [styles.active]: deliveriOption === 'delivery' })}>
                        <input
                            id="delivery"
                            type="radio"
                            name="deliveriOption"
                            value={'delivery'}
                            checked={deliveriOption === 'delivery'}
                            onChange={(event) => setDeliveriOption(event.target.value)}
                        />
                        <label htmlFor="delivery">Giao hàng tận nơi</label>
                    </div>
                </div>
                {deliveriOption === 'pickup' ? (
                    <DeliveryOptiosForm type={deliveriOption} onChange={onDeliveriOptionsFormChange} />
                ) : null}
                {deliveriOption === 'delivery' ? (
                    <DeliveryOptiosForm type={deliveriOption} onChange={onDeliveriOptionsFormChange} />
                ) : null}
            </div>
            <Input
                type={'checkbox'}
                id={'VAT'}
                value={customerInfor.VAT}
                label={'Yêu cầu xuất hoá đơn công ty '}
                onChange={onCustomerInforChange}
            />
            {showCompanyInforForm && (
                <div className={clsx(styles.blockWrapper)}>
                    <form className={clsx(styles.form)}>
                        <Input
                            type={'text'}
                            id={'companyInforName'}
                            value={customerInfor.companyInfor.name}
                            label={'Tên công ty'}
                            placeHolder={'Tên công ty'}
                            onChange={onCustomerInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'companyInforAddress'}
                            value={customerInfor.companyInfor.address}
                            label={'Địa chỉ công ty'}
                            placeHolder={'Địa chỉ công ty'}
                            onChange={onCustomerInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'companyInforTaxCode'}
                            value={customerInfor.companyInfor.taxCode}
                            label={'Mã số thuế'}
                            placeHolder={'Mã số thuế'}
                            onChange={onCustomerInforChange}
                        />
                    </form>
                </div>
            )}
            <Input
                type={'checkbox'}
                id={'receiver'}
                value={customerInfor.receiver}
                label={'Nhờ người khác nhận hàng'}
                onChange={onCustomerInforChange}
            />
            {showReceiverForm && (
                <div className={clsx(styles.blockWrapper)}>
                    <form className={clsx(styles.form)}>
                        <Input
                            type={'text'}
                            id={'receiverInforName'}
                            value={customerInfor.receiverInfor.name}
                            label={'Họ và tên'}
                            placeHolder={'Họ và tên (Bắt buộc)'}
                            onChange={onCustomerInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'receiverInforPhoneNumber'}
                            value={customerInfor.receiverInfor.phoneNumber}
                            label={'Số điện thoại'}
                            placeHolder={'Số điện thoại (Bắt buộc)'}
                            onChange={onCustomerInforChange}
                        />
                    </form>
                </div>
            )}
        </>
    );
}

export default InforTab;
