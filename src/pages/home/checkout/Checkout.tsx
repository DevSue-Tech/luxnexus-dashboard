import {
	DeleteOutlined,
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { StoreContext } from '../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../utils/context/store/StoreProps';
import { Controller, useForm } from 'react-hook-form';
import TextArea from 'antd/es/input/TextArea';
import { UserContext } from '../../../utils/context/user/UserContext';
import { UserProps } from '../../../utils/context/user/types/UserType';
import { PaystackButton } from 'react-paystack';

interface CheckOutProps {
	message: string;
}

const Checkout = () => {
    const { cartItems, setCartItems } = useContext(StoreContext) as StoreProps;
    const { user} = useContext(UserContext) as UserProps

	const [orderNote, setOrderNote] = useState(false);
	const { control} = useForm<CheckOutProps>();

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

	const publicKey = 'pk_test_fb59388796c0aacc4979c718eac130656df09539';
	const amount = (totalPrice ?? 0) * 100;  // Fallback to 0 if totalPrice is undefined

	

    const componentProps = {
        email: user?.email ?? 'default@example.com',  // Fallback for email
        amount: amount,  // Ensure amount is a number
        metadata: {
            custom_fields: [
                {
                    display_name: 'Customer Name',
                    variable_name: 'customer_name',
                    value: user?.displayName ?? 'Anonymous',  // Fallback for displayName
                },
                {
                    display_name: 'Phone Number',
                    variable_name: 'phone_number',
                    value: '+2347064158452',  // Example phone number
                },
            ],
        },
        publicKey,
        text: 'Pay Now',
        onSuccess: () =>
            alert('Thanks for doing business with us! Come back soon!!'),
        onClose: () => alert("Wait! Don't leave :("),
    };
    
    
	return (
		<section className=' flex  gap-10 w-full md:px-24 px- py-24'>
			<div className='w-[70%]'>
				<div className=' flex items-center'>
					<h1 className=' font-bold text-2xl'>
						Your Cart <ShoppingCartOutlined />
					</h1>

					<h6 className=' ml-auto'>{cartItems?.length} Item</h6>
				</div>

				<div>
					{cartItems?.map((eachItem) => {
						const { name, category, size, price, quantity, id, photoURL } =
							eachItem;

						return (
							<div key={id} className='w-full flex mt-5 border-t-2 px-6 py-4 '>
								<div
									style={{ backgroundImage: `url(${photoURL})` }}
									className='image w-[150px] h-[150px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
								<div className=' w-full px-5 relative'>
									<h6 className=' font-bold absolute top-2 right-5'>
										₦{price}
									</h6>

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

										<DeleteOutlined
											onClick={() => handleDeleteItem(id)}
											className='ml-auto'
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className=' flex flex-col gap-3 w-[30%] h-full bg-slate-200 px-8 py-5'>
				<h1 className=' text-sm hover:text-slate-400 cursor-pointer'>
					{orderNote ? <MinusOutlined /> : <PlusOutlined />}{' '}
					<span
						onClick={() => setOrderNote(!orderNote)}
						className=' ml-2 underline'>
						Add order notes
					</span>
				</h1>

				{orderNote && (
					<form>
						<Controller
							name='message'
							control={control}
							rules={{
								required: 'Firstname is required',
							}}
							render={({ field }) => (
								<div className=' font-serrat gap-2 flex flex-col'>
									<TextArea
										className=' px-2 py-2 rounded-none bg-slate-200'
										size='large'
										placeholder='Add special instruction for the seller...'
										{...field}
									/>
								</div>
							)}
						/>
					</form>
				)}

				<div className=' flex items-center'>
					<h1 className=' font-bold'>SubTotal:</h1>
					<h5 className='  font-bold ml-auto font-serrat'>₦{totalPrice}NGN</h5>
				</div>
				<h5 className=' text-sm text-slate-400'>
					Taxes and shipping calculated at checkout
				</h5>

                <PaystackButton className=' bg-black text-white py-2 w-full' {...componentProps} />
			</div>
		</section>
	);
};

export default Checkout;
