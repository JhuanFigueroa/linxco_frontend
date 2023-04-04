import React from "react";
import '../styles/Menu.scss'
import {Link, useNavigate} from "react-router-dom";
import AppContext from "../context/AppContext";
import {useAuth} from "../hooks/useAuth";

const Menu = () => {
    const auth=useAuth()
    const user=auth.user
    const{addOperacion}=React.useContext(AppContext);

    const navigate=useNavigate()
    const handleClickInsvripcion=(operacion)=>{
        addOperacion(operacion)
        if (operacion==='inscripcion'){
            navigate('/inscripcion')
        }

        if (operacion==='reinscripcion'){
            if (user.rol==2 || user.rol==5){
                navigate('/reinscripcion/control')
            }else {
                navigate('/reinscripcion/carga')
            }
        }

        if (operacion==='bajas'){
            navigate('/control/bajas')
        }

        if (operacion==='constancia'){
            if (user.rol==2 || user.rol==5){
                navigate('/control/constancias')
            }else {
                navigate('/constancias')
            }

        }

        if (operacion==='credencial'){
            navigate('/control/credencializacion')
        }

        if (operacion==='seguro'){
            navigate('/renuncia-seguro')
        }

        if (operacion==='acta'){
            if (user.rol==2 || user.rol==5){
                navigate('/control/actas')
            }else{
                
                navigate('/actas')
            }
        }
        if (operacion==='horario'){
            if (user.rol==2 || user.rol==5){
                navigate('/control/horarios')
            }else{
                navigate('/horarios')
            }
        }
        if (operacion==='maestroForm'){
            navigate('/maestroForm/insert')
        }
        if (operacion==='insertarCarrera'){
            navigate('/carrera/Insertar')
        }
        if (operacion==='insertarEmpleado'){
            navigate('/empleado/Insertar')
        }
        if (operacion==='insertarPeriodo'){
            navigate('/periodo/Insertar')
        }
        if (operacion==='insertarGrupo'){
            navigate('/grupoF')
        }
        if (operacion==='insertarMaterias'){
            navigate('/materiasF')
        }
        if (operacion==='boleta'){
            navigate('/boletas/periodos')
        }
        
    }

    return (
       <div>
           <input type="checkbox" id="btn-menu"/>
           <div className="container-menu">
           <div className="capa"></div>
               <div className="cont-menu">
                   <nav>
                       <section>
                           <h3 style={{color: "white", textAlign: "center"}}>Menu</h3>
                           <h5 style={{color: "white",textAlign: "center",marginBottom: "19px"}}>de Opciones</h5>
                       </section>
                       {(user.rol==2 || user.rol==5) &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial", marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('inscripcion')}>Inscripcion
                               </button>
                           </section>
                       )}
                       {(user.rol==2 || user.rol==4 || user.rol==5) &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('reinscripcion')}>Reinscripcion
                               </button>
                           </section>
                       )
                       }

                       {(user.rol==2 | user.rol==5) &&
                           (
                               <section className="btnMenu">
                                   <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                           onClick={()=>handleClickInsvripcion('bajas')}>Bajas
                                   </button>
                               </section>
                           )
                       }

                       {(user.rol==2 || user.rol==4 || user.rol==5) &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('constancia')}>Constancias
                               </button>
                           </section>
                       )
                       }

                       {user.rol==4 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('boleta')}>Boletas
                               </button>
                           </section>
                       )}

                       {(user.rol==2 || user.rol==5) && (
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('credencial')}>Credencializacion
                               </button>
                           </section>
                       )}
                       {(user.rol==2 || user.rol==5) && (
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial", marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('seguro')}>Renuncia Seguro
                               </button>
                           </section>
                       )}
                       {/*<section className="btnMenu">
                           <button className="btnM btn btn-dark" style={{textAlign: "initial"}}
                                   onClick="location.href='carreraConstanciaControl'">Aspirantes Control
                           </button>
                       </section>*/}

                       {user.rol !=1 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('horario')}>Horarios
                               </button>
                           </section>
                       )}
                       {user.rol ==5 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial", marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('maestroForm')}>Insertar Maestros
                               </button>
                           </section>
                       )}


                       {(user.rol==1 || user.rol==2 ||user.rol==5 )&&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('acta')}>Actas
                               </button>
                           </section>
                       )

                       }
                       {user.rol ==5 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('insertarCarrera')}>Insertar Carrera
                               </button>
                           </section>
                       )}
                       {user.rol ==5 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('insertarEmpleado')}>Insertar Empleado
                               </button>
                           </section>
                       )}
                       {user.rol ==5 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('insertarPeriodo')}>Insertar Periodo
                               </button>
                           </section>
                       )}
                       {user.rol ==5 &&(
                           <section className="btnMenu">
                               <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                       onClick={()=>handleClickInsvripcion('insertarGrupo')}>Insertar Grupo
                               </button>
                           </section>
                       )}
                       {user.rol ==5 &&(
                        <section className="btnMenu">
                            <button className="btnM btn btn-dark" style={{textAlign: "initial",  marginLeft:0}}
                                    onClick={()=>handleClickInsvripcion('insertarMaterias')}>Insertar Materias
                            </button>
                        </section>
                    )}
                       
                   </nav>

                   <label htmlFor="btn-menu">✖️</label>
               </div>
           </div>
       </div>
    );
}

export default Menu;