import '../styles/MaestroConsultas.scss'
import React, { useContext, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const MaestroConsultas = ()=> {
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);
    const navigate = useNavigate()
    const [datosMtro, setdatosMtros]=useState([])
    const idr=null
    function llenarTablaMtro(){
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/maestros').then(rest=>{setdatosMtros(rest.data.maestros1)})
    }
    useEffect(() => {
        llenarTablaMtro()
 	},[]);
    
    const reload =()=>{
        Window.location.reload(true)
    }

    function cambioVistaOperacionEditatMtro(clave){
        addOperacion('cambioOperacion1')
        navigate(`/maestroForm/insert/${clave}`)
    }
    function cambioVistaOperacionAgregarMtro(){
        addOperacion('cambioOperacion2')
        navigate('/maestroForm/insert')
    }
    function eliminarCampo(clave1){
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('https://linxcoexpress-production.up.railway.app/api/v1/maestros/'+clave1+'')
        llenarTablaMtro()
    }
    
    return(
        <><div className="capa"></div>
        <section className="tabDoc row">
            <div className='maes'>
                <h1>Lista de Docentes</h1>
            </div>
        <button className="btnAgg btn-outline-primary"  onClick={()=>cambioVistaOperacionAgregarMtro()}>Agregar</button>
        <button className="btnDoc btn-outline-primary" onClick={()=>navigate('/home')}>Finalizar</button>
            <table className="tableDoc table-bordered" style={{width: "1000px", height: "auto", marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th scope="col">Clave</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido Paterno</th>
                        <th scope="col">Apellido Materno</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {datosMtro.map((tipo)=>(
                            <tr>
                                <td>
                                    {tipo.clave_maestro}
                                </td>
                                <td>
                                    {tipo.nombre_maestro}
                                </td>
                                <td>
                                    {tipo.apellido_paterno_maestro}
                                </td>
                                <td>
                                    {tipo.apellido_materno_maestro}
                                </td>
                                <td>
                                    {tipo.correo_maestro}
                                </td>
                                <td>
                                    <button className="btnEditDoc btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditatMtro(tipo.clave_maestro)} ></button>
                                </td>
                                <td>
                                    <button className="btnDeleteDoc btn-outline-danger" type="button" onClick={()=>eliminarCampo(tipo.clave_maestro)}></button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

        </section></>   
    )
}
export default MaestroConsultas;