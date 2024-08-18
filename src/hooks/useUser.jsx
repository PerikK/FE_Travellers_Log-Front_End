import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"

export default function useUser() {
    return useContext(UserContext)
}