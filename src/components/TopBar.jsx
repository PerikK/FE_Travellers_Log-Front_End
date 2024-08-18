import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser.jsx"
import Login from "./Login.jsx"
import TopMenu from "./TopMenu.jsx"
import Register from "./Register.jsx"
import LoginRegisterModal from "./LoginRegisterModal.jsx"

export default function TopBar() {
    const { user, logout } = useUser()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const openLoginModal = () => {
        setIsLoginModalOpen(true)
        setIsRegisterModalOpen(false)
    }

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true)
        setIsLoginModalOpen(false) 
    }

    const visitorsTopBar = () => {
        return (
            <>
                <div>Logo</div>
                <div>
                    <h2>`Welcome to the Traveller's Log. You can Log In or create you new Account`</h2>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={openLoginModal}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Login
                    </button>
                    <p>--OR--</p>
                    <button
                        onClick={openRegisterModal}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                        Register
                    </button>
                </div>
            </>
        )
    }

    const usersTopBar = () => {
        return (
            <>
                <div>Logo</div>
                <div>
                    <TopMenu />
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={logout}
                        className="mx-12 px-14 py-2 bg-red-500 text-white rounded-lg"
                        >
                        Logout
                    </button> 
                </div>
            </>
        )
    }

    return (        
            <div className="h-28 grid grid-cols-3 items-center p-4 bg-gray-200 shadow-md">
                {!user
                    ? visitorsTopBar()
                    : usersTopBar()
                }             
                <LoginRegisterModal
                    show={isLoginModalOpen}
                    handleClose={() => setIsLoginModalOpen(false)}
                    title="Login"
                >
                    <Login onSuccess={() => setIsLoginModalOpen(false)} />
                </LoginRegisterModal>
                <LoginRegisterModal
                    show={isRegisterModalOpen}
                    handleClose={() => setIsRegisterModalOpen(false)}
                    title="Register"
                >
                    <Register onSuccess={() => setIsRegisterModalOpen(false)} />
                </LoginRegisterModal>
            </div>      
    )
}
