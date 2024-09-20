import {
    DownOutlined,
	HeartOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Badge, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
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

			<header className=' py-4 px-12 flex items-end justify-between'>
				<div>
					<SearchOutlined style={{ fontSize: '24px' }} />
				</div>
				<div className=' flex gap-6 flex-col items-center'>
					<h1 className=' text-main font-serrat font-bold text-3xl'>Luxenexus</h1>

					<ul className=' flex gap-5 text-sm'>
						<li className=' underline-custom'>
							<Link to=''>What's new</Link>
                        </li>
                        <li className=' underline-custom'>
							<Link to=''>Shop</Link>
                        </li>
                        <li className=' underline-custom'>
							<Link to=''>Clothing</Link>
                        </li>
                        <li className=' underline-custom'>
							<Link to=''>Bags</Link>
                        </li>
                        <li className=' underline-custom'>
							<Link to=''>Shoes</Link>
                        </li>
						<li className=' flex items-end underline-custom'>
                            <Link to=''>Men </Link>
                            <DownOutlined className=' text-[10px]' />
						</li>
                        <li className=' flex items-end underline-custom'>
                            <Link to=''>Women </Link>
                            <DownOutlined className=' text-[10px]' />
						</li>
                       
                        <li className=' underline-custom'>
							<Link to=''>Contact us</Link>
                        </li>
                        
					</ul>
				</div>

				<div className='flex gap-4'>
					<UserOutlined style={{ fontSize: '24px' }} />
					<HeartOutlined style={{ fontSize: '24px' }} />
					<Badge count={5} showZero={false}>
						<ShoppingCartOutlined style={{ fontSize: '24px' }} />
					</Badge>
				</div>
			</header>
		</nav>
	);
};

export default Nav;
