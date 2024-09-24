import { Button } from 'antd';
import { useState } from 'react';
import AddtoCartModal from '../add-to-cart Modal/AddtoCartModal';

type ProductCardProps = {
	name: string;
	category: string;
	price: number;
	photoURL: string | undefined
};

const ProductCard: React.FC<ProductCardProps> = ({
	name,
	category,
	price,
	photoURL,
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
			<div className='w-[300px] flex flex-col gap-2 items-center text-center'>
				<div
					style={{ backgroundImage: `url(" ${photoURL}")` }}
					className='image w-full h-[350px] bg-slate-300 bg-no-repeat bg-cover relative group'>
					<Button
						onClick={showLoading}
						className=' rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 w-full bg-main bg-opacity-100 text-white flex items-center justify-center'>
						Choose Options
					</Button>
				</div>
				<h1 className='font-bold'>{name}</h1>
				<h5 className='text-slate-400'>{category}</h5>
				<h2 className='font-serrat font-bold'>₦{price}</h2>
			</div>
			<AddtoCartModal
				loading={loading}
				open={open}
				setOpen={setOpen}
				showLoading={showLoading}
			/>
		</>
	);
};

export default ProductCard;
