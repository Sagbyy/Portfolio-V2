import LogoSagby from '../../../assets/images/LogoSagby.png';
import PropTypes from 'prop-types';
import ButtonNav from '../layout/ButtonNav';
import { useState } from 'react';
import { motion } from 'framer-motion';

Sidebar.propTypes = {
    section: PropTypes.string.isRequired,
    setSection: PropTypes.func.isRequired,
};

export default function Sidebar({ section, setSection }) {
    const [showNav, setShowNav] = useState(false);

    function navbarButtonResponsive() {
        setShowNav(!showNav);
    }

    function clickSection(section) {
        console.log(section);
        setSection(section);
        setShowNav(false);
    }

    return (
        <>
            <ButtonNav showNav={showNav} setShowNav={navbarButtonResponsive} />
            <motion.div
                className={
                    'sidebar' + (showNav ? ' sidebar_navbar_active' : '')
                }
                initial={{ left: '-300px' }}
                animate={{ left: showNav ? 0 : '-300px' }}
            >
                <img src={LogoSagby} alt="Logo Sagby" />
                <nav>
                    <ul>
                        <motion.li
                            className={section === 'skills' ? 'active' : ''}
                            onClick={() => clickSection('skills')}
                        >
                            Skills
                        </motion.li>
                        <motion.li
                            className={section === 'projects' ? 'active' : ''}
                            onClick={() => clickSection('projects')}
                        >
                            Projects
                        </motion.li>
                    </ul>
                </nav>
            </motion.div>
        </>
    );
}
