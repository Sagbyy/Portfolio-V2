import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import ProjectCard from './ProjectCard';
import projectBg from '../../../assets/images/projects_bg.png';
import gsap from 'gsap';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [buttonText, setButtonText] = useState('Show More'); // [1
    const [backToTop, setBackToTop] = useState(false); // [1
    const [numberProjects, setNumberProjects] = useState(2);
    const projects_button = useRef();

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
    }, []);

    useEffect(() => {
        // Animation
        // Title
        const TL = gsap.timeline({
            scrollTrigger: {
                trigger: '.projects_bigTitle',
                start: 'top 60%',
                markers: true,
            },
        });

        TL.fromTo(
            '.projects_title',
            {
                scale: 0,
            },
            {
                scale: 1,
                duration: 1.5,
                ease: 'power4.out',
            },
        ).fromTo(
            '.projects_main_image',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 2.5,
                ease: 'power4.out',
            },
            '-=1',
        );
        console.log(numberProjects);
    }, []);

    const showMore = () => {
        if (!backToTop) {
            setNumberProjects(numberProjects + 2);
            if (numberProjects === projects.length - 2) {
                setButtonText('Show Less');
                setBackToTop(true);
            }
        } else {
            setNumberProjects(numberProjects - 2);
            if (numberProjects <= 4) {
                setBackToTop(false);
                setButtonText('Show More');
            }
        }
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
                                <button
                                    onClick={showMore}
                                    ref={projects_button}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
