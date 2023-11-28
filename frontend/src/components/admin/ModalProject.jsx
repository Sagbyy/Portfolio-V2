import PropsTypes from 'prop-types';
import cancelButton from '../../../assets/images/delete.svg';
import checkButton from '../../../assets/images/icon _check_.svg';
import trashButton from '../../../assets/images/icon _trash_.svg';
import { successToast, errorToast } from '../../utils/toast';
import { useEffect, useState } from 'react';

ModalProject.propTypes = {
    closeModal: PropsTypes.func.isRequired,
    projectObject: PropsTypes.object,
    fetchProjects: PropsTypes.func.isRequired,
    method: PropsTypes.string,
};

export default function ModalProject({
    closeModal,
    projectObject,
    fetchProjects,
    method,
}) {
    const [skills, setSkills] = useState([]);
    const [skillsSelected, setSkillsSelected] = useState([]);
    const [formData, setFormData] = useState({
        title: projectObject ? projectObject.title : '',
        description: projectObject ? projectObject.description : '',
        image: projectObject ? projectObject.image : '',
        link: projectObject ? projectObject.link : '',
        skills: projectObject ? projectObject.skills : [],
    });

    useEffect(() => {
        if (method === 'POST') {
            setFormData({
                title: '',
                description: '',
                image: '',
                link: '',
                skills: [],
            });
        } else {
            // Si on est en mode PUT alors on set les skills du projet
            setSkillsSelected(projectObject.skills);
            console.log(skillsSelected);
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/skill/all`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setSkills(data);
            })
            .catch(() => {
                console.log('Error');
            });
        console.log(formData);
    }, [method, projectObject]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkills = () => {
        // Retrieve the selected skill
        const selectedSkillElement = document.getElementById('skills');
        const selectedSkillName = selectedSkillElement.value;

        // Check if the skill is already selected
        if (!skillsSelected.includes(selectedSkillName)) {
            setSkillsSelected([...skillsSelected, selectedSkillName]);
            successToast('Skill added !');
        }
    };

    const deleteSkill = (skill) => {
        setSkillsSelected(skillsSelected.filter((item) => item !== skill));
        errorToast('Skill deleted !');
    };

    const createProject = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('image', document.getElementById('image').files[0]);
        formData.append('link', document.getElementById('link').value);
        formData.append(
            'description',
            document.getElementById('description').value,
        );
        formData.append('skills', JSON.stringify(skillsSelected));

        fetch(
            `${import.meta.env.VITE_API_URL}/api/project/` +
                (method === 'PUT' ? projectObject._id : ''),
            {
                method: method,
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
            .then((response) => {
                if (response.status === 201) {
                    successToast('Project created !');
                    fetchProjects();
                    closeModal();
                } else if (response.status === 200) {
                    successToast('Project updated !');
                    fetchProjects();
                    closeModal();
                } else {
                    errorToast(`Error, you have not fill the fields !`);
                }
                console.log(response.status);
            })
            .catch((error) => {
                errorToast(`Error !`);
                console.error('Error:', error);
            });
    };

    return (
        <div className="modal_component" onClick={closeModal}>
            <div className="modal_main" onClick={(e) => e.stopPropagation()}>
                <img
                    src={cancelButton}
                    alt="Cancel"
                    className="modal_quit"
                    onClick={closeModal}
                />
                <form encType="multipart/form-data">
                    <div className="modal_title_image">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal_inputs">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            name="link"
                            id="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="modal_inputs">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            onChange={handleInputChange}
                            maxLength={1000}
                            value={formData.description}
                            id="description"
                        />
                    </div>

                    <div className="modal_skills">
                        <div className="modal_skills_selected">
                            {skillsSelected.map((skill) => (
                                <span key={skill}>
                                    {skill}
                                    <img
                                        src={trashButton}
                                        className="modal_skill_trash"
                                        alt="Trash Button"
                                        onClick={() => deleteSkill(skill)}
                                    />
                                </span>
                            ))}
                        </div>
                        <div className="modal_skills_div">
                            <select name="skills" id="skills">
                                {skills.map((skill) => (
                                    <option key={skill._id} value={skill.name}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>
                            <img
                                onClick={handleSkills}
                                className="modal_check_button"
                                src={checkButton}
                                alt="Check button"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={createProject}
                        className="modal_submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
