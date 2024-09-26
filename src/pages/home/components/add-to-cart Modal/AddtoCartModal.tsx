import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';
import { useContext, useState } from 'react';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';

interface LoadingComponentProps {
	loading: boolean;
	open: boolean;
	setOpen: (open: boolean) => void;
	showLoading: () => void;
	id: string;
}
const AddtoCartModal: React.FC<LoadingComponentProps> = ({
	loading,
	open,
	setOpen,
	id,
}) => {
	const size = ['S', 'M', 'L', 'XL', 'XXL'];
	const [selectedSize, setSelectedSize] = useState<string | null>(null); // State to store the selected size
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const filterSpecificProduct =
		products?.filter((eachproduct) => {
			return eachproduct.id === id;
		}) || [];

	console.log(filterSpecificProduct);

	const product = filterSpecificProduct[0];

	const { name, photoURL, price, category } = product;

	const handleSizeClick = (size: string) => {
		setSelectedSize(size);
	};

	const [count, setCount] = useState(1);

	const increaseCount = () => {
		setCount((prevCount) => prevCount + 1);
	};

	const decreaseCount = () => {
		if (count > 1) {
			setCount((prevCount) => prevCount - 1);
		}
	};
	return (
		<>
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				footer={null}
				width={740}
				style={{ borderRadius: 0 }}
				className='!rounded-none'>
				{loading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '70vh',
						}}>
						<Spin size='large' className='custom-spinner' />{' '}
					</div>
				) : (
					<section className='h-auto rounded-none flex'>
						<div
							style={{ backgroundImage: `url(${photoURL})` }}
							className='image w-[40%] h-[350px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
						<div className='px-5 w-[60%] flex flex-col overflow-scroll-hidden'>
							<h1 className=' font-serrat font-bold text-2xl'>{name}</h1>
							<h5 className=' text-slate-300'>{category}</h5>
							<h6>₦{price}</h6>

							<a className=' underline'>View Product Details</a>

							<hr className=' mt-5' />

							<h5 className=' mt-5'>SIZE</h5>
							<div className=' grid grid-cols-3 gap-4'>
								{size.map((size) => (
									<div
										key={size}
										onClick={() => handleSizeClick(size)} // Handle click event
										className={`border px-5 py-2 cursor-pointer ${
											selectedSize === size
												? 'border-main border-[2px]'
												: 'border-black '
										}`}>
										{size}
									</div>
								))}
							</div>

							<h1 className=' mt-5'>QUANTITY</h1>

							<div className=' flex w-[100px] py-2 justify-between px-3 gap-3 border-[2px] items-center'>
								<MinusOutlined
									className=' cursor-pointer'
									onClick={decreaseCount}
								/>

								<span>{count}</span>

								<PlusOutlined
									className=' cursor-pointer'
									onClick={increaseCount}
								/>
							</div>

							<button className=' bg-main text-center font-bold text-white py-4 mt-5 font-serrat'>
								{' '}
								ADD TO CART
							</button>
						</div>
					</section>
				)}
			</Modal>
		</>
	);
};

export default AddtoCartModal;
