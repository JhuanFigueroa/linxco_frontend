import React, {useContext, useState} from "react";
import '../styles/Carreras.scss'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const CarreraItem = ({carrera}) => {
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const auth=useAuth()
    const user=auth.user
        const navigate=useNavigate()
    const handleSubmit=(clave)=>{
        
        if (operacion==='inscripcion'){
            navigate(`/inscripcion/carreras/${clave}`);
        }
        if (operacion==='reinscripcion'){
            navigate(`/reinscripcion/control/estudiantes/${clave}`);
        }
        if (operacion==='bajas'){
            navigate(`/control/bajas/estudiantes/${clave}`);
        }
        if (operacion==='constancia'){
            navigate(`/control/constancias/tabla/${clave}`)
        }

        if (operacion==='acta'){
            if (user.rol==1){
                navigate(`/actas/grupos/${clave}`)
            }else{
                navigate(`/control/actas/grupos/${clave}`)
            }
        }
        if (operacion==='horario'){
            navigate(`/horarios/${clave}`)
        }
    }
    return (
        <figure>
            <img src={carrera.imagen} alt=""/>
                <h2>Materia</h2>
                <div className="btnca">
                    <button type="button" className="btn btn-outline-success"
                            onClick={()=>{handleSubmit(carrera.clave)}}
                            style={{marginTop: "25px", width: "150px"}}>Ingresar
                    </button>
                </div>

        </figure>
    );
}

export default CarreraItem;