import { useState, useContext, useEffect } from "react";

export default function TopMenu() {
    
    return (
        <ul className="text-4xl p-3 m-3 grid grid-cols-3">
            <li>Visited Locations</li>
            <li>Pictures</li>
            <li >Logs</li>
        </ul>
    )
}