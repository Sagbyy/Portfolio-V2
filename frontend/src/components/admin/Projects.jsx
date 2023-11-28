/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { errorToast, successToast } from '../../utils/toast';
import ModalProject from './ModalProject';
import Loader from '../layout/Loader';
import logoDelete from '../../../assets/images/delete.svg';
import logoEdit from '../../../assets/images/logoEdit.svg';

export default function Projects() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noProjects, setNoProjects] = useState(false);
    const [errorFetch, setErrorFetch] = useState(false);
    const [method, setMethod] = useState('');
    const [projectObject, setProjectObject] = useState({});

    const fetchProjects = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/project/`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);

                // Si il n'y a pas de projets alors on affiche un message
                data.length === 0 ? setNoProjects(true) : setNoProjects(false);
            })
            .catch(() => {
                setLoading(false);
                setErrorFetch(true);
                console.log('Error');
            });
    };

    const deleteProject = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/project/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                successToast('Project deleted with success');
                fetchProjects();
            })
            .catch(() => {
                setErrorFetch(true);
                errorToast('Error to delete project');
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
                        setMethod('POST');
                        setShowModal(true);
                    }}
                    className="projects_form_submit"
                >
                    Create a project
                </button>
                <div className="project_items_label">
                    <p>// image</p>
                    <p>// title</p>
                    <p>// edit</p>
                    <p>// delete</p>
                </div>
                <div className="projects_list">
                    {
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
                                        className="project_item_edit"
                                        src={logoEdit}
                                        alt="Edit"
                                        onClick={() => {
                                            setShowModal(true);
                                            setMethod('PUT');
                                            setProjectObject(project);
                                        }}
                                    />
                                    <img
                                        className="project_item_delete"
                                        src={logoDelete}
                                        alt="Logo delete button"
                                        onClick={() =>
                                            deleteProject(project._id)
                                        }
                                    />
                                </motion.li>
                            ))}
                            {loading && <Loader />}
                            {errorFetch && (
                                <p className="projects_message">
                                    Error to fetch...
                                </p>
                            )}
                            {noProjects && (
                                <p className="projects_message">No projects</p>
                            )}
                        </ul>
                    }
                </div>
                {showModal &&
                    createPortal(
                        <ModalProject
                            closeModal={() => setShowModal(false)}
                            fetchProjects={fetchProjects}
                            method={method}
                            projectObject={projectObject}
                        />,
                        document.body,
                    )}
            </div>
        </>
    );
}
