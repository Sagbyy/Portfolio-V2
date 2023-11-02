import PropTypes from 'prop-types';

ButtonNav.propTypes = {
    showNav: PropTypes.bool.isRequired,
    setShowNav: PropTypes.func.isRequired,
};

export default function ButtonNav({ showNav, setShowNav }) {
    return (
        <div
            className={
                'sidebar_navbar_burgerWrapper' + (showNav ? ' active' : '')
            }
            onClick={setShowNav}
        >
            <span></span>
            <span></span>
        </div>
    );
}
