import React, { useEffect, useState } from 'react';
import styles from '../Account/account.module.css'; // CSS modülünü import ediyoruz
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';
function Account() {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    async function handleSubmitSignIn(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const response = await axios.post("https://localhost:7038/api/Account/Login/", {
            email: email,
            name: name,
            password: password,
        });
        try {
            if (response.status === 200) {
                console.log("Ok", response.data);
                console.log(document.body);
                if (response.data.token) {
                    localStorage.setItem("authToken", response.data.token)
                }
                navigate("/#");
            }
            if (response.status === 401) {
                return (<div><p>Cix Bayra</p></div>)
            }
            else {
                console.log("error");
                setError("Error, please try again");
            }
        }

        catch {
            console.log("error issue")
        }
        finally {
            setLoading(false);
        }
    }

    async function Register(e) {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post("https://localhost:7038/api/Account/Register", {
            email: email,
            password: password,
            name:name,
        })
        try {
            if (response.status === 200) {
                console.log("ok", response.data);
                navigate("/#")
            }
            else {
                console.log("error");
                setError("Error");
            }
        }
        catch {
            console.log("error")
        }
        finally {
            setLoading(false)
        }
    }

    //document.body.style.minWidth = "800px";
    //document.body.style.backgroundColor = "#c9d6ff";
    //document.body.style.background = "linear-gradient(to right, #e2e2e2, #c9d6ff)"
    //document.body.style.display = "flex";
    //document.body.style.alignItems = "center";
    //document.body.style.justifyContent = "center";
    //document.body.style.flexDirection = "column";
    //document.body.style.height = "100vh";

    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
            {isActive ? (
                <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                    <form onSubmit={Register}>
                        <h1>Create Account</h1>
                        <div className={styles['social-icons']}>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" value={name} onChange={(n) => setName(n.target.value)} />
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/*//change email */}
                        <input type="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            ) : (
                <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                    <form onSubmit={handleSubmitSignIn}>
                        <h1>Sign In</h1>
                        <div className={styles['social-icons']}>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="#" className={styles.icon}><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>
                        <span>or use your email password</span>
                        <input type="text" placeholder="Name" value={name} onChange={(n) => setName(n.target.value)} />
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(p) => setPassword(p.target.value)} />
                        <a href="#">Forget Your Password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            )}

            <div className={styles['toggle-container']}>
                <div className={styles.toggle}>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={handleLoginClick} className={styles.hidden} id="login">
                            Sign In
                        </button>
                    </div>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button onClick={handleRegisterClick} className={styles.hidden} id="register">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
