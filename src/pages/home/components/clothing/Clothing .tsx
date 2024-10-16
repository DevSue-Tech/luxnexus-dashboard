import { useContext } from 'react';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import ProductCard from '../product-card/ProductCard';

const Clothing = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const filterProduct = products?.filter(
		(product) => product.category === 'Clothes'
	);
	return (
		<div className=' px-12 pb-12'>
			<h1 className=' mt-12 font-bold text-3xl'>Clothing</h1>

			<div className=' mt-12 flex flex-wrap'>
				{filterProduct?.map((product) => (
					<ProductCard
						key={product.id}
						size={product.size}
						id={product.id}
						photoURL={product.photoURL}
						name={product.name}
						quantity={product.quantity}
						price={product.price}
						category={product.category}
					/>
				))}
			</div>
		</div>
	);
};

export default Clothing;
