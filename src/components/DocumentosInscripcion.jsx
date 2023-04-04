import React from "react";
import '../styles/DocumentosInscripcion.scss'
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";

const DocumentosInscripcion=()=>{

    const navigate=useNavigate()
    const {id2}=useParams()
    // useEffect(()=>{
        
    // },[]) 
    const handleClick=(e)=>{
        e.preventDefault()
        if(id2!=null){
            navigate(`/inscripcion/carga/${id2}`)
        }
    }
    return(
        <div className="capa">
        <section className="cont-checks-ins">
            
            <h2 className="titleDoc" style={{color: "azure", width: "100%", marginLeft: "20px"}}>Seleccione Los Archivos a
                Subir</h2>
            <br/>
                <div className="form-check-ins">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1" style={{color: "aliceblue"}}>
                            Certificado de estudios
                        </label>
                </div>
                <div className="form-check-ins">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1" style={{color: "aliceblue"}}>
                            Acta de calificaciones
                        </label>
                </div>
                <div className="form-check-ins">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1" style={{color: "aliceblue"}}>
                            Demas archivos
                        </label>
                </div>
                <div className="form-check-ins">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label" htmlFor="defaultCheck1" style={{color: "aliceblue"}}>
                            otros
                        </label>
                </div>
                <button type="button"
                        className="btn btnInscribir btn-outline-primary" onClick={handleClick}>SIGUIENTE
                </button>
        </section>
        </div>
);
}

export default DocumentosInscripcion;