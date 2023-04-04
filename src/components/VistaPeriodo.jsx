import React, { useContext, useState } from "react"
import '../styles/vistaPeriodo.scss'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";


const VistaPeriodo = () =>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);
    const navigate = useNavigate()
    const [datosPeriodo, setdatosPeriodo]=useState([])

    function llenarTablaPe(){
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/periodo').then(rest=>{setdatosPeriodo(rest.data.verperiodos)})
    }
    useEffect(() => {
        llenarTablaPe()
 	},[]);
    
    const reload =()=>{
        Window.location.reload(true)
    }
    function cambioVistaOperacionEditat(id2){
        addOperacion('cambioOperacion1')
        navigate(`/periodo/Insertar/${id2}`)

    }
    function cambioVistaOperacionAgregart(){
        addOperacion('cambioOperacion2')
        navigate('/periodo/Insertar')

    }
    function eliminarCampo(id2){
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('https://linxcoexpress-production.up.railway.app/api/v1/periodo/'+id2+'')
        llenarTablaPe()
    }


    return(
        <><div className="capa"></div>
        <section className="facturaPe row">
            <div className="conPeR">
                <h1>Consulta de Periodo</h1>
            </div>
            <button className="btnPerA btn-outline-primary" onClick={()=>cambioVistaOperacionAgregart()}>Agregar</button>
            <button className="btnPeB btn-outline-primary" onClick={()=>navigate('/home')}>Finalizar</button>
            <table className="tablePeri table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No.Periodo</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {datosPeriodo.map((tipo) => (
                                    <tr>
                                        <td>
                                            {tipo.numero_periodo}
                                        </td>
                                        <td>
                                            {tipo.descripcion_periodo}
                                        </td>
                                        <td>
                                            <button className="btnEditC btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditat(tipo.id_periodo)}></button>
                                        </td>
                                        <td>
                                            <button className="btnDeleteC btn-outline-danger" type="button" onClick={()=>eliminarCampo(tipo.id_periodo)}></button>
                                        </td>
                                    </tr>
						        ))}
                </tbody>
            </table>

        </section></>
    )
}

export default VistaPeriodo