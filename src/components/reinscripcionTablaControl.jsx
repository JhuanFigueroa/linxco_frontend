import React from "react";
import "../styles/estilosReinscripcionTabla.css"
const ReinsTablaControl = () => {
    return (
        <div>
            <div className="capa"></div>
                


                <section className="contenedor row col-lg col-sm-6">
                    <nav className="buscador d-flex align-items-center">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2 col-lg-7 col-sm-4" type="search" size="40" style={{ width: "700px" }} placeholder="Search" aria-label="Search" />
                            <button className="btnBuscar btn btn-outline-primaryy mt-7" type="submit">Buscar</button>
                        </form>
                    </nav>
                    <br></br>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" >No. Matricula</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Semestre</th>
                                <th scope="col">Validar</th>
                            </tr>
                        </thead>
                        <tbody />
                        <tr>
                            <td>00001</td>
                            <td>Angel</td>
                            <td>Septimo</td>
                            <td>
                                <button className="btnEdit btn-light" type="button" onclick="location.href='reinscripcionCargaControl.html'" />
                            </td>
                        </tr>
                        <tr>
                            <td>00002</td>
                            <td>Juan</td>
                            <td>Septimo</td>
                            <td>
                                <button className="btnEdit btn-light" type="button" onclick="location.href='reinscripcionCargaControl.html'" />
                            </td>
                        </tr>
                    </table>

                </section>
            </div>


            
        
    );
}
export default ReinsTablaControl;