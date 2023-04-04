import React from "react";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import jefeDivision from "../pages/JefeDivision";

const api="https://linxcoexpress-production.up.railway.app/api/v1/tramites/boleta";
const Tramites=()=>{
    const auth=useAuth();
    const user=auth.user;
    const [boleta,setBoleta]=React.useState([]);

    const getBoleta=async ()=>{
        const data={
            "clave":user.clave,
            "periodo":2
        }
        const res=await axios.get(api+'/'+user.clave+'/2');
        console.log(res.data)
        setBoleta(res.data);
    }

    React.useEffect(() => {
        getBoleta();
    }, []);
    return(

        <div>
            <h1>Tramites de {user.nombre}</h1>

            <h2>Boleta</h2>

            {boleta.map((materia)=>(   <li key={materia.clave_materia}>
                <h3>Clave:{materia.clave_materia}</h3>
                <p>Materia:{materia.nombre_materia}</p>
                <p>Calificacion:{materia.calificacion_acta}</p>
            </li>))}
        </div>
    )
}

export default Tramites;