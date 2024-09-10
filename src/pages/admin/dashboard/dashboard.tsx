import React, { useContext, useState } from 'react';
import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartFilled,
	ProductOutlined,

	TableOutlined,
	UserOutlined,
	
} from '@ant-design/icons';
import { Button,  Layout, Menu, MenuProps,  theme } from 'antd';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { Outlet, useNavigate } from 'react-router-dom';

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

	const navigate = useNavigate()

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
							onClick: () => navigate('/admin-dashboard')
						},
						{
							key: '2',
							icon: <ProductOutlined />,
							label: 'Products',
							style: { color: selectedKey === '2' ? 'blue' : '#fff' },
							onClick: () => navigate('/admin-dashboard/product')
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
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminDashboard;
