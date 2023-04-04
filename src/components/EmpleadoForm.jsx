import React, { useContext,useState } from "react";
import '../styles/empleado.scss'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import AppContext from "../context/AppContext";

const EmpleadoForm=()=>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {id1}=useParams()
    const [tipoRol,settipoRol]=useState([])
    const navigate = useNavigate()
    const handleClick=(e)=>{
        e.preventDefault();
        const data={
            'nombre':nombreEmp,
            'apellido_paterno':apellido_paternoEmpl,
            'apellido_materno':apellido_maternoEmpl,
            'correo':correoEmpl,
            'telefono':telefonoEmpl,
            'username':usernameEmpl,
            'password':passwordEmpl,
            'idRol':rolEmpl
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.post('https://linxcoexpress-production.up.railway.app/api/v1/empleados',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
		actualizarInputs()
    }
    function updateClik(){
        const data={
            'nombre':nombreEmp,
            'apellido_paterno':apellido_paternoEmpl,
            'apellido_materno':apellido_maternoEmpl,
            'telefono':telefonoEmpl,
            'correo':correoEmpl,
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
		axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/empleados/'+id1+'',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
		navigate('/empleado/Ver')
        
    }
    function actualizarInputs(){
        setnombreEmp('')
        setapellido_paternoEmpl('')
        setapellido_maternoEmpl('')
        settelefonoEmpl('')
        setcorreoEmpl('')
        setusernameEmpl('')
        setpasswordEmpl('')
        setpasswordEmpl('')
        setrolEmpl(0)
    }
    const [nombreEmp,setnombreEmp]=useState('')
    const [apellido_paternoEmpl,setapellido_paternoEmpl]=useState('')
    const [apellido_maternoEmpl,setapellido_maternoEmpl]=useState('')
    const [telefonoEmpl,settelefonoEmpl]=useState('')
    const [correoEmpl,setcorreoEmpl]=useState('')
    const [statusEmpl,setstatusEmpl]=useState('')
    const [usernameEmpl,setusernameEmpl]=useState('')
    const [passwordEmpl,setpasswordEmpl]=useState('')
    const [rolEmpl,setrolEmpl]=useState(0)
    useEffect(() => {
        getRol()
        console.log(id1)
        if(id1!=null){
            llenarCamposEmple(id1)
        }
 	},[]);
 	function getRol(){
		const roles = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/empleados')
		.then((res) => {
			//console.log(res.data);
			settipoRol(res.data.empleados)
		});
	}
    function llenarCamposEmple(id1){
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/empleados/'+id1+'').then(rest=>{
            setnombreEmp(rest.data.nombre)
            setapellido_paternoEmpl(rest.data.apellido_paterno)
            setapellido_maternoEmpl(rest.data.apellido_materno)
            settelefonoEmpl(rest.data.telefono)
            setcorreoEmpl(rest.data.correo)
            setusernameEmpl(rest.data.username)
            setpasswordEmpl(rest.data.password)
            setrolEmpl(rest.data.idRol)
        })
    }
    //{operacion==='cambioOperacion'?(<button className="btnFactsA btn-outline-primary" onClick={updateClik}>Editar</button>):(<button className="btnFactsA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
    
    return(
        <><div className="capa"></div>
        <section className="forEmple row">
            <div className="formEmplet">
                <h1>Resgistro de Empleados</h1>
            </div>
            <div className="form-group">
                <h5>Nombre del Empleado</h5>
                <input type="text" value={nombreEmp} style={{color:"white"}} className="form-control"onChange={(e)=>{setnombreEmp(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Apellido paterno</h5>
                <input type="text" value={apellido_paternoEmpl} style={{color:"white"}} className="form-control" onChange={(e)=>{setapellido_paternoEmpl(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Apellido materno</h5>
                <input type="text" value={apellido_maternoEmpl} style={{color:"white"}} className="form-control" onChange={(e)=>{setapellido_maternoEmpl(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Telefono</h5>
                <input type="text" value={telefonoEmpl} style={{color:"white"}} className="form-control" onChange={(e)=>{settelefonoEmpl(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Correo Electronico</h5>
                <input type="text" value={correoEmpl} style={{color:"white"}} className="form-control" onChange={(e)=>{setcorreoEmpl(e.target.value)}}/>
            </div>
            <div className="form-group">
                <h5>Nombre de usuario</h5>
                {operacion==='cambioOperacion1'?(<input type="text" style={{color:"white"}} readOnly value={usernameEmpl} className="form-control" onChange={(e)=>{setusernameEmpl(e.target.value)}}/>):(<input type="text" value={usernameEmpl} style={{color:"white"}} className="form-control" onChange={(e)=>{setusernameEmpl(e.target.value)}}/>)}
                
            </div>
            <div className="form-group">
                <h5>Contraseña</h5>
                {operacion==='cambioOperacion1'?(<input type="text" style={{color:"white"}} readOnly value={passwordEmpl} className="form-control" onChange={(e)=>{setpasswordEmpl(e.target.value)}}/>):(<input type="text" style={{color:"white"}} value={passwordEmpl} className="form-control" onChange={(e)=>{setpasswordEmpl(e.target.value)}}/>)}
            </div>
            <div className="form-group ">
                <h5>Rol</h5>
                {operacion==='cambioOperacion1'?(
                    <select className="cmbcarre" disabled value={rolEmpl} style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", height: "30px", width: "300px", marginLeft: "20px"}} onChange={(e)=>{setrolEmpl(e.target.value)}}>
                        <option value={0}>Seleccionar</option>
                        {tipoRol.map((tipo) => (
                                        <option key={tipo.id_rol} value={tipo.id_rol}>
                                            {tipo.nombre_rol}
                                        </option>
                                    ))}
                    </select>
                ):(
                    <select className="cmbcarre" value={rolEmpl} style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", height: "30px", width: "300px", marginLeft: "20px"}} onChange={(e)=>{setrolEmpl(e.target.value)}}>
                        <option value={0}>Seleccionar</option>
                        {tipoRol.map((tipo) => (
                                        <option key={tipo.id_rol} value={tipo.id_rol}>
                                            {tipo.nombre_rol}
                                        </option>
                                    ))}
                    </select>
                )}
                
            </div>
            <section className="botonesFR row" style={{marginTop: "10px"}}>
                {operacion==='cambioOperacion1'?(<button className="btnFactsA btn-outline-primary" onClick={updateClik}>Editar</button>):(<button className="btnFactsA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
                <button className="btnFactsAB btn-outline-primary" onClick={()=>navigate('/empleado/Ver')}>VER</button>
            </section>
        </section>
        </>
    );
}
export default EmpleadoForm;