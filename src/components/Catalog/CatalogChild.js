import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './CatalogChild.module.scss';

function CatalogChild(props) {
    const data = props.content;

    return (
        <div className={clsx(styles.wrapper)}>
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <h4>{item.title}</h4>
                        {item.subTitles.map((subTitle, index) => {
                            return (
                                <Link to="/" key={index}>
                                    <p key={index}>{subTitle}</p>
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default CatalogChild;
