import React, { useState, useContext } from "react";
import '../styles/carrerasIn.scss'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import AppContext from "../context/AppContext";

const Carrerasform=()=>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {clave}=useParams()
    const navigate = useNavigate()
    const handleFileChange = (e) =>{
        if (e.target.files){
            setimgCarrear(e.target.files[0]);
        }
    };
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(clave)
        const data={
            'clave':claveCarrera,
            'nombre':nombreCarrera,
            'especialidad':especialidadCarrera,
            'plan_estudios':planEsCarrera
            //'imagen':imgCarrear.imgCarrear
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.post('https://linxcoexpress-production.up.railway.app/api/v1/carrera',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
        actualizarInputs()
    }
    
    const updateClik=(e)=>{
        e.preventDefault()
        const data={
            'clave':claveCarrera,
            'nombre':nombreCarrera,
            'especialidad':especialidadCarrera,
            'plan_estudios':planEsCarrera
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/carrera/'+clave+'',data)
        navigate('/carrera/Ver')
    }


    function actualizarInputs(){
        setclaveCarrera('')
        setnombreCarrera('')
        setespecialidadCarrera('')
        setplanEsCarrera('')
    }
    const [claveCarrera,setclaveCarrera]=useState('')
    const [nombreCarrera,setnombreCarrera]=useState('')
    const [especialidadCarrera,setespecialidadCarrera]=useState('')
    const [planEsCarrera,setplanEsCarrera]=useState('')
    const [imgCarrear,setimgCarrear]=useState(null)
    const [statusCarrea,setstatusCarrea]=useState('')

    useEffect(()=>{
        if(clave!=null){
            llenarCampos(clave)
        }
    },[])
    function llenarCampos(clave){
        console.log(clave)
		const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/carrera/'+clave+'').then(rest=>{
            
        setclaveCarrera(rest.data.clave)
        setnombreCarrera(rest.data.nombre)
        setespecialidadCarrera(rest.data.especialidad)
        setplanEsCarrera(rest.data.plan_estudios)
    })
        /*setclaveCarrera(rta.data.clave_carrera)
        setnombreCarrera(rta.data.nombre_carrera)
        setespecialidadCarrera(rta.data.especialidad_carrera)
        setplanEsCarrera(rta.data.planestudio_carrera)*/
        //console.log(rta)
    }

    return(
        <><div className="capa"></div>
        <section className="carreraV row">
            <div className="carreTi">
                <h1>Registro de Carrera</h1>
            </div>
            <div className="form-group">
                <h5>Clave de la Carrera</h5>
                {operacion==='cambioOperacion'?(<input type="text" readOnly className="form-carrera" value={claveCarrera} onChange={(e)=>{setclaveCarrera(e.target.value)}}></input>):(<input type="text" className="form-carrera" value={claveCarrera} onChange={(e)=>{setclaveCarrera(e.target.value)}}></input>)}
            </div>
            <div className="form-group">
                <h5>Nombre de la Carrera</h5>
                <input type="text" className="form-carrera" value={nombreCarrera} onChange={(e)=>{setnombreCarrera(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Especialidad</h5>
                <input type="text" className="form-carrera" value={especialidadCarrera} onChange={(e)=>{setespecialidadCarrera(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Plan de Estudios</h5>
                <input type="text" className="form-carrera" value={planEsCarrera} onChange={(e)=>{setplanEsCarrera(e.target.value)}}/>
            </div>
            <section className="botonesFR row" style={{marginTop: "10px"}}>
                {operacion==='cambioOperacion'?(<button className="btnFactsA btn-outline-primary" onClick={updateClik}>Editar</button>):(<button className="btnFactsA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
                <button className="btnFactsAB btn-outline-primary" onClick={()=>navigate('/carrera/Ver')} >VER</button>
            </section>
        </section></>
    );
}
export default Carrerasform;