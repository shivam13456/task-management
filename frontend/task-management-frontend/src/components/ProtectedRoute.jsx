import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    return isLoggedIn ? children : <Navigate to = "/" replace />
}

export default ProtectedRoute