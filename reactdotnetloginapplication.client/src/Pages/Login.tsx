import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        }

        if (name === "password") {
            setPassword(value);
        }

        if (name === "rememberMe") {
            setRememberMe(event.target.checked);
        }
    };

    const handleRegisterClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submission triggers
        navigate("/register");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        }
        else {
            // clear error message
            setError("");
            // post data to the /register api

            var loginurl = "";

            if (rememberMe == true) {
                loginurl = "/login?useCookies=true";
            }
            else
                loginurl = "/login?useSessionCookies=true";

            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }).then((data) => {
                // handle success or error from the server
                console.log(data);
                if (data.ok) {
                    setError("Successful Login.");
                    window.location.href = '/';
                }
                else {
                    setError("Error Logging In.");
                }
            }).catch((error) => {
                // handle network error
                console.error(error);
                setError("Error Logging in.");
            });
        }
    }

    return (
        <div className="containerbox">
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>Login</h3>

            <form onSubmit={handleSubmit}>
                {/* Group 1: Email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" />
                </div>

                {/* Group 2: Password */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} placeholder="Enter your password" />
                </div>

                {/* Group 3: Checkbox */}
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={handleChange} style={{ width: 'auto', marginTop: 0 }} />
                    <label htmlFor="rememberMe" style={{ marginBottom: 0, fontWeight: 'normal' }}>Remember Me</label>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button type="submit">Login</button>
                    <button type="button" className="secondary" onClick={handleRegisterClick}>
                        Register
                    </button>
                </div>
            </form>

            {
                error && <p className="error" style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
            }
        </div>
    );
}

export default Login;