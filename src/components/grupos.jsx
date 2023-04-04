import React, { useState, useContext } from "react";
import "../styles/Grupos.scss"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import {useAuth} from "../hooks/useAuth";
import { useEffect } from "react";
import AppContext from "../context/AppContext";

const Grupos = () => {
    const [grupo, setGrupo]=useState([]);
    const auth = useAuth();
    const user = auth.user;
    const {clave} = useParams();

    const getGrupo=async (user, clave)=>{
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        const rta= axios.get('https://linxcoexpress-production.up.railway.app/api/v1/grupos/maestro/'+user.clave+'/'+clave+'').then(rest => {
            console.log(rest)
            setGrupo(rest.data)
        });
    }

    const getGrrupoByCarrera= async ()=>{
        const rta=await axios.get('https://linxcoexpress-production.up.railway.app/api/v1/grupos/carrera/'+clave)
            .then(res=>{
                console.log(res.data)
                setGrupo(res.data)
            })
    }
    useEffect(() => {
        if (user.rol==2 || user.rol==5){
            getGrrupoByCarrera()
        }else {
            getGrupo(user,clave)
        }
       
    },[]);
    const navigate=useNavigate()
    const handeleClick=(grupo)=>{

        console.log(grupo)
        if (user.rol ==2 || user.rol==5){
        navigate(`/control/actas/materias/${grupo}`)
        }else{
            navigate(`/actas/materias/${grupo}`)
        }
    }
    return (
        <div>
			<div className="capa"></div>
            <div className="justify-content-center row">
                    <h3>SELECCIONE SU GRUPO</h3>
            <div className="materias pt-1">
                
                <div className="mate justify-content-center row">
                        {grupo.map((grupos)=>(
                            <div className="botones mr-3" key={grupos.id}>
                            <button type="button " className="btngru btn-outline-primary" onClick={()=>{handeleClick(grupos.id_grupo)}}
                            style={{color:"cyan"}}>{grupos.grupo}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Grupos;