import React from "react";
import '../styles/Carreras.scss'
import CarreraItem from "@components/CarreraItem";
import axios from "axios";
import Cookie from "js-cookie";
import {useAuth} from "../hooks/useAuth";
import { useContext } from "react";
import AppContext from "../context/AppContext";


const Carreras=()=>{
    const {state}=useContext(AppContext)
    const operacion=state.operacion
const api="https://linxcoexpress-production.up.railway.app/api/v1/carreras"
    const auth = useAuth();
    const user = auth.user;
    const [carreras,setCarreras]=React.useState([]);

    const getCarreras=async ()=>{
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        const rta= await axios.get(api);
        setCarreras(rta.data.carreras)

    }
    const getCarrerasMaestro = async ()=> {
        const cookie= Cookie.get('token')
        axios.defaults.headers.Authorization='Bearer '+cookie;
        const rta= await axios.get('https://linxcoexpress-production.up.railway.app/api/v1/semestre/maestro/'+user.clave)
        setCarreras(rta.data)
        
    }
    React.useEffect(() => {
        
        if (user.rol == 1){
            getCarrerasMaestro()
        }else{
            getCarreras()
        }
    }, []);

    return(
        <div>
            
            <section className="contcarreras">
            
                <div className="set row justify-content-center">
                <h1>Carreras</h1>
                
                    <div className="carre">
                        {carreras.map((carrera) => (
                            <CarreraItem key={carrera.clave} carrera={carrera} />
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
}
export default Carreras;