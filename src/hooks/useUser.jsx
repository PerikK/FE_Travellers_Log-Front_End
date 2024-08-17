import { useContext } from "react";
import { CurrentUserContext } from "../context/userContext";

const useUser = () => {
    return useContext(CurrentUserContext)
}

export default useUser