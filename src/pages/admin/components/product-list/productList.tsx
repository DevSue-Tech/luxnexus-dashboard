import React, { useContext, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { Product } from '../../../../utils/context/admin-state-context/types/ProductTypes';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../utils/firebase/auth/firebaseAuth';

interface DataType {
	id: string;
	name: string;
	price: number;
	photoURL: string;
	category: string;
	status: string[];
}

const defaultImage = 'https://via.placeholder.com/150';

const mapProductsToDataType = (products: Product[]): DataType[] => {
	return products.map((product) => ({
		key: product.id,
		id: product.id,
		name: product.name,
		price: product.price,
		photoURL: product.photoURL || defaultImage,
		category: product.category,
		status: Array.isArray(product.status) ? product.status : [product.status],
	}));
};


const ProductList: React.FC = () => {
  const { products, setProducts } = useContext(AdminDashboardContext) as AdminDashboardProps;
  const navigate = useNavigate(); // Define useNavigate outside the render function
  const data: DataType[] = products ? mapProductsToDataType(products) : [];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(updatedProducts);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Columns for the table, including the fixed Edit button
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, { photoURL }) => (
        <img src={photoURL} alt='Product' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            const color = tag === 'OUT-OF-STOCK' ? 'volcano' : 'green';
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => navigate(`/admin-dashboard/product/edit-product/${record.id}`)} // Navigate to edit page with product id
            className=' bg-main px-3 py-2 text-white rounded-lg'>
            Edit
          </a>
          <a className=' bg-red-500 px-3 py-2 text-white rounded-lg'>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='w-full flex mb-5'>
        <h1 className='text-main font-bold'>List of all Products</h1>
        <button
          onClick={() => navigate('/admin-dashboard/product/add-new-product')}
          className='ml-auto rounded-lg right-5 px-3 py-2 bg-main text-white'>
          <PlusCircleOutlined className='text-white' /> Add New Product
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => navigate(`/admin-dashboard/product/edit-product/${record.id}`),
        })}
      />
    </>
  );
};

export default ProductList;

