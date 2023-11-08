import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import ModalProject from './ModalProject';
import Loader from '../layout/Loader';
import logoDelete from '../../../assets/images/delete.svg';
import logoEdit from '../../../assets/images/logoEdit.svg';

export default function Projects() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorFetch, setErrorFetch] = useState(false);

    const fetchProjects = () => {
        console.log('test');
        fetch('http://localhost:3000/api/project/', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('test2');
                setProjects(data);
                setLoading(false);
            })
            .catch(() => {
                setErrorFetch(true);
                console.log('Error');
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="projects_page">
                <h1 className="projects_title">Projects</h1>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}
                    className="projects_form_submit"
                >
                    Create a project
                </button>
                <div className="projects_list">
                    {loading ? (
                        <Loader />
                    ) : (
                        <ul>
                            {projects.map((project) => (
                                <motion.li
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 100 }}
                                    key={project._id}
                                    className="project_item"
                                >
                                    <img
                                        className="project_item_image"
                                        src={project.image}
                                    />
                                    <p className="project_item_title">
                                        {project.title}
                                    </p>
                                    <img
                                        className="skill_item_delete"
                                        src={logoDelete}
                                        alt="Logo delete button"
                                    />
                                    <img src={logoEdit} alt="Edit" />
                                </motion.li>
                            ))}
                        </ul>
                    )}
                    {errorFetch && (
                        <p className="skills_error_fetch">Error to fetch...</p>
                    )}
                </div>
                {showModal &&
                    createPortal(
                        <ModalProject
                            closeModal={() => setShowModal(false)}
                            fetchProjects={fetchProjects}
                        />,
                        document.body,
                    )}
            </div>
        </>
    );
}
