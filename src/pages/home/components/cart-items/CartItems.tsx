import { useContext } from 'react';
import { StoreContext } from '../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../utils/context/store/StoreProps';
import {
	CloseOutlined,
	DeleteOutlined,
	MinusOutlined,
	PlusOutlined,
} from '@ant-design/icons';


const CartItems = () => {
	const { cartItems, setOpenCart, setCartItems } = useContext(
		StoreContext
	) as StoreProps;

	const totalPrice = cartItems?.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);

	const handleDeleteItem = (id: string) => {
		const updatedCartItems = cartItems?.filter((item) => item.id !== id) || [];
		setCartItems(updatedCartItems);

		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleIncreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			}) || [];

		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleDecreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id && item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 }; // Decrease quantity but not below 1
				}
				return item;
			}) || [];

		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};


	return (
		<div className=' z-40 fixed w-screen top-0 left-0 h-screen  flex'>
			<div className='w-[60%] h-full bg-slate-900 opacity-75 '></div>
			<div className='w-[40%] opacity-100 px-5 py-5 z-40 bg-white relative h-full ml-auto overflow-scroll '>
				<div className=' mb-72'>
					<div className=' flex items-center'>
						<h1 className=' text-2xl font-bold'>CART</h1>
						<CloseOutlined
							onClick={() => setOpenCart(false)}
							className=' ml-auto'
						/>
					</div>

					{cartItems?.map((eachItem) => {
						const { name, category, size, price, quantity, id, photoURL } =
							eachItem;

						return (
							<div key={id} className=' flex mt-5 border-t-2 px-6 py-4 '>
								<div
									style={{ backgroundImage: `url(${photoURL})` }}
									className='image w-[150px] h-[150px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
								<div className=' px-5 relative'>
									<DeleteOutlined
										onClick={() => handleDeleteItem(id)}
										className=' absolute top-2 right-5'
									/>
									<h1 className=' font-bold'>{name}</h1>
									<div className=' text-sm flex gap-2 items-center text-slate-400'>
										<h6>Category: {category}</h6>

										<h6> Size: {size}</h6>
									</div>
									<div className=' mt-12 flex  items-center'>
										<div className=' border-[2px] py-2 text-sm rounded-md w-[80px] border-black flex items-center justify-center gap-3'>
											<MinusOutlined
												onClick={() => handleDecreaseQuantity(id)}
											/>
											<span>{quantity}</span>
											<PlusOutlined
												onClick={() => handleIncreaseQuantity(id)}
											/>
										</div>

										<h6 className=' ml-[100px] font-bold'>₦{price}</h6>
										
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className=' fixed bottom-0 px-5 py-5 bg-white '>
					<div className=' flex font-serrat items-center'>
						<div>
							<h1 className=' font-bold'>SubTotal: ₦{totalPrice}</h1>
							<h3 className=' text-sm text-slate-500'>
								Taxes and Shipping are calculated in Cheeckout
							</h3>
						</div>

						<h6 className=' ml-24 text-xs font-bold font-serrat '>
							Total Amount: ₦{totalPrice}
						</h6>
					</div>
					<button className=' mt-4 w-full bg-black text-white font-serrat font-bold px-5 py-4'>
						{' '}
						Checkout
					</button>
					
				</div>
			</div>
		</div>
	);
};

export default CartItems;
