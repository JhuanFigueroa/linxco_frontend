import React, {useEffect, useRef, useState} from "react";
import '../styles/HorariosUpload.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
const UploadHorarios=()=>{
    const auth = useAuth();
    const user = auth.user;
    const periodo = auth.periodo;
    const navigate=useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [claveCarrera,setClaveCarrera]=useState('')
    const [id,setId]=useState('')
    const handleFileChange = (e) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleClick=()=>{
        const formData= new FormData()


        const res=axios.get('http://localhost:3000/api/v1/jefes/'+user.clave).then(resp=>{

            formData.append('ubicacion',selectedFile,selectedFile.name)
            formData.append('claveCarrera',resp.data.claveCarrera)
            formData.append('idPeriodo',id)

            const rta=axios.post('http://localhost:3000/api/v1/jefes/horarios',formData)
        })

        navigate('/home')

    }
    useEffect(()=>{
        setId(periodo[0].id)
    },[])
    return(

    <div className="capa">
        <section className="ContentHorariosJefes">

            <div className="horariosJ">
                <h2 className="textHJ">Seleccionar o arrastrar archivo</h2><br/>
                <div className="form-control-HJ">
                    <input type="file" className="subirArchHor" onChange={handleFileChange} placeholder="Subir"/>
                </div>
                <br/>
                <button onClick={handleClick} className="btnHSubir btn-outline-primary">Subir</button>
            </div>

        </section>
    </div>
    );
}

export default UploadHorarios;