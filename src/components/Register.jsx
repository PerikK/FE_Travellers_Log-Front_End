import { useState } from "react"
const port = 4000
const apiUrl = `http://localhost:${port}`

export default function Register({ onSuccess }) {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error)
      }
      setSuccess('User created!')
      setUserData({ username: '', password: '' })
      onSuccess() 
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
          value={userData.username}
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
          value={userData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  )
}
