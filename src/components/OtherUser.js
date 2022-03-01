import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate, useLocation } from "react-router-dom"

function Profile ({ uid }) {
    const [error, setError] = useState("")

    const navigate = useNavigate()
    // let img;
    const location = useLocation()
    const user = location.state.user

    console.log(user, "Other")


    let img = user.photoURL;


    return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100 text-center" style={{ maxWidth: "400px" }}>
                    <Card>
                        <img
                            src={img}
                            alt="Profile"
                            className="rounded-circle img-fluid profile-picture mb-2 mt-2 mb-md-0 mx-auto"
                            style={{ width: "300px", height: "300px" }}
                        />
                        <Card.Body>
                            <h2 className="text-center mb-3">{user.user}'s Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong >Username:</strong> {user.user}
                            <br></br>

                        </Card.Body>
                    </Card>


                </div>


            </Container>
        </>
    )
}

export default Profile;