import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import AppContext from "../context/AppContext";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";
import Cookie from "js-cookie";

let alumnos = [];
const FormActas = () => {
    let desempeño=''
    let calificacion=''
    const auth=useAuth()
    const periodo = auth.periodo;
    const user=auth.user
    const {state} = useContext(AppContext);
    const operacion = state.operacion;
    const navigate = useNavigate();
    const {materia} = useParams()
    const {grupo} = useParams()

    const [studentsReins, setStudentsReins] = useState([]);
    const{addOperacion}=React.useContext(AppContext);
    const [calificaciones,setCalificaciones]=useState([])
    const [califC,setCalifC]=useState('')
    const [desempC,setDesempC]=useState('')
    const [desempeños,setDesempeños]=useState([])
    const [id,setId]=useState('')

    const getEstudiantes = () => {

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta = axios
            .get("https://linxcoexpress-production.up.railway.app/api/v1/acta-calif/alumnos/" + materia+"/"+grupo)
            .then((res) => {
                console.log(res.data)
                setStudentsReins(res.data);
            });
    };

    const handleClick = () => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        for (let i = 0; i <studentsReins.length; i++) {
            const data={
                "folio":`${Math.random()}`,
                "calificacion":calificaciones[i],
                "fecha":hoy,
                "claveMateria":materia,
                "matriculaAlumno":studentsReins[i].matricula,
                "idPeriodo":id
            }
           const rta=axios.post('https://linxcoexpress-production.up.railway.app/api/v1/acta-calif',data)
        }
        navigate('/home')
    };

    useEffect(() => {
        setId(periodo[0].id)
        getEstudiantes()
    }, []);


        return (
            <section className="contenedor-estudiantes">
                <nav className="buscador d-flex align-items-center">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2 col-7"
                            type="search"
                            style={{width: "700px"}}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-primaryy mt-7" type="submit">
                            Buscar
                        </button>
                    </form>
                </nav>
                <br></br>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">MATRICULA</th>
                        <th scope="col">NOMBRE COMPLETO</th>
                        <th scope="col">CALIFICACION</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        studentsReins.map((estudiante) => {
                             return(
                                 <tr key={estudiante.matricula}>
                                     <td>{estudiante.matricula}</td>
                                     <td>{estudiante.nombre}</td>
                                     <td><input type="text" className="textTR" style={{color: "white", width: "100%"}}
                                                onChange={(e) => {
                                                    if (e.currentTarget.value >= 70) {
                                                        let calif = calificaciones
                                                        calificacion = e.currentTarget.value
                                                        calif.push(calificacion)
                                                        setCalificaciones(calif)
                                                        setCalifC(calificacion)

                                                        if (calificacion < 70) {
                                                            desempeño = 'NA'
                                                        } else if (calificacion >= 70 && calificacion < 80) {
                                                            desempeño = 'SUFICIENTE'
                                                        } else if (calificacion >= 80 && calificacion < 90) {
                                                            desempeño = 'NOTABLE'
                                                        } else if (calificacion >= 90) {
                                                            desempeño = 'EXCELENTE'
                                                        }

                                                        let desemp = desempeños
                                                        desemp.push(desempeño)
                                                        setDesempeños(desemp)
                                                    }
                                                }}/>
                                     </td>

                                 </tr>
                             )
                            }
                        )}
                    </tbody>

                </table>
                <div className="button row justify-content-center pt-3" >
                    <div className="text-center">
                        <button type="button" className="btn btn-outline-primary" onClick={handleClick} style={{color:"white", width: "250px"}}>Guardar</button>
                    </div>

                </div>
            </section>
        );

};

export default FormActas;
