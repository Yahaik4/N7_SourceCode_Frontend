import { useParams } from 'react-router-dom';

function Products(props) {
    let { products, producer } = useParams();
    return (
        <h1>
            Products {products} {producer}
        </h1>
    );
}

export default Products;
