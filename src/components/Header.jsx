import React from "react";
import '../styles/Header.scss'
import logo from '@imagenes/logoTESJI.png'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useAuth} from "../hooks/useAuth";
const Header=()=>{
    const auth=useAuth()

    const handleClick=(e)=>{
        e.preventDefault();
        auth.Logout();
    }

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="btn-menu">
                        <label htmlFor="btn-menu">☰</label>
                    </div>

                    <div className="logo">
                        <img src={logo}/>
                        <div className="text-center">

                        </div>
                    </div>
                    <div className="container-main">
                        <div className="text-center">
                            <h4>Tecnologico De Estudios Superiores De Jilotepec</h4>
                        </div>
                        <nav className="menu">
                            <Link to={'/'}><h5>Inicio</h5></Link>
                            <Button onClick={handleClick}>Cerrar Sesion</Button>

                        </nav>
                    </div>


                </div>

            </header>

            <div className="capa"></div>
        </div>
    );
}


export default  Header;