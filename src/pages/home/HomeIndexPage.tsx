const HomeIndexPage = () => {
	return (
        <>
        	<section className=' bg-hero bg-no-repeat justify-center px-12 flex-col bg-cover h-[90vh] w-full flex'>
			<div>
				<h1 className='  font-bold text-white text-4xl font-serrat'>
					The New Season
				</h1>
				<p className=' text-slate-300'>Stay Classy, Stay Luxurious</p>

				<button className="relative text-white mt-8 font-serrat pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#2078F9]">
					SHOP NOW
				</button>
			</div>
            </section>
            <section className=" mt-5 px-12">
                <h1 className=" text-2xl ">What's new</h1>
                <p >Discover the latest trends and freshest styles in our New Arrivals section. We're constantly updating with new releases every week, so be sure to check back often to stay ahead of the fashion curve. Find your next favorite look today! </p>

                <button className="relative  mt-8 font-serrat pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#0008]">
					SHOP NOW
				</button>
            </section>
        </>
	);
};

export default HomeIndexPage;
