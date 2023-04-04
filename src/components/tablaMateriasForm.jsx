import React from "react";
import { useContext } from "react"
import { useEffect, useState } from "react";
import '../styles/tablaMateriasForm.scss'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";


//https://linxcoexpress-production.up.railway.app/
const API ='https://linxcoexpress-production.up.railway.app/api/v1/materias'

const tablaMateriasForm = () => {
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);

    const navigate = useNavigate();
    const [materias, setMaterias] = useState([])
    // const navigate = useNavigate({ nombre });
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const obtenerMaterias =()=>{
        const rta = axios.get(API).then(res=>{setMaterias(res.data)});
    }
    const eliminarCampo=(id)=>{
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.delete('https://linxcoexpress-production.up.railway.app/api/v1/materias/'+id+'')
        navigate('/materiasF')
       
    }
    const cambioVistaOperacionEditat=(id2)=>{
        addOperacion('cambioOperacion1')
        navigate(`/materiasF/${id2}`)

    }

    useEffect(() => {
        // .then(rest => {setGrupos(rest.data.verGrupos) })
        obtenerMaterias()
    }, [])
    return (
        <div>
            <div className="capa"></div>
            <section className="consuMate row">
                <div className="TituloMate">
                    <h1>Consulta de Materias</h1>
                    <button className="btnMatC btn-outline-primary" onClick={() => navigate('/home')}>Finalizar</button>
                </div>
                <table className="tableMatC table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" >Clave</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Creditos</th>
                            <th scope="col">Status</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {materias.map((materia)=>(
                        <tr>
                        <td>{materia.clave_materia}</td>
                        <td>{materia.nombre_materia}</td>
                        <td>{materia.creditos_materia}</td>
                        <td>{materia.status_materia}</td>
                        <td>
                            <button className="btnEdit btn-outline-success" type="button" onClick={()=>cambioVistaOperacionEditat(materia.clave_materia)} />
                        </td>
                        <td>
                            <button className="btnDelete btn-outline-danger" type="button" onClick={()=>eliminarCampo(materia.clave_materia)}/>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>

            </section>
        </div>
    );
}

export default tablaMateriasForm;