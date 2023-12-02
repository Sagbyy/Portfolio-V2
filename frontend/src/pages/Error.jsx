import WarningLogo from '../../assets/images/Warning.png';
import LoaderPage from '../components/layout/LoaderPage';
import { useContext, useLayoutEffect } from 'react';
import { LoadingContext } from '../contexts/LoadingProvider';
import { gsap } from 'gsap';

export default function Error() {
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    useLayoutEffect(() => {
        if (!loadingDom) {
            const TL = gsap.timeline();

            TL.from('.error_image', {
                y: -100,
                opacity: 0,
                duration: 2,
                ease: 'power4',
            })
                .from(
                    '.error_title',
                    { y: -100, opacity: 0, duration: 2, ease: 'power4' },
                    0.5,
                )
                .from(
                    '.error_subtitle',
                    {
                        y: -50,
                        opacity: 0,
                        duration: 2,
                        ease: 'power4',
                    },
                    1,
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
                    <div className="error_main">
                        <img
                            src={WarningLogo}
                            alt="Warning Logo"
                            className="error_image"
                        />
                        <h1 className="error_title">404</h1>
                        <h2 className="error_subtitle">Page not found</h2>
                    </div>
                </>
            )}
        </>
    );
}
