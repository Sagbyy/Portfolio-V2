import logoSagby from '../../../assets/images/LogoSagby.png';
import iconLogin from '../../../assets/images/iconLogin.png';
import iconPassword from '../../../assets/images/iconPassword.png';
import LoaderPage from '../../components/layout/LoaderPage';
import { gsap } from 'gsap';
import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../../contexts/LoadingProvider';

function AdminLogin() {
    const { setIsLogin } = useContext(AuthContext);
    const { loadingDom, setLoadingDom } = useContext(LoadingContext);

    const history = useNavigate();

    useLayoutEffect(() => {
        if (!loadingDom) {
            const TL = gsap.timeline();
            TL.from('.admin_login_form', {
                scale: 0,
                duration: 1,
                ease: 'power4',
            });

            setTimeout(() => {
                TL.play();
            }, 1500);
        }
    }, [loadingDom]);

    const login = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('username').value,
                password: document.getElementById('password').value,
            }),
        })
            .then((response) => {
                if (response.status == 200) return response.json();
                else {
                    document.querySelector('.admin_login_error').style.display =
                        'block';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                }
                console.log(response);
            })
            .then((data) => {
                console.log(data);
                localStorage.setItem('token', data.token);
                setIsLogin(true);
                history('/admin/dashboard');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    function redirectHomePage() {
        history('/');
    }

    return (
        <>
            {loadingDom ? (
                <LoaderPage
                    loadingDom={loadingDom}
                    setLoadingDom={setLoadingDom}
                />
            ) : (
                <>
                    <div className="admin_login">
                        <div className="admin_login_form">
                            <img
                                src={logoSagby}
                                alt="Logo Sagby"
                                className="admin_login_logo"
                                onClick={redirectHomePage}
                            />
                            <form className="admin_login_form_field">
                                <div>
                                    <label htmlFor="username">
                                        <img src={iconLogin} alt="icon login" />
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">
                                        <img
                                            src={iconPassword}
                                            alt="icon login"
                                        />
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </form>
                            <div className="admin_login_button">
                                <button onClick={login}>Login</button>
                            </div>
                            <p className="admin_login_error">
                                Name or password are wrong !
                            </p>
                        </div>
                        <p className="admin_login_footer">
                            get out, you have nothing to do here
                        </p>
                    </div>
                </>
            )}
        </>
    );
}

export default AdminLogin;
