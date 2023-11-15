import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingContext = createContext();

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function LoadingProvider({ children }) {
    const [loadingDom, setLoadingDom] = useState(true);

    return (
        <LoadingContext.Provider value={{ loadingDom, setLoadingDom }}>
            {children}
        </LoadingContext.Provider>
    );
}
