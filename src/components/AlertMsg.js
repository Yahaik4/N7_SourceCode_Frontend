import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import styles from './AlertMsg.module.scss';
import { IoAlertSharp, IoClose, IoCheckmarkSharp, IoWarning } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';

const AlertMsg = forwardRef((props, ref) => {
    const { type, message, onClose, showAlertMsg, style } = props;

    const alertMsgRef = useRef();

    return (
        <CSSTransition
            in={showAlertMsg}
            nodeRef={ref}
            timeout={2000}
            classNames={{ ...styles }} // Define your CSS transition class
            unmountOnExit
        >
            <div className={clsx(styles.container)} ref={ref} style={{ ...style }}>
                <div className={clsx(styles.icon)}>
                    <IoAlertSharp />
                </div>
                <div className={clsx(styles.content)}>
                    <p>{message}</p>
                </div>
                <div className={clsx(styles.close)} onClick={() => onClose(ref.current)}>
                    <IoClose />
                </div>
            </div>
        </CSSTransition>
    );
});

export default AlertMsg;
