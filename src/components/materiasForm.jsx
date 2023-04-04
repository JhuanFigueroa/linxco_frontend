import React, { useState, useContext } from "react";
import '../styles/materiasForm.scss'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import AppContext from "../context/AppContext";

const materiasForm=()=>{

const {state}=useContext(AppContext)
const operacion=state.operacion
const {id2}=useParams()

const [clave_materia,setclaveMateria]=useState('')
const [nombre_materia,setNombreMateria]=useState('')
const [creditos_materia,setCreditosMateria]=useState(0)
const [status_materia,setStatus_materia]=useState(1)

const navigate=useNavigate();
const handleClick = (e) => {
    e.preventDefault()
    const data={
        'clave_materia':clave_materia,
        'nombre_materia':nombre_materia,
        'creditos_materia':creditos_materia,
        'status_materia':status_materia
    }
    const cookie= Cookie.get('token')
    axios.defaults.headers.Authorization='Bearer '+cookie;
    axios.post('https://linxcoexpress-production.up.railway.app/api/v1/materias',data)
    navigate('/materiasForm/Ver')
}
const updateClik=(e)=>{
    e.preventDefault()
    const dataA={
        'clave_materia':clave_materia,
        'nombre_materia':nombre_materia,
        'creditos_materia':creditos_materia,
        'status_materia':status_materia
    }
    const cookie= Cookie.get('token')
    axios.defaults.headers.Authorization='Bearer '+cookie;
    axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/materias/'+id2+'',dataA)
    navigate('/materiasForm/Ver')
}
useEffect(()=>{
    if(id2!=null){
        llenarCamposMaterias(id2)
    }
},[])
function llenarCamposMaterias(id2){
    console.log(id2)
    const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/materias/'+id2+'').then(rest=>{
        
    setclaveMateria(rest.data.clave_materia)
    setNombreMateria(rest.data.nombre_materia)
    setCreditosMateria(rest.data.creditos_materia)
    setStatus_materia(rest.data.status_materia)
})}

return(
    <div>
         <div className="capa"></div>

<section className="facturaMate row">
    <div className="mateTi">
        <h1>Registro Materias</h1>
    </div>
    <div className="form-group">
        <h5>Clave de Materia</h5>	
        <input type="text"  className="form-control" value={clave_materia} onChange={(e)=>{setclaveMateria(e.target.value)}}/>
    </div>	
    <div className="form-group">
        <h5>Nombre de la materia</h5>	
        <input type="text"  className="form-control" value={nombre_materia} onChange={(e)=>{setNombreMateria(e.target.value)}}/>
    </div>	
    <div className="form-group">
        <h5>Creditos</h5>	
        <input type="number"  className="form-control" value={creditos_materia} onChange={(e)=>{setCreditosMateria(e.target.value)}}/>
    </div>	
    <div className="form-group">
        <h5>Status</h5>	
        <input type="text"  className="form-control" value={status_materia} onChange={(e)=>{setStatus_materia(e.target.value)}}/>
    </div>
    <section className="botonesFR row" style={{marginTop: "10px"}}>
        {operacion==='cambioOperacion1'?(
        <button className="btnFactsA btn-outline-primary" onClick={updateClik}>Actualizar</button>):(<button className="btnFactsA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
		<button className="btnFactsAB btn-outline-primary" onClick={()=>navigate('/materiasForm/Ver')}>VER</button>
	</section>
</section>
    </div>
);
}

export default materiasForm;
