import { useState, useContext, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

const port = 4000
const apiUrl = `https://be-travellers-log-back-end.vercel.app`

const UserContext = createContext(
//     {
//     user: null,
//     setUser: () => {},
//     logout: () => {}
// }
)

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.id
            const fetchUser = async () => {
                try {
                    const response = await fetch(`${apiUrl}/users/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (!response.ok) throw new Error('Failed to fetch user')
                    
                    const data = await response.json()
                    setUser(data.user)
                } catch (error) {
                    console.error('Error restoring user session:', error)
                    localStorage.removeItem('jwt')
                }
            }
            fetchUser()
        }
    }, [])
    
    const logout = () => {
        localStorage.removeItem('jwt')
        setUser(null)
        navigate('/')
    }
    
    const value = {
        user,
        setUser,
        logout,
    }
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
