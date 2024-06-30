import React, { useEffect, useState } from 'react';
import './quotes.css';
import { Quote, AddQuoteModal, EditQuoteModal } from '../../components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import apiUrl from '../../config/routeAPI';

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
    const [showEditQuoteModal, setShowEditQuoteModal] = useState(false);

    useEffect(() => {
        updateQuotes();
    }, []);

    const updateQuotes = async () => {
        await fetch(`${apiUrl}quotes/`)
            .then(response => response.json())
            .then(data => setQuotes(data))
            .catch(error => console.error('Error fetching quotes:', error));
    };
    
    const handleAddQuoteClick = () => {
        setShowAddQuoteModal(true);
    };

    const handleCloseAddQuoteModal = () => {
        setShowAddQuoteModal(false);
        updateQuotes();
    };

    const handleEditQuote = (id, quoteData) => {
        setShowEditQuoteModal({ show: true, id, ...quoteData });
    };    

    const handleCloseEditQuoteModal = () => {
        setShowEditQuoteModal(false);
        updateQuotes();
    };

    const handleDeleteQuote = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage
            const response = await fetch(`${apiUrl}quotes/${id}`, {
                method: 'DELETE', // Método DELETE para eliminar la cita
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras
                },
            });
            const data = await response.json();
            if (response.ok) {
                // console.log('Cita eliminada correctamente:', data);
                alert('Cita eliminada correctamente.');
                updateQuotes();
            } else {
                // console.error('Error al eliminar cita:', data);
                alert('Error al eliminar cita. Asegúrese de haber iniciado sesión.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className='quotes_background' id='quotes'>
            <div className='quotes_container'>
                <h1>Citas más relevantes</h1>
                <div className='quotes_button-add-quote'>
                    <button onClick={handleAddQuoteClick}><i className="fa-solid fa-plus"></i></button>
                </div>
                <div className='quotes_slider'>
                <Slider {...settings}>
                    {quotes.map((quote, index) => (
                        <Quote
                            key={index}
                            id={quote.id}
                            img={quote.img}
                            author={quote.author}
                            text={quote.text}
                            date={quote.date}
                            onEdit={handleEditQuote}
                            onDelete={handleDeleteQuote}
                        />
                    ))}
                </Slider>
                </div>
            </div>
            <AddQuoteModal show={showAddQuoteModal} onClose={handleCloseAddQuoteModal} />
            <EditQuoteModal show={showEditQuoteModal} id={showEditQuoteModal?.id} quoteData={showEditQuoteModal} onClose={handleCloseEditQuoteModal} />
        </div>
    );
}

export default Quotes;
