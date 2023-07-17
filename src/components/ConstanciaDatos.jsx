import React, {useEffect, useState} from 'react'
import '../styles/ConstanciaDatos.scss'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const ConstanciaDatos =()=>{
    const navigate=useNavigate()
    const {matricula}=useParams()
    const [numero,setNumero]=useState()
    const [tipoConstancia,setTipoConstancia]=useState([])
    const [alumno,setAlumno]=useState([])
    const [claveConstancia,setClaveConstancia]=useState('')
    const [fecha, setFecha] = useState(null);
    const [idFactura,setIdFactura]=useState('')
    const getFactura=()=>{
        const rta=axios.get('http://localhost:3000/api/v1/factura/constancias/'+matricula)
            .then(res=>{
                setNumero(res.data[0].numero)
                setIdFactura(res.data[0].id)
            });
    }
    const getTipoFactura=()=>{
        const rta=axios.get('http://localhost:3000/api/v1/constancias/tipos/'+matricula)
            .then(res=>{
                const dta=axios.get('http://localhost:3000/api/v1/constancias/tipo/'+res.data[0].tipo)
                    .then(r=>{
                        setTipoConstancia(r.data)
                    })
            })
    }
    const getDatosAlumnos=()=>{
        const rta=axios.get('http://localhost:3000/api/v1/alumnos/constancia/'+matricula)
            .then(res=>{
                setAlumno(res.data[0])
            })
    }

    const addConstancia=()=>{
        //constancia
        const data={
            "clave":claveConstancia,
            "fecha":fecha
        }
        const rta=axios.post('http://localhost:3000/api/v1/constancias',data)
        //clave
        const dta={
            "idTipo":tipoConstancia.id,
            "claveConstancia":claveConstancia
        }
        const rpta=axios.post('http://localhost:3000/api/v1/constancias/cons-tipo',dta)

        const dat={
            "claveConstancia":claveConstancia,
            "matriculaAlumno":matricula
        }
        const res=axios.post('http://localhost:3000/api/v1/constancias/cons-alumno',dat)

        const da={
            "matricula":matricula,
            "numero":numero
        }
        const act=axios.post('http://localhost:3000/api/v1/factura/pagar',da)
    }

    const handleClick=()=>{
        addConstancia()
        navigate('/home')
    }

    useEffect(()=>{
        getFactura()
        getTipoFactura()
        getDatosAlumnos()
    },[])
    return(

        <section className="contentReins-ConstanciaDatosC">
            <h2 className="titleCarga" style={{color: "white", marginLeft: "20px"}}>DATOS FACTURA</h2>
            <div className="form-group row">
                <h5  className="textNC" style={{color: "white", marginLeft: "20px"}}>No.Comprobante :</h5>
                <div className="">
                    <input type="text" className="format-control" id="inputNoControl" value={numero} style={{width: "400px", height: "30px", color:"white"}}/>
                </div>
            </div>
            <table className="tableFac table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio unitario</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{tipoConstancia.descripcion}</td>
                        <td>$200</td>
                        <td>
                            <button className="btnDelete btn-outline-danger" type="button"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4 className="titleCarga" style={{color: "white", marginLeft: "20px"}}>DATOS DEL ALUMNO</h4>
            <table className="tableFac table-bordered">
                <thead>
                    <tr>
                        <th scope="col">MATRICULA</th>
                        <th scope="col">NOMBRE COMPLETO</th>
                        <th scope="col">SEMESTRE</th>
                        <th scope="col">CARRERA</th>
                        <th scope="col">PLAN DE ESTUDIOS</th>
                        <th scope="col">PROMEDIO GENERAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{alumno.matricula}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.semestre}</td>
                        <td>{alumno.carrera}</td>
                        <td>{alumno.plan}</td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4 className="titleCarga"></h4><br/>
                <div className="form-group row">
                    <h5  className="textNC" style={{color: "white", marginLeft: "20px"}}>CLAVE CONSTANCIA:</h5>
                    <div className="col-sm-6">
                        <input type="text" onChange={(e)=>{
                            setClaveConstancia(e.target.value)
                        }} className="format-control" id="inputNoControl" style={{width: "400px", height: "30px", color:"white"}}/>
                    </div>
                </div>
                <div className="form-fech row">
                    <h4 style={{color: "white", marginLeft: "20px"}}>Fecha Constancia</h4>
                    <input type="date" className="form-control"
                           onChange={(e) => {
                               setFecha(e.target.value);
                           }}
                           style={{width: "160px", height: "20px", marginLeft: "10px", marginTop: "5px", color:"white"}}/>
                </div>

                <button className="btnContReins2 btn-outline-primary" onClick={handleClick}>GUARDAR</button>
        </section>
    )
}
export default ConstanciaDatos