import { useState } from "react";

// const port = import.meta.env.VITE_PORT;
const port = 4000
const apiUrl = `http://localhost:${port}`;

export default function Register() {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData, [name]: value
        });
        setSuccess(null)
        setError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${apiUrl}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error);
            }

            setSuccess('User created!');

            setUserData({ username: '', password: '' });


        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:<br />
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:<br />
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}