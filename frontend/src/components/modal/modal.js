// modal.js
import React, { useRef, useEffect, useState } from 'react';
import './modal.css';
import apiUrl from '../../config/routeAPI';

const Modal = ({ show, onClose, isRegister, setIsRegister, onLoginSuccess }) => {
    const modalRef = useRef();
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
        clearFields();
    };

    const handleClose = () => {
        clearFields();
        onClose();
    };

    const clearFields = () => {
        setUserLogin('');
        setPassword('');
        setEmail('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister && password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        const url = isRegister ? `${apiUrl}users/register` : `${apiUrl}users/login`;
        const body = isRegister ? { username: userLogin, password: password, email: email } : { username: userLogin, password: password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Success:', data);
                isRegister ? alert('Usuario registrado exitosamente.') : alert('Usuario logueado exitosamente.');
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                onLoginSuccess();
                handleClose();
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (show) {
            const modalContent = modalRef.current;
            modalContent.style.top = `calc(50% - ${modalContent.offsetHeight / 2}px)`;
        }
    }, [show, isRegister]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal_overlay" onClick={handleOverlayClick}>
            <div className="modal_container" ref={modalRef}>
                <button className="modal_close-button" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
                <h2>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <label htmlFor="userLogin">Usuario:</label>
                    <input
                        type="text"
                        id="userLogin"
                        name="userLogin"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        required
                    />
                    {isRegister && (
                        <>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isRegister && (
                        <>
                            <label htmlFor="confirmPassword">Verificar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <button type="submit">{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</button>
                    <button type="button" onClick={toggleForm}>
                        {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
