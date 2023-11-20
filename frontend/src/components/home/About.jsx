import aboutBg from '../../../assets/images/aboutBg.png';
import mapSvg from '../../../assets/images/mapIcon.svg';

function About() {
    return (
        <div className="about_container" id="about">
            <div className="about_title">
                <h2 className="about_bigTitle">About</h2>
                <h2 className="about_littleTitle">About</h2>
            </div>

            <div className="about_mainContent">
                <div className="about_image">
                    <img src={aboutBg} alt="Background code" />
                </div>

                <div className="about_sectionInfo">
                    <h3>Sagby</h3>
                    <p className="about_location">
                        <img src={mapSvg} alt="Icone de carte" /> Île-de-france,
                        France
                    </p>
                    <p className="about_text">
                        Salah, 19 ans actuellement en deuxième année de BUT
                        Informatique à l&apos;IUT de Montreuil.
                        <br />
                        <br />
                        Je suis intéressé par le monde du développement en
                        général, j&apos;ai commencer par apprendre le
                        developpement web avec Javascipt et HTML CSS.
                        <br />
                        <br />
                        Je passe mon temps libre à me perfectionner dans les
                        langages de programmation en autodidacte.
                        <br />
                        Cela depuis 2020 que je m&apos;intéresse à la
                        programmation, je continuerais à me perfectionner pour
                        améliorer la qualité de mes services et acquérir le
                        maximum d&apos;expérience.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
