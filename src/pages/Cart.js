import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { STATE_SUCCESS, STATE_FAIL, STATE_PRIMARY, STATE_WARNING } from '../constants';


import AlertMsg from '../components/AlertMsg';
import styles from './Cart.module.scss';

function CartPage(props) {
    const [addMsg, setAddMsg] = useState();

    return (
        <div>
            <button onClick={() => setAddMsg({ type: STATE_PRIMARY, msg: uuidv4() })}>Primary Msg</button>
            <button onClick={() => setAddMsg({ type: STATE_SUCCESS, msg: uuidv4() })}>Success Msg</button>
            <button onClick={() => setAddMsg({ type: STATE_WARNING, msg: uuidv4() })}>Warning Msg</button>
            <button onClick={() => setAddMsg({ type: STATE_FAIL, msg: uuidv4() })}>Fail Msg</button>
            {addMsg && <AlertMsg message={addMsg} />}
        </div>
    );
}

export default CartPage;
