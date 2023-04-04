import React, { useState } from "react";
import '../styles/Materia.scss'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect } from "react";
import {useAuth} from "../hooks/useAuth";
const Documento  ='https://linxcoexpress-production.up.railway.app/descargar/1671390264365-577364018-sistemas-transformed.png';
const api = 'https://linxcoexpress-production.up.railway.app/api/v1/semestre'
const Materias = () => {
	const auth=useAuth()
	const user=auth.user
	const {grupo}=useParams()
	const navigate=useNavigate()
	const [semestre,setSemestre]=useState([]);
	const [materias,setMaterias]=useState([])
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (e) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const getSemestre=async ()=>{
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        const rta= await axios.get(api);
        setSemestre(rta.data)
    }

	const getMaterias=()=>{
		const rta=axios.get('https://linxcoexpress-production.up.railway.app/api/v1/materias/grupo/'+grupo)
			.then(res=>{
				setMaterias(res.data)
			})

	}

    useEffect(() => {
        getSemestre()
		getMaterias()
    }, []);

	const califActas=(materia)=>{
		navigate(`/control/actas/calif/${materia}/${grupo}`)
	}

     const handleClick=(materia)=>{
		 const formData= new FormData()

		 formData.append('ubicacion',selectedFile,selectedFile.name)
		 formData.append('claveMateria',materia)
		 formData.append('idGrupo',grupo)

		 const rta=axios.post('https://linxcoexpress-production.up.railway.app/api/v1/acta-control',formData)

		 navigate('/home')
     }



	return (

		<div className="capa">
			<section className="contMaterias">
				<div className="calificaciones pt-1 ">
					<div className="titulo justify-content-center" style={{ textAlign:"center", color: "white", marginLleft: "300px"}} >
						<h2>ACTAS</h2>
					</div>
			

					<table className="tableCal table-bordered" style={{width: "850px", height: "50px", marginTop: "50px" }}>
						<thead>
							<tr>
								<th scope="col">MATERIA</th>
								<th scope="col">SUBIR ACTA</th>
								<th scope="col">DESCARGAR</th>
								{(user.rol==2 || user.rol==5) &&(
									<th scope="col">ASIGNAR</th>
								)}

							</tr>
						</thead>
						<tbody>

						{materias.map(materia=>(
							<tr key={materia.clave}>
								<td>{materia.nombre}</td>
								<td className="docs row">
									<input type="file" className="btn btn-outline-success" title="Cargar" onChange={handleFileChange}/>
									<span className="material-symbols-outlined" >
								</span><button className="btnSend btn-light" type="button" onClick={()=>{handleClick(materia.clave)}}/></td>
								<td><a href={Documento} download> <button className="btn btn-outline-success"  title="Descargar" download><span className="material-symbols-outlined">
									DESCARGAR</span></button></a></td>
								{(user.rol==2 || user.rol==5) &&(
									<td><button onClick={()=>{califActas(materia.clave)}}>Calif</button></td>
								)}

							</tr>
						))}

						</tbody>
					</table>
					
				</div>
				<div className="button row justify-content-center pt-3" >
						<div className="text-center">
							<button type="button" className="btn btn-outline-primary" onClick={handleClick} style={{color:"white", width: "200px"}}>Guardar</button>
						</div>
					
					</div>
			</section>
			</div>
	);
}

export default Materias;