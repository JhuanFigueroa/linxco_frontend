import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/EstudiantesTable.scss";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";
import Cookie from "js-cookie";

let alumnos = [];
const EstudiantesTable = () => {
    const {state} = useContext(AppContext);
    const operacion = state.operacion;
    const navigate = useNavigate();
    const {clave} = useParams()
    const auth=useAuth()
    const user=auth.user
    const [studentsReins, setStudentsReins] = useState([]);
    const{addOperacion}=React.useContext(AppContext);

    const getEstudiantesReinscripcion = () => {

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta = axios
            .get("http://localhost:3000/api/v1/tramites/reinscribir/estudiantes/" + clave)
            .then((res) => {
                console.log(res.data)
                setStudentsReins(res.data);
            });
    };

    const getCredenciales=()=>{
        const rta=axios.get('http://localhost:3000/api/v1/tramites/credenciales').then(res=>{
            setStudentsReins(res.data)
        })
    }

    const getBajas=()=>{
        axios.get('http://localhost:3000/api/v1/bajas/'+clave)
            .then((res) => {
                setStudentsReins(res.data);
            });
    }
    const handleClick = (matricula) => {

        if (operacion === "reinscripcion") {
            navigate(`/reinscripcion/control/carga/${matricula}`);
        }
        if (operacion === "bajas") {
            navigate("/control/bajas/form");
        }
        if (operacion === "credencial") {
            if (matricula.length>0){
                addOperacion('editCredencial')
                navigate(`/control/credencializacion/edit/${matricula}`);
            }else{
                navigate("/control/credencializacion/form");
            }

        }
    };

    useEffect(() => {
        if (operacion==='reinscripcion'){
            getEstudiantesReinscripcion();
        }else if (operacion==='bajas'){
            getBajas()
        }else{
            getCredenciales()
        }
    }, []);

   if (operacion==='reinscripcion'){
       return (
           <section className="contenedor-estudiantes">
            <h1>Reinscripciones</h1>
               <br></br>
               <table className="tableEstudiantes table-bordered">
                   <thead>
                   <tr>
                       <th scope="col">MATRICULA</th>
                       <th scope="col">NOMBRE COMPLETO</th>
                       <th scope="col">CARRERA</th>
                       <th scope="col">SEMESTRE</th>
                       <th scope="col">VALIDAR</th>
                   </tr>
                   </thead>
                   <tbody>

                   {
                       studentsReins.map((estudiante) => (
                               <tr key={estudiante.matricula}>
                                   <td>{estudiante.matricula}</td>
                                   <td>{estudiante.nombre}</td>
                                   <td>{estudiante.carrera}</td>
                                   <td>{estudiante.semestre}</td>
                                   <td>
                                       <button
                                           className="btnEdit btn-light"
                                           type="button"
                                           onClick={() => {
                                               handleClick(estudiante.matricula)
                                           }}
                                       />
                                   </td>
                               </tr>
                           )
                       )}
                   </tbody>
               </table>

           </section>
       );
   }else{

       return (
           <section className="contenedor-estudiantes">
            <h1>Bajas</h1>

                   <button className="btn-outline-primary btn-nuevo" type="button"
                           onClick={handleClick}>
                       AGREGAR
                   </button>

               <table className="tableEstudiantes table-bordered">
                   <thead>
                   <tr>
                       <th scope="col">MATRICULA</th>
                       <th scope="col">NOMBRE COMPLETO</th>
                       <th scope="col">CARRERA</th>
                       <th scope="col">SEMESTRE</th>
                       <th scope="col">VALIDAR</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       studentsReins.map((estudiante) => (
                               <tr key={estudiante.matricula}>
                                   <td>{estudiante.matricula}</td>
                                   <td>{estudiante.nombre}</td>
                                   <td>{estudiante.carrera}</td>
                                   <td>{estudiante.semestre}</td>
                                   <td>
                                       <button
                                           className="btnEdit btn-light"
                                           type="button"
                                           onClick={() => {
                                               handleClick(estudiante.matricula)
                                           }}
                                       />
                                   </td>
                               </tr>
                           )
                       )}
                   </tbody>
               </table>
           </section>
       )
   }
};

export default EstudiantesTable;
