import Navbar from '../components/layout/Navbar';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import Service from '../components/home/Service';
import logoGithub from '../../assets/images/logoGithub.svg';
import logoLinkedin from '../../assets/images/logoLinkedin.svg';
import mouseIcon from '../../assets/images/mouseIcon.svg';
import Footer from '../components/layout/Footer.jsx';
import Contact from '../components/home/Contact.jsx';
import LoaderPage from '../components/layout/LoaderPage.jsx';
import { useContext, useLayoutEffect } from 'react';
import { LoadingContext } from '../contexts/LoadingProvider.jsx';
import { gsap } from 'gsap';

function Home() {
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    useLayoutEffect(() => {
        if (!loadingDom) {
            const mm = gsap.matchMedia();

            // Animation for tablet and desktop size
            mm.add('(min-width: 770px)', () => {
                const TL = gsap.timeline({
                    paused: true,
                });

                TL.from('.top_line', {
                    width: 0,
                    duration: 1,
                    transformOrigin: 'left',
                })
                    .from(
                        '.bottom_line',
                        {
                            width: 0,
                            duration: 1,
                            transformOrigin: 'right',
                        },
                        0,
                    )
                    .from('.home_title', { opacity: 0, scale: 0, duration: 1 })
                    .from(
                        '.home_main p',
                        {
                            opacity: 0,
                            y: -50,
                            duration: 1,
                        },
                        '-=0.5',
                    )
                    .from(
                        '.home_media img',
                        {
                            rotate: 90,
                            opacity: 0,
                            y: -50,
                            duration: 0.5,
                            stagger: 0.5,
                        },
                        '-=0.5',
                    )
                    .to('.middle_line', { height: 150, duration: 1 }, '-=0.25')
                    .from(
                        '.home_mouseIcon',
                        { opacity: 0, y: -50, duration: 1 },
                        '-=0.25',
                    )
                    .to('.home_mouseIcon', {
                        y: -25,
                        duration: 1.5,
                        ease: 'easeOut',
                        yoyo: true,
                        repeat: -1,
                    })
                    .from(
                        '.homePage_background',
                        { opacity: 0, duration: 1.5 },
                        '<',
                    );

                setTimeout(() => {
                    TL.play();
                }, 1500);
            });

            // Animation for mobile size
            mm.add('(max-width: 770px)', () => {
                const TL = gsap.timeline();

                TL.from('.top_line', {
                    width: 0,
                    duration: 1,
                    transformOrigin: 'left',
                })
                    .from(
                        '.bottom_line',
                        {
                            width: 0,
                            duration: 1,
                            transformOrigin: 'right',
                        },
                        0,
                    )
                    .from('.home_title', { opacity: 0, scale: 0, duration: 1 })
                    .from(
                        '.home_main p',
                        {
                            opacity: 0,
                            y: -50,
                            duration: 1,
                        },
                        '-=0.5',
                    )
                    .from(
                        '.home_mouseIcon',
                        { opacity: 0, y: -50, duration: 1 },
                        '-=0.25',
                    )
                    .to('.home_mouseIcon', {
                        y: -25,
                        duration: 1.5,
                        ease: 'easeOut',
                        yoyo: true,
                        repeat: -1,
                    });
            });
        }
    }, [loadingDom]);

    return (
        <>
            {loadingDom ? (
                <LoaderPage
                    loadingDom={loadingDom}
                    setLoadingDom={setLoadingDom}
                />
            ) : (
                <>
                    <div className="homePage" id="home">
                        <div className="homePage_background"></div>
                        <div className="container">
                            <Navbar />
                            <div className="home_main">
                                <div className="top_line"></div>
                                <h1 className="home_title">Sagby</h1>
                                <p>Software Engineer.</p>
                                <div className="bottom_line"></div>
                            </div>
                            <div className="home_media">
                                <a
                                    href="https://github.com/Sagbyy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={logoGithub} alt="Logo Github" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/salahe-eddine-b-090aa6225/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={logoLinkedin} alt="Logo Github" />
                                </a>
                                <div className="middle_line"></div>
                            </div>
                            <a href="#about" className="home_mouseIcon">
                                <img src={mouseIcon} alt="Mouse Icon" />
                            </a>
                        </div>
                    </div>
                    <About />
                    <Skills />
                    <Projects />
                    <Service />
                    <Contact />
                    <Footer />
                </>
            )}
        </>
    );
}

export default Home;
