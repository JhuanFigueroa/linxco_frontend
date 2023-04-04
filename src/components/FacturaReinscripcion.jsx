import React, {useEffect, useState} from "react";
import "../styles/FacturaReinscripcion.scss";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import Cookie from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";

let idF = 0;
let numFactu = "";
let matriculaAlumno = "";
const FacturaReinscripcion = () => {
    const navigate=useNavigate()
    let facts = [];
    const auth = useAuth();
    const user = auth.user;
    const {matricula} = useParams();

    const [tipoFacturas, setTipoFactura] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [facturasC, setFacturasC] = useState([]);

    //campos de  la factura
    const [numComprobante, setNumComprobante] = useState("");

    const getFacturaAlumno = async () => {
        let razonesF = [];
        const rta = await axios
            .get(
                "https://linxcoexpress-production.up.railway.app/api/v1/factura/reinscripcion/" + matriculaAlumno
            )
            .then((res) => {
                numFactu = res.data[0].numero;
                setNumComprobante(numFactu);
                const clavesF = axios
                    .get(
                        "https://linxcoexpress-production.up.railway.app/api/v1/razonf-factura/factura/" + numFactu
                    )
                    .then((res) => {
                        razonesF = facturas;
                        razonesF.push(res.data);
                        setFacturasC(razonesF[0]);
                    });
            });
    };

    const getRazonesFact = () => {
        let factT = [];
        facturas.map((factura) => {
            axios
                .get("https://linxcoexpress-production.up.railway.app/api/v1/factura/tipos/" + factura)
                .then((res) => {
                    factT.push(res.data[0]);
                    setFacturasC(factT);
                });
        });
    };

    const getTipoFactura = async () => {
        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta = await axios.get("https://linxcoexpress-production.up.railway.app/api/v1/factura/tipos");
        setTipoFactura(rta.data);
    };

    const totalFactura = () => {
        let sum = 0;
        facturasC.map((fact) => {
            return (sum += fact.precio_unitario_factura);
        });

        return sum;
    };
    const handleClick = (e) => {
        e.preventDefault();
        setFacturas(facts);

        //Obtneniendo los datos de los tipos de facturas
        let factT = [];
        facturas.map((factura) => {
            axios
                .get("https://linxcoexpress-production.up.railway.app/api/v1/factura/tipos/" + factura)
                .then((res) => {
                    factT.push(res.data[0]);
                    setFacturasC(factT);
                });
        });
    };

    const addFactura = () => {
        console.log(numComprobante);
        const data = {
            'numero_comprobante': numComprobante,
            'monto_total': totalFactura(),
            'matriculaAlumno': user.clave,
            'status':1
        };

        const cookie = Cookie.get("token");
        axios.defaults.headers.Authorization = "Bearer " + cookie;
        const rta = axios
            .post("https://linxcoexpress-production.up.railway.app/api/v1/factura", data)
            .then(function (response) {
                idF = response.data;
                facturasC.map((factura) => {
                    const dtaRazonfFactura = {
                        idFactura: idF,
                        claveRazon: factura.clave_razon_factura,
                    };
                    axios.post(
                        "https://linxcoexpress-production.up.railway.app/api/v1/razonf-factura",
                        dtaRazonfFactura
                    );
                });
            });

        const matricula = {
            matricula: user.clave,
        };

        axios.post("https://linxcoexpress-production.up.railway.app/api/v1/tramites/reinscribir", matricula);
        console.log(matricula);
        console.log(data);
    };

    const reinscribir = () => {
        const data = {
            'folio': numComprobante,
            'matricula': matriculaAlumno
        }
        const rta = axios.post('https://linxcoexpress-production.up.railway.app/api/v1/tramites/reinscribir-alumno', data)
    }
    const deleteRazonFactura = (factura) => {
        facts = facturasC;
        console.log(facts);
        const newFacturas = facts.filter((item) => item !== factura);
        console.log(newFacturas);
        setFacturas(newFacturas);
        setFacturasC(newFacturas);
    };

    const handleSubmit = () => {
        if (user.rol == 4) {
            addFactura()
        } else {
            reinscribir()
        }
        navigate('/home')
    }

    useEffect(() => {
        if (user.rol != 4) {
            matriculaAlumno = matricula;
        } else {
            matriculaAlumno = user.clave;
        }
        getTipoFactura();
        getFacturaAlumno();
    }, []);
    return (
        <section
            className="contentFactReinsAl"
            style={{height: "550px", marginRight: "200px"}}
        >
            <h2 className="titleCarga" style={{color: "white", marginLeft: "30px"}}>
                Carga Academica
            </h2>
            <br/>
            <div className="form-group row">
                <h5 htmlFor="inputText" className="textNC">
                    No. de Comprobante :
                </h5>
                <div className="col-sm-6">
                    <input
                        type="text"
                        className="format-control"
                        id="inputNoControl"
                        value={numComprobante}
                        onChange={(e) => {
                            setNumComprobante(e.target.value);
                        }}
                        style={{width: "500px", height: "30px",color:"white"}}
                    />
                </div>
            </div>
            {(user.rol != 2 && user.rol!=5) && (
                <div>
                    <div className="form-group">
                        <h5 className="" style={{color: "rgb(250, 250, 250)"}}>
                            Seleccione el tipo de factura
                        </h5>
                        <select
                            className="btnComboCar btn-secondary dropdown-toggle"
                            type="button"
                            onChange={(e) => {
                                facts = facturas;
                                facts.push(e.target.value);
                            }}
                            data-toggle="dropdown"
                            aria-expanded="false"
                            style={{width: "390px", height: "30px"}}
                        >
                            <option>SELECCIONE</option>
                            {tipoFacturas.map((tipo) => (
                                <option key={tipo.clave} value={tipo.clave}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btnAdd btn-outline-info"
                        onClick={handleClick}
                        type="button"
                    >
                        Agregar
                    </button>
                </div>
            )}

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
                {facturasC.map((factura) => (
                    <tr key={factura.clave_razon_factura}>
                        <td>1</td>
                        <td>{factura.nombre_razon_factura}</td>
                        <td>$ {factura.precio_unitario_factura}</td>
                        <td>
                            <button
                                className="btnDelete btn-outline-danger"
                                type="button"
                                onClick={() => {
                                    deleteRazonFactura(factura);
                                }}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <label
                htmlFor="inputText"
                className="textNC"
                style={{marginLeft: "600px"}}
            >
                Total$:
            </label>
            <input
                type="text"
                className="format-control"
                id="inputNoControl"
                value={totalFactura()}
                style={{width: "143px", height: "30px", marginTop: "3px", color:"white"}}
            />
            {(user.rol == 3 || user.rol==5)? (
                <section className="botonesFR row" style={{marginTop: "10px"}}>
                    <button className="btnFactsA btn-outline-primary"
                            onClick={()=>{
                                navigate('/home')
                            }}
                    >Incompleto</button>
                    <button className="btnFactsAB btn-outline-primary"
                            onClick={handleSubmit}
                    >
                        Reinscribir
                    </button>
                </section>
            ) : (
                <section className="botonesFR row" style={{marginTop: "10px"}}>
                    <button className="btnFactsA btn-outline-primary">Subir</button>
                    <button
                        className="btnFactsAB btn-outline-primary"
                        onClick={handleSubmit}
                    >
                        Guardar
                    </button>
                </section>
            )}
        </section>
    );
};

export default FacturaReinscripcion;
