import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/EstudiantesTable.scss";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";
import Cookie from "js-cookie";
const Boleta = () => {
    const {idPeriodo}=useParams()
    const auth=useAuth()
    const periodo = auth.periodo;
    const user=auth.user
    const {state} = useContext(AppContext);
    const operacion = state.operacion;
    const navigate = useNavigate();
    const [calificaciones,setCalificaciones]=useState([])
    const [id,setId]=useState('')

    const getBoleta = () => {

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta = axios
            .get("https://linxcoexpress-production.up.railway.app/api/v1/tramites/boleta/" + user.clave+"/"+idPeriodo)
            .then((res) => {
                console.log(res.data)
                setCalificaciones(res.data);
            });
    };



    useEffect(() => {
        setId(periodo[0].id)
        getBoleta()
    }, []);


    return (
        <section className="contenedor-estudiantes">
           <h1>{user.nombre}</h1>
            <br></br>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">MATRICULA</th>
                    <th scope="col">MATERIA</th>
                    <th scope="col">CALIFICACION</th>
                </tr>
                </thead>
                <tbody>

                {
                    calificaciones.map((calificacion) => {
                            return(
                                <tr key={calificacion.clave}>
                                    <td>{calificacion.clave}</td>
                                    <td>{calificacion.materia}</td>
                                    <td>{calificacion.calificacion}</td>

                                </tr>
                            )
                        }
                    )}
                </tbody>

            </table>
            <div className="button row justify-content-center pt-3" >
                <div className="text-center">
                    <button type="button" className="btn btn-outline-primary" style={{color:"white", width: "250px"}}>Guardar</button>
                </div>

            </div>
        </section>
    );

};

export default Boleta;
