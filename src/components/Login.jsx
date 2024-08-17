import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from '../utilities/url.js'

// const port = import.meta.env.VITE_PORT;
// const port = 4000
// const apiUrl = `http://localhost:${port}`;

export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate()
//     const { onLogin, error, setError } = useAuth();
//   const [formData, setFormData] = useState({ username: "", password: "" });


    const handleClick = (e) => {
        setError(null)
        setSuccess(null)
         setCredentials({ username: '', password: '' })
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials, [name]: value
        });  
        setSuccess(null)
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${url}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json()
            if (json.token) {
                localStorage.setItem("jwt", json.token)                
                setSuccess('User loged-in successfully!');
                setCredentials({ username: '', password: '' });
                setError(null);
                navigate(`/userpage?username=${credentials.username}`)
            } else {
                setError(json.error)
            }

        }catch (error) {
            setError(error.message);
        }
    }

    return (
                <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:<br />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            onClick={handleClick}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:<br />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'lightgreen' }}>{success}</p>}
        </div>
    )
}