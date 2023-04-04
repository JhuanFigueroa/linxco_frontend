import React from "react";
import {useAuth} from "../hooks/useAuth";
import UploadHorarios from "@components/UploadHorarios";
import DownloadHorario from "@components/DownloadHorario";

const Horario=()=>{
const  auth=useAuth();
const user=auth.user;

if (user.rol==3){
    return(
        <UploadHorarios/>
    );
}
else {
    return (
        <DownloadHorario/>
    );
}
}

export default Horario;