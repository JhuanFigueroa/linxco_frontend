import React, {useContext, useEffect, useState} from 'react'
import '../styles/Credencializacion.scss'
import axios from "axios";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";

const Credencializacion = () =>{
    const navigate=useNavigate()
    const {matriculaAlumno}=useParams()
    const {state} = useContext(AppContext);
    const operacion = state.operacion;
    const [matricula,setMatricula]=useState('')
    const [numero,setNumero]=useState('')
    const [factura,setFactura]=useState([])
    const{addOperacion}=React.useContext(AppContext);

    const getDatosCredencial=()=>{
        const rta=axios.get('https://linxcoexpress-production.up.railway.app/api/v1/tramites/credenciales/factura/'+matriculaAlumno)
            .then(res=>{
                setFactura(res.data[0])
                setNumero(res.data[0].numero_comprobante)
            });
    }

    const addCredencial= async ()=>{
        //CREDENCIAL
        const dta={
            'matriculaAlumno':matricula
        }
        const rta= await  axios.post('https://linxcoexpress-production.up.railway.app/api/v1/tramites/credencial',dta)

        //FACTURA
        const data = {
            'numero_comprobante': numero,
            'monto_total': 50,
            'matriculaAlumno': matricula,
            'status':1
        };
        let idF=0

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const res = await axios
            .post("https://linxcoexpress-production.up.railway.app/api/v1/factura", data)
            .then(res=>{
                idF = res.data;
                const dtaRazonfFactura = {
                    idFactura: idF,
                    claveRazon: 'CR323',
                };
                 axios.post(
                    "https://linxcoexpress-production.up.railway.app/api/v1/razonf-factura",
                    dtaRazonfFactura
                );
            });

        navigate('/control/credencializacion')

    }

    const editCredencial=()=>{
        //FACTURA
        const data = {
            'numero_comprobante': numero,
        };
        let idF=0

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const res = axios
            .patch("https://linxcoexpress-production.up.railway.app/api/v1/factura/"+factura.id_factura, data);

        addOperacion('credencial')
        navigate('/control/credencializacion');
    }
    const handleClick=()=>{
            if (operacion==='editCredencial'){
                editCredencial()
            }else {
                addCredencial()
            }
    }

    useEffect(()=>{
        if (operacion==='editCredencial'){
            getDatosCredencial()
        }
    },[])
    return(
        <><div className="capa"></div>
        <section className="contentFactReins">
            <h2 className="titleCarga">Credencializacion</h2><br/>
            <div className="form-group row">
                <h5  className="textNC">Matricula :</h5>
                <div className="col-sm-6">
                    <input type="text" className="format-control" id="inputNoControl" style={{width: "450px", height: "30px", color:"white"}}
                        value={matriculaAlumno}
                           onChange={(e)=>{setMatricula(e.target.value)}}/>

                </div>
            </div>

            <div className="form-group row">
                <h5 className="textNC">No. de Comprobante :</h5>
                <div className="col-sm-6">
                    <input type="text" className="format-control" id="inputNoControl" style={{width: "500px", height: "30px", color:"white"}}
                    value={numero}
                    onChange={(e)=>{setNumero(e.target.value)}}/>
                </div>
            </div>

            <table className="tableFac table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio unitario</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>CREDENCIAL</td>
                        <td>$500</td>
                        <td>
                            <button className="btnDelete btn-outline-danger" type="button"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <label htmlFor="inputText" className="textNC" style={{marginLeft: "600px"}}>Total: </label>
            <input type="text" className="format-control" id="inputNoControl" style={{width: "143px", height: "30px", marginTop: "3px",color:"white"}} value={50}/><br></br>
                <section className="botonesFR row" style={{marginTop: "10px"}}>
                    <button className="btnFactsA btn-outline-primary"
                    onClick={handleClick}>Guardar</button>
                </section>
        </section></>
    )
}
export default Credencializacion