import React, {useContext, useState} from "react";
import '../styles/MaestroForm.scss'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const MaestroForm = ()=> {
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {clave}=useParams()
    const [tipoRol,settipoRol]=useState([])
    const navigate=useNavigate()
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(clave)
        const data={
            'clave': claveMtro,
            'nombre':nombreMtro,
            'apellido_paterno':apellido_paternoMtro,
            'apellido_materno':apellido_maternoMtro,
            'correo':correoMtro,
            'username':usernameMtro,
            'password':passwordMtro,
            'idRol': 1
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.post('https://linxcoexpress-production.up.railway.app/api/v1/maestros',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
		actualizarInputs()
    }
    function updateClik(e){
        e.preventDefault()
        const data={
            'clave':claveMtro,
            'nombre':nombreMtro,
            'apellido_paterno':apellido_paternoMtro,
            'apellido_materno':apellido_maternoMtro,
            'correo':correoMtro,
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/maestros/'+clave+'',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
		navigate('/maestroForm/consulta')
    }
    function actualizarInputs(){
        setclaveMtro('')
        setnombreMtro('')
        setapellido_paternoMtro('')
        setapellido_maternoMtro('')
        setcorreoMtro('')
        setusernameMtro('')
        setpasswordMtro('')
        setpasswordMtro('')
        setrolMtro(0)
    }
    const consultaClick=(e)=>{
        e.preventDefault();
        navigate('/maestroForm/consulta')
    }
    const [claveMtro,setclaveMtro]=useState('')
    const [nombreMtro,setnombreMtro]=useState('')
    const [apellido_paternoMtro,setapellido_paternoMtro]=useState('')
    const [apellido_maternoMtro,setapellido_maternoMtro]=useState('')
    const [correoMtro,setcorreoMtro]=useState('')
    const [statusMtro,setstatusMtro]=useState('')
    const [usernameMtro,setusernameMtro]=useState('')
    const [passwordMtro,setpasswordMtro]=useState('')
    const [rolMtro,setrolMtro]=useState(0)
    useEffect(() => {
        getRol()
        console.log(clave)
        if(clave!=null){
            llenarCamposMtro(clave)
        }
 	},[]);
 	function getRol(){
		const roles = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/empleados')
		.then((res) => {
			//console.log(res.data);
			settipoRol(res.data.empleados)
		});
	}
    function llenarCamposMtro(clave){
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/maestros/'+clave+'').then(rest=>{
            setclaveMtro(rest.data.clave)
            setnombreMtro(rest.data.nombre)
            setapellido_paternoMtro(rest.data.apellido_paterno)
            setapellido_maternoMtro(rest.data.apellido_materno)
            setcorreoMtro(rest.data.correo)
            setusernameMtro(rest.data.username)
            setpasswordMtro(rest.data.password)
            setrolMtro(rest.data.idRol)
        })
    }
    return(
        <><div className="capa"></div>
        <section className="docenttes row">
            <section className="docentes-titulo">
                <h1>Docentes</h1>
            </section>
            <div className="form-docen">
                <h5>Clave de Docente</h5>
                    <input type="text" value={claveMtro} className="form-docentes" onChange={(e)=>{setclaveMtro(e.target.value)}}/>
            </div>
            <div className="form-docen">
                <h5>Nombre del Docente</h5>
                    <input type="text" value={nombreMtro} className="form-docentes" onChange={(e)=>{setnombreMtro(e.target.value)}}/>
            </div>
            <div className="form-docen">
                <h5>Apellido paterno</h5>
                    <input type="text" value={apellido_paternoMtro} className="form-docentes" onChange={(e)=>{setapellido_paternoMtro(e.target.value)}}/>
            </div>
            <div className="form-docen">
                <h5>Apellido materno</h5>
                    <input type="text" value={apellido_maternoMtro} className="form-docentes" onChange={(e)=>{setapellido_maternoMtro(e.target.value)}}/>
            </div>
            <div className="form-docen">
                <h5>Correo Electronico</h5>
                    <input type="email" value={correoMtro} className="form-docentes" onChange={(e)=>{setcorreoMtro(e.target.value)}}/>
            </div>
            <div className="form-docen">
                <h5>Usuario</h5>
                {operacion==='cambioOperacion1'?(<input type="text" readOnly value={usernameMtro} className="form-docentes" onChange={(e)=>{setusernameMtro(e.target.value)}}/>):(<input type="text" value={usernameMtro} className="form-docentes" onChange={(e)=>{setusernameMtro(e.target.value)}}/>)}
                
            </div>
            <div className="form-docen">
                <h5>Contraseña</h5>
                {operacion==='cambioOperacion1'?(<input type="text" readOnly value={passwordMtro} className="form-docentes" onChange={(e)=>{setpasswordMtro(e.target.value)}}/>):(<input type="text" value={passwordMtro} className="form-docentes" onChange={(e)=>{setpasswordMtro(e.target.value)}}/>)}
            </div>

            <section className="botonesFR row" style={{marginTop: "10px"}}>
            {operacion==='cambioOperacion1'?(<button className="btnDocenA btn-outline-primary" onClick={updateClik}>Actualizar</button>):(<button className="btnDocenA btn-outline-primary" onClick={handleClick}>Guardar</button>)}
                <button className="btnDocenAB btn-outline-primary" onClick={consultaClick} >VER</button>
            </section>
        </section></>
    )
}
export default MaestroForm;