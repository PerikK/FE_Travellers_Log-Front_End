import { createContext, useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import jwt_decode from 'jwt-decode'
import { getUser } from '../utilities/apiClient'

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const { token, user } = useAuth()
    const [currentUser, setCurrentUser] = useState(null)
    const location = useLocation()

    useEffect(() => {
        async function getUserFromToken() {
            const { userId } = jwt_decode(token)
            const userDetails = await getUser(userId)

            if (userDetails.status === 'success') {
                setCurrentUser({ ...userDetails.data.user })
                return
            }

            setCurrentUser(null)
            return
        }
        if (token) {
            getUserFromToken()
        }
    }, [token, user, location.pathname])


  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};