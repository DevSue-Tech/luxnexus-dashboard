import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/login/login';
import React, { Suspense, useContext, useEffect } from 'react';
import {
	createAdminUserDocumentFromAuth,
	customOnAuthStateChange,
} from './utils/firebase/auth/firebaseAuth';
import { User } from 'firebase/auth';
import { Flex, Spin } from 'antd';
import { AdminDashboardContext } from './utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from './utils/context/admin-state-context/types/AdminTypes';
import DashboardIndex from './pages/admin/dashboard/dashboardIndex';
import Products from './pages/admin/products/products';
import AddNewProduct from './pages/admin/components/add-new-product/addNewProduct';
import { fetchProducts } from './utils/firebase/products/productConfig';
import ProductIndex from './pages/admin/products/productIndex';
import EditProduct from './pages/admin/products/editProduct';
import Home from './pages/home/Home';
import HomeIndexPage from './pages/home/HomeIndexPage';
import { StoreContext } from './utils/context/store/StoreContext';
import { StoreProps } from './utils/context/store/StoreProps';
import NewArrival from './pages/home/components/new-arrival/NewArrival';
import MenClothing from './pages/home/components/men/men-Clothing/MenClothing';
import WomenClothing from './pages/home/components/men/women/women-clothing/WomenClothing';
const AdminDashboard = React.lazy(
	() => import('./pages/admin/dashboard/dashboard')
);

function App() {
	const { user, setUser, setProducts } = useContext(
		AdminDashboardContext
	) as AdminDashboardProps;

	const { setCartItems } = useContext(StoreContext) as StoreProps;
	useEffect(() => {
		const unsubscribe = customOnAuthStateChange(async (user: User | null) => {
			if (user) {
				console.log(user);

				await createAdminUserDocumentFromAuth(user, {
					uid: user.uid,
				});

				setUser(user);

				const fetchedProducts = await fetchProducts();

				setProducts(fetchedProducts);

				const storedCartItems = localStorage.getItem('cartItems');
				if (storedCartItems) {
					const cartItems = JSON.parse(storedCartItems);
					setCartItems(cartItems); 
				}
			} else {
				console.log('No user is signed in.');
			}
		});

		return unsubscribe;
	}, [user]);

	return (
		<Routes>
			<Route
				path='/home'
				element={
					<Suspense
						fallback={
							<section className=' flex justify-center items-center w-full h-screen'>
								<Flex align='center' gap='middle'>
									<Spin size='large' />
								</Flex>
							</section>
						}>
						<Home />
					</Suspense>
				}>
				<Route index element={<HomeIndexPage />} />
				<Route path='new-arrival' element={<NewArrival />} />
				<Route path='men-clothing' element={<MenClothing />} />
				<Route path='women-clothing' element={<WomenClothing />} />
			</Route>
			<Route path='/' element={<AdminLogin />}></Route>
			<Route
				path='/admin-dashboard'
				element={
					<Suspense
						fallback={
							<section className=' flex justify-center items-center w-full h-screen'>
								<Flex align='center' gap='middle'>
									<Spin size='large' />
								</Flex>
							</section>
						}>
						<AdminDashboard />
					</Suspense>
				}>
				<Route index element={<DashboardIndex />}></Route>
				<Route path='product' element={<Products />}>
					<Route index element={<ProductIndex />}></Route>
					<Route path='add-new-product' element={<AddNewProduct />}></Route>
					<Route path='edit-product/:id' element={<EditProduct />}></Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
