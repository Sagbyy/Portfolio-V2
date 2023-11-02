import PropTypes from 'prop-types';

SkillsCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

export default function SkillsCard({ title, image }) {
    return (
        <div className="skills_card">
            <img src={image} alt={"Logo " + title} />
            {title}
        </div>
    )
}