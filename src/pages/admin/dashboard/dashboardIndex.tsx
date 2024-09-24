import { Row, Col } from 'antd';
import {
	UsergroupAddOutlined,
	PieChartFilled,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import RecentOrdersTable from '../components/recent-orders/recentOrders';

const DashboardIndex = () => {
	return (
		<div>
			<Row className='w-full font-main flex gap-6 flex-wrap'>
				<Col className=' w-[20%] bg-orange-100 rounded-2xl gap-1 h-[100px] flex flex-col justify-center items-center'>
					<h5 className=' text-gray-500 text-xs font-bold'>Total Users</h5>
					<UsergroupAddOutlined className=' text-4xl text-main' />

					<h1 className=' text-gray-500 font-bold'>100</h1>
				</Col>
				<Col className='w-[50%] gap-2 bg-orange-100 rounded-2xl h-[120px] flex flex-col justify-center items-center'>
					<h5 className=' text-gray-500 text-xs font-bold'>Annual Revenue</h5>
					<PieChartFilled className=' text-4xl text-main' />
					<h1 className=' text-gray-500 font-bold'>$10k+ in sales</h1>
				</Col>
				<Col className=' w-[20%] bg-orange-100 rounded-2xl h-[100px] flex flex-col justify-center items-center'>
					<h5 className=' text-gray-500 text-xs font-bold'>Orders</h5>
					<ShoppingCartOutlined className=' text-4xl text-main' />

					<h1 className=' text-gray-500 font-bold'>20</h1>
				</Col>
			</Row>

			<section className=' mt-24 font-main flex flex-col gap-4'>
				<h1 className=' font-bold text-main'>Recent Orders from Store</h1>

				<RecentOrdersTable />
			</section>
		</div>
	);
};

export default DashboardIndex;
