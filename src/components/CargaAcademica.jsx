import React, {useContext, useEffect, useState} from "react";
import "../styles/CargaAcademica.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import AppContext from "../context/AppContext";
import axios from "axios";
import ListaMaterias from "@components/ListaMaterias";
import Cookie from "js-cookie";

const url = "https://linxcoexpress-production.up.railway.app/api/v1/alumnos/datosCarga/";
let idC = 0;
let matriculaAlumno = "";
const CargaAcademica = () => {
    const {id2}=useParams()

    useEffect(()=>{
        if(id2!=null){
            llenarCamposAlumno(id2)
        }
    },[])

    const {state} = useContext(AppContext);
    const operacion = state.operacion;
    const auth = useAuth();
    const user = auth.user;
    const periodo = auth.periodo;
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [materiasCarga, setMateriasCarga] = useState([]);
    const [tiposCarga, setTiposCarga] = useState([]);
    const [tipoCargaAlumno, setTipoCargaAlumno] = useState('')

    const {matricula} = useParams();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [celular, setCelular] = useState("");
    const [carrera, setCarrera] = useState("");
    const [fecha, setFecha] = useState(null);
    const [tipoCarga, setTipoCarga] = useState(null);
    const [cursos, setCursos] = useState([])
    const [cursoCarga, setCursoCarga] = useState([])
    const [gruposCarga, setGruposCarga] = useState([])

    const totalCreditos = () => {
        let sum = 0;
        const creditos = materiasCarga.map((materia) => {
            return (sum += materia.creditos);
        });
        return sum;
    };

    const getCargaData = async () => {
        const res = await axios.get(url + matriculaAlumno);
        const datos = res.data;
        setNombre(datos.nombre);
        setCelular(datos.telefono);
        setCorreo(datos.correo);
        setCarrera(datos.carrera);
    };

    const getTiposCarga = async () => {
        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const res = await axios.get("https://linxcoexpress-production.up.railway.app/api/v1/tipoCarga");
        setTiposCarga(res.data);
    };

    const getTipoCurso = async () => {
        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const res = await axios.get("https://linxcoexpress-production.up.railway.app/api/v1/cursos");
        setCursos(res.data);
    }

    const hadleClick = (e) => {
        e.preventDefault();

        const data = {
            fecha: fecha,
            claveTipoCarga: tipoCarga,
            matriculaAlumno: matriculaAlumno,
            idPeriodo: periodo[0].id,
        };
        if (user.rol == 4) {
            const cookie = Cookie.get("token");
            axios.defaults.headers.Authorization = "Bearer " + cookie;
            const rta = axios
                .post("https://linxcoexpress-production.up.railway.app/api/v1/carga-academica", data)
                .then(function (response) {
                    idC = response.data;
                    for (let i = 0; i < materiasCarga.length; i++) {
                        const dtaMateriaCarga = {
                            claveMateria: materiasCarga[i].clave,
                            idCarga: idC,
                            idCurso: cursoCarga[i],
                            grupo: gruposCarga[i]
                        };
                        axios.post(
                            "https://linxcoexpress-production.up.railway.app/api/v1/materia-carga",
                            dtaMateriaCarga
                        );
                    }

                });

            navigate("/reinscripcion/factura");

        }else{
            navigate(`/reinscripcion/control/factura/${matricula}`);
        }


    };

    const getCargaAlumno = () => {
        let materias = [];
        const rta = axios
            .get(
                "https://linxcoexpress-production.up.railway.app/api/v1/tramites/reinscribir/carga/" +
                matriculaAlumno + "/" + periodo[0].id
            )
            .then((res) => {
                console.log(res.data.tipoCarga[0].tipo_carga)
                setMateriasCarga(res.data.carga);
                setTipoCargaAlumno(res.data.tipoCarga[0].tipo_carga)
            });
        const res = axios.get()
    };

    useEffect(() => {
        console.log(periodo[0].numero)
        if (user.rol != 4) {
            matriculaAlumno = matricula;
            getCargaAlumno();
        } else {
            matriculaAlumno = user.clave;
        }
        getCargaData();
        getTiposCarga();
        getTipoCurso()
    }, []);
    function llenarCamposAlumno(id2){
        console.log(id2)
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/admision/'+id2+'').then(rest=>{
  
        
        // setnumero_ficha_admision(rest.data.numero)
        matriculaAlumno=id2
        setNombre(rest.data.nombre+" "+rest.data.apellido_paterno+" "+rest.data.apellido_materno)
        setCelular(rest.data.telefono)
        setCorreo(rest.data.correo)
        setCarrera(rest.data.claveCarrera)
    })}
    return (
        <section className="contentReins-carga">
            <h2 className="titleCarga">Carga Academica</h2>
            <br/>
            <section className="FormReins row">
                <section className="checksR">
                    {tiposCarga.map((tipo) => (
                        <div className="custom-control custom-radio custom-control-inline">
                            {(user.rol!=4) ? (
                                <input
                                    type="checkbox"
                                    name="tipoCarga[]"
                                    value={tipo.clave}
                                    checked={tipo.clave==tipoCargaAlumno}
                                    aria-label="Checkbox for following text input"
                                />
                            ):(
                                <input
                                    type="checkbox"
                                    name="tipoCarga[]"
                                    value={tipo.clave}
                                    aria-label="Checkbox for following text input"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setTipoCarga(e.target.value);
                                        }
                                    }}
                                />
                            )}

                            <label style={{marginTop: "10px"}}>{tipo.nombre}</label>
                        </div>
                    ))}
                </section>
                <div className="form-group">
                    <h5 style={{color: "white"}}>Nombre del estudiante</h5>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        style={{width: "540px", height: "30px"}}
                    />
                </div>
                <div className="form-group">
                    <h5 style={{color: "white"}}>No. Matricula</h5>
                    <input
                        type="number"
                        className="form-control"
                        value={matriculaAlumno}
                        style={{width: "200px", height: "30px"}}
                    />
                </div>
                <div className="form-group">
                    <h5 style={{color: "white"}}>Periodo</h5>
                    <input
                        type="text"
                        className="form-control"
                        value={periodo[0].numero}
                        style={{width: "160px", height: "30px"}}
                    />
                </div>
                <div className="form-group">
                    <h5 style={{color: "white"}}>Fecha</h5>
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => {
                            setFecha(e.target.value);
                        }}
                        style={{width: "160px", height: "30px"}}
                    />
                </div>

                <div className="form-group">
                    <h5 style={{color: "white"}}>Carrera</h5>
                    <input
                        type="text"
                        className="form-control"
                        value={carrera}
                        style={{width: "390px", height: "30px"}}
                    />
                </div>

                <div className="form-group">
                    <h5 style={{color: "white"}}>No. Celular</h5>
                    <input
                        type="number"
                        className="form-control"
                        value={celular}
                        style={{width: "240px", height: "30px"}}
                    />
                </div>
                <div className="form-group">
                    <h5 style={{color: "white"}}>Correo</h5>
                    <input
                        type="email"
                        className="form-control"
                        value={correo}
                        style={{width: "500px", height: "30px"}}
                    />
                </div>

                {user.rol == 4 && (
                    <button
                        className="btnAdd btn-outline-info"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        type="button"
                    >
                        Agregar
                    </button>
                )}

                {!!openModal && (
                    <ListaMaterias
                        setOpenModal={setOpenModal}
                        setMateriasCarga={setMateriasCarga}
                    />
                )}
                <table
                    className="tableR table-bordered"
                    style={{width: "730px", height: "50px"}}
                >
                    <thead>
                    <tr>
                        <th scope="col">CLAVE</th>
                        <th scope="col">ASIGNATURA</th>
                        <th scope="col">CR</th>
                        <th scope="col">GRUPO</th>
                        <th scope="col">1A</th>
                        <th scope="col">2A</th>
                        <th scope="col">3A</th>
                    </tr>
                    </thead>
                    <tbody>
                    {materiasCarga.map((materia) => {
                        return (
                            <tr key={materia.clave}>
                                <td>{materia.clave}</td>
                                <td>{materia.nombre}</td>
                                <td>{materia.creditos}</td>
                                <td>
                                    <input type="text" className="textTR" style={{color: "white"}}
                                           value={materia.numero_grupo}
                                           onChange={(e) => {
                                               if (e.target.value.length == 4) {
                                                   let grupos = gruposCarga
                                                   grupos.push(e.target.value)
                                                   setGruposCarga(grupos)
                                               }
                                           }}
                                    />
                                </td>
                                {cursos.map(curso => {
                                    return (
                                        <td key={curso.id}>
                                            {user.rol!=4 ? (
                                                <input
                                                    type="checkbox"
                                                    aria-label="Checkbox for following text input"
                                                    value={curso.id}
                                                    checked={curso.id == materia.id_curso}
                                                />
                                            ):(
                                                <input
                                                    type="checkbox"
                                                    aria-label="Checkbox for following text input"
                                                    value={curso.id}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            let oportunidades = cursoCarga
                                                            oportunidades.push(curso.id)
                                                            setCursoCarga(oportunidades);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </td>
                                    )
                                })}

                            </tr>
                        )
                    })}

                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td>{totalCreditos() || 0}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                {(user.rol == 2 || user.rol == 5) && operacion === "inscripcion" ? (
                    <button className="btnContReins2 btn-outline-primary">
                        Finalizar
                    </button>
                ) : user.rol == 2 || user.rol == 5 ? (
                    <section className="row-btn">
                        <button
                            className="btnContReins2-ca btn-outline-primary"
                            onClick={()=>{
                                navigate('/home')
                            }}
                        >
                            Incompleto
                        </button>
                        <button
                            className="btnContReins3 btn-outline-primary"
                            onClick={hadleClick}
                        >
                            Siguiente
                        </button>
                    </section>
                ) : (
                    <button
                        className="btnContReins2 btn-outline-primary"
                        onClick={hadleClick}
                    >
                        Continuar
                    </button>
                )}
            </section>
        </section>
    );
};

export default CargaAcademica;
