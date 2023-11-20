import SagbyLogo from '../../../assets/images/Logo S Blanc .png';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoaderPage({ loadingDom, setLoadingDom }) {
    const logoSagbyRef = useRef(null);
    const progressContainerDom = useRef(null);

    useEffect(() => {
        const fetchDom = async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
                gsap.to([logoSagbyRef.current, progressContainerDom.current], {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.5,
                    delay: 1,
                });
            });
            setLoadingDom(false);
        };

        fetchDom();
    }, []);

    return (
        <div className="loadingDom">
            <img src={SagbyLogo} alt="Logo Sagby" ref={logoSagbyRef} />
            <div className="progress_container" ref={progressContainerDom}>
                <div className="progress_bar"></div>
            </div>
        </div>
    );
}
