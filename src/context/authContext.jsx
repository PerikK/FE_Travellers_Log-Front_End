import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { login, register } from "../utilities/apiClient.js";
import ERR from '../utilities/errors.js'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      navigate(location?.pathname || "/");
    }
  }, [location?.pathname]);

  const handleLogin = async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error(ERR.ENTER_USERNAME_PASSWORD);
      }
      const res = await login(username, password);

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate(location.state?.from?.pathname || "/");
        setError(null);
        return;
      }
      setUser({ ...res.data.user });
      setError(ERR.LOGIN_FAILED);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const handleRegister = async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error(ERR.ENTER_USERNAME_PASSWORD);
      }
      if (!validatePassword(password)) {
        throw new Error(ERR.PASSWORD_REQUIRMENTS);
      }
      const res = await register(username, password);
      if (res.data.error) {
        setError(res.data.error);
        return;
      }
      localStorage.setItem("token", res.data.token);
      setUser({ ...res.data.user });
      setToken(res.data.token);
      setError(ERR.REGISTRATION_FAILED);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUppercase && hasNumber && hasSpecialCharacter
}

export { AuthContext, AuthProvider};
