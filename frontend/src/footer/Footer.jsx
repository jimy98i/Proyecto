import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Image } from "react-bootstrap";
import logo from "../assets/logo/logo3.png";
import "../css/Footer.css"; // Importar estilos personalizados

const Footer = ({ isAdminLayout }) => {
    if (isAdminLayout) {
        return (
            <div className="footer-admin">
                <p>© 2025 Happy Friends. Todos los derechos reservados.</p>
            </div>
        );
    }

    return (
        <footer className="footer-default">
            <div className="footer-grid">
                <div className="footer-section text-center">
                    <div className="footer-logo">
                        <Image src={logo} className="d-block w-100" style={{ maxWidth: 90, marginRight: 12}} roundedCircle alt="Logo de la empresa" />
                        Happy Friends
                    </div>
                    <div className="footer-social">
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
                <div className="footer-section">
                    <div className="footer-title">Citas y Urgencias</div>
                    <div>Teléfono citas: <a href="tel:900123456">900 123 456</a></div>
                    <div>Urgencias: <a href="tel:900654321">900 654 321</a></div>
                </div>
                <div className="footer-section">
                    <div className="footer-title">Horarios de Atención</div>
                    <div>Lunes a Viernes: 9:00 - 20:00</div>
                    <div>Sábados: 10:00 - 14:00</div>
                    <div>Domingos: Cerrado</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;