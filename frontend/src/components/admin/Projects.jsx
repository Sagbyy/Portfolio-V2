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
    const [errorFetch, setErrorFetch] = useState(false);
    const [method, setMethod] = useState('');
    const [projectObject, setProjectObject] = useState({});

    const fetchProjects = () => {
        fetch('http://localhost:3000/api/project/', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch(() => {
                setErrorFetch(true);
                console.log('Error');
            });
    };

    const deleteProject = (id) => {
        fetch(`http://localhost:3000/api/project/${id}`, {
            method: 'DELETE',
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
                            method={method}
                            projectObject={projectObject}
                        />,
                        document.body,
                    )}
            </div>
        </>
    );
}
