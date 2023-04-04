import React, {useEffect, useState} from "react";
import '../styles/BajasForm.scss'
import axios from "axios";
import Cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
let idB=0
const BajasForm = () => {

    const navigate=useNavigate()
    const [razones,setRazones]=useState([]);
    const [tipoBaja,setTipoBaja]=useState([])
    const [razonBaja,setRazonesBaja]=useState([])
    const [matricula,setMatricula]=useState('')

    const getRazones=async ()=>{
        const rta=await axios.get('https://linxcoexpress-production.up.railway.app/api/v1/bajas/razones');
        setRazones(rta.data)
    }

    const handleClick=()=>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const data={
            'tipo':tipoBaja,
            'fecha':hoy
        }

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta=axios.post('https://linxcoexpress-production.up.railway.app/api/v1/bajas',data)
            .then(function (response){
                idB=response.data
                const dta={
                    'idBaja':idB,
                    'matriculaAlumno':matricula
                }

                axios.defaults.headers.Authorization = "Bearer " + cookie;
                const res=axios.post('https://linxcoexpress-production.up.railway.app/api/v1/baja-alumno',dta)
                razonBaja.map(razon=>{
                    const dtaRazobBaja={
                        'idBaja':idB,
                        'claveRazon':razon
                    }
                    const cookie = Cookie.get("token");
                    axios.defaults.headers.Authorization = "Bearer " + cookie;
                    axios.post('https://linxcoexpress-production.up.railway.app/api/v1/bajas/razones',dtaRazobBaja)
                })
            })

        navigate('/home')

    }
    useEffect(()=>{
        getRazones()
    },[])
    return (

                <section className="contenedorss-bajas-forms">
                    <h1>Formulario de Bajas</h1>
                    <div className="form-group">
                        <h5 style={{color:"white"}}>No. Matricula</h5>
                        <input type="number" className="form-control" style={{width:"300px",height:"30px",color:"white"}}
                        onChange={(e)=>{setMatricula(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <h5 style={{color: "rgb(255, 255, 255)"}}>Tipo de Baja</h5>
                        <select
                            className="btnComboCar btn-secondary dropdown-toggle"
                            type="button"
                            onChange={(e) => {
                                setTipoBaja(e.target.value)
                            }}
                            data-toggle="dropdown"
                            aria-expanded="false"
                            style={{width: "390px", height: "30px"}}
                        >
                            <option>SELECCIONE</option>

                                <option>
                                    BAJA TEMPORAL
                                </option>
                            <option>
                                BAJA DEFINITIVA
                            </option>

                        </select>
                    </div>

                    <br/>

                    <h5
                        className="titleDoc"
                        style={{color: "rgb(250, 252, 252)", width: "100%", marginLeft: "20px"}}
                    >
                        Razon(es) baja
                    </h5>


                        {razones.map(razon=>(
                            <div className="form-check" key={razon.clave}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={razon.clave}
                                id="defaultCheck1"
                                onChange={(e)=>{
                                    if (e.target.checked){
                                        let newList=razonBaja
                                        newList.push(razon.clave)
                                        setRazonesBaja(newList)
                                    }

                                }}
                            />
                            <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                            style={{color: "aliceblue"}}
                            >
                                {razon.descripcion}
                            </label>
                            </div>
                        ))}

                    <button
                        type="button"
                        className="btnInscribir btn-outline-primary"
                        onClick={handleClick}
                        style=
                            {{
                                width: "300px",
                                height: "50px",
                                marginLeft: "80px",
                                marginTop: "80px",
                                borderRadius: "0.5rem"
                            }}

                    >
                        GUARDAR
                    </button>
                </section>


    );
}

export default BajasForm;