import { React, useState } from "react";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import styles from "../css/LayoutAdmin.module.css";
import Consultas from "../pages/Consultas";
import Citas from "../pages/Citas";
import Empleados from "../pages/Empleados";
import HistorialMedico from "../pages/HistorialMedico";
import ClientManagement from "../componentes/ClientManagement";
import { useAuth } from "../auth/AuthContext";
import NotificationBell from "../componentes/NotificationBell";

const LayoutAdmin = () => {
    const [activeSection, setActiveSection] = useState("citas");
    const [showSidebar, setShowSidebar] = useState(false);
    const { userName, logout } = useAuth();

    const renderActiveSection = () => {
        switch (activeSection) {
            case "consultas":
                return <Consultas />;
            case "citas":
                return <Citas />;
            case "empleados":
                return <Empleados />;
            case "historial-medico":
                return <HistorialMedico />;
            case "clientes":
                return <ClientManagement />;
            default:
                return <Citas />;
        }
    };

    return (
        <div className={styles["layout-admin"]}>
            <Navbar bg="dark" variant="dark" expand="lg" className={styles.header}>
                <Button
                    variant="outline-light"
                    className="me-2 d-lg-none"
                    onClick={() => setShowSidebar(true)}
                >
                    <FaBars />
                </Button>
                <div className="d-flex align-items-center">
                    <Navbar.Brand className="ms-3">{activeSection.toUpperCase()}</Navbar.Brand>
                    <NotificationBell />
                </div>
                <Navbar.Collapse className="justify-content-end d-none d-lg-flex">
                    <Navbar.Text className="me-3">{userName}</Navbar.Text>
                    <Button variant="outline-light" onClick={logout} className="ms-3">
                        Cerrar Sesión
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>NOMBRE EMPRESA</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-column h-100">
                        <Nav className="flex-column mb-auto">
                            <Nav.Link onClick={() => { setActiveSection("consultas"); setShowSidebar(false); }}>CONSULTAS</Nav.Link>
                            <Nav.Link onClick={() => { setActiveSection("citas"); setShowSidebar(false); }}>CITAS</Nav.Link>
                            <Nav.Link onClick={() => { setActiveSection("clientes"); setShowSidebar(false); }}>CLIENTES</Nav.Link>
                            <Nav.Link onClick={() => { setActiveSection("empleados"); setShowSidebar(false); }}>EMPLEADOS</Nav.Link>
                            <Nav.Link onClick={() => { setActiveSection("historial-medico"); setShowSidebar(false); }}>HISTORIAL MÉDICO</Nav.Link>
                        </Nav>
                        <div className="mt-auto border-top pt-3">
                            <div className="d-flex align-items-center mb-3">
                                <span className="text-muted me-3">{userName}</span>
                            </div>
                            <Button variant="outline-danger" onClick={logout} className="w-100">
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <div className={`${styles.sidebar} fixed-sidebar d-none d-lg-block`}>
                <div className={styles["sidebar-header"]}>
                    <h5>NOMBRE EMPRESA</h5>
                </div>
                <Nav className="flex-column">
                    <Nav.Link onClick={() => setActiveSection("consultas")}>CONSULTAS</Nav.Link>
                    <Nav.Link onClick={() => setActiveSection("citas")}>CITAS</Nav.Link>
                    <Nav.Link onClick={() => setActiveSection("clientes")}>CLIENTES</Nav.Link>
                    <Nav.Link onClick={() => setActiveSection("empleados")}>EMPLEADOS</Nav.Link>
                    <Nav.Link onClick={() => setActiveSection("historial-medico")}>HISTORIAL MÉDICO</Nav.Link>
                </Nav>
            </div>

            <main className={styles.content}>
                {renderActiveSection()}
            </main>

            <footer className={`${styles.footer} bg-dark text-light text-center py-2`}>
                <p>© 2025 Nombre de la Empresa. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default LayoutAdmin;