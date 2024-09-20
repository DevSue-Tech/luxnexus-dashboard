import { UploadOutlined } from '@ant-design/icons';
import {
	Button,
	Input,
	InputNumber,
	Select,
	Upload,
	UploadFile,
	Image,
} from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/auth/firebaseAuth'; // Update the path to your Firebase config
import { storage } from '../../../utils/firebase/firebaseConfig';

interface AddNewProductProps {
	name: string;
	description: string;
	price: number;
	category: string;
	status: string;
	photo: UploadFile<unknown> | string | null; // Accept string for URLs
}

const ProductCategory = [
	'Clothes',
	'Shoes',
	'Perfumes',
	'Bags',
	'Beanies',
	'Wrist watch',
];
const ProductStatus = ['IN-STOCK', 'OUT-OF-STOCK'];

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { control, handleSubmit, setValue } = useForm<AddNewProductProps>();
	const [preview, setPreview] = useState<string | null>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]); // Store the file list for the upload component
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState<AddNewProductProps | null>(null);

	useEffect(() => {
		// Fetch the product data from Firestore
		const fetchProduct = async () => {
			const productRef = doc(db, 'products', id as string);
			const productDoc = await getDoc(productRef);
			if (productDoc.exists()) {
				const productData = productDoc.data() as AddNewProductProps;
				setProduct(productData);

				// Pre-fill form fields
				setValue('name', productData.name);
				setValue('description', productData.description);
				setValue('price', productData.price);
				setValue('category', productData.category);
				setValue('status', productData.status);

				// Set preview image if it exists
				if (typeof productData.photo === 'string') {
					setPreview(productData.photo); // This is just for the preview
				}
			} else {
				toast.error('Product not found');
			}
		};

		fetchProduct();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<AddNewProductProps> = async (data) => {
		setLoading(true);
		try {
			const productRef = doc(db, 'products', id as string);

			// Initialize photoURL with the existing photo URL
			let photoURL = preview; // Retain the current photo URL if no new image is uploaded

			// If a new file is uploaded, upload it to Firebase Storage
			if (fileList.length > 0 && fileList[0].originFileObj) {
				const file = fileList[0].originFileObj as File;
				const storageRef = ref(storage, `products/${id}/${file.name}`);
				const uploadTask = await uploadBytes(storageRef, file);
				photoURL = await getDownloadURL(uploadTask.ref); // Get the new photo URL
			}

			// Prepare the updated product data
			const updatedProduct = {
				name: data.name || product?.name,
				description: data.description || product?.description,
				price: data.price || product?.price,
				category: data.category || product?.category,
				status: data.status || product?.status,
				photoURL: photoURL, // Keep the original photo unless a new one is uploaded
			};

			// Update the Firestore document with the new product data
			await updateDoc(productRef, updatedProduct);

			toast.success('Product updated successfully!');
			navigate('/admin-dashboard/product');
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error('Failed to update product.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<ToastContainer transition={Bounce} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-5 mt-12'>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Name of Product</label>
							<Input
								className='w-[40%]'
								size='large'
								placeholder='Enter product name'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Description</label>
							<Input.TextArea
								rows={4}
								className='w-[60%]'
								size='large'
								placeholder='Enter product description'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='category'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Category</label>
							<Select
								className='w-[20%]'
								size='large'
								placeholder='Select a category'
								{...field}>
								{ProductCategory.map((cat) => (
									<Select.Option key={cat} value={cat}>
										{cat}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='price'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Price</label>
							<InputNumber
								className='w-[40%]'
								size='large'
								placeholder='Enter product price'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='status'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Status</label>
							<Select
								className='w-[20%]'
								size='large'
								placeholder='Select status'
								{...field}>
								{ProductStatus.map((status) => (
									<Select.Option key={status} value={status}>
										{status}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='photo'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Upload Photo</label>
							<Upload
								listType='picture'
								accept='image/*'
								beforeUpload={() => false} // Prevent automatic upload
								fileList={fileList} // Show uploaded file
								onChange={({ fileList }) => {
									setFileList(fileList); // Update the file list when a file is selected
									field.onChange(fileList); // Ensure the form field is updated
								}}
								onRemove={() => {
									setFileList([]); // Clear the file list if the user removes the photo
									field.onChange(null); // Update form field when removed
								}}>
								<Button icon={<UploadOutlined />}>Select Photo</Button>
							</Upload>

							{/* Display the preview only if there's a preview URL and no files in the list */}
							{preview && !fileList.length && (
								<Image
									src={preview}
									alt='Uploaded Preview'
									style={{ marginTop: '10px', width: '200px' }}
									preview={false}
								/>
							)}
						</div>
					)}
				/>

				<Button type='primary' htmlType='submit' loading={loading}>
					Update Product
				</Button>
			</form>
		</div>
	);
};

export default EditProduct;
