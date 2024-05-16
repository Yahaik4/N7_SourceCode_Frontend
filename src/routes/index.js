import Login from '../pages/Login';
import Register from '../pages/Register';
import HomePage from '../pages/Home';
import CartPage from '../pages/Cart';
import ProductDetailsPage from '../pages/productDetails';
import Profile from '../pages/Profile';
// import SearchPage from '../pages/Search';
import Products from '../pages/products';
import Layout from '../components/Layout';
import Payment from '../pages/Payment';
// import Purchase from '../pages/Purchase';

const publicRoutes = [
    { path: '/', component: HomePage, layout: Layout },
    { path: '/:brand', component: Products, layout: Layout },
    { path: '/:brand/:productDetails', component: ProductDetailsPage, layout: Layout },
    // { path: '/:products/:brand/:productDetails', component: ProductDetailsPage, layout: Layout },
    { path: '/cart', component: CartPage, layout: Layout },
    { path: '/search', component: Products, layout: Layout },
    { path: '/login', component: Login, layout: Layout },
    { path: '/register', component: Register, layout: Layout },
    { path: '/payment', component: Payment, layout: Layout },
    { path: '/profile', component: Profile, layout: Layout },
    // { path: '/purchase', component: Purchase, layout: Layout },
];

const privateRoutes = [{ path: '/cart', component: CartPage, layout: Layout }];

export { publicRoutes, privateRoutes };
