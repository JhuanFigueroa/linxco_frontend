import React from "react";
import '../styles/TipoConstancia.scss'
import {useNavigate} from "react-router-dom";
const TipoConstancia=()=>{
    const navigate=useNavigate({nombre});
    const handleClick=(e)=>{
        e.preventDefault();
        navigate('/factura')
    }
    return(
        <div className="conssemestre mr-3" style={{marginTop:"40px",marginLeft:"40px"}}>
            <button
                type="button"
                onClick={handleClick}
                className="constancia btn-outline-primary"
                style={{color: "cyan", width: "200px", height: "200px"}}
            >
                {{nombre}}
            </button>
        </div>
    );
}

export default TipoConstancia;