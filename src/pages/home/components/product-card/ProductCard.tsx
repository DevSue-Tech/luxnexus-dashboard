import { useState } from 'react';
import AddtoCartModal from '../add-to-cart Modal/AddtoCartModal';
import ImageWithSkeleton from '../ImageSkeleton/ImageWithSkeleton';

type ProductCardProps = {
	name: string;
	category: string;
	price: number;
	photoURL: string | undefined;
	id: string,
	size: string,
	quantity: number
};

const ProductCard: React.FC<ProductCardProps> = ({
	name,
	category,
	price,
	photoURL,
	id,
	size,
	quantity
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const showLoading = () => {
		setOpen(true);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	return (
		<>
			<div className='w-[300px] flex flex-col gap-1 items-center text-center'>
				<ImageWithSkeleton photoURL={photoURL} showLoading={showLoading} />
				<h1 className=' mt-3 text-black font-bold'>{name}</h1>
				<h5 className='text-slate-400'>{category}</h5>
				<h2 className='font-serrat text-black font-bold'>₦{price}</h2>
			</div>
			<AddtoCartModal
				loading={loading}
				open={open}
				setOpen={setOpen}
				showLoading={showLoading}
				id={id}
				size={size}
				quantity={quantity}
				
			/>
		</>
	);
};

export default ProductCard;
