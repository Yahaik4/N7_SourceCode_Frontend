import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './DeliveryOptionsForm.module.scss';

import Select from '../../components/Form/Select';
import Input from '../../components/Form/Input';

function DeliveryOptiosForm(props) {
    const { type, value, onChange } = props;
    useEffect(() => {
        if (type === 'pickup') {
            onChange({ deliveryAddress: 'Địa chỉ ...' });
        } else {
            onChange({ deliveryAddress: '' });
        }
    }, [type]);
    return (
        <form className={clsx(styles.form)}>
            <div className={clsx(styles.formGroup)}>
                {type === 'pickup' ? (
                    <Input
                        type={'text'}
                        id={'deliveryAddress'}
                        value={'Địa chỉ cửa hàng'}
                        label={'Địa chỉ cửa hàng'}
                        placeHolder={'Vui lòng nhập Địa chỉ cửa hàng'}
                        // onChange={handleOnSelectAddress}
                    />
                ) : (
                    <div className={'w-full'}>
                        <Input
                            type={'text'}
                            id={'deliveryAddress'}
                            value={value}
                            label={'Địa chỉ nhận hàng'}
                            placeHolder={'Vui lòng nhập địa chỉ nhận hàng'}
                            onChange={onChange}
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

export default DeliveryOptiosForm;
