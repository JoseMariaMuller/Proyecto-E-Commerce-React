import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Admin() {
    const {user} = useAuthContext();

    if(!user){
        return(
            <Navigate to="/login" replace/>
        )
    }
    return(
        <div>
            <p>Componente Admin</p>
        </div>
    )
}