import { AuthContext } from '../../contexts/AuthProvider';
import { useContext, useState } from 'react';
import Skills from '../../components/admin/Skills';
import Projects from '../../components/admin/Projects';
import Sidebar from '../../components/admin/Sidebar';

export default function Dashboard() {
    const { isLogin } = useContext(AuthContext);
    const [section, setSection] = useState('skills');

    document.title = "Sagby - Dashboard"

    return (
        <>
            {!isLogin ? (
                <div className="dashboard_page">
                    <Sidebar section={section} setSection={setSection} />
                    <div className="dashboard_main">
                        {section === 'skills' && <Skills />}
                        {section === 'projects' && <Projects />}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Not logged in</h1>
                </div>
            )}
        </>
    );
}
