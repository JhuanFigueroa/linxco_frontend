import React from "react";
import '../styles/bienvenidaAs.scss'
import {useNavigate} from "react-router-dom";
const bienvenidaAs=()=>{
     const navigate=useNavigate();
     const hadleClick=(e)=>{
         e.preventDefault();
       navigate('/aspirante/form')
     }

    return( 
		<div className="capa">
			<div className="forbienvenida ">
				<div className="row justify-content-center ">
						<div className="mensajeBienvenida text-center" style={{color: "white"}}>
						<h4>Instrucciones</h4>	
			</div>
				</div>
				<div className="btnsig text-center pt-2">
					<button type="button" onClick={hadleClick}
							className="btn btn-outline-primary" style={{color: "white", marginTop:"15px"}}>Continuar
					</button>
				</div>
			</div>
		</div>	

);
}

export default bienvenidaAs;