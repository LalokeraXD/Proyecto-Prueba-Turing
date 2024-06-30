import React from 'react'
import './footer.css'
import img from '../../assets/logo-turing.png'

const Footer = () => {
    return (
        <footer className='footer_background'>
            <div className='footer_container'>
                <div className='footer_columns'>
                    <div>
                        <img src={img} alt='Logo-Turing-IA'></img>
                        <h2>Síguenos en nuestras redes</h2>
                        <div className='footer_social-icons'>
                            <a href='https://www.facebook.com/turing.mx/'><i className="fa-brands fa-facebook-f"></i></a>
                            <a href='https://twitter.com/IaTuring'><i className="fa-brands fa-x-twitter"></i></a>
                            <a href='https://www.instagram.com/turing.ia_/'><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                    <div>
                        <h2>Mapa del sitio</h2>
                        <ul className='footer_nav-links'>
                            <li><a href='https://proyecto-prueba-turing-frontend.vercel.app/'>Inicio</a></li>
                            <li><a href='#articles'>Artículos</a></li>
                            <li><a href='#tecnologies'>Tecnologías</a></li>
                            <li><a href='#quotes'>Citas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2>Ubicación</h2>
                        <p>Av. Insurgentes Sur 674 Del Valle Norte, Benito Juárez C.P 03103, Ciudad de México Oficina 12, 4° Piso.</p>
                        <h2>Teléfono de contacto</h2>
                        <p>+52 (722) 936-96-65</p>
                        <h2>Correo Electrónico</h2>
                        <p>contacto@turing-ia.com</p>
                    </div>
                </div>
                    <p className='footer_copyright'>&copy; Copyright <strong>Turing Inteligencia Artificial.</strong> Derechos reservados.</p>
                
            </div>
        </footer>
    )
}

export default Footer
