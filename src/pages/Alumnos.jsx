import React from "react";
import {Link} from "react-router-dom";
const Alumnos=()=>{
    return(
       <div>
           <nav>
            <li>
                <Link to='/tramites'>Tramites</Link>
            </li>
           </nav>

           <h1>Alumno</h1>
       </div>
    );
}

export default Alumnos;