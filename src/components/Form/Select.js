import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Select.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useDocumentClick from '../CustomHook/useDocumentClick';

function Select(props) {
    const { id, label, placeHolder, selectValues, value, onSelect } = props;
    const inputRef = useRef(null);
    const dropDownListRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [selectedItem, setSelectedItem] = useState('');
    const clickedElement = useDocumentClick();

    const handleOnSelectItem = (item) => {
        if (item) {
            setSelectedItem(item);
            setIsEmpty(false);
            inputRef.current.value = selectedItem;
        }
    };

    useEffect(() => {
        onSelect({ [id]: selectedItem });
    }, [id, selectedItem]);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.formField)}>
                <input
                    id={id}
                    type="text"
                    className={clsx(styles.inputText, {
                        [styles.notEmpty]: !isEmpty,
                    })}
                    value={'' || selectedItem}
                    ref={inputRef}
                    required
                    readOnly
                />
                <label className={clsx(styles.label)} htmlFor={id}>
                    {clickedElement === inputRef.current || !isEmpty ? label : placeHolder}
                </label>
                {clickedElement === inputRef.current ? (
                    <IoIosArrowDown className={clsx(styles.icon)} />
                ) : (
                    <IoIosArrowUp className={clsx(styles.icon)} />
                )}
            </div>
            <ul
                className={clsx(styles.dropDownList, { [styles.active]: clickedElement === inputRef.current })}
                ref={dropDownListRef}
            >
                {selectValues.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleOnSelectItem(item)}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Select;
