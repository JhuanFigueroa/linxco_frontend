import React, {useEffect, useState} from "react";
import TipoConstancia from "@components/TipoConstancia";
import '../styles/TipoConstancia.scss'
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Periodos=()=>{
    const navigate=useNavigate();
    const [periodos,setPeriodos]=useState([])
    const getPeriodos= async ()=>{
        const rta=axios.get('http://localhost:3000/api/v1/periodo/all')
            .then(res=>{
                setPeriodos(res.data)
            })


    }

    const handleClick=(idPeriodo)=>{
        navigate(`/boleta/${idPeriodo}`)
    }

    useEffect(()=>{
        getPeriodos()
    },[])
    return(
        <div>
            <section className="contTramites">
                <div className="mensajeIConst text-center" style={{color: "white"}}>
                    <h1>ELGIGE EL PERIODO</h1>
                </div>
                <div className="button row">

                    {periodos.map(periodo=>(
                        <div className="conssemestre mr-3" key={periodo.id} >
                            <button
                                type="button"
                                onClick={()=>{handleClick(periodo.id)}}
                                className="constancia btn-outline-primary">
                                {periodo.numero}
                            </button>
                        </div>
                    ))}

                </div>
            </section>
        </div>
    );
}

export default Periodos