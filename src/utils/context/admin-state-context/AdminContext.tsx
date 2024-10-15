import React, { createContext, useState } from "react"
import { AdminDashboardProps } from "./types/AdminTypes"
import { User } from "firebase/auth"
import { Product } from "./types/ProductTypes"


export const AdminDashboardContext = createContext<AdminDashboardProps | null>(null)

const AdminDashboardProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
    const [AdminUser, setAdminUser] = useState<User | null>(null)
    const [products, setProducts] = useState<Product[] | null>(null)

    const contextValues = {
        AdminUser,
        setAdminUser,
        products,
        setProducts
    }

    return (
        <AdminDashboardContext.Provider value={contextValues} >{ children}</AdminDashboardContext.Provider>
    )
    
}

export default AdminDashboardProvider;





