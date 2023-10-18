/* eslint-disable react/jsx-no-comment-textnodes */

import { useState } from 'react';
import logoSagby from '../../../assets/LogoSagby.png';
import menuBurger from '../../../assets/menuBurger.svg';
import { Link } from 'react-router-dom';

function Navbar() {
    const [showNav, setShowNav] = useState(false);

    const navbarButtonResponsive = () => {
        setShowNav(!showNav);
    };

    return (
        <>
            <div
                className="navbar_burgerWrapper"
                onClick={navbarButtonResponsive}
            >
                <img
                    src={menuBurger}
                    alt="Bouton burger du menu"
                    className="navbar_icon"
                />
            </div>

            <div
                className={
                    showNav
                        ? 'navbarComponent navbar_active'
                        : 'navbarComponent'
                }
            >
                <div className="navbar_logo">
                    <Link to="/">
                        <img src={logoSagby} alt="Logo Sagby" />
                    </Link>
                </div>

                <ul className="navbar_list">
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // home
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // about
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // skills
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // service
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={navbarButtonResponsive}>
                            // contact
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
