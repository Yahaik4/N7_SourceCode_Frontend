import { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';

import productItems from '../constants/productItems';
import SlideScrollable from '../components/SlideScrollable';

function CartPage(props) {
    const productsRef = useRef([]);
    useEffect(() => {
        console.log(productsRef.current);
    })
    
    return (
        <SlideScrollable
            settingStyles={{
                maxHeight: 926,
                display: 'flex',
                flexFlow: 'column wrap',
                gap: 10,
                padding: '0 5px',
            }}
        >
            {productItems.map((item, index) => {
                return <ProductCard item={item} key={index} ref={(el) => (productsRef.current[index] = el)} />;
            })}
        </SlideScrollable>
    );
}

export default CartPage;
