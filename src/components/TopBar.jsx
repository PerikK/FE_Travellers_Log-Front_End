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
                <img src="../src/assets/img/favicon-32x32.png" alt="F-L Logo" className="w-20 m-4"/>
                <div>
                    <h2 className="text-3xl p-3 m-3">Welcome to the Traveller's Log. <br/>You can Log In or create you new account</h2>
                </div>
                <div className="grid grid-cols-2">
                    <button
                        onClick={openLoginModal}
                        className="m-5 h-3/6 bg-blue-500 text-white rounded-lg"
                    >
                        Login
                    </button>
                    <button
                        onClick={openRegisterModal}
                        className="m-5 h-3/6 bg-green-500 text-white rounded-lg shadow-lg"
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
                <img src="../src/assets/img/favicon-32x32.png" alt="F-L Logo" className="w-24 m-4"/>
                <div>
                    <TopMenu />
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={logout}
                        className="mx-16 my-6 h-3/6 w-3/5 bg-red-500 text-white shadow-lg rounded-lg"
                        >
                        Logout
                    </button> 
                </div>
            </>
        )
    }

    return (        
            <div className="h-32 w-full p-1 border-3 border-Miro-orange_brown rounded-3xl grid grid-cols-[1fr_5fr_2fr] align-center  bg-DAmico_blue shadow-md">
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
