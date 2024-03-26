import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { authCreateAccountWithEmail, userLogin, signInWithGoogle, auth, provider } from "../api"
import google from "../assets/images/google.png"


export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    const emailUser = loginFormData.email
    const passwordUser = loginFormData.password
    const googleAuth = auth
    const googleProvider = provider
    const from = location.state?.from || "/"


    // Sign In 
    function handleLogin(e) {
        e.preventDefault();
        userLogin(emailUser, passwordUser)
            .then((userCredential) => {
                const user = userCredential.user;
                setError(null);
                localStorage.setItem("loggedIn", true);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                if (err.code === "auth/invalid-credential") {
                    setError("The email or password you entered is incorrect.");
                }else if(err.code === "auth/invalid-email"){
                    setError("Invalid-email!") 
                
                }else {
                    setError(err.message);
                }
            })
            .finally(() => {
                setStatus("idle");
            });
    }

    // Sign in with google

    function googleSignIn(e) {
        e.preventDefault()
        signInWithGoogle(googleAuth, googleProvider)
        .then(() =>{
                 setError(null);
                localStorage.setItem("loggedIn", true);
                navigate(from, { replace: true });
        })
        .catch((err) =>{
            setError(err)
        }) 
        .finally(() =>{
            setStatus("idle")
        })
            
    }

    // Create Account

    function handleSubmit(e) {
        e.preventDefault()
        
        authCreateAccountWithEmail(emailUser, passwordUser)

        .then((userCredential) => {
            setStatus("submitting")
            const user = userCredential.user
            setError(null)
            localStorage.setItem("loggedIn", true)
            navigate(from, { replace: true })
        }
        )

        .catch((err) => {
            if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            }else if(err.code === "auth/invalid-email"){
                setError("Invalid-email!")
            }else if(err.code === "auth/email-already-in-use"){
                setError("You already have an account Log in now!")
            } else {
                setError(err.message);
            }
        })

            .finally(() => {
                setStatus("idle")
            })
    }

    

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {
                location.state?.message &&
                    <h3 className="login-error">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            {
                error &&
                    <h3 className="login-error">{error}</h3>
            }

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    required
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    required
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />

                <button
                onClick={handleSubmit}>
                    Create Account
                </button>
                <button onClick={handleLogin}>
                    Log in
                </button>
                <button onClick={googleSignIn} className="google-btn">
                    <img className="google-image" src={google} />
                    Sign in with Google
                </button>
            </form>
            
            
        </div>
    )

}