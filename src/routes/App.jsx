import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import '../styles/global.scss';
import Layout from '../containers/Layout';
import Login from '../pages/Login';
import Tramites from "@components/Tramites";
import Home from '../pages/Home';

import {AuthProvider,AuthRoute} from "../hooks/useAuth";
import Carreras from "@containers/Carreras";
import TableAspirantes from "@components/TableAspirantes";
import InscripcionForm from "@components/InscripcionForm";
import DocumentosInscripcion from "@components/DocumentosInscripcion";
import CargaAcademica from "@components/CargaAcademica";
import FacturaReinscripcion from "@components/FacturaReinscripcion";


import Horario from "@containers/Horario";
import EstudiantesTable from "@components/EstudiantesTable";
import Constancias from "@containers/Constancias";
import Factura from "@components/Factura";
import useOperacion from "../hooks/useOperacion";
import AppContext from "../context/AppContext";
import BajasForm from "@components/BajasForm";
import ConstanciaControl2 from "@components/ConstanciaControl2";
import ConstanciaDatos from "@components/ConstanciaDatos";
import Credencializacion from "@components/Credencializacion";
import Aspirantes from "@components/aspirantes";
import BienvenidaAs from "@components/bienvenidaAs";
import Examen from "@components/examen";
import Materias from "@components/materias-container";
import Grupos from "@components/grupos";
import MateriasContainer from "@components/materias-container";
import RenunciasSeg from "@components/RenunciasSeg";
import DownloadHorario from "@components/DownloadHorario";
import MaestroForm from "@components/MaestroForm";
import MaestroConsultas from "@components/MaestroConsultas";


import Carrerasform from "@components/Carrerasform";
import VistaCarrera from "@components/VistaCarrera";
import EmpleadoForm from "@components/EmpleadoForm";
import PeriodoForm from '@components/PeriodoForm';
import VistaPeriodo from "@components/VistaPeriodo";
import GruposForm from "@components/gruposForm";
import MateriasForm from "@components/materiasForm";
import FormActas from "@components/FormActas";
import Periodos from "@containers/Periodos";
import Boleta from "@components/Boleta";
import VistaGruposForm from "@components/tablaGruposForm";
import VistaMateriasForm from "@components/tablaMateriasForm";
import VistaEmpleado from "@components/VistaEmpleado";

