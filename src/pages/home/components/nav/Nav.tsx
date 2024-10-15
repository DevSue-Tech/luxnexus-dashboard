import {
	DownOutlined,
	HeartOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Badge, Carousel } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../utils/context/store/StoreProps';
import CartItems from '../cart-items/CartItems';
import './nav.css';

const Nav = () => {
	const navigate = useNavigate();

	const { cartItems, openCart, setOpenCart } = useContext(
		StoreContext
	) as StoreProps;
	return (
		<>
			<nav className=' font-main'>
				<Carousel
					dots={false}
					arrows={true}
					className='bg-main py-2 flex text-sm items-center text-white text-center justify-center'
					autoplay>
					<div>
						<h3>
							Get 10% off your first order!...
							<Link className='  text-white' to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
					<div>
						<h3>
							Fast Delivery Worldwide!...{' '}
							<Link className=' underline text-white' to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
				</Carousel>

				<header className='py-4 md:px-12 px-4 flex md:items-end items-center gap-5 md:gap-0 justify-between relative'>
					<div>
						<SearchOutlined className=' cursor-pointer text-[18px] md:text-[24px]' />
					</div>

					<div className='flex font-serrat gap-6 flex-col items-center'>
						<h1 className='text-main font-serrat font-bold text-2xl md:text-3xl'>
							Luxenexus
						</h1>
						<ul className='flex desktopNav gap-5 text-sm'>
							<li className='relative group'>
								<Link to='/new-arrivals' className='underline-custom'>
									What's new
								</Link>
								{/* Hover Dropdown */}
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/new-arrival')}>New Arrivals</p>
									<p>Trending</p>
								</div>
							</li>

							<li className='relative group'>
								<Link to='' className='underline-custom'>
									Shop
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/shop')}>All Products</p>
									<p>Popular Items</p>
								</div>
							</li>

							<li className='relative group'>
								<Link to='/clothing' className='underline-custom'>
									Clothing
								</Link>
							</li>

							<li className='relative group'>
								<Link to='/bag' className='underline-custom'>
									Bags
								</Link>
							</li>

							<li className='relative group'>
								<Link to='/shoes' className='underline-custom'>
									Shoes
								</Link>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<Link to='' className='flex items-center'>
									Men <DownOutlined className='text-[10px]' />
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/men-clothing')}>
										Men's Clothing
									</p>
									<p>Men's Accessories</p>
								</div>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<Link to='' className='flex items-center'>
									Women <DownOutlined className='text-[10px]' />
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/women-clothing')}>
										Women's Clothing
									</p>
									<p>Women's Accessories</p>
								</div>
							</li>
							<li className='relative group'>
								<Link to='' className='underline-custom'>
									Giftings
								</Link>
							</li>

							<li className='relative group'>
								<Link to='' className='underline-custom'>
									Contact us
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p>Contact Information</p>
									<p>Support</p>
								</div>
							</li>
						</ul>
					</div>

					<div className='flex gap-2 md:gap-4'>
						<UserOutlined className=' text-[18px] md:text-[24px]' />
						<HeartOutlined className=' text-[18px] md:text-[24px]' />
						<Badge
							count={cartItems === null ? 0 : cartItems.length}
							showZero={true}>
							<ShoppingCartOutlined
								className=' cursor-pointer text-[18px] md:text-[24px]'
								onClick={() => setOpenCart(true)}
							/>
						</Badge>
					</div>
				</header>
			</nav>

			{openCart && <CartItems />}
		</>
	);
};

export default Nav;
