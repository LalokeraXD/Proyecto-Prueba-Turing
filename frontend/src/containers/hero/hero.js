import React from 'react'
import './hero.css'
import img from '../../assets/ai.png'

const Hero = () => {
  return (
    <div className='hero_background'>
        <div className='hero_container'>
            <div className='hero_content-left'>
                <h1>El gran avance de la Inteligencia Artificial</h1>
                <p>La inteligencia artificial está redefiniendo lo posible en todos los campos de la tecnología. Desde la medicina hasta el transporte, la IA está impulsando innovaciones que transforman la manera en que vivimos y trabajamos.</p>
                <button className='hero_button'>Saber Más</button>
            </div>
            <div className='hero_content-right'>
                <img src={img} alt=''></img>
            </div>
        </div>
    </div>
  )
}

export default Hero

