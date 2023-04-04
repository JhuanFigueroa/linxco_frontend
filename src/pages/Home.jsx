import React from 'react';
import {useAuth} from "../hooks/useAuth";
import Alumnos from "./Alumnos";
import Maestros from "./Maestros";
import Empleados from "./Empleados";
import JefeDivision from "./JefeDivision";
import JefeControl from "./JefeControl";
import {useNavigate} from "react-router-dom";
import Header from "@components/Header";
import Menu from "@components/Menu";
const Home=()=>{
    const auth=useAuth();

    const user=auth.user;

        return(
            <div>

            </div>
        )

}

export default Home;