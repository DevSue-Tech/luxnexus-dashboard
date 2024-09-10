import { collection, getDocs } from "firebase/firestore";
import { Product } from "../../context/admin-state-context/types/ProductTypes";
import { firestore } from "../firebaseConfig";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id } as Product);
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};