import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

// icons
import { AiOutlineRight } from 'react-icons/ai';

import styles from './Catalog.module.scss';
import CatalogChild from './CatalogChild';
import catalogItems from '../../constants/catalogItems';

function Catalog(props) {
    const isDropdown = props.isDropDown || false;
    const handleMouseOnModal = props.handleMouseOnModal || null;

    const [showCatalogChild, setShowCatalogChild] = useState(false);
    const [catalogItemHover, setCatalogItemHover] = useState(0);
    const [dataCatalogChild, setDataCatalogChild] = useState([]);

    const handleShowCatalogChild = () => {
        setShowCatalogChild(true);
    };
    const handleUnshowCatalogChild = () => {
        setShowCatalogChild(false);
    };

    useEffect(() => {
        if (handleMouseOnModal != null) {
            handleMouseOnModal(showCatalogChild);
        }
    }, [showCatalogChild, handleMouseOnModal]);

    useEffect(() => {
        setDataCatalogChild(catalogItems[catalogItemHover].data);
    }, [catalogItemHover]);

    return (
        <div className={clsx(styles.wrapper, { [styles.modal]: isDropdown })}>
            <div
                className={clsx(styles.container)}
                onMouseEnter={handleShowCatalogChild}
                onMouseLeave={handleUnshowCatalogChild}
            >
                {catalogItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={clsx(styles.catalogItem)}
                            onMouseEnter={() => setCatalogItemHover(index)}
                        >
                            <div className={clsx(styles.content)}>
                                <Icon className={clsx(styles.icon)} />
                                <strong>{item.text}</strong>
                            </div>
                            <AiOutlineRight />
                        </div>
                    );
                })}
            </div>
            {!showCatalogChild || (
                <div onMouseEnter={handleShowCatalogChild} onMouseLeave={handleUnshowCatalogChild}>
                    <CatalogChild content={dataCatalogChild} />
                </div>
            )}
        </div>
    );
}

export default memo(Catalog);
