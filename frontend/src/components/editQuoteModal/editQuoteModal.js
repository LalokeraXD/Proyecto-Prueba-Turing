import React, { useRef, useEffect, useState } from 'react';
import './editQuoteModal.css';
import apiUrl from '../../config/routeAPI';

const EditQuoteModal = ({ show, id, quoteData, onClose }) => {
    const modalRef = useRef();
    const [img, setImg] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (quoteData) {
            setImg(quoteData.img || '');
            setAuthor(quoteData.author || '');
            setText(quoteData.text || '');
            setDate(quoteData.date || '');
        }
    }, [quoteData]);

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };

    const handleClose = () => {
        clearFields();
        onClose();
    };

    const clearFields = () => {
        setImg('');
        setAuthor('');
        setText('');
        setDate('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedQuoteData = { img, author, text, date };

        try {
            const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage
            const response = await fetch(`${apiUrl}quotes/${id}`, {
                method: 'PUT', // Método PUT para actualizar el artículo
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras
                },
                body: JSON.stringify(updatedQuoteData), // Enviar los datos actualizados del artículo
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Cita actualizada correctamente:', data);
                alert('Cita actualizada correctamente.');
                handleClose();
            } else {
                // console.error('Error al actualizar cita:', data);
                alert('Error al actualizar cita. Asegúrese de haber iniciado sesión.');
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
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal_overlay" onClick={handleOverlayClick}>
            <div className="modal_container" ref={modalRef}>
                <button className="modal_close-button" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
                <h2>Actualizar Cita</h2>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <label htmlFor="img">URL de la Imagen:</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        required
                    />
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <label htmlFor="text">Texto:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    ></textarea>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button type="submit">Actualizar Cita</button>
                </form>
            </div>
        </div>
    );
};

export default EditQuoteModal;
