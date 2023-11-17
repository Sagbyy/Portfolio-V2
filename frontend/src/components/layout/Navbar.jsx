/* eslint-disable react/jsx-no-comment-textnodes */

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import logoSagby from '../../../assets/images/LogoSagby.png';
import menuBurger from '../../../assets/images/menuBurger.svg';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import ButtonNav from './ButtonNav.jsx';

// TODO Change the animation of navbar

function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const navbarListRef = useRef();
    const logoSagbyRef = useRef();

    const navbarButtonResponsive = () => {
        setShowNav(!showNav);
    };

    const [navbarColor, setNavbarColor] = useState(false);

    useLayoutEffect(() => {
        // Timeline
        const TL = gsap.timeline();

        // Animation GSAP
        TL.fromTo(
            logoSagbyRef.current,
            { y: -100 },
            { y: 0, duration: 0.8, ease: 'power2.out' },
        ).fromTo(
            navbarListRef.current['children'],
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'circ.out',
            },
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Mettez à jour le style en fonction de la position de défilement
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                setNavbarColor(true);
            } else {
                setNavbarColor(false);
            }
        };

        // Ajoutez un écouteur d'événements de défilement lors du montage du composant
        window.addEventListener('scroll', handleScroll);

        // Nettoyez l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div onClick={navbarButtonResponsive}>
                <ButtonNav setShowNav={setShowNav} showNav={showNav} />
            </div>

            <div
                className={
                    (showNav
                        ? 'navbarComponent navbar_active'
                        : 'navbarComponent') +
                    (navbarColor ? ' navbar_background' : '')
                }
            >
                <div className="navbar_logo">
                    <Link to="/">
                        <img
                            src={logoSagby}
                            alt="Logo Sagby"
                            ref={logoSagbyRef}
                        />
                    </Link>
                </div>

                <ul className="navbar_list" ref={navbarListRef}>
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
