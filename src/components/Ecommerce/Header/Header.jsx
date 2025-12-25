import { Link, NavLink, Outlet } from "react-router";
import LoginForm from './LoginForm';
import './Header.css';

function Header({ className = '' }) {
    const links = [
        {
            name: 'Home',
            url: '/ecommerce',
            end: true,
        },
        {
            name: 'Signup',
            url: '/ecommerce/signup',
            end: true,
        },
        {
            name: 'Create product',
            url: '/ecommerce/create-product',
            end: true,
        },
        {
            name: 'Search',
            url: '/ecommerce/search',
            end: true,
        },
    ]
    return (
        <div className="Header__wrapper">
            <header className={`Header ${className}`}>
                <div className="Header__titleAndLogin">
                    <h1><Link className="Header__title" to={'/ecommerce'}>Ecommerce</Link></h1>
                    <LoginForm />
                </div>
                <div className='Header__navLinks'>
                    {links.map((link, index) =>
                        <NavLink key={index} to={link.url} className='Header__navLink' end={link.end} >{link.name}</NavLink>
                    )}
                </div>
            </header>
        </div>

    )
}

export default Header;