/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import logoDelete from '../../../assets/images/delete.svg';

export default function Skills() {
    const successToast = (text) => {
        toast.success(text, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: 'dark',
        });
    };

    const errorToast = (text) => {
        toast.error(text, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            theme: 'dark',
        });
    };

    const fetchSkills = () => {
        fetch('http://localhost:3000/api/skill/all', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => setSkills(data));
    };

    const createSkill = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('image', document.getElementById('image').files[0]);
        formData.append('section', document.getElementById('section').value);

        fetch('http://localhost:3000/api/skill/create', {
            method: 'POST',
            body: formData,
        })
            .then(() => {
                successToast('Skill created !');
                fetchSkills();
            })
            .catch((error) => {
                console.error('Error:', error);
                errorToast('Error !');
            });
    };

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    const deleteSkill = (id) => () => {
        fetch('http://localhost:3000/api/skill/' + id, {
            method: 'DELETE',
        })
            .then(() => {
                successToast('Skill deleted !');
                fetchSkills();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="skills_page">
                <h1 className="skills_title">Skills</h1>

                <form className="skills_choose_section" onSubmit={createSkill}>
                    <div className="skills_select">
                        <label htmlFor="section">// section</label>
                        <select name="section" id="section">
                            <option value="technologies">Technologies</option>
                            <option value="tools">Tools</option>
                        </select>
                    </div>
                    <div className="skills_informations">
                        <div className="skills_input">
                            <label htmlFor="text">Name</label>
                            <input
                                type="name"
                                name="name"
                                placeholder="Enter name"
                                id="name"
                            />
                        </div>

                        <div className="skills_input">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                title="dzqds"
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="skills_items_section">
                    <div className="skills_items_title">
                        <p>// text</p>
                        <p>// image</p>
                        <p>// section</p>
                        <p></p>
                    </div>
                    <div className="skills_items">
                        <ul>
                            <AnimatePresence>
                                {skills.map((skill) => (
                                    <motion.li
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        key={skill._id}
                                        className="skill_item"
                                    >
                                        <p className="skill_item_name">
                                            {skill.name}
                                        </p>
                                        <img
                                            className="skill_item_logo"
                                            src={skill.image}
                                        />
                                        <p className="skill_item_section">
                                            {skill.section}
                                        </p>
                                        <img
                                            className="skill_item_delete"
                                            src={logoDelete}
                                            alt="Logo delete button"
                                            onClick={deleteSkill(skill._id)}
                                        />
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
