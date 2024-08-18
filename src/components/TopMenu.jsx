import { useState, useContext, useEffect } from "react";

export default function TopMenu() {
    
    return (
        <ul>
            <li>Visited Location</li>
            <li>Pictures</li>
            <li className="text-3xl font-bold underline">Logs</li>
        </ul>
    )
}