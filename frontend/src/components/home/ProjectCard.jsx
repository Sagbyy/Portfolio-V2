import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import projectsLink from '../../../assets/images/projects_link.svg';
import PropTypes from 'prop-types';

CardProject.propTypes = {
    project: PropTypes.object.isRequired,
    peer: PropTypes.bool.isRequired,
};

export default function CardProject({ project, peer }) {
    return (
        <>
            <div className={'projects_item' + (peer ? ' peer' : '')}>
                <LazyLoadImage
                    src={project.image}
                    alt="example"
                    className="projects_item_image"
                    width="600px"
                    height="380px"
                    effect="blur"
                />
                <div className="projects_item_information">
                    <div className="projects_item_description">
                        {peer ? (
                            <>
                                <h3>{project.title}</h3>
                                <span>{peer ? '<' : '>'}</span>
                            </>
                        ) : (
                            <>
                                <span>{peer ? '<' : '>'}</span>
                                <h3>{project.title}</h3>
                            </>
                        )}
                        <p>{project.description}</p>
                        <div className="projects_item_button">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={projectsLink} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="projects_item_skills">
                        <ul>
                            {project.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
