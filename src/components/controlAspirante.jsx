import React from "react";
import '../styles/controlAspirante.scss'
// import {useNavigate} from "react-router-dom";
const constrolAspirantes = () => {
    // const navigate=useNavigate();
    // const hadleClick=(e)=>{
    //     e.preventDefault();
    //     navigate('/reinscripcion/factura')
    // }

    return (
        <div>
            <div class="capa"></div>
            <section class="cont-checks">

                <table class="tableFac table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">No.Ficha</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Escuela de Procedencia</th>
                            <th scope="col">Promedio General</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2354</td>
                            <td>Alan Becerril</td>
                            <td>TESJI</td>
                            <td>8.4</td>
                            <td>
                                 <input class="btnValid btn-outline-danger" type="button"/> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btnInscribir btn-outline-primary mt-7" onclick="location.href='controlAspirante2.html'">CONTINUAR</button>
            </section>
        </div>
    );
}

export default constrolAspirantes;