import imageExample from '../../../assets/images/bgGlowAbout.png';
import projectsLink from '../../../assets/images/projects_link.svg';

export default function Projects() {
    return (
        <div className="projects_page">
            <h1 className="projects_title">Projects</h1>

            <div className="projects_list">
                <div className="projects_item">
                    <img
                        src={imageExample}
                        alt="example"
                        className="projects_item_image"
                    />
                    <div className="projects_item_information">
                        <div className="projects_item_description">
                            <span>&gt;</span>
                            <h3>Background Fade</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Laborum quae alias consequatur
                                ex voluptatem minus, facere possimus quo
                                expedita ut? Corporis saepe porro ducimus, eos
                                soluta minima fuga incidunt atque!
                            </p>
                            <div className="projects_item_button">
                                <img src={projectsLink} alt="" />
                            </div>
                        </div>
                        <div className="projects_item_skills">
                            <ul>
                                <li>React</li>
                                <li>JavaScript</li>
                                <li>CSS</li>
                                <li>HTML</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
