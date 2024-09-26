import ProductCard from './components/product-card/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import modules directly from 'swiper'
import 'swiper/swiper-bundle.css';

import 'swiper/swiper-bundle.css';
import { useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
import { LeftOutlined, MailOutlined, RightOutlined } from '@ant-design/icons';
import { AdminDashboardContext } from '../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../utils/context/admin-state-context/types/AdminTypes';

interface EmailSubscriberProps {
	email: string;
}

const HomeIndexPage = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const swiperRef = useRef<SwiperCore | null>(null);

	const {
		control,

		formState: { errors },
	} = useForm<EmailSubscriberProps>();

	const goToNextSlide = () => {
		swiperRef.current?.slideNext();
	};

	const goToPrevSlide = () => {
		swiperRef.current?.slidePrev();
	};
	return (
		<>
			<section className=' bg-banner bg-no-repeat justify-center px-12 flex-col bg-cover h-[90vh] w-full flex'>
				<div>
					<h1 className='  font-bold text-white text-4xl font-serrat'>
						The New Season
					</h1>
					<p className=' text-slate-100'>Stay Classy, Stay Luxurious</p>

					<button className="relative text-white mt-8 font-serrat pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F8B466]">
						SHOP NOW
					</button>
				</div>
			</section>
			<section className=' mt-5 px-12'>
				<h1 className=' text-2xl '>What's new</h1>
				<p>
					Discover the latest trends and freshest styles in our New Arrivals
					section. We're constantly updating with new releases every week, so be
					sure to check back often to stay ahead of the fashion curve. Find your
					next favorite look today!{' '}
				</p>

				<button className="relative  mt-8 font-serrat pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-main">
					SHOP NOW
				</button>

				<div className=' mt-12 flex gap-5'>
					{products?.slice(0, 4).map((product) => {
						const { id, name, price, category, photoURL } = product;
						return (
							<ProductCard
								key={id}
								name={name}
								price={price}
								category={category}
								photoURL={photoURL}
								id={id}
							/>
						);
					})}
				</div>
			</section>

			<section className=' h-[80vh] mt-24 px-12 grid md:grid-cols-2 grid-cols-1'>
				<div className=' flex flex-col justify-center'>
					<h1 className='  text-3xl font-serrat'>Get The Look</h1>
					<h5>
						Shop our exclusive bundle collection at unbeatable prices. Don't
						miss out on these amazing deals up to 30% off!
					</h5>

					<button className="relative w-[150px]  mt-8 font-serrat pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[150px] after:h-[2px] after:bg-[#f8b466]">
						SHOP NOW
					</button>
				</div>

				<div className='bg-slate-400 bg-hero bg-no-repeat bg-cover h-full flex text-center justify-center items-center '>
					+
				</div>
			</section>

			<main className=' mt-24'>
				<div className=' px-12 flex items-center'>
					<h1 className=' font-serrat text-3xl'>Curated Style & Collections</h1>

					<div className='ml-auto flex gap-5 text-slate-500 text-3xl'>
						<LeftOutlined onClick={goToPrevSlide} />
						<RightOutlined onClick={goToNextSlide} />
					</div>
				</div>

				<div className='mt-8 py-4'>
					<Swiper
						onSwiper={(swiper) => (swiperRef.current = swiper)} // Set the ref here
						modules={[Navigation, Pagination, Autoplay]} // Attach modules for navigation and pagination
						spaceBetween={5}
						slidesPerView={4}
						autoplay={{ delay: 3000, disableOnInteraction: false }}>
						{products?.map((product) => {
							const { id, name, price, category, photoURL } = product;
							return (
								<SwiperSlide key={id}>
									{' '}
									<ProductCard
										name={name}
										price={price}
										category={category}
										photoURL={photoURL}
										id={id}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</main>

			<section className=' mt-12 bg-slate-200 h-[40vh] px-12 grid md:grid-cols-2 grid-cols-1'>
				<div className=' flex flex-col gap-2 justify-center '>
					<h1 className=' font-bold font-serrat text-2xl'>
						SIGN UP TO STAY AHEAD
					</h1>
					<h5 className=' font-serrat text-xs'>
						Get 10% off your first order. Subscribe to our emails and stay ahead
						with the latest style news, promotions and exclusive drops.
					</h5>
				</div>

				<div className=' flex flex-col justify-center '>
					<form className='w-full px-24 flex  gap-2 '>
						<Controller
							name='email'
							control={control}
							rules={{
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email address',
								},
							}}
							render={({ field }) => (
								<Input
									size='large'
									className=' h-[50px] rounded-none bg-slate-100 border-black'
									placeholder='Enter your email address'
									prefix={<MailOutlined />}
									{...field}
								/>
							)}
						/>
						{errors.email && (
							<span className='text-red-500 text-sm'>
								{errors.email.message}
							</span>
						)}

						<Button
							className='py-5 rounded-none h-[50px] bg-main'
							htmlType='submit'
							type='primary'>
							Subscribe
						</Button>
					</form>
				</div>
			</section>
		</>
	);
};

export default HomeIndexPage;
