/* eslint-disable react/jsx-no-comment-textnodes */

export default function Skills() {
    return (
        <div className="skills_page">
            <h1 className="skills_title">Skills</h1>

            <form className="skills_choose_section">
                <label htmlFor="section">// section</label>
                <select name="section">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </form>
        </div>
    );
}
