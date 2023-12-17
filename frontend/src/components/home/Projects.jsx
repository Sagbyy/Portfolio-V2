import { useState, useEffect } from 'react';
import { errorToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';
import ProjectCard from './ProjectCard';
import projectBg from '../../../assets/images/projects_bg.png';
import gsap from 'gsap';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [numberProjects, setNumberProjects] = useState(2);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/project/`,
                    {
                        method: 'GET',
                    },
                );
                const data = await response.json();

                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        // Animation
        // Title
        gsap.fromTo(
            '.projects_title',
            {
                scale: 0,
            },
            {
                scale: 1,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.projects_bigTitle',
                    start: 'top 60%',
                },
            },
        );
    }, [numberProjects]);

    const showMore = () => {
        if (numberProjects >= projects.length) {
            errorToast('No more projects to show');
            return;
        }
        setNumberProjects(numberProjects + 2);
    };

    return (
        <>
            <ToastContainer />
            <div className="projects_container" id="projects">
                <div className="projects_title">
                    <h2 className="projects_bigTitle">Projects</h2>
                    <h2 className="projects_littleTitle">Projects</h2>
                </div>
                <div className="projects_main">
                    <div className="projects_main_image">
                        <img
                            src={projectBg}
                            alt="Background of the projects section"
                        />
                    </div>
                    <div className="projects_list">
                        <ul>
                            {projects
                                .slice(0, numberProjects)
                                .map((project, index) => (
                                    <li key={project._id}>
                                        <ProjectCard
                                            project={project}
                                            peer={index % 2 === 0}
                                        />
                                    </li>
                                ))}
                            <div className="projects_button">
                                <button onClick={showMore}>Show More</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
