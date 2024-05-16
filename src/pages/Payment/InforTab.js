import clsx from 'clsx';

import styles from './InforTab.module.scss';

import Input from '../../components/Form/Input';
import DeliveryOptiosForm from './DeliveryOptionsForm';

function InforTab(props) {
    const { paymentInfor, onPaymentInforChange } = props;

    return (
        <>
            <h1 className={'font-bold text-[25px]'}>THÔNG TIN KHÁCH HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <form className={clsx(styles.form)}>
                    <div className={clsx(styles.formGroup)}>
                        <Input
                            type={'text'}
                            id={'name'}
                            value={paymentInfor.name}
                            label={'Họ và tên'}
                            placeHolder={'Họ và tên (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                        <Input
                            type={'text'}
                            id={'phoneNumber'}
                            value={paymentInfor.phoneNumber}
                            label={'Số điện thoại'}
                            placeHolder={'Số điện thoại (Bắt buộc)'}
                            onChange={onPaymentInforChange}
                        />
                    </div>
                    <Input
                        type={'text'}
                        id={'email'}
                        value={paymentInfor.email}
                        label={'email'}
                        placeHolder={'email'}
                        onChange={onPaymentInforChange}
                    />
                </form>
            </div>
            <h1 className={'font-bold text-[25px]'}>THÔNG TIN NHẬN HÀNG</h1>
            <div className={clsx(styles.blockWrapper)}>
                <div className={clsx(styles.deliveriTabs)}>
                    <div
                        className={clsx(styles.deliveriTab, {
                            [styles.active]: paymentInfor.deliveryType === 'pickup',
                        })}
                    >
                        <input
                            id="pickup"
                            type="radio"
                            name="deliveryType"
                            value={'pickup'}
                            checked={paymentInfor.deliveryType === 'pickup'}
                            onChange={(event) => onPaymentInforChange({ deliveryType: event.target.value })}
                        />
                        <label htmlFor="pickup">Nhận tại cửa hàng</label>
                    </div>
                    <div
                        className={clsx(styles.deliveriTab, {
                            [styles.active]: paymentInfor.deliveryType === 'delivery',
                        })}
                    >
                        <input
                            id="delivery"
                            type="radio"
                            name="deliveryType"
                            value={'delivery'}
                            checked={paymentInfor.deliveryType === 'delivery'}
                            onChange={(event) => onPaymentInforChange({ deliveryType: event.target.value })}
                        />
                        <label htmlFor="delivery">Giao hàng tận nơi</label>
                    </div>
                </div>
                <DeliveryOptiosForm
                    type={paymentInfor.deliveryType}
                    value={paymentInfor.deliveryAddress}
                    onChange={onPaymentInforChange}
                />
            </div>
        </>
    );
}

export default InforTab;
