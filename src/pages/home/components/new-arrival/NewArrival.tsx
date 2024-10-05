import { useContext } from 'react';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import ProductCard from '../product-card/ProductCard';

const NewArrival = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const sortedProducts = products?.sort((a, b) => {
		// Ensure both products have a valid createdAt field
		if (a.createdAt && b.createdAt) {
			return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
		}
		return 0; // If there's no createdAt, no sorting is applied
	});
	return (
		<div className=' px-12 mt-12 text-main'>
			<h1 className=' font-serrat text-2xl font-bold'>New Arrivals</h1>

			<div className=' flex flex-wrap gap-2 py-12 '>
				{sortedProducts?.map((product) => {
					const { id, name, price, category, photoURL, size, quantity } = product;
					return (
						<ProductCard
							key={id}
							name={name}
							price={price}
							category={category}
							photoURL={photoURL}
							id={id}
							size={size}
							quantity={quantity}
							
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NewArrival;
