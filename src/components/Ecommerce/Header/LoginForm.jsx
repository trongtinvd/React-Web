import { Link } from "react-router";
import './LoginForm.css';
import { useRef, useState } from "react";

function LoginForm({ className = '' }) {
    const [usernameRef, passwordRef, remembermeRef] = [useRef(), useRef(), useRef()];
    const [loggingIn, setLoggingIn] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
        rememberme: true,
    });

    function usernameHandle() {
        setForm(prev => ({
            ...prev,
            username: usernameRef.current.value,
        }))
    }

    function passwordHandle() {
        setForm(prev => ({
            ...prev,
            password: passwordRef.current.value,
        }))
    }

    function remembermeHandle() {
        setForm(prev => ({
            ...prev,
            rememberme: remembermeRef.current.checked,
        }))
    }

    function submitHandle(e) {
        e.preventDefault();
        
        
    }

    return (
        <form className={`LoginForm ${className}`} onSubmit={submitHandle}>
            <label className="LoginForm__username" htmlFor="username">Username: </label>
            <input className="LoginForm__unInput" type="text" name="username" id="username" ref={usernameRef} onChange={usernameHandle} value={form.username} />
            <label className="LoginForm__password" htmlFor="password">Password: </label>
            <input className="LoginForm__pwInput" type="password" name="password" id="password" ref={passwordRef} onChange={passwordHandle} value={form.password} />
            <label className="LoginForm__rememberme" htmlFor="rememberme">Remember me:
                <input type="checkbox" name="rememberme" id="rememberme" ref={remembermeRef} onChange={remembermeHandle} checked={form.rememberme} />
            </label>
            <button className="LoginForm__login" disabled={loggingIn}>{loggingIn ? 'Logging in...' : 'Login'}</button>
            <Link className="LoginForm__signup" to={'/ecommerce/signup'}>Signup</Link>
        </form>
    );
}

export default LoginForm;