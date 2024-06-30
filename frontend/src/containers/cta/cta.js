import React from 'react';
import './cta.css';
import img from '../../assets/inteligencia-artifical2.png';

const Cta = () => {
    return (
        <div className='cta_background' id='tecnologies'>
            <div className='cta_container'>
                <div className='cta_content-left'>
                    <h1>Las posibilidades superan tu imaginación</h1>
                    <p>La inteligencia artificial está redefiniendo lo que creíamos posible. Desde la creación de nuevas tecnologías hasta la transformación de industrias enteras, la IA abre un mundo de oportunidades sin límites. 
                    Únete a nosotros y descubre cómo puedes aprovechar el poder de la IA para innovar y liderar en tu campo.</p>
                    <button className='cta_button'>Saber Más</button>
                </div>
                <div className='cta_content-right'>
                    <img src={img} alt='Inteligencia artificial'></img>
                </div>
            </div>
        </div>
    );
}

export default Cta;
