import Navbar from '../components/layout/Navbar';
import About from '../components/homeCOmp/About';
import logoGithub from '../../public/logoGithub.svg';
import logoLinkedin from '../../public/logoLinkedin.svg';
import mouseIcon from '../../public/mouseIcon.svg';

function Home() {
    return (
        <>
            <div className="homePage">
                <div className="container">
                    <Navbar />
                    <div className="home_main">
                        <h1>SAGBY</h1>
                        <p>Software, web & app developer.</p>
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
                            href="https://www.linkedin.com/in/salahe-eddine-bouhdjeur-090aa6225/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={logoLinkedin} alt="Logo Github" />
                        </a>
                    </div>
                    <a href="" className="home_mouseIcon">
                        <img src={mouseIcon} alt="Mouse Icon" />
                    </a>
                </div>
            </div>
            <About />
            <Navbar />
        </>
    );
}

export default Home;
