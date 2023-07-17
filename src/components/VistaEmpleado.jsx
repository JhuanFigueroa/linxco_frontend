import '../styles/vistaEmpleado.scss'
import React, { useContext, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const VistaEmpleado = () =>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);
    const navigate = useNavigate()
    const [datosEmpleados, setdatosEmpleados]=useState([])
    const idr=null
    function llenarTablaEmp(){
        const rta = axios.get('http://localhost:3000/api/v1/empleados').then(rest=>{setdatosEmpleados(rest.data.empleados1)})
    }
    useEffect(() => {
        llenarTablaEmp()
 	},[]);
    
    const reload =()=>{
        Window.location.reload(true)
    }

    function cambioVistaOperacionEditatEmpleado(id){
        addOperacion('cambioOperacion1')
        navigate(`/empleado/Insertar/${id}`)
    }
    function cambioVistaOperacionAgregarEmpleado(){
        addOperacion('cambioOperacion2')
        navigate('/empleado/Insertar')
    }
    function eliminarCampo(id1){
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('http://localhost:3000/api/v1/empleados/'+id1+'')
        llenarTablaEmp()
    }


    return(
        <><div className="capa"></div>
        
        <section className="formE row">
        <div className='consulEmpler'>
            <h1>Consultas de empleados</h1>
        </div>
        <button className="btnVistaEA btn-outline-primary" onClick={()=>cambioVistaOperacionAgregarEmpleado()}>Agregar</button>
        <button className="btnVistaEB btn-outline-primary" onClick={()=>navigate('/home')}>Finalizar</button><br />

            <table className="tableE table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido Paterno</th>
                        <th scope="col">Apellido Materno</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo</th>
                        <th scope="col">ROL</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {datosEmpleados.map((tipo)=>(
                            <tr>
                                <td>
                                    {tipo.nombre_empleado}
                                </td>
                                <td>
                                    {tipo.apellido_paterno_empleado}
                                </td>
                                <td>
                                    {tipo.apellido_materno_empleado}
                                </td>
                                <td>
                                    {tipo.telefono_empleado}
                                </td>
                                <td>
                                    {tipo.correo_empleado}
                                </td>
                                <td>
                                    {tipo.nombre_rol}
                                </td>
                                <td>
                                    <button className="btnEditC btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditatEmpleado(tipo.id_empleado)} ></button>
                                </td>
                                <td>
                                    <button className="btnDeleteC btn-outline-danger" type="button" onClick={()=>eliminarCampo(tipo.id_empleado)}></button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            
        </section></>      
    )
}

export default VistaEmpleado