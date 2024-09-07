import { User } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"

export type AdminDashboardProps = {
    user: User| null,
    setUser: Dispatch<SetStateAction<User | null>>
}