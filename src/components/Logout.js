import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Logout = () => {
    const [error, setError] = useState("")
    const { logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setError("")

        async function fetchData () {
            try {
                await logout()
                navigate("/")
            } catch {
                setError("Failed to log out")
            }
        }
        fetchData();
    }, [])

    return "Logging out..."

}

export default Logout;