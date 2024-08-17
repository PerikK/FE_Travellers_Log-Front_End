import { useState, useContext, useEffect } from "react";
import TopBar from "../components/TopBar";


export default function LandingPage() {
    return (
        <>
            <div className="m-10 h-dvh grid grid-rows-2 grid-flow-col gap-5">
                <div className="col-span-2 row-span-1"><TopBar /></div>
                <div className="col-span-1"><p>PPPPPPP</p></div>
                <div className="col-span-1"><p>PPPPPPP</p></div>
            </div>
        </>
    )
}