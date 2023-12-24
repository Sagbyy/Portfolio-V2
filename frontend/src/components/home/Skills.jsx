import { useEffect, useState } from 'react';
import gsap from 'gsap';
import SkillsCard from './SkillsCard';

function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Fetch skills
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

        // Animation
        // Title
        gsap.fromTo(
            '.skills_title',
            {
                scale: 0,
            },
            {
                scale: 1,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.skills_bigTitle',
                    start: 'top 60%',
                },
            },
        );

        setTimeout(() => {
            // Wait the fetch to create animation
            const TL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.skills_main',
                    start: 'top 60%',
                },
            });

            TL.fromTo(
                '.skills_items h3',
                {
                    y: -20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                },
            )
                .fromTo(
                    '.skills_items:nth-child(1) .skills_card',
                    { scale: 0 },
                    { scale: 1, stagger: 0.2 },
                )
                .fromTo(
                    '.skills_items:nth-child(2) .skills_card',
                    { scale: 0 },
                    { scale: 1, stagger: 0.2 },
                    '<',
                );
        }, 1500);
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
                                <div key={skill._id} className="skills_card">
                                    <SkillsCard
                                        title={skill.name}
                                        image={skill.image}
                                    />
                                </div>
                            ),
                    )}
                </div>
                <div className="skills_items">
                    <h3>Tools</h3>
                    {skills.map(
                        (skill) =>
                            skill.section === 'tools' && (
                                <div key={skill._id} className="skills_card">
                                    <SkillsCard
                                        title={skill.name}
                                        image={skill.image}
                                    />
                                </div>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default Skills;
