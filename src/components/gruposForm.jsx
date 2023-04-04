import { useContext } from "react";
import React from "react";
import '../styles/carrerasIn.scss'
import { useNavigate, useParams} from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const API ='https://linxcoexpress-production.up.railway.app/api/v1/admision'

const gruposForm = () => {

    const {state}=useContext(AppContext)
    const operacion=state.operacion
    const {id2}=useParams()

    const [numeroGrupo,setnumeroGrupo]=useState('')
    const [carrera,setClaveCarrera]=useState('')
    const [statusGrupo,setStatusGrupo]=useState(1)

    const navigate = useNavigate();
    const [carreras, setCarreras] = useState([])

    const handleClick = (e) => {
        e.preventDefault()
        const data={
            'numero':numeroGrupo,
            'claveCarrera':carrera,
            'status':statusGrupo
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.post('https://linxcoexpress-production.up.railway.app/api/v1/grupos/',data)
        navigate('/gruposForm/Ver')
    }
    const updateClik=(e)=>{
        e.preventDefault()
        const dataA={
            'numero':numeroGrupo,
            'claveCarrera':carrera,
            'status':statusGrupo
        }
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        axios.patch('https://linxcoexpress-production.up.railway.app/api/v1/grupos/'+id2+'',dataA)
        navigate('/gruposForm/Ver')
    }
    useEffect(()=>{
        if(id2!=null){
            llenarCamposGrupos(id2)
        }
    },[])
    const obtenerCarreras =()=>{
        const rta = axios.get(API).then(res=>{setCarreras(res.data)});
    }
    useEffect(() => {
        obtenerCarreras()
    }, [])
    function llenarCamposGrupos(id2){
        console.log(id2)
        const rta = axios.get('https://linxcoexpress-production.up.railway.app/api/v1/grupos/'+id2+'').then(rest=>{

        setnumeroGrupo(rest.data.numero)
        setClaveCarrera(rest.data.claveCarrera)
        setStatusGrupo(rest.data.status)
    })}
    return (
        <div>

            <div className="capa"></div>
            <section className="carreraV row">
                <div className="regGrup">
                    <h1>Registro de Grupos</h1>
                </div>
                <div className="form-group">
                    <h5>Numero del grupo</h5>
                    <input type="text" className="form-control" value={numeroGrupo} onChange={(e)=>{setnumeroGrupo(e.target.value)}} />
                </div>
                <div className="form-group">
                    <h5>Carrera</h5>
                    <select className="cmbcarre" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", height: "30px", width: "250px" }} onChange={(e) => {setClaveCarrera(e.target.value) }}>
                        <option>Seleccione una Carrera...</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.clave_carrera} value={carrera.clave_carrera}>
                                {carrera.nombre_carrera}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <h5>Status</h5>
                    <input type="text" className="form-control" value={statusGrupo} onChange={(e)=>{setStatusGrupo(e.target.value)}}/>
                </div>
                <section className="botonesFR row" style={{ marginTop: "10px" }}>
                    {operacion==='cambioOperacion1'?(
                    <button className="btnFactsA btn-outline-primary" onClick={updateClik}>Actualizar</button>):(<button className="btnFactsA btn-outline-primary" onClick={handleClick}>Agregar</button>)}
                    <button className="btnFactsAB btn-outline-primary" onClick={() => navigate('/gruposForm/Ver')} >VER</button>
                </section>
            </section>
        </div>
    );

}

export default gruposForm;