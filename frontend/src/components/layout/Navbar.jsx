/* eslint-disable react/jsx-no-comment-textnodes */

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import logoSagby from '../../../assets/images/LogoSagby.png';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import ButtonNav from './ButtonNav.jsx';
import logoGithub from '../../../assets/images/logoGithub.svg';
import logoLinkedin from '../../../assets/images/logoLinkedin.svg';

// TODO Change the animation of navbar

function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hover, setHover] = useState(false);
    const navbarListRef = useRef();
    const logoSagbyRef = useRef();

    const navbarButtonResponsive = () => {
        setShowNav(!showNav);

        const mm = gsap.matchMedia();

        // Only in tablet and mobile size
        mm.add('(max-width: 1450px)', () => {
            if (showNav) {
                gsap.to('.navbarComponent', {
                    x: '-100%',
                    duration: 1,
                    ease: 'power4.inOut',
                });
            } else {
                gsap.to('.navbarComponent', {
                    x: 0,
                    ease: 'power2.out',
                    duration: 1,
                });
            }
        });
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

    const handleOver = (index) => {
        setHoveredItem(index);
        setHover(true);
    };

    const handleLeave = () => {
        setHoveredItem('');
        setHover(false);
    };

    const items = ['home', 'about', 'skills', 'projects', 'service', 'contact'];

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
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={
                                (index === hoveredItem ? 'hovered' : '') +
                                (hover && hoveredItem !== index
                                    ? ' not-hovered'
                                    : '')
                            }
                            onMouseOver={() => handleOver(index)}
                            onMouseLeave={handleLeave}
                        >
                            <a href={'#' + item}>// {item}</a>
                        </li>
                    ))}
                </ul>
                <div className="navbar_media">
                    <a
                        href="https://github.com/Sagbyy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={logoGithub} alt="Logo Github" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/salahe-eddine-bouhdjeur-090aa6225/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={logoLinkedin} alt="Logo Github" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Navbar;
