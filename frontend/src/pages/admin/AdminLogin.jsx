import logoSagby from '../../../assets/images/LogoSagby.png';
import iconLogin from '../../../assets/images/iconLogin.png';
import iconPassword from '../../../assets/images/iconPassword.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

function AdminLogin() {
    const history = useNavigate(); // Définissez history pour gérer la redirection
    const { setIsLogin } = useContext(AuthContext);

    const login = () => {
        fetch('http://localhost:3000/api/user/login', {
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
                if (response.status === 200) {
                    setIsLogin(true);
                    history('/admin/dashboard');
                } else {
                    document.querySelector('.admin_login_error').style.display =
                        'block';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <>
            <div className="admin_login">
                <div className="admin_login_form">
                    <img
                        src={logoSagby}
                        alt="Logo Sagby"
                        className="admin_login_logo"
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
                                <img src={iconPassword} alt="icon login" />
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
    );
}

export default AdminLogin;
