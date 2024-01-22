import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './DeliveryOptionsForm.module.scss';

import Select from '../../components/Form/Select';
import Input from '../../components/Form/Input';

function DeliveryOptiosForm(props) {
    const { type, onChange } = props;
    // dummy data
    const itemsSelect = ['Australia', 'India', 'UAE', 'USA', 'VietNam', 'Singapore'];

    const [pickupAddress, setPickupAddress] = useState({
        city: '',
        district: '',
        address: '',
        note: '',
    });
    const [deliveryAddress, setDeliveriAddress] = useState({
        city: '',
        district: '',
        ward: '',
        address: '',
        note: '',
    });

    const handleOnSelectAddress = (data) => {
        if (type === 'pickup') {
            setPickupAddress({ ...pickupAddress, ...data });
        } else if (type === 'delivery') {
            setDeliveriAddress({ ...deliveryAddress, ...data });
        }
    };

    useEffect(() => {
        type === 'pickup' ? onChange(pickupAddress) : onChange(deliveryAddress);
    }, [pickupAddress, deliveryAddress, type]);

    return (
        <form className={clsx(styles.form)}>
            <div className={clsx(styles.formGroup)}>
                <Select
                    id={'city'}
                    selectValues={itemsSelect}
                    value={type === 'pickup' ? pickupAddress.city : deliveryAddress.city}
                    label={'Tỉnh / Thành phố'}
                    placeHolder={'Chọn Tỉnh / Thành phố'}
                    onSelect={handleOnSelectAddress}
                />
                <Select
                    id={'district'}
                    selectValues={itemsSelect}
                    value={type === 'pickup' ? pickupAddress.district : deliveryAddress.district}
                    label={'Quận / huyện'}
                    placeHolder={'Chọn Quận / huyện'}
                    onSelect={handleOnSelectAddress}
                />
            </div>
            <div className={clsx(styles.formGroup)}>
                {type === 'pickup' ? (
                    <Select
                        id={'address'}
                        selectValues={itemsSelect}
                        value={pickupAddress.address}
                        label={'Cửa hàng'}
                        placeHolder={'Chọn địa chỉ Cửa hàng'}
                        onSelect={handleOnSelectAddress}
                    />
                ) : (
                    <>
                        <Select
                            id={'ward'}
                            selectValues={itemsSelect}
                            value={deliveryAddress.ward}
                            label={'Phường / xã'}
                            placeHolder={'Chọn Phường / xã'}
                            onSelect={handleOnSelectAddress}
                        />
                        <Input
                            type={'text'}
                            id={'address'}
                            value={deliveryAddress.address}
                            label={'Địa chỉ'}
                            placeHolder={'Số nhà tên đường'}
                            onChange={handleOnSelectAddress}
                        />
                    </>
                )}
            </div>
            <div className={clsx(styles.formGroup)}>
                <Input
                    type={'text'}
                    id={'note'}
                    value={type === 'pickup' ? pickupAddress.note : deliveryAddress.note}
                    label={'Ghi Chú'}
                    placeHolder={'ghi chú khác (nếu có)'}
                    onChange={handleOnSelectAddress}
                />
            </div>
        </form>
    );
}

export default DeliveryOptiosForm;
