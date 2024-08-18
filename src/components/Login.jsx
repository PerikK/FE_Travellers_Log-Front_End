import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { jwtDecode } from 'jwt-decode'

const port = 4000
const apiUrl = `http://localhost:${port}`

export default function Login({ onSuccess, initialFocusRef }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      const json = await response.json()
      if (json.token) {
        localStorage.setItem('jwt', json.token)
        const decodedToken = jwtDecode(json.token)

        const userResponse = await fetch(`${apiUrl}/users/${decodedToken.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${json.token}`,
          },
        })
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details')
        }
        
        const userData = await userResponse.json()
        setUser(userData.user)
        onSuccess()
        navigate(`/userpage?id=${userData.user.id}`)
      } else {
        setError(json.error)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="username"
          autoFocus={true}
          value={credentials.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        Login
      </button>
    </form>
  )
}
