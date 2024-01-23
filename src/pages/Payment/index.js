import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Payment.module.scss';
import { IoArrowBack } from 'react-icons/io5';
import { formatCash, lowercaseFirstLetter } from '../../utils/helpers';
import { STATE_FAIL, STATE_SUCCESS } from '../../constants';

import InforTab from './InforTab';
import AlertMsg from '../../components/AlertMsg';
import useFormValidation from '../../hooks/useFormValidation';
// dummy data
import productItems from '../../constants/productItems';

function Payment(props) {
    // start dummy data
    const [fetchedDummyData, setFetchedDummyData] = useState(productItems.map((item) => ({ ...item, quantity: 1 })));
    // end dummy data

    const [addAlertMsg, setAddAlertMsg] = useState();
    const [paymentInfor, setPaymentInfor] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        notification: false,
        deliveryType: '',
        deliveryInfor: {
            city: '',
            district: '',
            ward: '',
            address: '',
            note: '',
        },
        VAT: false,
        companyInfor: {
            name: '',
            address: '',
            taxCode: '',
        },
        receiver: false,
        receiverInfor: {
            name: '',
            phoneNumber: '',
        },
    });
    const validationRules = {
        name: (value) => {
            if (!value) return 'Quý khách vui lòng không bỏ trống Họ và tên';
            return null;
        },
        phoneNumber: (value) => {
            if (!value) return 'Quý khách vui lòng không bỏ trống Số điện thoại';
            if (!/^0\d{9}$/.test(value)) return 'Quý khách vui lòng kiểm tra lại số điện thoại';
            return null; // No error
        },
        email: (value) => {
            if (!value) return 'Quý khách vui lòng không bỏ trống Email';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Quý khách vui lòng kiểm tra lại email';
            return null;
        },
        notification: () => null,
        deliveryType: () => null,
        deliveryInfor: (value, formValidationData) => {
            return {
                city: !value.city ? 'Quý khách vui lòng không bỏ trống Tỉnh/Thành phố' : null,
                district: !value.district ? 'Quý khách vui lòng không bỏ trống Quận/Huyện' : null,
                ward:
                    !value.ward && formValidationData.deliveryType === 'delivery'
                        ? 'Quý khách vui lòng không bỏ trống Phường/Xã'
                        : null,
                address: !value.address ? 'Quý khách vui lòng không bỏ trống địa chỉ' : null,
                note: null,
            };
        },
        VAT: () => null,
        companyInfor: (value, formValidationData) => {
            if (formValidationData.VAT) {
                return {
                    name: !value.name ? 'Quý khách vui lòng không bỏ trống Tên công ty' : null,
                    address: !value.address ? 'Quý khách vui lòng không bỏ trống địa chỉ công ty' : null,
                    taxCode: !value.taxCode ? 'Quý khách vui lòng không bỏ trống mã số thuế của công ty' : null,
                };
            }
            return null;
        },
        receiver: () => null,
        receiverInfor: (value, formValidationData) => {
            if (formValidationData.receiver) {
                return {
                    name: !value.name ? 'Quý khách vui lòng không bỏ trống Tên người nhận thay' : null,
                    phoneNumber: !value.phoneNumber
                        ? 'Quý khách vui lòng không bỏ trống số điện thoại người nhận thay'
                        : null,
                };
            }
            return null;
        },
    };

    const {
        formValidationData,
        errors,
        isFormValid,
        setFormValidationData, // Access to setFormValidationData
    } = useFormValidation(paymentInfor, validationRules);

    const handleOnCustomerInforChange = (data) => {
        const key = Object.keys(data)[0];
        const type = key.includes('receiverInfor')
            ? 'receiverInfor'
            : key.includes('companyInfor')
            ? 'companyInfor'
            : null;

        if (type) {
            const attr = lowercaseFirstLetter(key.split(type)[1]);
            setPaymentInfor({
                ...paymentInfor,
                [type]: { ...paymentInfor[type], [attr]: Object.values(data)[0] },
            });
            setFormValidationData({
                ...formValidationData,
                [type]: { ...formValidationData[type], [attr]: Object.values(data)[0] },
            });
        } else {
            setPaymentInfor({ ...paymentInfor, ...data });
            setFormValidationData({ ...formValidationData, ...data });
        }
    };
    const handleOnDeliveriOptionsFormChange = (infor) => {
        const deliveryInfor1 = { ...Object.values(infor)[0] };
        setPaymentInfor({
            ...paymentInfor,
            deliveryType: Object.keys(infor)[0],
            deliveryInfor: { ...paymentInfor.deliveryInfor, ...deliveryInfor1 },
        });
        setFormValidationData({
            ...formValidationData,
            deliveryType: Object.keys(infor)[0],
            deliveryInfor: { ...formValidationData.deliveryInfor, ...deliveryInfor1 },
        });
    };
    useEffect(() => {
        if (!paymentInfor.receiver) {
            setPaymentInfor({
                ...paymentInfor,
                receiverInfor: { name: '', phoneNumber: '' },
            });
        }
        if (!paymentInfor.VAT) {
            setPaymentInfor({
                ...paymentInfor,
                companyInfor: { name: '', address: '', taxCode: '' },
            });
        }
    }, [paymentInfor.VAT, paymentInfor.receiver]);

    const handleOnClickBtnNext = () => {
        if (!isFormValid) {
            if (typeof Object.values(errors)[0] === 'object') {
                for (const key in Object.values(errors)[0]) {
                    if (Object.values(errors)[0][key] !== null) {
                        setAddAlertMsg({ type: STATE_FAIL, msg: `${Object.values(errors)[0][key]}` });
                        break;
                    }
                }
            } else {
                setAddAlertMsg({ type: STATE_FAIL, msg: `${Object.values(errors)[0]}` });
            }
        } else {
            setAddAlertMsg({ type: STATE_SUCCESS, msg: `THÔNG TIN ĐỦ` });
        }
    };

    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.header)}>
                        <Link to="/cart">
                            <IoArrowBack className={clsx(styles.icon)} />
                        </Link>
                        <p className={clsx(styles.title)}>Thông tin</p>
                    </div>
                    <div className={clsx(styles.tabs)}>
                        <div className={clsx(styles.tab, { [styles.active]: true })}>1. Thông tin</div>
                        <div className={clsx(styles.tab, { [styles.active]: false })}>2. Thanh toán</div>
                    </div>

                    <InforTab
                        fetchedDummyData={fetchedDummyData}
                        deliveryInfor={paymentInfor}
                        customerInfor={paymentInfor}
                        onCustomerInforChange={handleOnCustomerInforChange}
                        onDeliveriOptionsFormChange={handleOnDeliveriOptionsFormChange}
                    />

                    <div className={clsx(styles.totalPayment)}>
                        <div className={clsx(styles.priceTemp)}>
                            <p>Tổng tiền tạm tính:</p>
                            <p className={clsx(styles.totalPrice)}>{formatCash(0)}</p>
                        </div>
                        <div className={clsx(styles.button)} onClick={handleOnClickBtnNext}>
                            Tiếp tục
                        </div>
                    </div>
                </div>
            </div>
            <AlertMsg message={addAlertMsg} />
        </>
    );
}

export default Payment;
