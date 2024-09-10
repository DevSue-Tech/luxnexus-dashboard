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
const AdminDashboard = React.lazy(
	() => import('./pages/admin/dashboard/dashboard')
);

function App() {
	const { user,setUser, setProducts } = useContext(AdminDashboardContext) as AdminDashboardProps;
	useEffect(() => {
		const unsubscribe = customOnAuthStateChange(async (user: User | null) => {
			if (user) {
				console.log(user);

				await createAdminUserDocumentFromAuth(user, {
					uid: user.uid,
				});

				setUser(user);

				const fetchedProducts = await fetchProducts();

				setProducts(fetchedProducts)
			} else {
				console.log('No user is signed in.');
			}
		});

		return unsubscribe;
	}, [user]);

	return (
		<Routes>
			<Route path='/admin-login' element={<AdminLogin />}></Route>
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
				
				</Route>
				<Route path='add-new-product' element={<AddNewProduct />}></Route>
				</Route>
		</Routes>
	);
}

export default App;
