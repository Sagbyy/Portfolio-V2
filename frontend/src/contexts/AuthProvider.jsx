import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
