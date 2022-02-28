import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup (email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login (email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function reLogin (email, password) {
        try {
            const credential = EmailAuthProvider.credential(
                email,
                password
            );
            return reauthenticateWithCredential(currentUser, credential).then(() => {
                // User re-authenticated.
                // Code...
            });
        } catch (error) {

        }
    }

    function logout () {
        return auth.signOut()
    }

    function resetPassword (email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail (email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword (password) {
        return currentUser.updatePassword(password)
    }

    function updateName (name) {
        return currentUser.updateProfile({
            displayName: name,
        }).then(function () {

        }, function (error) {
            // An error happened.
        });
    }

    function updateUrl (url) {
        return currentUser.updateProfile({
            photoURL: url
        }).then(function () {

        }, function (error) {
            // An error happened.
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        reLogin,
        updateName,
        updateUrl
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;