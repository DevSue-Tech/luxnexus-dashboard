import React, { useContext, useState } from 'react';
import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartFilled,
	ProductOutlined,
	ShoppingCartOutlined,
	TableOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Col, Layout, Menu, MenuProps, Row, theme } from 'antd';
import RecentOrdersTable from '../components/recent-orders/recentOrders';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const [selectedKey, setSelectedKey] = useState('1');
	const { user } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		setSelectedKey(e.key);
	};

	return (
		<Layout className=' w-screen h-screen font-main'>
			<Sider
				style={{ background: '#2078F9', color: '#2078F9' }}
				className=' py-10'
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<div className='demo-logo-vertical' />

				<Menu
					className='hover:text-blue-800 font-bold'
					style={{ background: 'none', color: '#fff' }}
					mode='inline'
					selectedKeys={[selectedKey]}
					onClick={handleMenuClick}
					items={[
						{
							key: '1',
							icon: <PieChartFilled />,
							label: 'Dashboard',
							style: { color: selectedKey === '1' ? 'blue' : '#fff' },
						},
						{
							key: '2',
							icon: <ProductOutlined />,
							label: 'Products',
							style: { color: selectedKey === '2' ? 'blue' : '#fff' },
						},
						{
							key: '3',
							icon: <UserOutlined />,
							label: 'Users',
							style: { color: selectedKey === '3' ? 'blue' : '#fff' },
						},
						{
							key: '4',
							icon: <TableOutlined />,
							label: 'Inventory',
							style: { color: selectedKey === '4' ? 'blue' : '#fff' },
						},
						{
							key: '5',
							icon: <LogoutOutlined />,
							label: 'Logout',
							style: {
								color: selectedKey === '4' ? 'blue' : '#fff',
								position: 'absolute',
								bottom: '15px',
							},
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					className=' flex pl-0  '
					style={{ background: colorBgContainer }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>

					<h1 className=' font-bold font-main text-main'>
						LuxNexus Admin Control
					</h1>

					<h5 className=' ml-auto text-main font-bold'>
						Welcome{' '}
						{user && typeof user.displayName === 'string'
							? user.displayName
							: 'Guest'}
					</h5>
				</Header>
				<Content
					className=' overflow-scroll'
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}>
					<Row className='w-full font-main flex gap-6 flex-wrap'>
						<Col className=' w-[20%] bg-slate-200 rounded-2xl gap-1 h-[100px] flex flex-col justify-center items-center'>
							<h5 className=' text-gray-500 text-xs font-bold'>Total Users</h5>
							<UsergroupAddOutlined className=' text-4xl text-main' />

							<h1 className=' text-gray-500 font-bold'>100</h1>
						</Col>
						<Col className='w-[50%] gap-2 bg-slate-200 rounded-2xl h-[120px] flex flex-col justify-center items-center'>
							<h5 className=' text-gray-500 text-xs font-bold'>
								Annual Revenue
							</h5>
							<PieChartFilled className=' text-4xl text-main' />
							<h1 className=' text-gray-500 font-bold'>$10k+ in sales</h1>
						</Col>
						<Col className=' w-[20%] bg-slate-200 rounded-2xl h-[100px] flex flex-col justify-center items-center'>
							<h5 className=' text-gray-500 text-xs font-bold'>Orders</h5>
							<ShoppingCartOutlined className=' text-4xl text-main' />

							<h1 className=' text-gray-500 font-bold'>20</h1>
						</Col>
					</Row>

					<section className=' mt-24 font-main flex flex-col gap-4'>
						<h1 className=' font-bold text-main'>Recent Orders from Store</h1>

						<RecentOrdersTable />
					</section>
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminDashboard;
