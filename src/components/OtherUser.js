import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Alert, Container } from "react-bootstrap";

function Profile ({ }) {
    const [error, setError] = useState("");

    const location = useLocation();
    const user = location.state.user;

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
};

export default Profile;