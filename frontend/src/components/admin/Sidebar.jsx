import LogoSagby from '../../../assets/images/LogoSagby.png';
import DisconnectLogo from '../../../assets/images/disconnect_.svg';
import PropTypes from 'prop-types';
import ButtonNav from '../layout/ButtonNav';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

Sidebar.propTypes = {
    section: PropTypes.string.isRequired,
    setSection: PropTypes.func.isRequired,
};

export default function Sidebar({ section, setSection }) {
    const [showNav, setShowNav] = useState(false);
    const history = useNavigate();

    function navbarButtonResponsive() {
        setShowNav(!showNav);
    }

    function clickSection(section) {
        console.log(section);
        setSection(section);
        setShowNav(false);
    }

    function disconnect() {
        localStorage.removeItem('token');
        history('/admin');
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
                <a href="/">
                    <img
                        src={LogoSagby}
                        alt="Logo Sagby"
                        className="sidebar_logo_sagby"
                    />
                </a>
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
                <img
                    src={DisconnectLogo}
                    alt="Disconnect"
                    className="sidebar_disconnect"
                    onClick={disconnect}
                />
            </motion.div>
        </>
    );
}
