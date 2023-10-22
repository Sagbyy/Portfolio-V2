import LogoSagby from '../../../assets/images/LogoSagby.png';
import PropTypes from 'prop-types';

Sidebar.propTypes = {
    section: PropTypes.string.isRequired,
    setSection: PropTypes.func.isRequired,
};

export default function Sidebar({ section, setSection }) {
    return (
        <div className="sidebar">
            <img src={LogoSagby} alt="Logo Sagby" />
            <nav>
                <ul>
                    <li
                        className={section === 'skills' ? 'active' : ''}
                        onClick={() => setSection('skills')}
                    >
                        Skills
                    </li>
                    <li
                        className={section === 'projects' ? 'active' : ''}
                        onClick={() => setSection('projects')}
                    >
                        Projects
                    </li>
                </ul>
            </nav>
        </div>
    );
}
