import React from "react";
import '../styles/InscripcionForm.scss'
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import AppContext from "../context/AppContext";

const InscripcionForm=()=>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {id2}=useParams()

    const [numero_ficha_admision,setnumero_ficha_admision]=useState('')
    const [nombre_admision,setnombre_admision]=useState('')
    const [apellido_paterno_admision,setapellido_paterno_admision]=useState('')
    const [apellido_materno_admision,setapellido_materno_admision]=useState('')
    const [telefono_admision,settelefono_admision]=useState('')
    const [correo_admision,setcorreo_admision]=useState('')
    const [curp_admision,setcurp_admision]=useState('')
    const [domicilio_alumno,setdomicilio_alumno]=useState('')
    const [numero_seguro_alumno,setnumero_seguro_alumno]=useState('')
    const [status_alumno,setstatus_alumno]=useState(1)
    const [clave_carrera,setclave_carrera]=useState('')

    const navigate=useNavigate();
    useEffect(()=>{
        if(id2!=null){
            llenarCamposAspirantes(id2)
        }
    },[])
    function llenarCamposAspirantes(id2){
        console.log(id2)
        const rta = axios.get('http://localhost:3000/api/v1/admision/'+id2+'').then(rest=>{
  
        setnumero_ficha_admision(rest.data.numero)
        setnombre_admision(rest.data.nombre)
        setapellido_paterno_admision(rest.data.apellido_paterno)
        setapellido_materno_admision(rest.data.apellido_materno)
        settelefono_admision(rest.data.telefono)
        setcorreo_admision(rest.data.correo)
        setcurp_admision(rest.data.curp)
        setdomicilio_alumno(rest.data.domicilio)
        setclave_carrera(rest.data.claveCarrera)
    })}
    const handleClick = (e) => {
        e.preventDefault()
        const data={
            'matricula':numero_ficha_admision,
            'nombre':nombre_admision,
            'apellido_paterno':apellido_paterno_admision,
            'apellido_materno':apellido_materno_admision,
            'telefono':telefono_admision,
            'correo':correo_admision,
            'curp':curp_admision,
            'domicilio':domicilio_alumno,
            'num_seguro':numero_seguro_alumno,
            'status':status_alumno,
            'username':numero_ficha_admision,
            'password':numero_ficha_admision+''+nombre_admision,
            'claveCarrera':clave_carrera,
            'idRol':4,
            'idSemestre':1
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.post('http://localhost:3000/api/v1/alumnos',data)
        navigate('/inscripcion/documentos/'+id2+'')
    }
    return(
        <div className="capa">
        <section className="formularioInscripcion">
            
            <h3 style={{color: "white", marginLeft: "350px"}}>Inscripcion</h3>
            <section className="row">
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" No. Matricula"
                           style={{width: "200px",height: "30px", marginTop: "10px"}}
                           value={numero_ficha_admision} onChange={(e)=>{setnumero_ficha_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" Nombre(s)"
                           style={{width: "275px", height: "30px"}}
                           value={nombre_admision} onChange={(e)=>{setnombre_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" Apellido Paterno"
                           style={{width: "275px", height: "30px"}}
                           value={apellido_paterno_admision} onChange={(e)=>{setapellido_paterno_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" Apellido Materno"
                           style={{width: "250px", height: "30px"}}
                           value={apellido_materno_admision} onChange={(e)=>{setapellido_materno_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" Telefono"
                           style={{width: "150px", height: "30px"}}
                           value={telefono_admision} onChange={(e)=>{settelefono_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="email" className="form-control" placeholder=" E-mail @"
                           style={{width: "350px", height: "30px"}}
                           value={correo_admision} onChange={(e)=>{setcorreo_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder=" Domicilio"
                           style={{width: "330px", height: "30px"}}
                           value={domicilio_alumno} onChange={(e)=>{setdomicilio_alumno(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder="Curp" 
                    style={{width: "200px", height: "30px"}}
                    value={curp_admision} onChange={(e)=>{setcurp_admision(e.target.value)}}/>
                </div>
                <div className="form-group-inscripcion">
                    <input type="text" className="form-control" placeholder="No. Seguro"
                           style={{width: "220px", height: "30px"}}
                           value={numero_seguro_alumno} onChange={(e)=>{setnumero_seguro_alumno(e.target.value)}}/>
                </div>
                <br/>
                    <div className="documentos-ins row" style={{marginLeft: "20px"}}>
                        <div className="container-main row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Certificado de bachillerato</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                        <div className="container-main-ins row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Comprobante de domicilio</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                        <div className="container-main-ins row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Comprobante del pago</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                        <div className="container-main-ins row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Constancia de aceptacion</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                        <div className="container-main-ins row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Certificado medico</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                        <div className="container-main-ins row"
                             style={{color:" rgba(255, 255, 255, 0.5)",border: "solid 0.5px cornflowerblue", width: "350px"}}>
                            <h5>-Vigencia de derechos del IMSS</h5>
                        </div>
                        <div className="container-main-ins row">
                            <input type="file" className="btn btn-block" style={{width: "465px", color:"white"}}/>
                        </div>
                    </div>
                    <div className="button row justify-content-center pt-3">
                        <div className="text-center">
                            <button type="button" onClick={handleClick}
                                    className="btn btn-outline-primary"
                                    style={{color: "aliceblue", borderRadius: "0.5rem", marginLeft: "380px", marginTop: "10px", width: "220px", height: "35px"}}>Continuar
                            </button>

                        </div>
                    </div>
            </section>
        </section>
        </div>
);
}
export default InscripcionForm;