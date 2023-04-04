import React from 'react';

const initalState={
    operacion:''
}
const useOperacion = () => {
    const [state, setState] = React.useState(initalState);


    const addOperacion=(payload)=>{
        setState({
            ...state,
            operacion:payload
        })
    }

    return{
        state,
        addOperacion
    };


};


export default useOperacion;