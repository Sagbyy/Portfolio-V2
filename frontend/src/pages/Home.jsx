import Navbar from '../components/layout/Navbar';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import Service from '../components/home/Service';
import logoGithub from '../../assets/images/logoGithub.svg';
import logoLinkedin from '../../assets/images/logoLinkedin.svg';
import mouseIcon from '../../assets/images/mouseIcon.svg';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer.jsx';
import Contact from '../components/home/Contact.jsx';
import LoaderPage from '../components/layout/LoaderPage.jsx';
import { useContext, useState } from 'react';
import { LoadingContext } from '../contexts/LoadingProvider.jsx';

function Home() {
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    return (
        <>
            {loadingDom ? (
                <LoaderPage
                    loadingDom={loadingDom}
                    setLoadingDom={setLoadingDom}
                />
            ) : (
                <>
                    <div className="homePage">
                        <div className="container">
                            <Navbar />
                            <div className="home_main">
                                <motion.h1
                                    className="home_title"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    Sagby
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    Software, web & app developer.
                                </motion.p>
                            </div>
                            <div className="home_media">
                                <motion.a
                                    href="https://github.com/Sagbyy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    <img src={logoGithub} alt="Logo Github" />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/salahe-eddine-bouhdjeur-090aa6225/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    <img src={logoLinkedin} alt="Logo Github" />
                                </motion.a>
                            </div>
                            <a href="" className="home_mouseIcon">
                                <motion.img
                                    animate={{ y: -15 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut',
                                    }}
                                    src={mouseIcon}
                                    alt="Mouse Icon"
                                />
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
