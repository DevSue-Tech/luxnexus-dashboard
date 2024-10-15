import { Button, Input } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

import { E164Number } from 'libphonenumber-js/core';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

type UserLoginProps = {
	firstName: string;
	lastName: string;
	phoneNo: string;
	dob: string;
};

const PersonalInformation = () => {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState<E164Number | undefined>(undefined);

	const navigate = useNavigate();

	const { control, handleSubmit } = useForm<UserLoginProps>();

	const UpdateProfile = async (data: UserLoginProps) => {
		setLoading(true);
		const { firstName, lastName, dob, phoneNo } = data;

		console.log(data, 'dhdjdh');
	};

	return (
		<section className='flex flex-col font-main py-12 md:py-24 px-12 md:px-24 w-full h-auto'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Bounce}
			/>
			{/* Same as */}
			<ToastContainer />

			<div>
				<h1 className=' text-3xl font-serrat font-bold text-main'>
					Personal Information
				</h1>
			</div>

			<form
				onSubmit={handleSubmit(UpdateProfile)}
				className='w-[100%] flex md:flex-row md:flex-wrap flex-col gap-5 mt-12'>
				<Controller
					name='firstName'
					control={control}
					rules={{
						required: 'Firstname is required',
					}}
					render={({ field }) => (
						<div className=' font-serrat gap-2 flex flex-col'>
							<label className=' text-sm font-bold' htmlFor='firstName'>
								Firstname
							</label>
							<Input
								size='large'
								placeholder='Enter your first name'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='lastName'
					control={control}
					rules={{
						required: 'lastName is required',
					}}
					render={({ field }) => (
						<div className=' font-serrat gap-2 flex flex-col'>
							<label className=' text-sm font-bold' htmlFor='firstName'>
								Lastname
							</label>
							<Input
								size='large'
								placeholder='Enter your last name'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='phoneNo'
					control={control}
					rules={{
						required: 'lastName is required',
					}}
					render={() => (
						<div className='font-serrat gap-2 flex flex-col'>
							<label className='text-sm font-bold' htmlFor='lastName'>
								Phone No
							</label>
							<div className='flex items-center border border-gray-300 rounded px-2 py-1'>
								<PhoneInputWithCountrySelect
									country='NG'
									value={value}
									onChange={setValue}
									className='w-full focus:outline-none'
								/>
							</div>
						</div>
					)}
				/>

				<Controller
					name='dob'
					control={control}
					rules={{
						required: 'lastName is required',
					}}
					render={({ field }) => (
						<div className=' font-serrat gap-2 flex flex-col'>
							<label className=' text-sm font-bold' htmlFor='firstName'>
								Date of birth
							</label>
							<input
								className=' border py-1 px-2 rounded-lg'
								type='date'
								{...field}
							/>
						</div>
					)}
				/>
				<Button
					className='py-5 mt-12 bg-main W-[100%] md:w-[20%] hover:bg-black'
					htmlType='submit'
					type='primary'
					loading={loading}>
					Update profile
				</Button>
			</form>
		</section>
	);
};

export default PersonalInformation;
