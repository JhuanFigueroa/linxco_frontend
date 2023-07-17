import React, { useContext, useState } from "react"
import '../styles/vistaCarrera.scss'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const VistaCarrera = () =>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);
    const navigate = useNavigate()
    const [datosCarrera, setdatosCarrera]=useState([])

    function llenarTabla(){
        const rta = axios.get('http://localhost:3000/api/v1/carrera').then(rest=>{setdatosCarrera(rest.data.vercarreras)})
    }
    useEffect(() => {
        llenarTabla()
 	},[]);
    
    const reload =()=>{
        Window.location.reload(true)
    }

    function cambioVistaOperacionEditat(clave){
        addOperacion('cambioOperacion')
        navigate(`/carrera/Insertar/${clave}`)

    }
    function cambioVistaOperacionAgregart(){
        addOperacion('cambioOperacion2')
        navigate('/carrera/Insertar')

    }
    function eliminarCampo(clave1){
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('http://localhost:3000/api/v1/carrera/'+clave1+'')
        llenarTabla()
    }


    return(
        <><div className="capa"></div>
        <section className="formularioC row">
            <div className="consulM">
                <h1>Consultas de Maestros</h1>
            </div>
            <button className="btaFi btn-outline-primary" onClick={()=>navigate('/home')} >Finalizar</button>
            <button className="btnaEd btn-outline-primary" onClick={()=>cambioVistaOperacionAgregart()} >Agregar</button>
            <table className="tableC table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Clave</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Especialidad</th>
                        <th scope="col">Plan de Estudios</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {datosCarrera.map((tipo) => (
                                    <tr>
                                        <td>
                                            {tipo.clave_carrera}
                                        </td>
                                        <td>
                                            {tipo.nombre_carrera}
                                        </td>
                                        <td>
                                            {tipo.especialidad_carrera}
                                        </td>
                                        <td>
                                            {tipo.planestudio_carrera}
                                        </td>
                                        <td>
                                            <button className="btnEditC btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditat(tipo.clave_carrera)}></button>
                                        </td>
                                        <td>
                                            <button className="btnDeleteC btn-outline-danger" type="button" onClick={()=>eliminarCampo(tipo.clave_carrera)}></button>
                                        </td>
                                    </tr>
						        ))}
                </tbody>
            </table>
            <section className="botonesFR row" style={{marginTop: "10px"}}>
                
            </section>
        </section></>
    )
}

export default VistaCarrera;