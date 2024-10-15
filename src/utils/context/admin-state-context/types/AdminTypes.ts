import { User } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"
import { Product } from "./ProductTypes"

export type AdminDashboardProps = {
    AdminUser: User| null,
    setAdminUser: Dispatch<SetStateAction<User | null>>,
    products: Product[] | null;
    setProducts: Dispatch<SetStateAction<Product[] | null>>
}