const App=()=>{
    const operacion=useOperacion()
    return (

        <AuthProvider>
            <AppContext.Provider value={operacion}>
            <Router>
                <Layout>

                    <Routes>
                        <Route exact path="/home" element={
                            <AuthRoute>
                                <Home/>
                            </AuthRoute>
                        } />
                        <Route exact path="/" element={<Login/> } />
                        <Route exact path="/aspirante" element={<BienvenidaAs/> } />
                        <Route exact path="/aspirante/form" element={<Aspirantes/> } />
                        <Route exact path="/aspirante/examen" element={<Examen/> } />
                        <Route exact path="/tramites" element={
                            <AuthRoute>
                                <Tramites/>
                            </AuthRoute>
                            }/>
                        <Route exact path="/inscripcion" element={<AuthRoute><Carreras/></AuthRoute>}/>
                        <Route exact path="/inscripcion/carreras/:clave" element={<AuthRoute><TableAspirantes/></AuthRoute>}/>
                        <Route exact path="/inscripcion/estudiante" element={<AuthRoute><InscripcionForm/></AuthRoute>}/>
                        <Route exact path="/inscripcion/documentos/:id2" element={<AuthRoute><DocumentosInscripcion/></AuthRoute>}/>
                        <Route exact path="/inscripcion/estudiante/:id2" element={<AuthRoute><InscripcionForm/></AuthRoute>}/>

                        <Route exact path="/inscripcion/carga/:id2" element={<AuthRoute><CargaAcademica/></AuthRoute>}/>


                        <Route exact path="/reinscripcion/carga" element={<AuthRoute><CargaAcademica/></AuthRoute>}/>
                        <Route exact path="/reinscripcion/factura" element={<AuthRoute><FacturaReinscripcion/></AuthRoute>}/>
                        <Route exact path="/reinscripcion/control" element={<AuthRoute><Carreras/></AuthRoute>}/>
                        <Route exact path="/reinscripcion/control/estudiantes/:clave" element={<AuthRoute><EstudiantesTable/></AuthRoute>}/>
                        <Route exact path="/reinscripcion/control/carga/:matricula" element={<AuthRoute><CargaAcademica/></AuthRoute>}/>
                        <Route exact path="/reinscripcion/control/factura/:matricula" element={<AuthRoute><FacturaReinscripcion/></AuthRoute>}/>

                        {/*BAJAS*/}
                        <Route exact path="/control/bajas" element={<AuthRoute><Carreras/></AuthRoute>}/>
                        <Route exact path="/control/bajas/estudiantes/:clave" element={<AuthRoute><EstudiantesTable/></AuthRoute>}/>
                        <Route exact path="/control/bajas/form" element={<AuthRoute><BajasForm/></AuthRoute>}/>
                        {/*Constancias*/}
                        <Route exact path="/constancias" element={<AuthRoute><Constancias/></AuthRoute>}/>
                        <Route exact path="/control/constancias" element={<AuthRoute><Carreras/></AuthRoute>}/>
                        <Route exact path="/control/constancias/tabla/:clave" element={<AuthRoute><ConstanciaControl2/></AuthRoute>}/>
                        <Route exact path="/control/constancias/datos/:matricula" element={<AuthRoute><ConstanciaDatos/></AuthRoute>}/>
                        <Route exact path="/control/bajas" element={<AuthRoute><Carreras/></AuthRoute>}/>

                        <Route exact path="/factura/:descripcion" element={<AuthRoute><Factura/></AuthRoute>}/>

                        {/*Credencializacion*/}
                        <Route exact path="/control/credencializacion" element={<AuthRoute><EstudiantesTable/></AuthRoute>}/>
                        <Route exact path="/control/credencializacion/form" element={<AuthRoute><Credencializacion/></AuthRoute>}/>
                        <Route exact path="/control/credencializacion/edit/:matriculaAlumno" element={<AuthRoute><Credencializacion/></AuthRoute>}/>

                        {/*Horarios*/}
                        <Route exact path="/horarios" element={<AuthRoute><Horario/></AuthRoute>}/>
                        <Route exact path="/horarios/:carrera" element={<AuthRoute><DownloadHorario/></AuthRoute>}/>
                        <Route exact path="/control/horarios" element={<AuthRoute><Carreras/></AuthRoute>}/>

                        {/*Actas*/}
                        <Route exact path="/control/actas" element={<AuthRoute><Carreras/></AuthRoute>}/>
                        <Route exact path="/control/actas/grupos/:clave" element={<AuthRoute><Grupos/></AuthRoute>}/>
                        <Route exact path="/control/actas/materias/:grupo" element={<AuthRoute><Materias/></AuthRoute>}/>
                        <Route exact path="/control/actas/calif/:materia/:grupo" element={<AuthRoute><FormActas/></AuthRoute>}/>
                        <Route exact path="/actas" element={<AuthRoute><Carreras/></AuthRoute>}/>

                        {/*ACTAS*/}
                        <Route exact path="/actas/grupos" element={<AuthRoute><Grupos/></AuthRoute>}/>
                        <Route exact path="/actas/grupos/:clave" element={<AuthRoute><Grupos/></AuthRoute>}/>
                        <Route exact path="/actas/materias/:grupo" element={<AuthRoute><Materias/></AuthRoute>}/>

                        {/*Carreras*/}
                        <Route exact path="/carrera/Insertar" element={<AuthRoute><Carrerasform/></AuthRoute>}/>
                        <Route exact path="/carrera/Ver" element={<AuthRoute><VistaCarrera/></AuthRoute>}/>
                        <Route exact path="/carrera/Insertar/:clave" element={<AuthRoute><Carrerasform/></AuthRoute>}/>

                        {/*Maestros*/}
                        <Route exact path="/maestroForm/insert" element={<AuthRoute><MaestroForm/></AuthRoute>}/>
                        <Route exact path="/maestroForm/insert/:clave" element={<AuthRoute><MaestroForm/></AuthRoute>}/>
                        <Route exact path="/maestroForm/consulta" element={<AuthRoute><MaestroConsultas/></AuthRoute>}/>

                        <Route exact path="/renuncia-seguro" element={<AuthRoute><RenunciasSeg/></AuthRoute>}/>


                        {/*enmleado*/}
                        <Route exact path="/empleado/Insertar" element={<AuthRoute><EmpleadoForm/></AuthRoute>}/>
                        <Route exact path="/empleado/Ver" element={<AuthRoute><VistaEmpleado/></AuthRoute>}/>
                        <Route exact path="/empleado/Insertar/:id1" element={<AuthRoute><EmpleadoForm/></AuthRoute>}/>

                        {/*Periodo*/}
                        <Route exact path="/periodo/Insertar" element={<AuthRoute><PeriodoForm/></AuthRoute>}/>
                        <Route exact path="/periodo/Ver" element={<AuthRoute><VistaPeriodo/></AuthRoute>}/>
                        <Route exact path="/periodo/Insertar/:id2" element={<AuthRoute><PeriodoForm/></AuthRoute>}/>

                        {/*Grupos form*/}
                        <Route exact path="/grupoF" element={<AuthRoute><GruposForm/></AuthRoute>}/>
                        <Route exact path="/gruposForm/Ver" element={<AuthRoute><VistaGruposForm/></AuthRoute>}/>
                        <Route exact path="/gruposF/:id2" element={<AuthRoute><GruposForm/></AuthRoute>}/>
                        {/*Materias form*/}
                       <Route exact path="/materiasF" element={<AuthRoute><MateriasForm/></AuthRoute>}/>
                        {/*Boletas*/}
                        <Route exact path="/boletas/periodos" element={<AuthRoute><Periodos/></AuthRoute>}/>
                        <Route exact path="/boleta/:idPeriodo" element={<AuthRoute><Boleta/></AuthRoute>}/>
                       <Route exact path="/materiasForm/Ver" element={<AuthRoute><VistaMateriasForm/></AuthRoute>}/>
                       <Route exact path="/materiasF/:id2" element={<AuthRoute><MateriasForm/></AuthRoute>}/>
                    </Routes>

                </Layout>
            </Router>
            </AppContext.Provider>
        </AuthProvider>





    );
}

export default App;