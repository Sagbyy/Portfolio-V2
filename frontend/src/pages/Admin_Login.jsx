import logoSagby from '../../assets/LogoSagby.png';
import iconLogin from '../../assets/iconLogin.png';
import iconPassword from '../../assets/iconPassword.png';

function AdminLogin() {
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
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                    </form>
                    <div className="admin_login_button">
                        <button className="">Login</button>
                    </div>
                </div>
                <p className="admin_login_footer">
                    get out, you have nothing to do here
                </p>
            </div>
        </>
    );
}

export default AdminLogin;
