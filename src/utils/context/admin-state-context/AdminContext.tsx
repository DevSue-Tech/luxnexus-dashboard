import React, { createContext, useState } from "react"
import { AdminDashboardProps } from "./types/AdminTypes"
import { User } from "firebase/auth"


export const AdminDashboardContext = createContext<AdminDashboardProps | null>(null)

const AdminDashboardProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const contextValues = {
        user,
        setUser
    }

    return (
        <AdminDashboardContext.Provider value={contextValues} >{ children}</AdminDashboardContext.Provider>
    )
    
}

export default AdminDashboardProvider;





