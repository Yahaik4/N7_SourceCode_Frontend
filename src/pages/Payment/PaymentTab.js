import clsx from 'clsx';

import styles from './PaymentTab.module.scss';
import parentStyles from './Payment.module.scss';
import { formatCash } from '../../utils/helpers';
function PaymentTab(props) {
    const { totalPrice, checkoutProductList, paymentInfor } = props;
    const totalQuantity = checkoutProductList.length;
    return (
        <>
            <div className={clsx(parentStyles.blockWrapper)}>
                <div className={clsx(styles.formGroup)}>
                    Số lượng sản phẩm <span>{totalQuantity}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Tiền hàng (tạm tính) <span>{formatCash(totalPrice)}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Phí vận chuyển <span>Miễn Phí</span>
                </div>
                <div className={clsx(styles.formGroup, styles.totalPrice)}>
                    Tổng tiền <span>{formatCash(totalPrice)}</span>
                </div>
            </div>
            <h1 className={'font-bold text-[25px]'}>THÔNG TIN NHẬN HÀNG</h1>
            <div className={clsx(parentStyles.blockWrapper)}>
                <div className={clsx(styles.formGroup)}>
                    Khách hàng: <span>{paymentInfor.name}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Số điện thoại: <span>{paymentInfor.phoneNumber}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Email: <span>{paymentInfor.email}</span>
                </div>
                <div className={clsx(styles.formGroup)}>
                    Nhận hàng tại: <span>{paymentInfor.deliveryAddress}</span>
                </div>
                {paymentInfor.receiver && (
                    <div className={clsx(styles.formGroup)}>
                        Người nhận:{' '}
                        <span>{`${paymentInfor.receiverInfor.name} - ${paymentInfor.receiverInfor.phoneNumber}`}</span>
                    </div>
                )}
            </div>
        </>
    );
}

export default PaymentTab;
