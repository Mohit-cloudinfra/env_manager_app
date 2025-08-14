import Navbar from './navbar';
import '../../globals.css'; // Ensure global styles are accessible
import 'bootstrap/dist/css/bootstrap.min.css';
import "./routes.css";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function RoutesLayout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <div className='main-area'>
                <header className="header">
                    <button><RiLogoutCircleRLine className='logouticon'/>  Logout</button> 
                </header>
                <div >
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}