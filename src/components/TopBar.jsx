import { useState, useContext, useEffect } from "react";
import Login from "./Login.jsx";
import TopMenu from "./TopMenu.jsx";
import Register from "./Register.jsx";
const port = import.meta.env.VITE_API_BASE_URL
const apiUrl = `http://localhost:${port}`


export default function TopBar() {
    return (
        <div>
            <div>Logo</div>
            <div>
                <TopMenu />
            </div>
            <div>
                <Login />
            </div>
            <p>--OR--</p>
            <div><Register/></div>


        </div>
    )
}