import { Outlet } from "react-router";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import './EcommerceLayout.css';

function EcommerceLayout({className=''}) {
    return (
        <div className={'EcommerceLayout ' + className}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default EcommerceLayout;