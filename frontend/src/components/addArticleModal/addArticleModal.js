// AddArticleModal.js
import React, { useRef, useEffect, useState } from 'react';
import './addArticleModal.css';

const AddArticleModal = ({ show, onClose }) => {
    const modalRef = useRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [img, setImg] = useState('');

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
        setTitle('');
        setDescription('');
        setDate('');
        setImg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newArticle = { title, description, date, img };

        try {
            const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage
            const response = await fetch('http://localhost:3003/articles/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras
                },
                body: JSON.stringify(newArticle),
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Artículo agregado correctamente:', data);
                alert('Artículo agregado correctamente.');
                handleClose();
            } else {
                // console.error('Error al agregar artículo:', data);
                alert('Error al agregar artículo. Asegúrese de haber iniciado sesión.');
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
                <h2>Agregar Nuevo Artículo</h2>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <label htmlFor="img">URL de la Imagen:</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        required
                    />
                    <button type="submit">Agregar Artículo</button>
                </form>
            </div>
        </div>
    );
};

export default AddArticleModal;
