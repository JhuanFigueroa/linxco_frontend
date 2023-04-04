import React,{useState,useContext,createContext} from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {useNavigate,Navigate} from "react-router-dom";
const api='https://linxcoexpress-production.up.railway.app/api/v1/auth/';
const AuthContext =createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [periodo,setPeriodo]=useState(null);

    const singIn=async (data)=> {
        const res = await axios.post(api + 'login', data);
        const token = res.data
        if (token) {
            Cookie.set('token', token, {expires: 5});
            axios.defaults.headers.Authorization = 'Bearer ' + token;
            const {data: user} = await axios.get(api + 'profile');
            console.log(user)
            setUser(user)
        }
    }

    const Logout=()=>{
        Cookie.remove('token');
        setUser(null)
        delete axios.defaults.headers.Authoriztion;
        window.location.href='/';

    }
    const autoLogin= async ()=>{
        const cookie= Cookie.get('token')
        if (cookie){
            axios.defaults.headers.Authorization='Bearer '+cookie;
            const {data:user}= await axios.get(api+'profile');
            auth.setUser(user)
            const {data:periodo}=await axios.get("https://linxcoexpress-production.up.railway.app/api/v1/tramites/periodo")
            setPeriodo(periodo)
        }else {
            return <Navigate to="/" />;
        }
    }


    const auth = { user,setUser ,singIn,autoLogin,Logout,periodo,setPeriodo};

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}


const AuthRoute= (props)=>{
    const auth=useAuth()
    if (!auth.user) {
        return <Navigate to="/" />;
    }

    return props.children;
}

export { AuthProvider,
    AuthRoute,
    useAuth
}



