import { useEffect, useRef, useState } from 'react';
import './SignupPage.css';
import MyLogger from '../../../assets/utils/MyLogger.js';
import { useNavigate } from 'react-router';

function SignupPage({ className = '' }) {
    const [username, setUsername] = useState('Nicolas');
    const [password, setPassword] = useState('1234');
    const [email, setEmail] = useState('nico@gmail.com');
    const [avatar, setAvatar] = useState('https://picsum.photos/800');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const [status, setStatus] = useState({
        message: '',
        styles: {
            '--SignupPage-statusColor': 'red',
        }
    });

    function changeStatus(message = '', color = 'red') {
        setStatus({
            message: message,
            styles: {
                '--SignupPage-statusColor': color,
            }
        })
    }

    useEffect(() => {
        const log = MyLogger();
        if (!email) {
            log('/is-available: email is empty')
            return;
        }

        function handleFetchRes(data) {
            if (data.isAvailable)
                changeStatus('Email is available', 'green')
            else
                changeStatus('Email is not available', 'red')
        }

        function handleFetchError(error) {
            changeStatus(error.message, 'red');
        }

        const aborter = new AbortController();
        const timeoutId = setTimeout(() => {
            log('/is-available start fetching');
            fetch('https://api.escuelajs.co/api/v1/users/is-available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                signal: aborter.signal,
            })
                .then(res => {
                    if (!res.ok)
                        throw new Error(`error: ${res.status} ${res.statusText}`);
                    return res.json();
                })
                .then(data => {
                    log('/is-available ok', data);
                    handleFetchRes(data);
                })
                .catch(error => {
                    log('/is-available  error', error.message)
                    handleFetchError(error);
                })
        }, 500);

        return () => {
            log('/is-available cleanup');
            clearTimeout(timeoutId);
            aborter.abort();
        }

    }, [email])



    function submitHandle(e) {
        e.preventDefault();
        setSubmitting(true)

        fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password,
                email,
                avatar
            })
        })
            .then(res => {
                if (!res.ok) throw new Error(`Error when creating user: ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                setSubmitting(false);
                navigate('/ecommerce')
            })
            .catch(error => {
                setSubmitting(false);
                changeStatus(error.message, 'red');
            });
    }

    return (
        <div className={`SignupPage ${className}`}>
            <form className='SignupPage__form' onSubmit={submitHandle}>
                <h1 className='SignupPage__title'>Signup</h1>
                <label className='SignupPage__label' htmlFor="username">Username: </label>
                <input className='SignupPage__input' type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <label className='SignupPage__label' htmlFor="password">Password: </label>
                <input className='SignupPage__input' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className='SignupPage__label' htmlFor="email">Email: </label>
                <input className='SignupPage__input' type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className='SignupPage__label' htmlFor="avatar">Avatar: </label>
                <input className='SignupPage__input' type='url' name='avatar' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                <button className='SignupPage__submit' disabled={submitting}> {submitting ? 'Submitting...' : 'Signup'}</button>
                <p className='SignupPage__status' style={status.styles}>{status.message}</p>
            </form>
        </div >
    )
};

export default SignupPage;