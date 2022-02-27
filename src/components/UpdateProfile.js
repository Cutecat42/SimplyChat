import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile () {
    const emailRef = useRef()
    const currentPasswordRef = useRef()
    const newPasswordRef = useRef()
    const passwordConfirmRef = useRef()
    const { reLogin, login, currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            setLoading(true)
            await reLogin(currentUser.email, currentPasswordRef.current.value)
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            return setError("Please enter your current password")
        }

        if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
            setLoading(false)
            return setError("Passwords do not match")
        }

        setLoading(false)

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (newPasswordRef.current.value) {
            promises.push(login(currentUser.email, currentPasswordRef.current.value))
            promises.push(updatePassword(newPasswordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/Profile")
            })
            .catch((err) => {
                console.log(err)
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100 text-center" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        required
                                        defaultValue={currentUser.email}
                                    />
                                </Form.Group>
                                <Form.Group id="current-password">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={currentPasswordRef}
                                    />
                                </Form.Group>
                                <Form.Group id="new-password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={newPasswordRef}
                                        placeholder="Leave blank to keep the same"
                                    />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordConfirmRef}
                                        placeholder="Leave blank to keep the same"
                                    />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-2" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to="/">Cancel</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}