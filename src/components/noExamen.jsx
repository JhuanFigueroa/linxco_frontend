import React from "react";
import '../styles/noExamen.scss'
// import {useNavigate} from "react-router-dom";
const noExamen = () => {
    // const navigate=useNavigate();
    // const hadleClick=(e)=>{
    //     e.preventDefault();
    //     navigate('/reinscripcion/factura')
    // }

    return (
        <div>
            <div class="capa"></div>
            <div class="forbienvenida ">
                <div class="row justify-content-center ">
                    <div class="mensaje text-center" style={{color: "white"}}>
                    </div>
                    <div class="formulario">
                        <form action="">
                            <div class="documentos">
                                    <div class="container-main pt-5" style={{color: "white"}}>
                                        <h3>Pase de Ingreso (ceneval)</h3>
                                    </div>
                                    <div class="examinar ">
                                        <input type="file" class="btn btn-block ingresar" style={{width: "600px", color:"rgb(163, 156, 156)", border: "1px solid rgb(37, 148, 182)" }}  />
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
                    <div class="btnsig text-center pt-5">
                        <button type="button" class="btn btn-outline-primary" style={{color: "white"}}>Finalizar</button>
                    </div>
                </div>
                </div>
);
}

export default noExamen;