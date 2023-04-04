import React from "react";
import '../styles/Inscripcion.scss'
import { useContext } from "react"
import {useNavigate,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";


const TableAspirantes=()=>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const{addOperacion}=React.useContext(AppContext);

    const {clave}=useParams()
    useEffect(()=>{
        if(clave!=null){
            obtenerAspirantes(clave)
        }
    },[])

    const navigate=useNavigate();

    const [aspirantes, setAspirantes] = useState([])

    const obtenerAspirantes =(clave)=>{
        const API ='https://linxcoexpress-production.up.railway.app/api/v1/admision/aspiranteB/'+clave+''
        const rta = axios.get(API).then(res=>{setAspirantes(res.data)});
    }
    // useEffect(() => {
    //     // .then(rest => {setGrupos(rest.data.verGrupos) })
    //     obtenerAspirantes()
    // }, [])
    const cambioVistaOperacionEditat=(id2)=>{
        addOperacion('cambioOperacion1')
        navigate(`/inscripcion/estudiante/${id2}`)
        // navigate(`/materiasF/${id2}`)
    }
    
    return(
        <div className="capa">
        <section className="contTablaDatosInscripcion">
            <h1>Inscripciones</h1>
            <h5 className="textoAd">ADMISION</h5>
            <table className="tableAspirantes table-bordered">
                <thead>
                <tr>
                    <th scope="col">NO. FICHA</th>
                    <th scope="col">NOMBRE COMPLETO</th>
                    <th scope="col">EDITAR</th>
                </tr>
                </thead>
                <tbody>
                {aspirantes.map((aspirante)=>(
                <tr>
                    <td>{aspirante.numero_ficha_admision}</td>
                    <td>{aspirante.nombre_admision}</td>
                    <td>
                        <button className="btnEdit btn-light" type="button"
                               onClick={()=>cambioVistaOperacionEditat(aspirante.numero_ficha_admision)}/>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
        </section>
        </div>
);
}

export default TableAspirantes;