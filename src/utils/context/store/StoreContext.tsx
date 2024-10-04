import { createContext, useState } from 'react';
import { Cart } from './types/CartTypes';
import { StoreProps } from './StoreProps';

export const StoreContext = createContext<StoreProps | null>(null);

const StoreContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cartItems, setCartItems] = useState<Cart[] | null>(null);
	const [openCart, setOpenCart] = useState(false)

	const storeContextValues = {
		cartItems,
		setCartItems,
		openCart,
		setOpenCart
	};

	return (
		<StoreContext.Provider value={storeContextValues}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;