import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import AlertMsg from '../components/AlertMsg';
import styles from './Cart.module.scss';
import { createRef } from 'react';
import clsx from 'clsx';

function CartPage(props) {
    const [alertMsgs, setAlertMsgs] = useState([]);
    const msgsRef = useRef([]);

    const handleAddMsgs = (type, message) => {
        setAlertMsgs([...alertMsgs, {  type, message, showAlertMsg: true }]);
    };

    const onCloseAlertMsg = (ref) => {
        const index = msgsRef.current.findIndex((item) => item.current === ref);
        setAlertMsgs([...alertMsgs, alertMsgs[index].showAlertMsg = false]);
        console.log(index);
    };

    return (
        <div>
            <button onClick={() => handleAddMsgs('Primary', 'Primary Msg')}>Primary Msg</button>
            <button onClick={() => handleAddMsgs('Success', 'Success Msg')}>Success Msg</button>
            <button onClick={() => handleAddMsgs('Warning', 'Warning Msg')}>Warning Msg</button>
            <button onClick={() => handleAddMsgs('Fail', 'Fail Msg')}>Fail Msg</button>

            <TransitionGroup className={clsx(styles.alertMsgsGroup)}>
                {alertMsgs.map((msg, index) => {
                    msgsRef.current[index] = createRef();
                    return (
                        <AlertMsg
                            key={index}
                            ref={msgsRef.current[index]}
                            message={msg.message}
                            showAlertMsg={msg.showAlertMsg}
                            onClose={onCloseAlertMsg}
                            // style={{ marginTop: `${index * 70}px` }}
                        />
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

export default CartPage;
