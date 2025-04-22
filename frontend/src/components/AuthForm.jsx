import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";
import "../styles/AuthForm.css";


const AuthForm = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await api.post(route, { username, password });

            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/chats");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Invalid credentials");
                } else if (error.response.status === 400) {
                    setError("username already exists");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } else if (error.request) {
                setError("Network error. Please check your internet connection.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="auth-form-container">
            {loading && (
                <div className="loading-indicator">
                    {error ? <span className="error-message">{error}</span> : <div className="spinner"></div>}
                </div>
            )}
            {!loading && (
                <div className="auth-form-wrapper">
                    <form onSubmit={handleSubmit} className="auth-form">
                        {method === 'register' && (
                            <p className="info-text">⚠️</p>
                        )}
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="username" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Joshyvibe" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)} // Fix added here
                                placeholder="Enter your password"
                                required 
                            />
                        </div>

                        <button type="submit" className="form-button">
                            {method === 'register' ? 'Register' : 'Login'}
                        </button>
                        {method === 'login' && (
                            <p className="toggle-text">Don't have an account? 
                            <span className="toggle-link" onClick={() => navigate("/register")}> Register</span></p>
                        )}
                        {method === 'register' && (
                            <p className="toggle-text">Already have an account? 
                            <span className="toggle-link" onClick={() => navigate("/login")}> Login</span></p>
                        )}
                        {method === 'login' && (
                            <p className="toggle-text">
                                Forgot your password? 
                                <span className="toggle-link" onClick={() => navigate("/password-reset")}> Reset Password</span>
                            </p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default AuthForm;