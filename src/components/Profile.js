import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Container } from "react-bootstrap";

function Profile () {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    let img;

    async function handleLogout () {
        setError("");

        try {
            await logout()
            navigate("/")
        } catch {
            setError("Failed to log out")
        }
    };

    if (!currentUser.photoURL) {
        img = "https://img.freepik.com/free-vector/realistic-galaxy-background_23-2148991322.jpg?size=626&ext=jpg"
    }
    else {
        img = `${currentUser.photoURL}`
    };

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
                            <h2 className="text-center mb-3">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong >Username:</strong> {currentUser.displayName}
                            <br></br>
                            <strong>Email:</strong> {currentUser.email}
                            <Link to="/Update-profile" className="btn btn-primary w-100 mt-3">
                                Update Profile
                            </Link>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2" style={{ maxWidth: "400px" }}>
                        <Button variant="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </div>

            </Container>
        </>
    )
};

export default Profile;