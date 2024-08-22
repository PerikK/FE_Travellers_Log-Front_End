import { useState, useContext, useEffect } from "react";
import TopBar from "../components/TopBar";


export default function LandingPage() {
    return (
        <>
            <div className="m-10 h-dvh grid grid-rows-2 grid-flow-col gap-5">
                <div className="col-span-2 h-min border-2 border-green-800 rounded-md row-span-1"><TopBar /></div>
            </div>
        </>
    )
}