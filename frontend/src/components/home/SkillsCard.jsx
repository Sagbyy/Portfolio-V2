import PropTypes from 'prop-types';

SkillsCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default function SkillsCard({ title, image }) {
    return (
        <>
            <img src={image} alt={'Logo ' + title} />
            {title}
        </>
    );
}
