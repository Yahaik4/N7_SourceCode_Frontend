import clsx from 'clsx';
import { useRef, useState } from 'react';

import useDocumentClick from '../CustomHook/useDocumentClick';

import styles from './Input.module.scss';

function Input(props) {
    const { id, type, label, annote = null, placeHolder = null, alertMsg = null, value, onChange } = props;
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef(null);
    const clickedElement = useDocumentClick();

    const handleOnChange = (event) => {
        if (typeof onChange === 'function') {
            if (type === 'checkbox') {
                onChange({ [id]: event.target.checked });
            } else {
                event.target.value ? setIsEmpty(false) : setIsEmpty(true);
                onChange({ [id]: event.target.value });
            }
        }
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <input
                    id={id}
                    className={clsx(styles.inputText, { [styles.notEmpty]: !isEmpty })}
                    type={type}
                    value={value}
                    onChange={(event) => handleOnChange(event)}
                    ref={inputRef}
                    required
                />

                {type === 'checkbox' ? (
                    <label className={clsx({ [styles.label]: type !== 'checkbox' })} htmlFor={id}>
                        {label}
                    </label>
                ) : (
                    <label className={clsx({ [styles.label]: type !== 'checkbox' })} htmlFor={id}>
                        {clickedElement === inputRef.current || !isEmpty ? label : placeHolder}
                    </label>
                )}
            </div>
            {alertMsg && <p className={clsx(styles.alertMsg, { [styles.active]: alertMsg })}>{alertMsg}</p>}
            {annote && <p className={clsx(styles.annote, styles.active)}>{annote}</p>}
        </div>
    );
}

export default Input;
