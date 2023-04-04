import React, { useState } from "react";
import '../styles/aspirantes.scss'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
const aspirantes=()=>{
	const [tipoCarrera,setTipoCarrera]=useState([])
     const navigate=useNavigate();
     const handleClick=(e)=>{
         e.preventDefault();
		 //console.log(certificadAsp.substring(12))
         //navigate('/aspirante/examen')
		 const data={
			'numero':numFicha,
			'nombre':nomAspirante,
			'apellido_paterno':apePaternoAs,
			'apellido_materno':apeMaternoAs,
			'telefono':telefonoAspirante,
			'telefono_emergencia':telefonoEmeAspirante,
			'correo':correoAspirante,
			'promedio':promedioAspirante,
			'curp':curpAspirante,
			'domicilio':domicilioAspirante,
			'escuela':escProceAsptirante,
			'sangre':tipoSangreAspirante,
			'genero':generoAspirante,
			'lugar_nacimiento':lugNacAspirante,
			'lugar_aplicacion':lugAapliAspirante,
			'persona_emergencia':personaEmerAspirante,
			'claveCarrera':claveCarrera,
			'fecha':fechaAspiante
		}
		 const cookie= Cookie.get('token')
         axios.defaults.headers.Authorization='Bearer '+cookie;
		 axios.post('https://linxcoexpress-production.up.railway.app/api/v1/admision',data) //llegan lixnco, despues dependiendo se va a la funcipon y se ejecuta el query
		 navigate('/home')
     }
	 //creear constantes de cada input
	 const[numFicha,setnumFicha]=useState(0)
	 const[nomAspirante,setnomAspirante]=useState('')
	 const[apePaternoAs,setapePaternoAs]=useState('')
	 const[apeMaternoAs,setapeMaternoAs]=useState('')
	 const[telefonoAspirante,settelefonoAspirante]=useState('')
	 const[telefonoEmeAspirante,settelefonoEmeAspirante]=useState('')
	 const[correoAspirante,setcorreoAspirante]=useState('')
	 const[promedioAspirante,setpromedioAspirante]=useState(0.0)
	 const[curpAspirante,setcurpAspirante]=useState('')
	 const[domicilioAspirante,setdomicilioAspirante]=useState('')
	 const[escProceAsptirante,setescProceAsptirante]=useState('')
	 const[tipoSangreAspirante,settipoSangreAspirante]=useState('')
	 const[generoAspirante,setgeneroAspirante]=useState('')
	 const[lugNacAspirante,setlugNacAspirante]=useState('')
	 const[lugAapliAspirante,setlugAapliAspirante]=useState('jilo')
	 const[personaEmerAspirante,setpersonaEmerAspirante]=useState('')
	 const[fechaAspiante,setfechaAspiante]=useState('')
	 const[claveCarrera,setClaveCarrera]=useState('')
	 //Datos de tipo archivo
	 const[certificadAsp, setcertificadAsp]=useState('')
	 const[actafiAsp, setactaAsp]=useState('')
	 const[idenfiAsp, setidenAsp]=useState('')
	 const[fotofiAsp,setfotoAsp]=useState('')
	 const[curpfiAsp,setcurpfiAsp]=useState('')
	 
	 useEffect(() => {
        getTipoCarrera()
 	},[]);
 	function getTipoCarrera(){
		const carreras = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/admision')
		.then((res) => {
			//console.log(res.data);
			setTipoCarrera(res.data)
		});
		
	}
    return(
		<div className="containerAs ">
			<div className="capa"></div>
			<div className="row justify-content-center ">
				<div className="col-md-6 col-sm-8 col-xl-4 col-lg-5 formulario-as">
					
					<form action="">
					<div className="form-group text-center " >
						<h2 className="text-light">DATOS DEL ASPIRANTE: </h2>
						<div className="fecha" style={{color: "cyan"}} onChange={(e)=>{setfechaAspiante(e.target.value)}}>
						<input type="date" name="fecha" step="1" />
						</div>
					</div>
					
					
				
					<div className="form-group  pt-3">
						<input type="number"  className="form-control"  placeholder="Ficha de Admision"style={{width: "350px", color:"white"}}
							onChange={(e)=>{setnumFicha(e.target.value)}}
						/>
						
					</div>
					<div className="form-group ">
						<input type="text"  className="form-control" placeholder="Nombre(s)"style={{width: "350px", color:"white"}} onChange={(e)=>{setnomAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text"  className="form-control" placeholder="Apellido Paterno"style={{width: "350px", color:"white"}} onChange={(e)=>{setapePaternoAs(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Apellido Materno"style={{width: "350px",color:"white"}} onChange={(e)=>{setapeMaternoAs(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="tel" className="form-control" placeholder="Telefono"style={{width: "350px", color:"white"}} onChange={(e)=>{settelefonoAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text"  className="form-control" placeholder="Nombre(s) Persona de Emergencia"style={{width: "350px", color:"white"}} onChange={(e)=>{setpersonaEmerAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="tel" className="form-control" placeholder="Tel. Emergencia"style={{width: "350px", color:"white"}} onChange={(e)=>{settelefonoEmeAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="email" className="form-control" placeholder="Correo Electronico"style={{width: "350px",color:"white"}} onChange={(e)=>{setcorreoAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text"  className="form-control" placeholder="CURP"style={{width: "350px", color:"white"}} onChange={(e)=>{setcurpAspirante(e.target.value)}}/>
					</div>
					<div className="form-group pt-3 ">
						<input type="text" className="form-control" placeholder="Domicilio"style={{width: "350px", color:"white"}} onChange={(e)=>{setdomicilioAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Escuela de Procedencia"style={{width:"350px", color:"white"}} onChange={(e)=>{setescProceAsptirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Tipo de Sangre"style={{width: "350px", color:"white"}} onChange={(e)=>{settipoSangreAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Genero (M o F)"style={{width: "350px", color:"white"}} onChange={(e)=>{setgeneroAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Lugar de Nacimiento"style={{width: "350px", color:"white"}} onChange={(e)=>{setlugNacAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text" className="form-control" placeholder="Lugar de Aplicacion"style={{width: "350px", color:"white"}} onChange={(e)=>{setlugAapliAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<input type="text"  className="form-control" placeholder="Promedio"style={{width: "350px", color:"white"}} onChange={(e)=>{setpromedioAspirante(e.target.value)}}/>
					</div>
					<div className="form-group ">
						<select className="cmbcarre" 
						
						style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", height: "30px", width: "250px"}}
							onChange={(e)=>{setClaveCarrera(e.target.value)}}
						>
							<option>Seleccione una Carrera...</option>
							{tipoCarrera.map((tipo) => (
                                    <option key={tipo.clave_carrera} value={tipo.clave_carrera}>
                                        {tipo.nombre_carrera}
                                    </option>
								))}
						</select>
					</div>
					<div className="button row justify-content-center pt-3" >
						<div className="text-center">
							<button type="button" className="btn btn-outline-primary" onClick={handleClick} style={{color:"white", width: "200px", marginRight: "80px"}}>Continuar</button>
						</div>
					
					</div>
					
				</form>
					
			</div>
			</div>
			
		</div>
		
);
}

export default aspirantes;