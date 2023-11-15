import SagbyLogo from '../../../assets/images/Logo S Blanc .png';
import { useEffect, useState } from 'react';

export default function LoaderPage({ loadingDom, setLoadingDom }) {
    useEffect(() => {
        const fetchDom = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setLoadingDom(false);
        };

        fetchDom();
    }, []);

    return (
        <div className={`loadingDom `}>
            <img src={SagbyLogo} alt="Logo Sagby" />
            <div className="progress_container">
                <div className="progress_bar"></div>
            </div>
        </div>
    );
}
