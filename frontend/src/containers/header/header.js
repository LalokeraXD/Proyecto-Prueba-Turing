// header.js
import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../../assets/logo-turing.png';
import { Modal } from '../../components';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus) {
            setIsLoggedIn(JSON.parse(storedLoginStatus));
        }
    }, []);

    const handleLoginClick = () => {
        setIsRegister(false);
        setShowModal(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
        setShowModal(false);
    };

    return (
        <header className='header_background'>
            <div className='header_container'>
                <img src={logo} alt='Turing IA Logo'></img>
                <div className='header_content'>
                    <div className='header_social-icons'>
                        <a href='https://www.facebook.com/turing.mx/'><i className="fa-brands fa-facebook-f"></i></a>
                        <a href='https://twitter.com/IaTuring'><i className="fa-brands fa-x-twitter"></i></a>
                        <a href='https://www.instagram.com/turing.ia_/'><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    <nav className='header_nav-links'>
                        <a href='http://localhost:3000/'>Inicio</a>
                        <a href='#articles'>Artículos</a>
                        <a href='#tecnologies'>Tecnologías</a>
                        <a href='#quotes'>Citas</a>
                        {isLoggedIn ? (
                            <>
                                {/* <button className='header_user-button' title='Configuración'><i className="fa-solid fa-gear"></i></button> */}
                                <button className='header_logout-button' onClick={handleLogout} title='Cerrar sesión'><i className="fa-solid fa-right-from-bracket"></i></button>
                            </>
                        ) : (
                            <button className='header_login-button' onClick={handleLoginClick}>Iniciar Sesión</button>
                        )}
                    </nav>
                </div>
            </div>
            <Modal show={showModal} onClose={handleCloseModal} isRegister={isRegister} setIsRegister={setIsRegister} onLoginSuccess={handleLoginSuccess} />
        </header>
    );
};

export default Header;
