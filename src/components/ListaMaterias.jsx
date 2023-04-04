import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import Cookie from "js-cookie";
let clavesMaterias=[]
const ListaMaterias=(props)=>{
    const [materias,setMaterias]=useState([]);
    const [materiasSelected,setMateriasSelected]=useState([])
    const [materiasFinal,setMateriasFinal]=useState([]);
    const getMaterias= async () =>{

        const rta=await axios.get('https://linxcoexpress-production.up.railway.app/api/v1/materias')
        setMaterias(rta.data)
    }

    const agregarClaves=()=>{
        let size_materias=materiasSelected.length
        for (let i=0;i<size_materias;i++){
            clavesMaterias.push(materiasSelected[i])
        }

        let materiasC=[]
     //   const populateData = (data) => {materiasC.push(data)}
        function axiosTest (clave) {
            axios.get("https://linxcoexpress-production.up.railway.app/api/v1/materias/"+clave)
                .then(function(response){
                     materiasC=materiasFinal
                    materiasC.push(response.data);
                     setMateriasFinal(materiasC)
                })
                .catch(function(error){
                    console.log(error);
                });
        }

        for (let i=0;i<size_materias;i++){

            axiosTest(clavesMaterias[i])
        }
    }

    const addMaterias=()=>{
        //agregarClaves();

        props.setMateriasCarga(materiasSelected)

       props.setOpenModal(false)

    }

    useEffect( () => {
        getMaterias()
    }, []);

    return(
        <div>
            {materias.map((materia)=>(
              <li key={materia.clave}>
                  <input type="checkbox" name="materias[]" id="materia" value={materia.clave} onChange={(e)=>{
                      if (e.target.checked){
                          let newList=materiasSelected
                          newList.push(materia)
                          setMateriasSelected(newList)
                      }

                  }}
                         aria-label="Checkbox for following text input"/>

                  <label style={{marginTop: "10px", color:"white", marginLeft:"50px"}}>{materia.nombre}</label>
              </li>
            ))}
            <button style={{marginLeft:"50px"}}onClick={addMaterias}>Continuar</button>
        </div>
    )
}

export default ListaMaterias;