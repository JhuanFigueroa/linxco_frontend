import React from "react";
import '../styles/examen.scss'
import {useNavigate} from "react-router-dom";
const examen=()=>{
    const navigate=useNavigate();
    const hadleClick=(e)=>{
        //e.preventDefault();
        navigate('/home')
    }

    return(
    <div>

            <div className="forbienvenida">
                <div className="mensaje text-center" style={{color: "white"}}>
                    
                </div>
                <div className="row justify-content-center ">

                        
                            <div className="documentos">
                                <div className="container-main" style={{color: "rgb(255, 255, 255)"}}>
                                    <h4 style={{marginTop: "10px"}}>Comprobante de Pago </h4>
                                </div>
                                
                                <div className="examinar">
                                    <input type="file" className="btn btn-block ingresar" style={{marginTop: "5px", width: "600px", color:"rgb(107, 169, 173)", border:"1px solid rgb(31, 201, 201)"}}/>
                                </div>
                                <div className="container-main" style={{color: "rgb(255, 255, 255)"}}>
                                    <h4 style={{marginTop: "30px"}}>Pase de Ingreso (ceneval)</h4>
                                </div>
                                
                                <div className="examinar ">
                                    <input type="file" className="btn btn-block ingresar" style={{ marginTop: "5px", width: "600px", color:"rgb(107, 169, 173)", border: "1px solid rgb(31, 201, 201)" }}  />
                                </div>
                            </div>
                            <div className="btnsig text-center pt-5">
                                <button type="button" className="btn btn-outline-primary" onClick={()=>navigate('/home')}>Finalizar</button>
                            </div>
                    


            </div>
	
        </div>
    </div>
);
}

export default examen;