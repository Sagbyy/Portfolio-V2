import WarningLogo from '../../../assets/images/Warning.png';
import LoaderPage from '../../components/layout/LoaderPage';
import { useContext, useLayoutEffect } from 'react';
import { LoadingContext } from '../../contexts/LoadingProvider';
import { gsap } from 'gsap';

export default function NotConnected() {
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    useLayoutEffect(() => {
        if (!loadingDom) {
            const TL = gsap.timeline();

            TL.from('.notconnected_image', {
                y: -100,
                opacity: 0,
                duration: 2,
                ease: 'power4',
            }).from(
                '.notconnected_title',
                { y: -100, opacity: 0, duration: 2, ease: 'power4'},
                0.5
            );

            setTimeout(() => {
                TL.play();
            }, 1500);
        }
    }, [loadingDom]);

    return (
        <>
            {loadingDom ? (
                <LoaderPage
                    loadingDom={loadingDom}
                    setLoadingDom={setLoadingDom}
                />
            ) : (
                <>
                    <div className="notconnected_main">
                        <img
                            src={WarningLogo}
                            alt="Warning Logo"
                            className="notconnected_image"
                        />
                        <h1 className="notconnected_title">Not Connected</h1>
                    </div>
                </>
            )}
        </>
    );
}
