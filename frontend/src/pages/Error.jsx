import Navbar from '../components/layout/Navbar';
import LoaderPage from '../components/layout/LoaderPage.jsx';
import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingProvider.jsx';

export default function Error() {
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    return (
        <>
            {loadingDom ? (
                <LoaderPage
                    loadingDom={loadingDom}
                    setLoadingDom={setLoadingDom}
                />
            ) : (
                <>
                    <h1>404</h1>
                </>
            )}
        </>
    );
}
