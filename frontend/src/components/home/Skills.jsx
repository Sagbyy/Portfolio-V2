import { useEffect, useState } from 'react';
import SkillsCard from './SkillsCard';

function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/skill/all`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setSkills(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="skills_container" id="skills">
            <div className="skills_title">
                <h2 className="skills_bigTitle">Skills</h2>
                <h2 className="skills_littleTitle">Skills</h2>
            </div>
            <div className="skills_main">
                <div className="skills_items">
                    <h3>Technologies</h3>
                    {skills.map(
                        (skill) =>
                            skill.section === 'technologies' && (
                                <SkillsCard
                                    key={skill._id}
                                    title={skill.name}
                                    image={skill.image}
                                />
                            ),
                    )}
                </div>
                <div className="skills_items">
                    <h3>Tools</h3>
                    {skills.map(
                        (skill) =>
                            skill.section === 'tools' && (
                                <SkillsCard
                                    key={skill._id}
                                    title={skill.name}
                                    image={skill.image}
                                />
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default Skills;
