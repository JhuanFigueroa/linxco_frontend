import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import AppContext from "../context/AppContext";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";
import Cookie from "js-cookie";

let alumnos = [];
const FormActas = () => {
    const auth=useAuth()
    const periodo = auth.periodo;
    const user=auth.user
    const {state} = useContext(AppContext);
    const navigate = useNavigate();
    const {materia} = useParams()
    const {grupo} = useParams()

    const [studentsReins, setStudentsReins] = useState([]);
    const{addOperacion}=React.useContext(AppContext);
    const [califC,setCalifC]=useState('')
    const [desempeñoC,setDesempeñoC]=useState('')
    const [id,setId]=useState('')

    const cambiarDesempeño=(index,e)=>{
        const newValue = e.target.value;

        setStudentsReins(prevData => {
            prevData[index].calificacion = newValue;
            prevData[index].desempeño = newValue * 2;
            if (newValue>=70 && newValue<80){
                prevData[index].desempeño ='SUFICIENTE';
            }
            if (newValue>=80 && newValue<90){
                prevData[index].desempeño ='NOTABLE';
            }
            if (newValue>=90){
                prevData[index].desempeño ='EXCELENTE';
            }
            return [...prevData];
        });

    }


    const getEstudiantes = async () => {

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta =  await axios
            .get("http://localhost:3000/api/v1/acta-calif/alumnos/" + materia+"/"+grupo)
            .then((res) => {
                const json=res.data
                setStudentsReins(json.map(item=>({...item,calificacion: 0,desempeño:''})));
            });
    };

    const handleClick = () => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        for (let i = 0; i <studentsReins.length; i++) {
            const data={
                "folio":`${Math.random()}`,
                "calificacion":studentsReins[i].calificacion,
                "fecha":hoy,
                "claveMateria":materia,
                "matriculaAlumno":studentsReins[i].matricula,
                "idPeriodo":id
            }
            const rta=axios.post('http://localhost:3000/api/v1/acta-calif',data)
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
                    <th>DESEMPEÑO</th>
                </tr>
                </thead>
                <tbody>

                {
                    studentsReins.map((estudiante,index) =>
                        (
                            <tr key={estudiante.matricula}>
                                <td>{estudiante.matricula}</td>
                                <td>{estudiante.nombre}</td>
                                <td><input type="text" className="textTR" style={{color: "white", width: "100%"}}
                                           value={estudiante.calificacion}
                                           onChange={cambiarDesempeño.bind(this,index)}
                                />
                                </td>

                                <td>{estudiante.desempeño}</td>
                            </tr>
                        )

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
