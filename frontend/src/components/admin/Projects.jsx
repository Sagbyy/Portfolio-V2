import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import ModalProject from './ModalProject';
import CardProject from './CardProject';
import Loader from '../layout/Loader';

export default function Projects() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <ul>
                        {projects.map((project) => (
                            <li className="project_item" key={project._id}>
                                {<Loader />}

                                <CardProject project={project} />
                            </li>
                        ))}
                    </ul>
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
