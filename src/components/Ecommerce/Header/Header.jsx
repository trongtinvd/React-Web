import { Link, Outlet } from "react-router";
import LoginForm from './LoginForm';
import './Header.css';

function Header({ className = '' }) {
    return (
        <>
            <div className="Header__wrapper">
                <header className={`Header ${className}`}>
                    <h1><Link className="Header__home" to={'/ecommerce'}>Ecommerce</Link></h1>
                    <LoginForm />
                </header>
            </div>
        </>

    )
}

export default Header;