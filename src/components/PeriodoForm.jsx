import '../styles/periodo.scss'
import React, { useState, useContext } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import AppContext from "../context/AppContext";

const periodo = () =>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {id2}=useParams()
    const navigate = useNavigate()
    const handleClick=(e)=>{
        e.preventDefault();
        const data={ 
            'numero':numeroPeriodo,
            'descripcion':descripcionPeriodo,
            'status':statusPeriodo
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.post('https://linxcoexpress-production.up.railway.app/api/v1/periodo',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
        actualizarInputs()
    }
    const updateClik=(e)=>{
        e.preventDefault()
        const data={
            'numero':numeroPeriodo,
            'descripcion':descripcionPeriodo,
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/periodo/'+id2+'',data)
        navigate('/periodo/Ver')
    }
    const [numeroPeriodo,setnumeroPeriodo]=useState('')
    const [descripcionPeriodo,setdescripcionPeriodo]=useState('')
    const [statusPeriodo,setstatusPeriodo]=useState(1)

    useEffect(()=>{
        if(id2!=null){
            llenarCamposPeri(id2)
        }
    },[])
    function llenarCamposPeri(id2){
        console.log(id2)
		const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/periodo/'+id2+'').then(rest=>{
            
        setnumeroPeriodo(rest.data.numero)
        setdescripcionPeriodo(rest.data.descripcion)
    })
    }
    function actualizarInputs(){
        setnumeroPeriodo(''),
        setdescripcionPeriodo('')
    }

    return(
        <><div className="capa"></div>
        <section className="forPeriodo row">
            <div className='forPerO'>
                <h1>Registro de Periodos</h1>
            </div>
            <div className="form-group">
                <h5>N. Periodo</h5>
                <input type="text" style={{color:"white"}} className="form-control" value={numeroPeriodo} onChange={(e)=>{setnumeroPeriodo(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Descripcion</h5>
                <input type="text" style={{color:"white"}} className="form-control" value={descripcionPeriodo} onChange={(e)=>{setdescripcionPeriodo(e.target.value)}}/>
            </div>        
            <section className="botonesPeri row" style={{marginTop: "10px"}}>
                {operacion==='cambioOperacion1'?(
                <button className="btnFactsA btn-outline-primary" onClick={updateClik}>Editar</button>):(<button className="btnPA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
                <button className="btnPB btn-outline-primary" onClick={()=>navigate('/periodo/Ver')}>VER</button>
            </section>
        </section></>
    )
}

export default periodo