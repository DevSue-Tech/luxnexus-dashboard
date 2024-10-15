import { useContext } from 'react';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { Product } from '../../../utils/context/admin-state-context/types/ProductTypes';
import ProductCard from '../components/product-card/ProductCard';

interface CategorizedProducts {
	[category: string]: Product[];
}

const Shop = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const categorizedProducts = products?.reduce<CategorizedProducts>(
		(acc, product) => {
			const { category } = product;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(product);
			return acc;
		},
		{}
	);

	return (
		<div className='px-12 py-12'>
			<h1 className='font-bold text-3xl text-main'>All Products</h1>

			<div className='mt-12'>
				{categorizedProducts &&
					Object.keys(categorizedProducts).map((category) => (
						<div key={category} className='mb-8'>
							<h2 className='text-2xl uppercase font-semibold'>{category}</h2>
							<div className=' flex flex-wrap mt-5'>
								{categorizedProducts[category].slice(0, 4).map((product) => (
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
					))}
			</div>
		</div>
	);
};

export default Shop;
