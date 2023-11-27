import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Skills from '../../components/admin/Skills';
import Projects from '../../components/admin/Projects';
import Sidebar from '../../components/admin/Sidebar';
import NotConnected from './NotConnected';

export default function Dashboard() {
    const [section, setSection] = useState('skills');
    const [logged, setIsLogged] = useState(false);

    document.title = 'Sagby - Dashboard';

    useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded_token = jwtDecode(token);

            if (!(decoded_token.exp * 1000 < Date.now())) {
                setIsLogged(true);
            }
        }
    }, []);

    return (
        <>
            {logged ? (
                <div className="dashboard_page">
                    <Sidebar section={section} setSection={setSection} />
                    <div className="dashboard_main">
                        {section === 'skills' && <Skills />}
                        {section === 'projects' && <Projects />}
                    </div>
                </div>
            ) : (
                <NotConnected />
            )}
        </>
    );
}
