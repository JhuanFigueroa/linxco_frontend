import React from "react";
import { useContext } from "react"
import { useEffect, useState } from "react";
import '../styles/tablaGruposForm.scss'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";

const API ='https://linxcoexpress-production.up.railway.app/api/v1/grupos'

const tablaGruposForm = () => {

    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);

    const navigate = useNavigate();
    // const navigate = useNavigate({ nombre });
    const [grupos, setGrupos] = useState([])
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/')
    }
    const obtenerGrupos =()=>{
        const rta = axios.get(API).then(res=>{setGrupos(res.data)});
    }
    const cambioVistaOperacionEditat=(id2)=>{
        addOperacion('cambioOperacion1')
        navigate(`/gruposF/${id2}`)
    }
    useEffect(() => {
        obtenerGrupos()
    }, [])
    const eliminarCampo=(id)=>{
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('https://linxcoexpress-production.up.railway.app/api/v1/grupos/'+id+'')
        navigate('/grupoF')
    }
    return (
        <div>
            <div className="capa"></div>
            <section className="vistaCarreFo row">
                <div className="vistaFGr">
                    <h1>Consulta de Grupos</h1>
                    <button className="btnMa btn-outline-primary" onClick={() => navigate('/home')}>Finalizar</button>
                </div>
                <table className="tableMa table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" >id Grupo</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Status</th>
                            <th scope="col">Clave Carrera</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.map((grupo)=>(
                            <tr>
                            <td>{grupo.id}</td>
                            <td>{grupo.numero}</td>
                            <td>{grupo.status}</td>
                            <td>{grupo.claveCarrera}</td>
                            <td>
                                <button className="btnEditMa btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditat(grupo.id)} />
                            </td>
                            <td>
                                <button className="btnDeleteMa btn-outline-danger" type="button" onClick={()=>eliminarCampo(grupo.id)} />
                            </td>
                        </tr>    
                        
                        ))}
                        
                                            
                    </tbody>
                </table>

            </section>
        </div>
    );
}

export default tablaGruposForm;