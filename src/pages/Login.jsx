import React from "react";
import "../styles/Login.scss";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Cookie from "js-cookie";

const Login = () => {
    const form = React.useRef(null);
    const auth = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const data = {
            clave: formData.get("username"),
            password: formData.get("password"),
        };

        auth.singIn(data).then(() => {
            navigate('/home');
        });
    };

    React.useEffect(() => {
        auth.autoLogin();
    }, []);

        const user=auth.user;

        if (!user){
            return (
                <div className="container">
                    <div className="capa"></div>
                    <div className="row justify-content-center align-items-center pt-5 mt-2 m-1">
                        <div className="col-md-6 col-sm-8 col-xl-4 col-lg-5 formulario-as">
                            <form ref={form}>
                                <div className="form-group text-center">
                                    <h1 className="text-light">INICIAR SESIÓN</h1>
                                </div>
                                <div className="form-group1">
                                    <input type="text" className="form-control" name="username"
                                           style={{width:"300px", color:"white"}}
                                           placeholder="Ingrese su Usuario"/>
                                </div>
                                <div className="form-group1">
                                    <input type="password" className="form-control" name="password"
                                           style={{width:"300px", color:"white"}}
                                           placeholder="Contraseña"/>
                                </div>
                                <div className="btnIngresarLogin">
                                    <input type="submit" className="btn btn-outline-primary ingresar" style={{color:"white"}} onClick={handleSubmit}
                                           value="INGRESAR"/>
                                </div>
                                <div className="form-group mx-sm-4 text-center">
                                    <span className=""> <a href="#" className="olvide" style={{color:"cyan"}}>Olvide mi contraseña</a></span>
                                </div>
                                <div className="buttonsRegAs pb-4">
                                    <div className=" text-center pt-4">
                                        <span><Link to={'/aspirante/form'} className="aspirante" style={{color:"white"}}>ASPIRANTES</Link></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }else{
            navigate('/home');
        }

};

export default Login;
