import React, {useEffect, useState} from "react";
import '../styles/Horarios.scss'
import gif from '@imagenes/hor.gif'
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import {useParams} from "react-router-dom";
const DownloadHorario = () => {
    const {carrera}=useParams()
    let claveCarrera = 0
    const auth = useAuth()
    const user = auth.user;
    const [documento,setDocumento]=useState(null)

    const obtnenerHorarioAlumno = async () => {
        const rta = await axios.get('http://localhost:3000/api/v1/alumnos/' + user.clave)
        claveCarrera = rta.data.claveCarrera
        const res = await axios.get('http://localhost:3000/api/v1/horarios/carrera/' + claveCarrera)
        setDocumento(res.data.ubicacion)
        //console.log(Documento)
    }

    const obtenerHorarioControl= async ()=>{
        const res = await axios.get('http://localhost:3000/api/v1/horarios/carrera/' + carrera)
        setDocumento(res.data.ubicacion)
    }

    useEffect(() => {
        if (user.rol==4){
            obtnenerHorarioAlumno()
        }else{
            obtenerHorarioControl()
        }
    }, [])

    return (

    <div className="capa">
        <section className="ContentHorariosD">
            <div className="horariosD">
                <h2 className="textHD">Descargar Archivo</h2><br/>
                <a href={documento} target={"_blank"} download={"horario.pdf"}>
                <button className="descargaHD btn-outline-primary"><img src={gif} width="100%"
                                                                                    height="100%"/></button></a>
            </div>
        </section>
    </div>
    );
}

export default DownloadHorario;