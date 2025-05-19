import { React } from "react";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const LayoutClient = () => {
    return (
        <>
            <Header />
            <main className="container mt-4">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default LayoutClient;